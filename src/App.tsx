import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Main from './components/Main/Main'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
    </Routes>
  )
}

export default App
