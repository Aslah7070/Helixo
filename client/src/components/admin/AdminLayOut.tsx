

import { Outlet } from 'react-router-dom'
import NavBar from '../navbar/NavBar'

const AdminLayout = () => {
  return (
    <div className=''>
      <NavBar/>
      <main >
        <Outlet /> 
      </main>
    </div>
  )
}

export default AdminLayout
