import React from 'react'
import {useRef, useEffect} from 'react'
import BG1 from '../assets/BG1.mp4'


function Bg1() {

    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.5; // Set the playback speed to 0.5x
      }
    }, []);


  return (
    <div>  
    <video
    ref={videoRef}
    className="absolute inset-0 w-full h-full object-cover"
    src={BG1}
    autoPlay
    loop
    muted
    playsInline
  /></div>
  )
}

export default Bg1