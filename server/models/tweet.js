import mongoose, { Schema } from 'mongoose'
const tweetSchema =new mongoose.Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    },
},{timestamps:true});

const Tweet=mongoose.model("Tweet",tweetSchema);

export default Tweet;