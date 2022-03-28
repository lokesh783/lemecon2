import React, { useRef, useState, useEffect } from "react"

import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'
import { useAuth } from "../context/auth_cont"
import { auth } from "../firebase"

export default function Chats() {
  const didMountRef = useRef(false)
  const [ loading, setLoading ] = useState(true)
  const { user } = useAuth()
  const history = useNavigate()

  async function handleLogout() {
    await auth.signOut()
    history("/")
    window.location.reload()
  }

  // async function getFile(url) {
  //   let response = await fetch(url);
  //   let data = await response.blob();
  //   return new File([data], "test.jpg", { type: 'image/jpeg' });
  // }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history("/")
        window.location.reload()
        return
      }
      
      // Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me/',
        
        { headers: { 
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )

      .then(() => setLoading(false))

      .catch(e => {
        
        axios.post(
              "https://api.chatengine.io/users/",
              {
                username: user.email,
                secret: user.uid,
                email: user.email,
              },
              {
                headers: {
                  "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                },
              }
            )
            .then(() => setLoading(false))
            .catch((e) => console.log("e", e.response));
        })
      
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])
  

  if (!user || loading) return <div />

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          Unichat
        </div>

        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>

      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}