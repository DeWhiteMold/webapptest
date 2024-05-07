import React, { useEffect, useState } from 'react'
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
import Onboarding from 'components/Onboarding/Onboarding'
import { api } from 'utilits/api'
import Notification from 'ui/Notification/Notification'

function App() {
  const [error, setError] = useState<string>('')

  const showError = (text: string) => {
    WebApp.HapticFeedback.notificationOccurred('error')
    setError(text)
    setTimeout(() => setError(''), 3000);
  }
  WebApp.expand()
  WebApp.enableClosingConfirmation()

  const updateLastseen = () => {
    api.updateLastseen(WebApp.initDataUnsafe.user?.id || 290796289)
      .catch(() => showError('Connection lost'))
  } 

  useEffect(() => {
    updateLastseen()
    setInterval(updateLastseen, 30000)
  }, [])
  return (
    <div className='app'>
      <Routes>
        <Route path='*' element={<Main />} />
        <Route path='/perks' element={<Perks />}/>
        <Route path='/gifts' element={<Gifts />} />
        <Route path='/rating' element={<Rating />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/onboarding' element={<Onboarding />} />
      </Routes>
      <Menu />
      { error !== '' && <Notification type="Error" text={error} main />}
    </div>
  )
}

export default App
