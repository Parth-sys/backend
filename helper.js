const User=require('./Models/User')
const dotenv=require('dotenv')
const bcrypt=require('bcrypt')
const mobile=require('./Models/mobile.js')
const Clothes=require('./Models/Clothdata.js')
const jwt=require('jsonwebtoken');
const client = require('./redis');
const {sendmail} = require('./sendmail')
const mongoose=require('mongoose')
const VerifyUser=require('./Models/Verifyuser')

dotenv.config()



async function getmdata(){
    try {
        const data=await mobile.find()
        return data
    } catch (error) {
        console.log(error)
    }


}

async function getCdata(){
    try {
        const data=await  Clothes.find();
        return data
    } catch (error) {
        console.log(error)
    }


}





const checkuser=async(email)=>{
try {
    const user= await User.findOne({email:email});
    console.log(user)
    if(user){
        return true;
    }
    return false;

} catch (error) {
    return "server busy"
}


}

async function AuthenticateUser(email ,password){
    try {
        const usercheck=await User.findOne({email:email});
        console.log(usercheck)

        const validate=await bcrypt.compare(password,usercheck.password)

        if(validate){
            const token=jwt.sign({email},process.env.SECRETKEY_LOGIN)
            const response={
                id:usercheck._id,
                name:usercheck.name,
                email:usercheck.email,
                token:token,
                status:true
            }
        
            await client.set(`key-${email}`,Json.stringify(response))
            await User.findOneAndUpdate({email:usercheck.email},{$set:{token:token}})
            return response;
        }
        return "Invalid email or password"
    } catch (error) {
        console.log(error)
    }

}

async function Authorizeuser(token){
    try{

        const decodetoken=jwt.verify(token,process.env.SECRETKEY_LOGIN)
        if(decodetoken){
            const email=decodetoken.email;
            const auth=await client.get(`key-${email}`)
          if(auth){
            const data=Json.parse(auth);
            return data
          }else{
            const data=await User.findOne({email:email})
            return data
          }


        }
        return false
    }

    catch(e){
        console.log(e)
    }
}

async function InsertverifyUser(name, email, password) {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const token = genrateToken(email);

        const newuser = new VerifyUser({
            name: name,
            email: email,
            password: hashPassword,
            token: token
        })


        const activationLink = `http://localhost:4000/signup/${token}`;

        const content = `
         <h4>hi there,</h4>
            <h5>Welcome</h5>
             <p>  Thank you for signin please click below link for activation</p>
              <a  href="${activationLink}"> Click here</a>
                <p>Thank you</p> 
                 ` 
        await newuser.save();

        sendmail(email, "Verifyuser", content)
    }
    catch (error) {
     console.log(Error)
    }

}


function genrateToken(email) {

    const token = jwt.sign(email, process.env.SECRETKEY_SIGNUP)
    return token
}

async function InsertSigupUser(token){
   console.log(token)

    try{

    
        
        const userVerify=await VerifyUser.findOne({token:token})
        console.log(userVerify)
        if(userVerify){
            
            const newUser=new User({
                name:userVerify.name,
                email:userVerify.email,
                password:userVerify.password,
                token:userVerify.token,
                forgetpassword:{}
            })
            await newUser.save();
            await userVerify.deleteOne({token:token})
            const content = `
            <h4>hi there,</h4>
            <h5>Welcome</h5>
            <p> You are successfully registerd</p>
            <p>Thank you</p>    `
            
            sendmail(newUser.email,"Registration Success",content)  
            
            return `<html>
            <body>
            <h4>hi there,</h4>
            <h5>Link expired</h5>
            <p> </p>
            <p>Thank you</p> 
            </body> 
            <html>  `;
        }
    }
     catch(error){
            console.log(error)

         return `
          <html>
          <body>
         <h4>Registration failed</h4>
          <p>Thank you</p>
             </body>    
         </html>`;
        }    
    }


   





module.exports={checkuser,AuthenticateUser,Authorizeuser,getmdata,getCdata,InsertSigupUser,InsertverifyUser};