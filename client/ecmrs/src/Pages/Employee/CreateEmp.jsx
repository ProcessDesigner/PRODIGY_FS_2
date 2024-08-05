import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createEmployee } from "../../Redux/Slices/empSlice"

const CreateEmp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [previewImage,setpreviewImage] =useState("")
    const [userInput,setuserInput] =useState(
        {
            fullName:"",
            description:"",
            email:"",
            phone:"",
            jobTitle:"",
            department:"",
            salary:"",
            image:""
        }
    )

    function handleImageUpload(e) {
        e.preventDefault()
        const uploadImage = e.target.files[0]
        if (uploadImage) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(uploadImage)
          fileReader.addEventListener('load', function() {
            const imageDataUrl = fileReader.result;
            setuserInput({
             ...userInput,
              image: uploadImage,
            })
            setpreviewImage(imageDataUrl); 
          })
        }
      }
    function handleInputChange(e) {
        const {name, value} = e.target;
        setuserInput({
            ...userInput,
            [name]: value
        })
    }
    async function onFormSubmit(e){
        e.preventDefault()
        if(!userInput.fullName||!userInput.email||!userInput.phone||!userInput.description||!userInput.image||!userInput.department||!userInput.salary||!userInput.image){
            toast.error('All fields are mandatory')
        }
        const response = await dispatch(createEmployee(userInput));
        if(response?.payload?.succcess){
            setuserInput({
                fullName:"",
                description:"",
                email:"",
                phone:"",
                jobTitle:"",
                department:"",
                salary:"",
                previewImage,
                image:""
            });
            navigate('/employee/')
        }
    }
   
        return (
            <div>
                <h1>Employee Information Form</h1>
                <form onSubmit={onFormSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={userInput.fullName} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={userInput.email} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={userInput.phone} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={userInput.description} onChange={handleInputChange} />
                </div>
                    <div>
                        <label htmlFor="image_uploads" className="cursor-pointer">
                            {previewImage? (
                            <img
                                className="w-full h-44 m-auto border"
                                src={previewImage}
                            />
                            ) : (
                            <div className="w-full h-44 m-auto flex items-center justify-center border">
                                <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                            </div>
                            )}
                        </label>
                        <input
                            className="hidden"
                            type="file"
                            id="image_uploads"
                            accept=".jpg,.jpeg,.png"
                            name="image_uploads"
                            onChange={handleImageUpload}
                        />
                    </div>
                <div>
                    <label>Department:</label>
                    <select name="department" value={userInput.department} onChange={handleInputChange}>
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="IT">IT</option>
                    </select>
                </div>
                <div>
                    <label>Salary:</label>
                    <input type="number" name="salary" value={userInput.salary} onChange={handleInputChange} />
                </div>
                <button type="submit">Submit</button>
                </form>
            </div>
    )

  
}

export default CreateEmp