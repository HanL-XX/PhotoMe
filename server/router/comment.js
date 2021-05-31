const express = require('express');
const Comment = require('../schema/Comment');
const Newfeed = require('../schema/Newfeed');
const User = require('../schema/User');

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const router = express.Router()

dotenv.config({ path: "../config.env" })

router.post("/",async(req,res)=>{
    const {id_User,id_Newfeed,comment} = req.body

    if(!id_User||!id_Newfeed||!comment)
    {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    await User.findOne({_id:id_User}).then( async user => {
        if(!user)    return res.status(400).json({ msg: 'User not found' })
        await Newfeed.findOne({_id:id_Newfeed}).then(newfeed=>{
            if(!newfeed) return res.status(400).json({ msg: 'Newfeed not found' })
            const newComment = new Comment({
                id_User,id_Newfeed,comment,
             })
             newComment.save().then(Comment=>{
                 return res.status(200).json({ msg: 'Success',Comment })
             }).catch(err=>{return res.status(400).json({ msg: 'Comment not found' })})
        }).catch(err=>{return res.status(400).json({ msg: 'Comment not found' })})
    }).catch(err=>{return res.status(400).json({ msg: 'Comment not found' })})
})

router.get("/",async(req,res)=>{
    const {id_Newfeed} = req.body

    if(!id_Newfeed)
    {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    await Comment.find({"id_Newfeed":`${id_Newfeed}`}).sort({registration_data:-1}).then(comment=>{
        if(!comment)
            return res.status(200).json({ msg: 'Comment dont have',comment })
        return res.status(200).json({ msg: 'Comment show',comment })
    }).catch(error=>{
        return res.status(400).send(error)
    })
})

router.post("/deletecomment",async(req,res)=>{
    const {id_User,id_Newfeed,comment} = req.body

    if(!id_User||!id_Newfeed||!comment)
    {
        return res.status(400).json({ msg: 'Dont have enough properties' })
    }
    const commented =await Comment.deleteOne({id_User:id_User,id_Newfeed:id_Newfeed,comment:comment}).catch(error=>{
        return res.status(400).json({ msg: 'Dont delete comment user' })
    })
    if(!commented.deletedCount)
        return res.status(400).json({ msg: 'Dont delete comment user',commented})
    return res.status(200).json({msg: 'Delete success',commented})
})
module.exports = router;
