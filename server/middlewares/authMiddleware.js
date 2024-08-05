import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken"

const isLoggedIn = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) {
        return next(new AppError('User not Authorised',500));
        
    }
    const userDetails = await jwt.verify('BPYG2uaGqbm2od3ZbYVPqHc/+WZ5X32OL8XP0hXEI58=');

    req.user = userDetails;
    next()
}

const authorisedRoles = (...roles) => async(req,res,next) =>{
    const currentUserRoles = req.user.role;
    if(roles.includes(currentUserRoles)){
        return next(new AppError('You are not allowed to access the routes',500));
    }
    next()
}

export {
    isLoggedIn,
    authorisedRoles
}