import {Schema, model} from "mongoose"

const EmployeeSchema = new Schema({
    
    fullName:{
        required:true,
        type:String,
    },
    description:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
    },
    phone:{
        required:true,
        type:String,

    },
    // jobTitle:{
    //     required:true,
    //     type:String,
    // },
    department:{
        required:true,
        type:String,
    },
    hireDate:{
        required:true,
        type:Date,
        default:Date.now()
    },
    salary:{
        required:true,
        type:Number
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        secure_url:{
            type:String,
            required:true
        }
    },

},{
    timestamps:true,
})

const Employee = model('Employee',EmployeeSchema)

export default Employee;