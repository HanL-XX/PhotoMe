const express = require('express');
const Newfeed = require('../schema/Newfeed');
const User = require('../schema/User');

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const router = express.Router()

dotenv.config({ path: "../config.env" })

router.post("/",async(req,res)=>{
    const {id_User,status,image} = req.body

    if(!id_User||!image)
    {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    User.findOne({_id:id_User}).then(user => {
       if(!user)    return res.status(400).json({ msg: 'User not found' })
        const newNewfeed = new Newfeed({id_User,image,status})
        newNewfeed.save().then(newfeed=>{
        return res.status(200).json({ msg: 'Success',newfeed })
        })
    }).catch(err=>{return res.status(400).json({ msg: 'User not found' })})
})

router.get("/",async(req,res)=>{
    const id_User=req.body.id_User
    await Newfeed.find({id_User:id_User}).then(newfeed => {
        if(!newfeed)    
            return res.status(200).json({ msg: 'Dont have newfeed' })  
        return res.status(200).json({ msg: 'Success',newfeed }) 
    }).catch(error=>{return res.status(400).send(error)})
})

router.post("/updatenewfeed",async(req,res)=>{
    const {id,status,image} = req.body
    const newfeed= await Newfeed.updateOne({_id:id},{$set:{
        "status":status,
        "image":image,
    }}).catch(error=>{
        return res.status(400).json({ msg: 'Dont update newfeed user' })
    })
    if(!newfeed.nModified)
        return res.status(400).json({ msg: 'Dont update newfeed user',newfeed})
    return res.status(200).json({msg: 'Update success',newfeed})
})

router.post("/deletenewfeed",async(req,res)=>{
    const {id} = req.body
    const newfeed= await Newfeed.deleteOne({"_id":id}).catch(error=>{
        return res.status(400).json({ msg: 'Dont delete newfeed user' })
    })
    if(!newfeed.deletedCount)
        return res.status(400).json({ msg: 'Dont delete newfeed user',newfeed})
    return res.status(200).json({msg: 'Delete success',newfeed})
})

module.exports = router;
