const expres = require('express');
const router = expres.Router();
const pool = require('../../../database.js')

router.get('/', async (req,res,next)=>{
    try {
        const item = await pool.query('SELECT * FROM AboutMe');
        return res.status(200).send(item.rows)
    } catch (error) {
        res.status(400).send({error:'Brak danych w tabeli'})
    }
    
});


module.exports = router;