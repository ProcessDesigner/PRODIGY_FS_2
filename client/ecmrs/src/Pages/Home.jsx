import {  useNavigate } from "react-router-dom"
import { logout } from "../Redux/Slices/authsliice"
import { useDispatch } from "react-redux"

function Home(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleLogout(e){
        e.preventDefault()
    
    
        const res= await dispatch(logout())
        if(res?.payload?.success){
          navigate('/signup')
        }
      }
    return (
        <div className="flex justify-center">
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
            </div>
    )
}

export default Home;