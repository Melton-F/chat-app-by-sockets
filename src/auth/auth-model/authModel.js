import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    userName: {
        type:String
    },
    fullName: {
        type:String
    },
    mail: {
        type:String,
        unique:true
    },
    Gender: {
        type:String
    },
    Date_Of_birth: {
        type:String
    },
    password:{ 
        type: String
    },
    OTpassword: {
        type: String
    }

}, {versionKey:false})

const AuthModel = mongoose.model("AuthUser", AuthSchema)


module.exports = AuthModel