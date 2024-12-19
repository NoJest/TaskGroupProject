import React from 'react';


function Bg3() {
  return (
    <div className="relative w-full h-screen bg-[#071c39] flex items-center justify-center overflow-hidden">
    {/* Animated Gradient */}
    <div className="absolute w-[750px] h-[750px] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[150px] bg-gradient-to-r from-blue-600 to-teal-400 animate-rotate"></div>
    {/* Content */}
  </div>
  )
}



export default Bg3;