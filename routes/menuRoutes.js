const express=require('express')
const router=express.Router();
const MenuItem=require('../models/MenuItem');
//comment
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newmenu=new MenuItem(data);
        const response= await newmenu.save();
        console.log('data saved successfully!!');
        res.status(200).json(response);
    }
    catch(err){
        console.log('data not saved!');
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/',async(req,res)=>{
    try{
        const data =await MenuItem.find();
        console.log('data fetched!!');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/:taste',async(req,res)=>{
    try{
        const taste=req.params.taste;
        if(taste=='spicy'||taste=='sour'||taste=='sweet'){
            const data=await MenuItem.find({taste:taste});
            console.log("data fetched");
            res.status(200).json(data);
        }
        else{
            res.status(400).json({error:'Invalid taste type'});
        }
    }
    catch(err){
        console.log('data not fetched');
        res.status(500).json({error:'Internal server error'});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const response=await MenuItem.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:'menu item not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const person_id=req.params.id;
        const response=await MenuItem.findByIdAndDelete(person_id);
        if(!response){
            return res.status(404).json({error:'menu item not found'});
        }
        console.log('data deleted');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});
module.exports=router;