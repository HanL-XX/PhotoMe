const express = require('express');
const Liked = require('../schema/Liked');
const Newfeed = require('../schema/Newfeed');
const User = require('../schema/User');

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const router = express.Router()

dotenv.config({ path: "../config.env" })

router.post("/",async(req,res)=>{
    const {id_User,id_Newfeed} = req.body

    if(!id_User||!id_Newfeed)
    {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    await User.findOne({_id:id_User}).then( async user => {
        if(!user)    return res.status(400).json({ msg: 'User not found' })
        await Newfeed.findOne({_id:id_Newfeed}).then(async newfeed=>{
            if(!newfeed) return res.status(400).json({ msg: 'Newfeed not found' })
            await Liked.findOne({id_User:id_User,id_Newfeed:id_Newfeed}).then(liked=>{
                if(liked)
                    return res.status(200).json({ msg: 'Liked exist',liked })
                else{
                    const newLiked = new Liked({
                        id_User,id_Newfeed,liked:true,
                     })
                     newLiked.save().then(Liked=>{
                         return res.status(200).json({ msg: 'Success',Liked })
                     })
                }
            }).catch(err=>{return res.status(400).json({ msg: 'Liked not found' })})
        }).catch(err=>{return res.status(400).json({ msg: 'Liked not found' })})
    }).catch(err=>{return res.status(400).json({ msg: 'Liked not found' })})
})

router.get("/",async(req,res)=>{
    const {id_User,id_Newfeed} = req.body

    if(!id_User||!id_Newfeed)
    {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    await Liked.findOne({id_User:id_User,id_Newfeed:id_Newfeed}).then(liked=>{
        if(!liked) return res.status(400).json({ msg: 'Liked not found' })
        return res.status(200).json({ msg: 'Get liked',liked })
    })
})

router.post("/updateliked",async(req,res)=>{
    const {id_User,id_Newfeed} = req.body

    if(!id_User||!id_Newfeed)
    {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    await Liked.findOne({id_User:id_User,id_Newfeed:id_Newfeed}).then( async liked=>{
        const likedse=await Liked.updateOne({id_User:id_User,id_Newfeed:id_Newfeed},{$set:{
            "liked":!liked.liked,
        }}).catch(error=>{
            return res.status(400).json({ msg: 'Dont update liked user' })
        })
        if(!likedse.nModified)
            return res.status(400).json({ msg: 'Dont update liked user',likedse})
        return res.status(200).json({msg: 'Update success',likedse})
    }).catch(error=>{
        return res.status(400).json({ msg: 'Dont update liked user' })
    })
})

router.post("/deleteliked",async(req,res)=>{
    const {id_User,id_Newfeed} = req.body

    if(!id_User||!id_Newfeed)
    {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    await Liked.findOne({id_User:id_User,id_Newfeed:id_Newfeed}).then( async liked=>{
        const likedse=await Liked.deleteOne({id_User:id_User,id_Newfeed:id_Newfeed}).catch(error=>{
            return res.status(400).json({ msg: 'Dont delete liked user' })
        })
        if(!likedse.deletedCount)
            return res.status(400).json({ msg: 'Dont delete liked user',likedse})
        return res.status(200).json({msg: 'Delete success',likedse})
    }).catch(error=>{
        return res.status(400).json({ msg: 'Dont delete liked user' })
    })
})
module.exports = router;
