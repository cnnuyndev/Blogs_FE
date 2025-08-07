import React from 'react'

const ReponsiveNavBar = () => {
  return (
    <nav className="max-container padding-x py-6 max-md:block hidden dark:text-[#FFFFFF] dark:bg-[#606379]">
    <ul className="flex items-center justify-center gap-6 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF] ">
      <li>
          Login
      </li>
      <li>
          Register
      </li>
      <li className="font-semibold">
          Create Post
      </li>
    </ul>
  </nav>
  )
}

export default ReponsiveNavBar