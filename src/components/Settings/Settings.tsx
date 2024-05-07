import React, { FC, useEffect, useState } from 'react'
import './Settings.scss'
import ReactSwitch from 'react-switch'
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { api } from 'utilits/api'
import Notification from 'ui/Notification/Notification'

const Settings: FC = () => {
  const [hiddenRatnig, setHiddenRating] = useState<boolean>(false)
  const [hiddenName, setHiddenName] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const showError = (text: string) => {
    WebApp.HapticFeedback.notificationOccurred('error')
    setError(text)
    setTimeout(() => setError(''), 3000);
  }

  const switchProps = {
    offColor: '#EFEFF4',
    onColor: '#007AFF',
    checkedIcon: false,
    uncheckedIcon: false,
    width: 51,
    height: 31,
    handleDiameter: 27,
    boxShadow: '0px 3px 1px 0px #0000000F',
  }
  const navigate = useNavigate()

  WebApp.BackButton.onClick(() => {
    navigate('/profile')
    WebApp.BackButton.hide()
  })

  const changeName = (newState: boolean) => {
    setHiddenName(newState)
    api.updateFakeName()
      .catch(() => showError('Error'))
  }
  const changePrivacy = (newState: boolean) => {
    setHiddenRating(newState)
    api.updatePrivacy()
      .catch(() => showError('Error'))
  }

  const getSetting = () => {
    api.getSettings()
      .then((res) => {
        setHiddenName(res.fake_name)
        setHiddenRating(res.private)
      })
      .catch(err => showError(err.error))
  }

  useEffect(() => {
    WebApp.BackButton.show()
    getSetting()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='settings'>
      <h1 className="settings__title">Settings</h1>
      <h3 className="settings__subtitle">Main Settings</h3>
      <div className="settings__box">
        <div className="settings__line">
          <span className="settings__name">Display in rating</span>
          <ReactSwitch
            checked={hiddenRatnig}
            onChange={changePrivacy}
            {...switchProps}
          />
        </div>
        <div className="settings__line">
          <span className="settings__name">Change real name</span>
          <ReactSwitch
            checked={hiddenName}
            onChange={changeName}
            {...switchProps}
          />
        </div>
      </div>
      <h3 className="settings__caption">Privacy settings in the ranking list</h3>
      { error !== '' && <Notification type='Error' text={error} /> }
    </div>
  )
}

export default Settings