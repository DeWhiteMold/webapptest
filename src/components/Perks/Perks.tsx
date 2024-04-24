import React, { FC, useState } from 'react'
import './Perks.scss'
import coinImg from 'images/Coin.png'
import { useNavigate } from 'react-router-dom'
import ItemPopup from './ItemPopup/ItemPopup'
import WebApp from '@twa-dev/sdk'

const Perks: FC = () => {
  const navigate = useNavigate()
  const [isPerksTab, setIsPerksTab] = useState<boolean>(true)
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

  const openPopup = () => {
    setIsPopupOpen(true)
    WebApp.HapticFeedback.notificationOccurred('warning')
  }
  return (
    <div className='perks'>
      <section className="perks__balance">
        <span className="perks__balance-caption">Your Balance</span>
        <div className="perks__balance-box">
          <img src={coinImg} alt='' className="perks__balance-icon" />
          <span className="perks__balance-coins">144,880</span>
        </div>
      </section>
      <section className="gifts">
        <div className="gifts-icon">🎁</div>
        <div className="gifts__text">
          <h4 className="gifts__title">Gift for participation</h4>
          <span className="gifts__subtitle">Take part in the promotion and get free perks</span>
        </div>
        <button
          className='gifts__button'
          onClick={() => navigate('/gifts')}
        />
      </section>
      {/* <section className="boosters">
        <h3 className="boosters__title">Free daily boosters</h3>
        <div className="boosters__cards">
          <div className="booster-card">
            <div className="booster-card__info">
              <span className="booster-card__name">Turbo</span>
              <span className="booster-card__remain">11 hours left</span>
            </div>
            <span className="booster-card__icon">🚀</span>
          </div>
          <div className="booster-card">
            <div className="booster-card__info">
              <span className="booster-card__name">Perks</span>
              <span className="booster-card__remain">11 hours left</span>
            </div>
            <span className="booster-card__icon">💸</span>
          </div>
        </div>
      </section> */}
      <section className="shop">
        <div className="shop__tabs">
          <button
            className={`shop__tab ${isPerksTab && 'shop__tab_active'}`}
            onClick={() => !isPerksTab && setIsPerksTab(true)}
          >
            Perks
          </button>
          <button
            className={`shop__tab ${!isPerksTab && 'shop__tab_active'}`}
            onClick={() => isPerksTab && setIsPerksTab(false)}
          >
            Boost
          </button>
          <div className={`shop__tabs-indicator ${isPerksTab ? 'shop__tabs-indicator_perks' : 'shop__tabs-indicator_boost'}`}/>
        </div>
        {
          true &&
            <div className="shop__list">
              <div className="shop__item">
                <div className="shop__item-icon">👾</div>
                <div className="shop__item-text">
                  <h4 className="shop__item-title">
                    Clicks
                    <span className="shop__item-lvl">lvl 3</span>
                  </h4>
                  <span className="shop__item-subtitle">Up your coins per click</span>
                </div>
                <button
                  className='shop__item-button'
                  onClick={openPopup}
                />
              </div>
              <div className="shop__item">
                <div className="shop__item-icon">⌛</div>
                <div className="shop__item-text">
                  <h4 className="shop__item-title">
                  Passive
                    <span className="shop__item-lvl">lvl 3</span>
                  </h4>
                  <span className="shop__item-subtitle">Up your coins on active screen</span>
                </div>
                <button
                  className='shop__item-button'
                  onClick={openPopup}
                />
              </div>
            </div>
        }
      </section>
      {
        isPopupOpen &&
          <ItemPopup
            onClose={() => setIsPopupOpen(false)}
            onSubmit={() => setIsPopupOpen(false)}
          />
      }
      
    </div>
  )
}

export default Perks