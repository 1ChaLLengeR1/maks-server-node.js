const expres = require('express');
const router = expres.Router();
const pool = require('../../database.js')
const bcrypt = require('bcrypt');
const { jwtTokens } = require('../../JWT/jwt-helper.js') 


router.post('/', async (req,res,next)=>{
    const {login, password} = req.body

    try{
        const users = await pool.query(`select * from urzytkownicy where login='${login}'`)
        if(users.rows.length===0){
            return res.status(400).send({error:'Login nieprawidłowy!'})
        }
        const validPassword = await bcrypt.compare(password, users.rows[0].password);
        if(!validPassword){
            return res.status(400).send({error:'Hasło nieprawidłowe!'})
        }

        let tokens = jwtTokens({user_id:users.rows[0].id, user_login:users.rows[0].login})
        res.status(200).send(tokens)

    }catch(e){
        res.status(400).send({error:'Wyrzuciło serwer w panelu logowania!'})
    }     
})



module.exports = router;