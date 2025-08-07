import React from 'react'
import { NavLink } from 'react-router-dom'
import { Switch } from "@/components/ui/switch"
import { FaHamburger } from "react-icons/fa";
import { Link } from 'react-router-dom'
import ReponsiveNavBar from './ReponsiveNavBar';
import { useState } from 'react';

const NavBar = ({ darkMode, handleDarkMode, isAuthenticated, username, setIsAuthenticated, setUsername }) => {
  
  const [showNavBar, setShowNavBar] = useState(false);
  const logout=()=>{
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    setUsername(null);
  }
  return (
    <>
      <nav className="max-container py-6 flex items-center justify-between dark:bg-[#141624] dark:text-[#FFFFFF] 
                px-12 lg:px-24 xl:px-32  bg-[#F6F6F7]">
        <Link to="/" className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
          DevScribe
        </Link>
        <ul className="flex items-center  justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF] mr-6">
          {isAuthenticated ?(
            <>
              <li>
                <NavLink to={`/profile/${username}`} className={({ isActive }) => (isActive ? "active" : "")}>
                  Hi! {username}
                </NavLink>
              </li>
              <li onClick={logout} className="cursor-pointer">
                  Logout
              </li>
            </>
          ):(
            <>
            <li>
              <NavLink to='/signin' className={({ isActive }) => (isActive ? "active" : "")}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                Register
              </NavLink>
            </li>
            </>
          )}

          <li className='fonty-semibold'>
            <NavLink to='/createpost'className={({ isActive }) => (isActive ? "active" : "")}>
              Create Post
            </NavLink>
          </li>
          {/* <li>
            <Switch onCheckedChange={handleDarkMode} checked={darkMode} />
          </li> */}
        </ul>
        <Switch onCheckedChange={handleDarkMode} checked={darkMode}/>
        <FaHamburger
          className="text-2xl cursor-pointer hidden max-md:block dark:text-white"
          onClick={() => setShowNavBar(!showNavBar)}
        />
      </nav>
      {showNavBar && (<ReponsiveNavBar />)}
    </>
  );
}

export default NavBar;