import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteEmployee, getEmployee } from "../../Redux/Slices/empSlice"

const EmpDesc = () => {
  const {id}= useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {empData} = useSelector(
    (state)=>state.emp
  )

  console.log("this is empData",empData)

  useEffect(()=>{
    dispatch(getEmployee(id))
  },[dispatch,id])

  const handleDelete = async () => {
    try {
      await dispatch(deleteEmployee(id));
      navigate("/employee");
    } catch (error) {
      console.error(error);
    }
  };

  
    return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Employee Details
              </h5>
              <button onClick={()=>navigate(`/employee/update/${empData?.emp?._id}`)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit
              </button>
              <button onClick={handleDelete} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Delete
              </button>
            </div>
            <div className="mb-5">
              <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {empData?.emp?.fullName}
              </p>
              <p className="text-gray-700 dark:text-gray-400">{empData?.emp?.email}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Department
                </p>
                <p className="text-gray-700 dark:text-gray-400">{empData?.emp?.department}</p>
              </div>
              {/* <div className="flex flex-col">
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Hire Date
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  {empData?.emp?.hireDate?.toLocaleDateString()}
                </p>
              </div> */}
              <div className="flex flex-col">
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Salary
                </p>
                <p className="text-gray-700 dark:text-gray-400">{empData?.emp?.salary}</p>
              </div>
            </div>
            <div className="mb-5">
              <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Description
              </p>
              <p className="text-gray-700 dark:text-gray-400">{empData?.emp?.description}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Phone
                </p>
                <p className="text-gray-700 dark:text-gray-400">{empData?.emp?.phone}</p>
              </div>
              <div className="flex flex-col">
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Image
                </p>
                <img
                  src={empData?.emp?.image?.secure_url}
                  alt="Employee Image"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div> 
            </div>
        </div>
    </div>
    )
}

export default EmpDesc