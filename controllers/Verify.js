import jwt from "jsonwebtoken";
import Customers from "../models/CustomersModel.js";
import Logins from "../models/LoginsModel.js";
import bcrypt from "bcrypt";

export const verifyToken = async (req, res, next) => {
  let tokenHeader = req.headers["authorization"];
  //console.log("Data token req = " + tokenHeader);
  if (!tokenHeader)
    return res.status(500).send({
      auth: false,
      message: "Error",
      errors: "Incorrect token format",
    });
  if (tokenHeader.split(" ")[0] !== "Bearer") {
    return res.status(500).send({
      auth: false,
      message: "Error",
      errors: "Incorrect token format",
    });
  }
  let token = tokenHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "Error",
      errors: "No token provided",
    });
  }
  jwt.verify(token, process.env.API_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Error",
        errors: err,
      });
    }
    req.id = decoded.id;
    req.role = decoded.role;
    req.customerId = decoded.customerId;
    //console.log("ID dari req dari verivy = " + req.customerId);
    next();
  });
};

export const verifySignin = async (req, res) => {
  try {
    const { email } = req.body;
    await Customers.findOne({
      where: [
        {
          email: email,
        },
      ],
    })
      .then((customer) => {
        if (!customer) {
          return res.status(404).send({
            auth: false,
            id: req.body.id,
            accessToken: null,
            message: "Error",
            errors: "Customer Not Found.",
          });
        }
        var passwordIsValid = bcrypt.compare(
          req.body.password,
          customer.password,
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            email: req.body.email,
            accessToken: null,
            message: "Error",
            errors: "Invalid Password!",
          });
        }
        var token =
          "Bearer " +
          jwt.sign(
            {
              id: customer.id,
              customer: customer.customer,
              email: customer.email,
            },
            process.env.API_SECRET,
            {
              expiresIn: 86400, //24h expired
            },
          );
        res.status(200).send({
          auth: true,
          id: req.body.id,
          customer: customer.customer,
          email: customer.email,
          accessToken: token,
          message: "Error",
          errors: null,
        });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          id: req.body.id,
          accessToken: null,
          message: "Error",
          errors: err,
        });
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/** Login user */
export const customerLogin = async (req, res) => {
  try {
    const { username } = req.body;
    await Logins.findOne({
      where: [
        {
          username: username,
        },
      ],
    })
      .then((login) => {
        if (!login) {
          return res.status(404).send({
            auth: false,
            accessToken: null,
            message: "Error",
            errors: "Username Not Found.",
          });
        }
        var passwordIsValid = bcrypt.compare(req.body.password, login.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            accessToken: null,
            message: "Error",
            errors: "Invalid Password!",
          });
        }
        var token = createToken(
          login.id,
          login.username,
          login.role,
          login.customerId,
        );
        var refreshToken = createRefreshToken(
          login.id,
          login.username,
          login.role,
          login.customerId,
        );
        Logins.update(
          {
            resfresh_token: refreshToken,
          },
          {
            where: [{ id: login.id }],
          },
        );
        // res.status(200).send({
        //   auth: true,
        //   id: login.id,
        //   username: login.username,
        //   role: login.role,
        //   accessToken: token,
        //   message: "Error",
        //   errors: null,
        // });
        res.cookies("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ token });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          accessToken: null,
          message: "Error",
          errors: err,
        });
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const customerLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const login = await Logins.findAll({
    where: [{ refresh_token: refreshToken }],
  });
  if (!login[0]) return res.sendStatus(204);
  const loginId = user[0].id;
  await Logins.update(
    { refresh_token: null },
    {
      where: [{ id: loginId }],
    },
  );
  res.clearCookie("resfreshToken");
  return res.sendStatus(200);
};

export const isAdmin = (req, res, next) => {
  if (req.role === "admin") {
    res.status(200);
    next();
  } else {
    res.status(400).send({ message: "Access denied admin only!" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookie.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const login = await Logins.findAll({
      where: [
        {
          refresh_token: refreshToken,
        },
      ],
    });
    if (!login[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.API_REFRESH_TOKEN, (err, decode) => {
      if (err) return res.sendStatus(403);
      const id = login[0].id;
      const username = login[0].username;
      const role = login[0].role;
      const customerId = login[0].customerId;
      const accessToken = createToken(id, username, role, customerId);
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/** create token */
const createToken = (id, username, role, customerId) => {
  let token = jwt.sign(
    {
      id: id,
      username: username,
      role: role,
      customerId: customerId,
    },
    process.env.API_ACCESS_TOKEN,
    {
      expiresIn: "20s",
    },
  );
  return token;
};

const createRefreshToken = (id, username, role, customerId) => {
  let token =
    "Bearer " +
    jwt.sign(
      {
        id: id,
        username: username,
        role: role,
        customerId: customerId,
      },
      process.env.API_REFRESH_TOKEN,
      {
        expiresIn: "1d", //24h expired
      },
    );
  return token;
};
