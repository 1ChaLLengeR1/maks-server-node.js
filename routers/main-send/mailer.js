const nodeMailer = require('nodemailer');
const expres = require('express');
const router = expres.Router();

router.post('/',(req,res,next)=>{
    const {name, mail, text} = req.body;
    // console.log(name, mail, text)
    const transporter = nodeMailer.createTransport({
        service: '',
        auth:{
            user: '',
            pass: ''
        }
    })
    
    const mailOptions = {
        from: '',
        to: '',
        subject:'Aqen Design - imię wysyłającego: ' + name,
        html:`<h2>E-mail urzytkownika: ${mail}</h2><p>${text}</p>`
    }

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            res.status(400).json({error:'Nie wysłano maila!'})
        }else{
            res.status(200).json({success:'Wysłano wiadomość poprawnie!'})
        }
    })    
})

module.exports = router;

