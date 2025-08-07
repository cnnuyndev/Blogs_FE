import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from '@/ui_components/Footer'
import { Outlet } from 'react-router-dom'
import {useState} from 'react'
import { ToastContainer } from 'react-toastify';
const AppLayout = ({isAuthenticated, username, setIsAuthenticated, setUsername}) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark') === 'true' || false);
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    localStorage.setItem('dark', !darkMode);}

  useEffect(() => {
    if(localStorage.getItem('dark') === 'null') {
      localStorage.setItem('dark', false);
    }
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className='w-full min-h-screen dark:bg-[#181A2A] bg-white'>
        <NavBar darkMode={darkMode} 
          handleDarkMode={toggleDarkMode} 
          isAuthenticated = {isAuthenticated} 
          username = {username}  
          setIsAuthenticated={setIsAuthenticated}
          setUsername={setUsername}
        />
        <Outlet />
        <ToastContainer/>
        <Footer />
      </main>
    </div>
  )
}

export default AppLayout  