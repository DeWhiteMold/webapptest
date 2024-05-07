import React, { FC } from 'react'
import './Notification.scss'
import NotificationProps from './NotificationProps'
import coinImg from 'images/Coin.png'
import linkImg from 'images/Navigation/link_24.svg'
import okImg from 'images/Interface/checkOk.svg' 
import errImg from 'images/Interface/cancel_16.svg'

const Notification: FC<NotificationProps> = ({type, coins, text, onCancel}) => {
  const getImg = () => {
    switch(type) {
      case 'Coin': return coinImg
      case 'Link': return linkImg
      case 'Success': return okImg
      case 'Error': return errImg
    }
  }
  return (
    <div className='notification'>
      <img src={getImg()} alt="" className="notification__icon" />
      {
        type === 'Link' &&
          <div className="notification__texts">
            <span className="notification__title">
              {type === 'Link' && 'Link copied'}
            </span>
            <span className="notification__caption">
              {type === 'Link' && 'Send it to your friend'}
            </span>
          </div>
      }
      {
        type === 'Success' && <span className="notification__done-text">Done!</span>
      }
      {
        type ==='Error' && <span className="notification__error-text">{text}</span>
      }
      {
        type === 'Coin' && onCancel && <button className='notification__button' onClick={onCancel}>Undo</button>
      }
    </div>
  )
}

export default Notification