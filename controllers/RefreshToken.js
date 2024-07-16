import Logins from "../models/LoginsModel.js";
import jwt from "jsonwebtoken";

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
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
