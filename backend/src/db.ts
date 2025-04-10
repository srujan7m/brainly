import mongoose,{ model, Schema}  from "mongoose"; 
import { MONGO_URL } from "./config";

mongoose.connect(`${MONGO_URL}`)

const Userschema = new Schema({
    username : {type: String, unique: true, required:true},
    password : {type: String, required:true}
})

export const UserModel = model("User", Userschema)


const Contentschema = new Schema ({
    title:{type:String},
    link:{type:String},
    tags:[{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    type:String,
    userId:{ type:mongoose.Schema.Types.ObjectId, required : true, ref:'User'}
})


export const ContentModel = model("Content", Contentschema)

const Linkschema = new Schema ({
    hash:{type:String},
    userId: {type:mongoose.Schema.Types.ObjectId, required : true, ref:'User', unique: true}
})

export const LinkModel = model("Link", Linkschema)