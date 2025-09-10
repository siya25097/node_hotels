const express=require('express')
const router=express.Router();
const Person=require('../models/person');

router.post('/',async(req,res)=>{   
    try{
        const data=req.body//body parser saves parsed data in req.body
        const newperson=new Person(data);
        const response=await newperson.save();

        console.log('data saved!!');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'server error'});
    }  
});



router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched!!');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/:work',async(req,res)=>{
    try{
        const work=req.params.work;
        
        if(work=='manager'||work=='chef'||work=='waiter'){
            const data=await Person.find({work:work});
            console.log('data fetched successfully!!');
            res.status(200).json(data);
        }
        else{
            res.status(400).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log('data not fetched');
        res.status(500).json({error:'Internal server error'});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const person_id=req.params.id;
        const data=req.body;
        const response=await Person.findByIdAndUpdate(person_id,data,{
            new:true, //return updated doc
            runValidators:true//check schema validation for updated data
        })
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const person_id=req.params.id;
        const response=await Person.findByIdAndDelete(person_id);
        if(!response){
             return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

module.exports=router;