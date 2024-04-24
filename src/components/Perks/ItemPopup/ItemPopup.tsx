import React, { FC } from 'react'
import './ItemPopup.scss'
import ItemPopupProps from './ItemPopupProps'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import Button from 'ui/Button/Button'
import coinImg from 'images/Coin.png'

const ItemPopup: FC<ItemPopupProps> = ({onClose, onSubmit}) => {
  useLockBodyScroll()
  return (
    <div className='item-popup'>
      <div className="item-popup__box">
        <button className="item-popup__close-btn" onClick={onClose} />
        <div className="item-popup__icon">
          👾
          <span className="item-popup__lvl">1 lvl</span>
        </div>
        <h3 className="item-popup__name">Clicks</h3>
        <span className="item-popup__description">Multiplies the number of coins per TAP. Get extra 1 coins per TAP.</span>
        <span className="item-popup__price">
          00
          <img src={coinImg} alt='' className="item-popup__price-icon"/>
        </span>
        <Button shape='Large' onClick={onSubmit}>Get it!</Button>
      </div>
    </div>
  )
}

export default ItemPopup