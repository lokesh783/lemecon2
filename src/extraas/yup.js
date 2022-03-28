import React from "react"

import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'

import firebase from "firebase/app"

import { auth, signInWithGoogle } from "../firebase"

export default function Login() {
  return (
    <div id='login-page'>
      <div id='login-card'>
        <h2>Welcome to Unichat!</h2>

        <div
          className='login-button google'
          onClick={signInWithGoogle}
        >
          <GoogleOutlined /> Sign In with Google
        </div>

        <br/><br/>
      </div>
    </div>
  )
}