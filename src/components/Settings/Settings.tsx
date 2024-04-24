import React, { FC, useEffect, useState } from 'react'
import './Settings.scss'
import ReactSwitch from 'react-switch'
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'

const Settings: FC = () => {
  const [checked, setChecked]= useState<boolean>(false)
  const switchProps = {
    offColor: '#EFEFF4',
    onColor: '#007AFF',
    checkedIcon: false,
    uncheckedIcon: false,
    width: 51,
    height: 31,
    handleDiameter: 27,
  }
  const navigate = useNavigate()

  WebApp.BackButton.onClick(() => {
    navigate('/profile')
    WebApp.BackButton.hide()
  })

  useEffect(() => {
    try {
      WebApp.BackButton.show()
    } catch {}
  }, [])
  return (
    <div className='settings'>
      <h1 className="settings__title">Settings</h1>
      <h3 className="settings__subtitle">Main Settings</h3>
      <div className="settings__box">
        <div className="settings__line">
          <span className="settings__name">Show in rating</span>
          <ReactSwitch
            checked={checked}
            onChange={setChecked}
            {...switchProps}
          />
        </div>
        <div className="settings__line">
          <span className="settings__name">Change real TG Nickname</span>
          <ReactSwitch
            checked={checked}
            onChange={setChecked}
            {...switchProps}
          />
        </div>
        <div className="settings__line">
          <span className="settings__name">Deny Go to profile</span>
          <ReactSwitch
            checked={checked}
            onChange={setChecked}
            {...switchProps}
          />
        </div>
      </div>
      <h3 className="settings__caption">Privacy settings in the ranking list</h3>
    </div>
  )
}

export default Settings