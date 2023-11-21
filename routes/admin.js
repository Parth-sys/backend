const express=require('express')
const router=express.Router();
const {insertMproduct}=require('../helper')

router.post('/mobile',async(req,res)=>{
try {
    const{name,varients,Prices,Category,image,description}=req.body;
    console.log(name,varients,Prices,Category)
    const r=await insertMproduct(name,varients,Prices,Category,image,description);
    res.send(r)
    
} catch (error) {
    console.log(error);
}
  

    
})













module.exports=router;
