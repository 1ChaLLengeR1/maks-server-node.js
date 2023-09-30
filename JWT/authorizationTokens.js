const jwt = require("jsonwebtoken");

const authentificationTokens = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(400).send({ error: "Brak tokenu!" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(400)
        .send({ error: "Bład podczas weryfikacji tokenu!" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authentificationTokens };
