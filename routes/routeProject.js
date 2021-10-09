const {Router}=require('express');
const route=Router();

//routes
route.get('/',(req,res)=>{
    res.render('index');
})

route.post('/form',(req,res)=>{
    console.log(req.file);
    res.render('reply');
})

module.exports=route;