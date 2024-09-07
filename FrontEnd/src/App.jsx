import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'
import { Error } from './pages/Error'
import { Logout } from './pages/Logout'
import { AdminLayout } from './components/layouts/admin-layout'
import { AdminUsers } from './pages/Admin-Users'
import { AdminContacts } from './pages/Admin-Contacts'
import { AdminUpdate } from './pages/Admin-Update'

function App() {
  return (
    <>
      <BrowserRouter>
      <ConditionalNavbar />
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<Error />} />
          
          <Route path="/admin" element={<AdminLayout />}>
              <Route path='users' element={<AdminUsers />} />
              <Route path='contacts' element={<AdminContacts />} />
              <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>
       </Routes>
      </BrowserRouter>
    </>
  )
}

function ConditionalNavbar() {
  const location = useLocation();
  
  // Define the paths where the Navbar should be shown
  const pathsWithNavbar = ['/', '/about', '/contact', '/register', '/login'];

  // Check if the current path is not in the defined paths
  if (!pathsWithNavbar.includes(location.pathname)) {
    return null; // Do not render Navbar
  }

  return <Navbar />; // Render Navbar for specified paths
}

export default App
