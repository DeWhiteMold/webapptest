import React, { FC, useEffect } from 'react'
import './LevelPopup.scss'
import LevelPopupProps from './LevelPopupProps'
import Button from 'ui/Button/Button'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import gif from 'images/PartyPopper.webp'
import WebApp from '@twa-dev/sdk'

const LevelPopup: FC<LevelPopupProps> = ({onClose}) => {
  useLockBodyScroll()

  const close = () => {
    WebApp.HapticFeedback.impactOccurred('soft')
    onClose()
  }

  useEffect(() => {
    WebApp.HapticFeedback.notificationOccurred('success')
  }, [])
  return (
    <div className='level-popup'>
      <div className='level-popup__box'>
        <button
          className="level-popup__close-btn"
          onClick={onClose}
        />
        <img src={gif} alt="" className="level-popup__img" />
        <span className="level-popup__text">Congratulations, you have reached a new level</span>
        <Button
          shape='Large'
          onClick={close}
        >
          Claim reward
        </Button>
      </div>
    </div>
  )
}

export default LevelPopup