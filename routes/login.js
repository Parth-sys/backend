const express = require('express');
const { AuthenticateUser } = require('../helper');
const router = express.Router()
const client = require('../redis')


client.connect().then(() => {
    console.log("connected to redis")
}).catch((e) => {
    console.log(e)
})





router.post('/', async(req, res) => {
    const { email,password} = req.body

    var loginCredentials = await AuthenticateUser(email,password)

    console.log(loginCredentials);
  
    if (loginCredentials == "Invalid email or password") {
        
        res.status(200).send("Inavalid email or password")
    }
    else if (loginCredentials == "server busy") {
        res.status(200).send("server busy")

    }
    else {
            res.status(200).json({loginCredentials})
    }
});


module.exports = router