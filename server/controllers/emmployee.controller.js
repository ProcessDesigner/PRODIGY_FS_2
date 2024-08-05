import Employee from "../config/model/employee.model.js";
import ApiFeatures from "../middlewares/apiFeatures.js";
import AppError from "../utils/AppError.js";
import cloudinary from 'cloudinary'
const newEmployee= async(req,res,next) =>{
    const {fullName,email,phone,description,department,salary} = req.body;
    
    if(!fullName||!email||!phone||!description||!department||!salary){
        return next(new AppError('all fieds are required',505));
    }
    
    const employee =await Employee.create({
        fullName,
        email,
        phone,
        description,
        department,
        salary,
        image:{
            public_id:'dummy',
            secure_url:'dummy'
        }
    })
    if(!employee){
        return next(new AppError('try again',504))
    }

    if(req.file){
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'SERVER',
        })
        if(result){
            employee.image.public_id = result.public_id,
            employee.image.secure_url = result.secure_url
        }
    }

    await employee.save()

    return res.status(200).json({
        success:true,
        message:'employee created',
        employee,
    })

}
const getEmployee= async(req,res,next) =>{
    const id = req.params.id;
    const emp =await Employee.findById(id)
    if(!emp){
        return next(new AppError('emp not found',504))
    }
    return res.status(200).json({
        success:true,
        message:'Employee Details',
        emp
    })
}
const updateEmployee = async (req, res, next) => {
    const id = req.params.id;
    const emp = await Employee.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },
      {
        runValidators: true,
        new: true // <--- Add this option
      }
    );
  
    if (!emp) {
      return next(new AppError('employee not found', 504));
    }
  
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'SERVER'
      });
      if (result) {
        emp.image.public_id = result.public_id;
        emp.image.secure_url = result.secure_url;
      }
    }
  
    await emp.save();
  
    return res.status(200).json({
      success: true,
      message: 'emp updated',
      emp
    });
  };
const deleteEmployee= async(req,res,next) =>{
    const id = req.params.id
    const emp =await Employee.findByIdAndDelete(id)

    return res.status(200).json({
        success:true,
        message:'employee deleted',
    })
}
const getAllEmployees= async(req,res,next)=>{
    try {
        // const employees = await Employee.find()
        const apiFeatures = new ApiFeatures(Employee.find(),req.query)
            .search()
            .filter()
    
        let emp = await apiFeatures.query;
    
        return res.status(200).json({
            success:true,
            message:'All Employees',
            emp
        })
        
    } catch (error) {
        console.log(error)
        return next(new AppError(error.message,500))
    }
}
export {
    newEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees
}