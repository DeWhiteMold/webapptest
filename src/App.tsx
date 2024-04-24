import React from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Main from 'components/Main/Main'
import Menu from 'components/Menu/Menu'
import WebApp from '@twa-dev/sdk'
import Perks from 'components/Perks/Perks'
import Gifts from 'components/Gifts/Gifts'
import Rating from 'components/Rating/Rating'
import Profile from 'components/Profile/Profile'
import Settings from 'components/Settings/Settings'

function App() {
  WebApp.expand()
  WebApp.enableClosingConfirmation()
  return (
    <div className='app'>
      <Routes>
        <Route path='*' element={<Main />} />
        <Route path='/perks' element={<Perks />}/>
        <Route path='/gifts' element={<Gifts />} />
        <Route path='/rating' element={<Rating />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      <Menu />
    </div>
  )
}

export default App
