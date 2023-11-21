const express=require('express')
const router=express.Router();
const {insertOrder,getOrderdata}=require('../helper')

router.post('/',async(req,res)=>{
try {
    const{ name,
        image,
        quantity,
        Price,
        varient}=req.body;

    console.log(name,varient,Price)
    const r=await insertOrder(name,varient,Price,image,quantity);
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
