const mongoose=require("mongoose")
const Schema=mongoose.Schema

const NewfeedSchema=new Schema({
    id_User:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: false,
    },
    image:{
        type: String,
        required: true,
    },
    like:{
        type: String,
        default:0,
    },
    comment:{
        type: String,
        default:0,
    },
    registration_data:{
        type:String,
        default:Date.now,
    }
})

module.exports=Newfeed=mongoose.model("newfeed",NewfeedSchema)