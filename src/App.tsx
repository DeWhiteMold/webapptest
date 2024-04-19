import React from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Main from 'components/Main/Main'
import Menu from 'components/Menu/Menu'
import WebApp from '@twa-dev/sdk'
import Perks from 'components/Perks/Perks'
import Gifts from 'components/Gifts/Gifts'

function App() {
  try {WebApp.showAlert(String(WebApp.initDataUnsafe.user?.id))} catch {}
  return (
    <div className='app'>
      <Routes>
        <Route path='*' element={<Main />} />
        <Route path='/perks' element={<Perks />}/>
        <Route path='/gifts' element={<Gifts />} />
        <Route path='/rating' element={<Main />} />
        <Route path='/profile' element={<Main />} />
      </Routes>
      <Menu />
    </div>
  )
}

export default App
