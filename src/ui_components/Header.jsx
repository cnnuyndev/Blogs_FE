import React from 'react'
import Banner from "../images/tech-girl.jpg"
const Header = () => {
  return (
    <section className="max-container padding-x py-6  dark:bg-[#2d2f3d] bg-white">
      <div className=" h-[450px] overflow-hidden rounded-lg container mx-auto p-4">
        <img
          src={Banner}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  )
}

export default Header