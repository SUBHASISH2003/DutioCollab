import React, { useState } from 'react'
import axios from '../../config/axiosConfig.jsx'
import MainNav from '../../Components/NavBar/MainNav.jsx'

const EmpDashMain = () => {

  // const [User, setUser] = useState(null)
  // axios.get('/api/user/me')
  // .then((res)=>{
  //   setUser(res.data.user);
  // })
  // .catch((error)=>{
  //   console.log(error);
  // })
  return (
    <div>
      <MainNav/>
    </div>
  )
}

export default EmpDashMain