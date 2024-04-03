import jwt from "jsonwebtoken";
import { jwtsecret } from "../utils/environment_prop_access.js";

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).send("Unauthorized - Token Not Found");
  }

  const token = authorization.split(" ")[1];

  try {
    const user = jwt.verify(token, jwtsecret);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};

export default auth;