import AuthUser from '../auth-model/authModel'
import cron from "node-cron";
import passwordGenerator from "./passwordGenerator"

exports.register = async(req, res)=>{
    try {
        let randomChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let strLength = 8;
        let randomPassword = '';
        for (let i=0; i<strLength; i++) {
            let randomNum = Math.floor(Math.random() * randomChars.length);
            randomPassword += randomChars.substring(randomNum,randomNum+1);
        }

        let user = await new AuthUser({
            userName:req.body.userName,
            fullName:req.body.fullName,
            mail:req.body.mail,
            Gender:req.body.Gender,
            Date_Of_birth:req.body.Date_Of_birth,
            password: randomPassword
        })
        user.save()

        res.status(201).json({
            message:"user signed up successfully, Here is your new password. kindly remember your new password",
            newPassword: user.password
        })
    } catch (error) {
        res.send(error)
    }
}


exports.showUsers = async (req, res)=>{
    try {
        const users = await AuthUser.find()
        if(users<1){
            return res.status(404).json({
                message:"data not found" 
            })
        }
        res.status(404).json({
            message:"all users",
            no_of_users:users.length,
            users:users
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


exports.validateUser = async (req, res)=>{
    const user = await AuthUser.findOne({mail:req.body.mail})
    console.log(user);
    if(user){
        return res.status(200).json({
            Alert:"User has already registered, Please Log in"
        })
    }
    else{
        return res.status(200).json({
            message:"New user...!, Please Register"
        })
    }
}


exports.login = async (req, res)=>{
    try {
        const user = await AuthUser.findOne({userName:req.body.userName})
        if(user){
            let userPaswrds = user.password
            if(userPaswrds === req.body.password){
                res.status(200).json({
                    status:"Success",
                    message:"Successfully logged in"
                })
            }
            else{
                return res.send("Invalid name or password, Please enter a valid name and password")
            }
        }
    } catch (error) {
        res.send(error.message)
    }
}

// exports.authPassword = async (req, res)=>{
//     try {
//         cron.schedule(" */1 * * * * ", ()=>{
//             passwordGenerator()
//         })
//         console.log(passwordGenerator());
//         let user = await AuthUser.findByIdAndUpdate(req.body.id, {OTpassword:passwordGenerator()}, {new:true})
//         res.status(200).json({
//             message:` ${user.password} :this is your authApp password, this will expire within one min, Kindly login within 1 min`
//         })
//     } catch (error) {
//         res.status(400).json({
//             error:error.message
//         })
//     }
// }