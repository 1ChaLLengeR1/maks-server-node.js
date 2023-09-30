const jwt = require("jsonwebtoken");

function jwtTokens({ user_id, user_login }) {
  const user = { user_id, user_login };
  const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });

  return { accesToken, refreshToken };
}

module.exports = { jwtTokens };
