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
    const { id_User, name, intro, job, iconjob, post, follow, following, sex } = req.body
    let avatar
    // console.log(req.body)
    if (sex === 'female') {
        avatar = 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2FAvatarFemale.jpg?alt=media&token=b001d1df-e985-4192-a336-a241d6f90e21'
    }
    else {
        avatar = 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2FAvatarMale.jpg?alt=media&token=75ff7a76-0cef-4c37-9272-c506a116d0c6'
    }
    // console.log(avatar, sex)
    if (!id_User || !avatar || !name || !sex) {
        return res.status(400).json({ err: 'Dont have enough properties' })
    }
    User.findOne({ _id: id_User }).then(async user => {
        if (!user) return res.status(400).json({ msg: 'User not found' })
        await Profile.findOne({ id_User: id_User }).then(profile => {
            if (profile) return res.status(400).json({ msg: 'Profile exist' })

            const newProfile = new Profile({
                id_User, avatar, name, intro, job, iconjob, post, follow, following, sex
            })
            newProfile.save().then(profile => {
                return res.status(200).json({ msg: 'Success', profile })
            }).catch(err => { return res.status(400).json({ msg: 'Fail profile' }) })
        })
    }).catch(err => { return res.status(400).json({ msg: 'User not found' }) })
})

router.get("/", async (req, res) => {
    console.log(req.query.id_User)
    const profile = await Profile.findOne({ "id_User": `${req.query.id_User}` }).sort({ registration_data: -1 }).limit(1).catch(error => {
        return res.status(400).json({ msg: 'Dont connect or error user' })
    })
    if (!profile) {
        return res.status(400).json({ msg: 'Dont connect or error user' })
    }
    return res.status(200).json({ profile })
})

router.get("/name", async (req, res) => {
    const profile = await Profile.find().sort({ registration_data: -1 }).catch(error => {
        return res.status(400).json({ msg: 'Dont connect or error user' })
    })
    if (!profile) {
        return res.status(400).json({ msg: 'Dont connect or error user' })
    }
    return res.status(200).json({ profile })
})

router.post("/updateprofile", async (req, res) => {
    const { id_User, avatar, name, sex, intro, job, iconjob, post, following, birthday, follow } = req.body
    if (!id_User) {
        return res.status(400).json({ msg: 'Dont have id user' })
    }
    const profile = await Profile.updateOne({ id_User: id_User }, {
        $set: {
            "avatar": avatar,
            "name": name,
            "sex": sex,
            "intro": intro,
            "job": job,
            "iconjob": iconjob,
            // "post": post,
            // "following": following,
            // "follow": follow,
            "birthday": birthday,
        }
    }).catch(error => {
        return res.status(400).json({ msg: 'Dont update profile user' })
    })
    if (!profile.nModified)
        return res.status(400).json({ msg: 'Dont update profile user' })
    return res.status(200).json({ msg: 'Update success' })
})

// vấn đề like tăng follow đồng bộ
router.post("/updatefollow/follow", async (req, res) => {
    const id_User = req.body.id_User
    if (!id_User) {
        return res.status(400).json({ msg: 'Dont have id user' })
    }
    await Profile.findOne({ id_User: id_User }).then(async (profile) => {
        await Profile.updateOne({ id_User: id_User }, {
            $set: {
                "follow": profile.follow + 1
            }
        }).then(() => {
            return res.status(200).json({ msg: 'Success' })
        })
    }).catch(error => {
        return res.status(400).json({ msg: 'Dont follow' })
    })
})
router.post("/updatefollow/unfollow", async (req, res) => {
    const id_User = req.body.id_User
    if (!id_User) {
        return res.status(400).json({ msg: 'Dont have id user' })
    }
    await Profile.findOne({ id_User: id_User }).then(async (profile) => {
        if (profile.follow <= 0) {
            return res.status(400).json({ msg: 'Dont unfollow' })
        }
        await Profile.updateOne({ id_User: id_User }, {
            $set: {
                "follow": profile.follow - 1
            }
        })
            .then(() => {
                return res.status(200).json({ msg: 'Success' })
            })
    }).catch(error => {
        return res.status(400).json({ msg: 'Dont unfollow' })
    })
})
module.exports = router;