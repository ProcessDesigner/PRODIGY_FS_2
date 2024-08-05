import {useDispatch, useSelector} from 'react-redux'
import { getAllEmployee } from '../../Redux/Slices/empSlice';
import { useEffect } from 'react';
import Empcard from './Empcard';
const EmpList = () => {
  const dispatch = useDispatch()
  const {empData} = useSelector((state)=>state.emp);

  async function loadEmployees(){
    await dispatch(getAllEmployee());
  }

  useEffect(()=>{
    loadEmployees()
  },[])

  return (
    
    <div>
        <h1>All Employees</h1>
        <div>
        {empData && empData.length > 0 ? (
          empData.map((e) => (
            <Empcard key={e._id} data={e} />
          ))
        ) : (
          <p>No employees found</p>
        )}
      </div>  
    </div>
  )
}

export default EmpList