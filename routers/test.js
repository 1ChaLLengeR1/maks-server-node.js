const expres = require('express');
const router = expres.Router();


router.get('/', (req, res, next)=>{
    console.log('Test router')
    res.send('Testowy router!')
})


module.exports = router;