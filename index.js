const express=require('express');
const connectDB=require('./Connection.js');
const cors=require('cors')
var signupRouter=require('./routes/Signup.js')
var loginRouter=require('./routes/login.js')
var dataRouter=require('./routes/data.js')

const app=express();
const Port=4000;
connectDB();

app.use(express.json());
app.use(cors())


app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/data',dataRouter)


app.get('/',(req,res)=>{
res.json({
  message:"welcome to backend"
})

})

app.listen(Port,(req,res)=>{
    console.log("server running on ",Port)
} )