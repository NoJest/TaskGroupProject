import React from 'react'
import {useRef, useEffect} from 'react'
import BG2 from '../assets/BG2.mp4'


function Bg2() {

    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.5; // Set the playback speed to 0.5x
      }
    }, []);


  return (
    <div className='bg-transparent'>  
    <video
    ref={videoRef}
    className="absolute inset-0 w-full h-full object-cover"
    src={BG2}
    autoPlay
    loop
    muted
    playsInline
  /></div>
  )
}

export default Bg2

