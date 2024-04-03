export const admin_auth = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (!["admin"].includes(role)) {
      return res.status(401).send("Unauthorized - Not Access Permitted");
    }
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};

export default admin_auth;
