import React from 'react'
import Db from '../assets/DB.mp4'
import {useRef, useEffect} from 'react'


function DB() {
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.5; // Set the playback speed to 0.5x
      }
    }, []);


  return (
    <div className='relative z-0 w-full h-full'>
    <video
      ref={videoRef}
      className="fixed inset-0 w-full h-full object-cover filter saturate-150 opacity-50"
      src={Db}
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
  
  )
}
export default DB