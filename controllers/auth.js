import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { jwtsecret } from "../utils/environment_prop_access.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).send("Invalid Email or Password");
    }

    const jwtPaylod = { _id: user._id, name: user.name, role: user.role };
    const token = jwt.sign(jwtPaylod, jwtsecret, {
      algorithm: "HS256",
      expiresIn: "2d",
    });

    res.send(token);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
