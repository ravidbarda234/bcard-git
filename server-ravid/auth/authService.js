const { verifyToken } = require("./Providers/jwt");
require("dotenv").config();

const tokenGenerator = process.env.TOKEN_GENERATOR;

const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient)
        return res.status(400).send("Authentication Error: Please Login");

      const userInfo = verifyToken(tokenFromClient);
      if (!userInfo)
        return res.status(400).send("Authentication Error: Unauthorize user");
      req.user = userInfo;
      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

module.exports = auth;
