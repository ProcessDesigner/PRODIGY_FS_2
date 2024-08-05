import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import EmpList from './Pages/Employee/EmpList'
import CreateEmp from './Pages/Employee/CreateEmp'
import EmpDesc from './Pages/Employee/EmpDesc'
import EmpUpdate from './Pages/Employee/EmpUpdate'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path = '/employee' element = {<EmpList/>} />
        <Route path = '/employee/create' element = {<CreateEmp/>} />
        <Route path='/employee/description/:id' element = {<EmpDesc />} />
        <Route path='/employee/update/:id' element = {<EmpUpdate />} />
      </Routes>
    </>
  )
}

export default App
