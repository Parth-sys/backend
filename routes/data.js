const express=require('express')
const router=express.Router();
const {getmdata,getCdata} =require('../helper')


router.get('/mobile' ,async(req,res)=>{
try {
    const data= await getmdata();
    res.send(data)
     
    
} catch (error) {
    console.log(error)
}

})

router.get('/cloth' ,async(req,res)=>{
    try {
        const data= await getCdata();
        res.status(200).send(data)
         
        
    } catch (error) {
        console.log(error)
    }
    
    })

module.exports=router