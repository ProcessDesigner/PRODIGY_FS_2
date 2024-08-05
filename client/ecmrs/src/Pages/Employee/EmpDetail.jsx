import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

const EmpDetail = () => {
  const {state} = useLocation();
  const navigate  = useNavigate();


  
  const {role,data} = useSelector((state)=>state.auth);

  return (
    <div>
        <div>
            <div>
                <div>
                    <img 
                        src={state?.image?.secure_url}
                        alt="image"
                    />
                    <div>
                        <div>
                            {state?.fullName}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmpDetail