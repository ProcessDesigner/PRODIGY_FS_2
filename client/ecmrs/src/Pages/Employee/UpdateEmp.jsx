import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee } from '../../Redux/Slices/empSlice';

const UpdateEmp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState('');
  const [userInput, setUserInput] = useState({
    fullName: '',
    description: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    salary: '',
    image: '',
  });

  const employee = useSelector((state) => state.emp.employee);

  useEffect(() => {
    if (employee) {
      setUserInput({
        fullName: employee.fullName,
        description: employee.description,
        email: employee.email,
        phone: employee.phone,
        jobTitle: employee.jobTitle,
        department: employee.department,
        salary: employee.salary,
        image: employee.image,
      });
      setPreviewImage(employee.image);
    }
  }, [employee]);

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener('load', function () {
        setUserInput({
          ...userInput,
          image: uploadImage,
        });
        setPreviewImage(uploadImage);
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.fullName ||
      !userInput.email ||
      !userInput.phone ||
      !userInput.description ||
      !userInput.image ||
      !userInput.department ||
      !userInput.salary
    ) {
      toast.error('All fields are mandatory');
    }
    const response = await dispatch(updateEmployee(id, userInput));
    if (response?.payload?.success) {
      setUserInput({
        fullName: '',
        description: '',
        email: '',
        phone: '',
        jobTitle: '',
        department: '',
        salary: '',
        image: '',
      });
      navigate('/emp');
    }
  }

  return (
    <div>
      <h1>Update Employee Information</h1>
      <form onSubmit={onFormSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={userInput.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInput.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={userInput.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={userInput.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-full h-44 m-auto border"
                src={previewImage}
              />
            ) : (
              <div className="w-full h-44 m-auto flex items-center justify-center border">
                <h1 className="font-bold text-lg">
                  Upload your employee image
                </h1>
              </div>
            )}
          </label>
          <input
            className="hidden"
            type="file"
            id="image_uploads"
            accept=".jpg, .jpeg, .png"
            name="image_uploads"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={userInput.department}
            onChange={handleInputChange}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="IT">IT</option>
          </select>
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={userInput.salary}
            onChange={handleInputChange}
          />
        </div>
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default UpdateEmp;