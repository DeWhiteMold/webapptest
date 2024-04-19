import React, { FC, useState } from 'react'
import './Perks.scss'
import Button from 'ui/Button/Button'
import coinImg from 'images/Coin.png'
import { useNavigate } from 'react-router-dom'

const Perks: FC = () => {
  const navigate = useNavigate()
  const [isPerksTab, setIsPerksTab] = useState<boolean>(true)
  return (
    <div className='perks'>
      <h1 className="perks__title">Perks</h1>
      <section className="gifts">
        <h4 className="gifts__title">Gift for participation</h4>
        <span className="gifts__subtitle">Take part in the promotion and get free perks</span>
        <Button
          className='gifts__button'
          onClick={() => navigate('/gifts')}
        >
          Gifts
        </Button>
      </section>
      <section className="boosters">
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
      </section>
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
                <span className="shop__item-icon">🐣</span>
                <div className="shop__item-info">
                  <span className="shop__item-name">sdfsdf</span>
                  <span className="shop__item-description">asdfsadfsdf</span>
                </div>
                <Button className="shop__item-button">123 <img src={coinImg} alt="" className='shop__item-button-icon' /></Button>
              </div>
              <div className="shop__item">
                <span className="shop__item-icon">🐣</span>
                <div className="shop__item-info">
                  <span className="shop__item-name">sdfsdf</span>
                  <span className="shop__item-description">asdfsadfsdf</span>
                </div>
                <Button className="shop__item-button">123 <img src={coinImg} alt="" className='shop__item-button-icon' /></Button>
              </div>
              <div className="shop__item">
                <span className="shop__item-icon">🐣</span>
                <div className="shop__item-info">
                  <span className="shop__item-name">sdfsdf</span>
                  <span className="shop__item-description">asdfsadfsdf</span>
                </div>
                <Button className="shop__item-button">123 <img src={coinImg} alt="" className='shop__item-button-icon' /></Button>
              </div>
              <div className="shop__item">
                <span className="shop__item-icon">🐣</span>
                <div className="shop__item-info">
                  <span className="shop__item-name">sdfsdf</span>
                  <span className="shop__item-description">asdfsadfsdf</span>
                </div>
                <Button className="shop__item-button">123 <img src={coinImg} alt="" className='shop__item-button-icon' /></Button>
              </div>
            </div>
        }
      </section>
    </div>
  )
}

export default Perks