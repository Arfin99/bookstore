import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT;
export const mongo_uri = process.env.MONGO_URI;
export const jwtsecret = process.env.JWT_SECRET;
export const salt_work_factor = process.env.SALT_WORK_FACTOR;