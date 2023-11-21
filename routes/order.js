const express=require('express')
const router=express.Router();
const {insertOrder,getOrderdata}=require('../helper')

router.post('/',async(req,res)=>{
try {
    const{name,varients,Price,Category,image,quantity}=req.body;

    console.log(name,varients,Price,Category)
    const r=await insertOrder(name,varients,Price,Category,image,quantity);
    res.send(r)
    
} catch (error) {
    console.log(error);
}
  
})


router.get('/',async(req,res)=>{
    try {
        
        const r=await getOrderdata()
        res.send(r)
        
    } catch (error) {
        console.log(error);
    }
      
    
})







module.exports=router;
