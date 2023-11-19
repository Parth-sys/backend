const express = require('express');
const { checkuser } = require('../helper');
const { InsertverifyUser, InsertSigupUser } = require('../helper');
const router = express.Router();



router.get('/:token', async (req, res) => {
    try{
         
        const response=await InsertSigupUser(req.params.token);
        
        res.status(200).send(response)

    }

    catch(error){
        console.log(error)
        res.status(500).send(`
        <html>
        <body>
       <h4>Registration failed</h4>
        <p>Thank you</p>
           </body>    
       </html>`)
    }

})

router.post('/verify', async (req, res) => {
    try {
        const { name, email, password } = req.body
      
        const registerdCredentials = await checkuser(email);

        console.log(registerdCredentials)

        if (registerdCredentials == false) {
            await InsertverifyUser(name, email, password);
            res.status(200).send(true)
        }
        else if (registerdCredentials == true) {
            res.status(200).send(false)
        }
        else if (registerdCredentials === "server busy") {
            res.status(500).send("server busy")
        }
    } catch (error) {

    }

})


module.exports = router;