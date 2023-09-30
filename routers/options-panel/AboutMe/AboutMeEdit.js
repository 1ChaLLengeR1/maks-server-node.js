const expres = require('express');
const router = expres.Router();
const pool = require('../../../database.js')

router.post('/', async (req, res, next)=>{
    for(const key of req.body){
        try{
           await pool.query(`UPDATE AboutMe SET information = '${key.information}' WHERE id = '${key.id}'`) 
        }catch(e){
            res.status(400).send({error:'Wyrzuciło błąd przy edytowania, id: ' + key.id})
        }
    }
    res.status(200).send({succes:'Poprawnie z edytowano AboutMe!'})
})



module.exports = router;