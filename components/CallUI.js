import { router } from 'next/router'
import React, { useState } from 'react'

export default function CallUI() {
  const [muted, setMuted] = useState(false)
  const [callerName, setcallerName] = useState(false)
  const [localStream, setlocalStream] = useState(false)
  const [remoteStream, setremoteStream] = useState(false)

  function mute() {
    // Mute local microphone stream
    setMuted(true)
  }

  function unmute() {
    // Unmute local microphone stream
    setMuted(false)  
  }

  function hangUp(room) {
    // End the call    
   
  }
 
  return (
    <>
      <h1>{callerName}</h1>
      <video src={localStream} muted={muted} />  
      <video src={remoteStream} />
      <button onClick={mute}>
        {muted ? 'Unmute' : 'Mute'}  
      </button>  
      <button onClick={hangUp}>End Call</button>     
    </>  
  )
}