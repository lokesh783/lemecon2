import React from 'react'
import { Routes, Route } from "react-router-dom";
import Sign from './components/Login';
import Chat from './components/Chat';
import { AuthProvider } from './context/auth_cont';
function App() {
  return (
    <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Sign/>} />
            <Route exact path ="/chats" element={<Chat/>}/>
          </Routes>
    </AuthProvider>
  );
}

export default App;
