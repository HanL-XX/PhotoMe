const express = require('express');
const Newfeed = require('../schema/Newfeed');
const User = require('../schema/User');
const Profile=require('../schema/Profile')
const Comment=require('../schema/Comment')
const Liked=require('../schema/Liked')

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
    await User.findOne({_id:id_User}).then(async user => {
        if(!user)    return res.status(400).json({ msg: 'User not found' })
        const newNewfeed = new Newfeed({id_User,image,status})
        newNewfeed.save().then(async newfeed=>{
            await Profile.findOne({id_User:id_User}).then(async pfile=>{
                await Profile.updateOne({_id:pfile.id},{$set:{
                    "post":pfile.post+1,
                }})
                .then(()=>{
                    return res.status(200).json({ msg: 'Success' })
                })
                .catch(async er=>{
                    await Newfeed.deleteOne({_id:newfeed.id})
                    .then(()=>{
                        return res.status(400).json({ msg: 'Dont post newfeed' })
                    })
                    .catch(error=>{
                        return res.status(400).json({ msg: 'Post newfeed but dont up post user' })
                    })
                })
            }).catch(async er=>{
                await Newfeed.deleteOne({_id:id})
                .then(()=>{
                    return res.status(200).json({ msg: 'Post newfeed but dont up post user'  })
                })
                .catch(error=>{
                    return res.status(400).json({ msg: 'Post newfeed but dont up post user' })
                })
            })
            return res.status(200).json({ msg: 'Success',newfeed })
        })
    }).catch(err=>{return res.status(400).json({ msg: 'User not found' })})
})

router.get("/",async(req,res)=>{
    const id_User=req.body.id_User
    await Newfeed.findOne({id_User:id_User}).then(newfeed => {
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
    let id_User
    await Newfeed.findOne({_id:id}).then(newfeed=>{
        id_User=newfeed.id_User
    }).catch(er=>{
        return res.status(400).json({ msg: 'Dont find newfeed' })
    })
    const newfeed= await Newfeed.deleteOne({_id:id}).catch(error=>{
        return res.status(400).json({ msg: 'Dont delete newfeed user' })
    })
    await Comment.deleteMany({id_Newfeed:id})
    await Liked.deleteMany({id_Newfeed:id})
    if(!newfeed.deletedCount)
        return res.status(400).json({ msg: 'Dont delete newfeed user',newfeed})
    else
    {
        await Profile.findOne({id_User:id_User}).then(async pfile=>{
            await Profile.updateOne({_id:pfile.id},{$set:{
                "post":pfile.post-1,
            }}).catch(er=>{
                return res.status(400).json({ msg: 'Newfeed delete but dont up post user' })
            })
        }).catch( er=>{
            return res.status(400).json({ msg: 'Newfeed delete but dont up post user' })
        })
    }
    return res.status(200).json({msg: 'Delete success',newfeed})
})

module.exports = router;
