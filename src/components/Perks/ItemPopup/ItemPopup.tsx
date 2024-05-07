import React, { FC } from 'react'
import './ItemPopup.scss'
import ItemPopupProps from './ItemPopupProps'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import Button from 'ui/Button/Button'
import coinImg from 'images/Coin.png'

const ItemPopup: FC<ItemPopupProps> = ({onClose, onSubmit, item, balance}) => {
  useLockBodyScroll()
  return (
    <div className='item-popup'>
      <div className="item-popup__box">
        <button className="item-popup__close-btn" onClick={onClose} />
        <div className="item-popup__icon">
          {item.icon_utf}
          {item.lvl && <span className="item-popup__lvl">{item.lvl} lvl</span>}
        </div>
        <h3 className="item-popup__name">{item.name}</h3>
        <span className="item-popup__description">{item.text}</span>
        <span className="item-popup__price">
          {item.price}
          <img src={coinImg} alt='' className="item-popup__price-icon"/>
        </span>
        <Button shape='Large' onClick={onSubmit} disabled={balance < item.price}>Get it!</Button>
      </div>
    </div>
  )
}

export default ItemPopup