import User from "../config/model/user.model.js";
import AppError from "../utils/AppError.js";
import cloudinary from 'cloudinary'

const cookieOption = {
    maxAge:7*24*24*1000,
    httpOnly:true,
    secure:true
}

const register = async(req,res,next)=>{
    try {
        
        const {fullName,email,password,number} = req.body;
    
        if(!fullName||!email||!password||!number){
            return next(new AppError('all fields are required',500))
        }
        const userExists = await User.findOne({email})
        if(userExists){
            return next(new AppError('try again',500))
        }
        const user = await User.create({
            fullName,
            email,
            password,
            number,
            avatar:{
                public_id:email,
                secure_url:'cloudinary://916367985651227:kWEPTClb0C0UOAsICG1sGTrg7qE@deafm48ba'
            }
        })
        
        if(!user){
            return next(new AppError('user not created',500))
        }

        if(req.file){
            try {
                
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder:'SERVER'
                })
                if(result){
                    user.public_id = result.public_id
                    user.secure_url = result.secure_url
                }
            } catch (error) {
                return next(new AppError(error.message,500))
            }
        }
    
        await user.save()
        user.password = undefined;
        
        const token = await user.generateJWTToken()
        res.cookie('token',token,cookieOption)
        return res.status(200).json({
            success:true,
            message:'user registered succesfully',
            user
        })
    } catch (error) {
        return next(new AppError(error.message,500))
    }
}
const login = async(req,res,next)=>{
    try {
        
        const {email,password} = req.body;
    
        if(!email||!password){
            return next(new AppError('all fields are required',503))
        }
        const user = await User.findOne({email}).select('+password')
        if(!user && !user.comparePassword){
            return next(new AppError('user not found ',501))
        }
    
        const token = user.generateJWTToken()
        res.cookie('token',token,cookieOption)
    
        return res.status(200).json({
            success:true,
            message:'user logged in succesfully',
            user
        })
    } catch (error) {
        return next(new AppError(error.message,502))
    }
}

const logout = async(req,res,next)=>{
    res.cookie('token',null,{
        httpOnly:true,
        secure:true,
        maxAge:0
    })

    res.status(200).json({
        success:true,
        message:'user logged out succesfully'
    })
}
const myprofile = async(req,res,next)=>{
    const {id} = req.user.id;

    const user =await User.findById(id)
    if(!user){
        return next(new AppError('user not found',500));
    }

    return res.status(200).json({
        success:true,
        message:'user profile',
        user
    })
}

export {
    register,
    login,
    logout,
    myprofile
}