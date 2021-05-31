const express = require('express');
const Profile = require('../schema/Profile');
const User = require('../schema/User');

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const router = express.Router()

dotenv.config({ path: "../config.env" })

router.post("/", (req, res) => {
    //console.log(req.body)
    const {id_User,avatar,name,intro,job,iconjob,post,follow,following,sex} = req.body

    if(!id_User||!avatar||!name)
    {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    User.findOne({_id:id_User}).then(async user => {
        if(!user)    return res.status(400).json({ msg: 'User not found' })
        await Profile.findOne({id_User:id_User}).then(profile=>{
            if(profile) return res.status(400).json({ msg: 'Profile exist' })
            const newProfile = new Profile({
                id_User,avatar,name,intro,job,iconjob,post,follow,following,sex
            })
            newProfile.save().then(profile=>{
                return res.status(200).json({ msg: 'Success',profile })
            }).catch(err=>{return res.status(400).json({ msg: 'Fail profile' })})
        })
    }).catch(err=>{return res.status(400).json({ msg: 'User not found' })})
})

router.get("/", async(req,res)=>{
    console.log(req.body.id_User)
    const profile=await Profile.find({"id_User":`${req.body.id_User}`}).sort({registration_data:-1}).limit(1).catch(error=>{
        return res.status(400).json({ msg: 'Dont connect or error user' })
    })
    if(!profile)
    {
        return res.status(400).json({ msg: 'Dont connect or error user' })
    }
    return res.status(200).json({profile})
})

router.post("/updateprofile",async(req,res)=>{
    const {id_User,avatar,name,sex,intro,job,iconjob,post,following}=req.body
    if(!id_User)
    {
        return res.status(400).json({ msg: 'Dont have id user' })
    }
    const profile= await Profile.updateOne({id_User:id_User},{$set:{
        "avatar":avatar,
        "name":name,
        "sex":sex,
        "intro":intro,
        "job":job,
        "iconjob":iconjob,
        "post":post,
        "following":following,
    }}).catch(error=>{
        return res.status(400).json({ msg: 'Dont update profile user' })
    })
    if(!profile.nModified)
        return res.status(400).json({ msg: 'Dont update profile user' })
    return res.status(200).json({msg: 'Update success'})
})

// vấn đề like tăng follow đồng bộ
router.post("/updatefollow/follow",async(req,res)=>{
    const id_User=req.body.id_User
    if(!id_User)
    {
        return res.status(400).json({ msg: 'Dont have id user' })
    }
    await Profile.findOne({id_User:id_User}).then(async(profile)=>{
            await Profile.updateOne({id_User:id_User},{$set:{
                "follow":profile.follow+1
                    }}).catch(error=>{
                        return res.status(400).json({ msg: 'Dont follow' })
                    })
    }).catch(error=>{
        return res.status(400).json({ msg: 'Dont follow' })
    })
    return res.status(200).json({msg: 'Success'})
})
router.post("/updatefollow/unfollow",async(req,res)=>{
    const id_User=req.body.id_User
    if(!id_User)
    {
        return res.status(400).json({ msg: 'Dont have id user' })
    }
    await Profile.findOne({id_User:id_User}).then(async(profile)=>{
            if(profile.follow<=0)
            {
                return res.status(400).json({ msg: 'Dont unfollow' })
            }
            await Profile.updateOne({id_User:id_User},{$set:{
                "follow":profile.follow-1
                    }}).catch(error=>{
                        return res.status(400).json({ msg: 'Dont unfollow' })
                    })
    }).catch(error=>{
        return res.status(400).json({ msg: 'Dont unfollow' })
    })
    return res.status(200).json({msg: 'Success'})
})
module.exports = router;
