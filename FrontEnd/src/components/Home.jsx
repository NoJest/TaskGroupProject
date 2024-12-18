import {useRef, useEffect} from 'react'
import BG1 from '../assets/BG1.mp4'
import { Link, Outlet } from 'react-router-dom'

function Home({}) {

    const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the playback speed to 0.5x
    }
  }, []);
   
  return (
     <div className="grid items-center">
    
    <video
    ref={videoRef}
    className="absolute inset-0 w-full h-full object-cover"
    src={BG1}
    autoPlay
    loop
    muted
    playsInline
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-4xl my-10 font-bold text-neutral-50 border-emerald-200">Welcome to Task Master Pro</h1>
    <br/>
    <hr/>
  <Link to='./login'>
    <button className="w-40 rounded-lg p-3 m-2 mx-30 font-bold transition-all duration-100 border-2 active:scale-[0.98]
bg-${color}-500 hover:bg-amber-200 hover:text-amber-700">
    Login
  </button>
  </Link>
  
  <Link to='./signUp'>
  <button className="w-40 rounded-lg p-3 m-2 font-bold transition-all duration-100 border-2 active:scale-[0.98]bg-${color}-500 hover:bg-amber-500 hover:text-white">
    Sign Up
  </button>
  </Link>

  </div>
<div className="relative grid flex-row items-center mx-96 gap-2 bg-black/50 p-5 rounded-lg w-full -mt-[400px] max-w-[600px] shadow-sm">
 
</div>
</div>
  )
}

export default Home