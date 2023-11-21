const express=require('express')
const router=express.Router();
const {insertMproduct,editMproduct}=require('../helper')
const mobile=require('../Models/mobile')


router.post('/mobile',async(req,res)=>{
try {
    const{name,varients,Prices,Category,image,description}=req.body;
   
    const r=await insertMproduct(name,varients,Prices,Category,image,description);
    res.send(r)
    
} catch (error) {
    console.log(error);
}
  

    
})



router.patch('/mobile/:name',async(req,res)=>{
    try {
        const{name1,varients1,Prices1,Category1,image1,description1}=req.body;
       
        const r=await editMproduct(name1,varients1,Prices1,Category1,image1,description1);
        res.send(r)
        
    } catch (error) {
        console.log(error);
    }
})
 

router.delete('/mobile/:name',async(req,res)=>{
        try {
            const{name}=req.body;
           
            const r=await mobile.deleteOne({name:name}) ;
            res.send(r)
            
        } catch (error) {
            console.log(error);
        }
        
    })













module.exports=router;
