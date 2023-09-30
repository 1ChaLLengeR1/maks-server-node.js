const expres = require("express");
const router = expres.Router();
const jwt = require('jsonwebtoken')
const { jwtTokens } = require('./jwt-helper.js')

router.post("/", (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if(refreshToken === null){
        return res.status(400).send({error:'Brak refreshToken!'})
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if(err){
            return res.status(400).send({error:'Błąd przy walidacji refreshTokenu!'});
        }
        let tokens = jwtTokens(user)
        res.status(200).send({Tokens: tokens})
    })
  } catch (error) {
    res.status(400).send({ error: "Wyrzuciło serwer w refreshToken!" });
  }
});


module.exports = router;
