import React, { FC, useEffect, useState } from 'react'
import './Perks.scss'
import coinImg from 'images/Coin.png'
import { useNavigate } from 'react-router-dom'
import ItemPopup from './ItemPopup/ItemPopup'
import WebApp from '@twa-dev/sdk'
import { BoostI, PerkI, ShopItemI } from 'types/types'
import { api } from 'utilits/api'
import { perkText } from 'consts/consts'
import { displayDightsWithCommas } from 'utilits/displayDightsWithCommas'
import Notification from 'ui/Notification/Notification'

const Perks: FC = () => {
  const navigate = useNavigate()
  const [balance, setBalance] = useState<number>(0)
  const [isPerksTab, setIsPerksTab] = useState<boolean>(true)

  const [perks, setPerks] = useState<PerkI[]>([])
  const [boosts, setBoosts] = useState<BoostI[]>([])
  
  const [selectedItem, setSelectedItem] = useState<ShopItemI|null>(null)
  const [isOk, setIsOk] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const showError = (text: string) => {
    WebApp.HapticFeedback.notificationOccurred('error')
    setError(text)
    setTimeout(() => setError(''), 3000);
  }

  const getPerks = () => {
    api.getPerks()
      .then(setPerks)
      .catch((err) => {
        showError(err.error)
      })
  }
  const getBoosts = () => {
    api.getBoosts()
      .then(setBoosts)
      .catch((err) => {
        showError(err.error)
      })
  }
  const getBalance = () => {
    api.getBalance()
      .then(res => setBalance(res.coin))
      .catch((err) => {
        showError(err.error)
      })
  }

  const openPopup = (item: ShopItemI) => {
    setSelectedItem(item)
    WebApp.HapticFeedback.notificationOccurred('warning')
  }

  const buyItem = () => {
    if(selectedItem && selectedItem.type === 'perk') {
      api.buyPerk(selectedItem.id)
        .then(() => {
          setSelectedItem(null)
          getBalance()
          getPerks()
          setIsOk(true)
          setTimeout(() => setIsOk(false), 5000)
          WebApp.HapticFeedback.notificationOccurred('success')
        })
        .catch((err) => {
          showError(err.error)
          setSelectedItem(null)
        })
    } else if(selectedItem && selectedItem.type === 'boost') {
      api.buyBoost(selectedItem.id)
        .then(() => {
          setSelectedItem(null)
          getBalance()
          getBoosts()
          setIsOk(true)
          setTimeout(() => setIsOk(false), 5000)
          WebApp.HapticFeedback.notificationOccurred('success')
        })
        .catch((err) => {
          showError(err.error)
          setSelectedItem(null)
        })
    }
  }

  useEffect(() => {
    getPerks()
    getBoosts()
    getBalance()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='perks'>
      <section className="perks__balance">
        <span className="perks__balance-caption">Your Balance</span>
        <div className="perks__balance-box">
          <img src={coinImg} alt='' className="perks__balance-icon" />
          <span className="perks__balance-coins">{displayDightsWithCommas(balance)}</span>
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
        <div className="shop__list">
          {
            isPerksTab ? 
              perks.map(p => 
                <div className="shop__item">
                  <div className="shop__item-icon">{p.icon_utf}</div>
                  <div className="shop__item-text">
                    <h4 className="shop__item-title">
                      {p.name}
                      <span className="shop__item-lvl">lvl {p.level}</span>
                    </h4>
                    <span className="shop__item-subtitle">
                      {p.name === 'Click' ? 'Up your coins per click' : 'Up your coins on active screen'}
                    </span>
                  </div>
                  <button
                    className='shop__item-button'
                    onClick={() => openPopup({
                      id: p.id,
                      icon_utf: p.icon_utf,
                      text: perkText(p.name, p.performance),
                      name: p.name,
                      lvl: p.level,
                      price: p.price,
                      type: 'perk'
                    })}
                  />
                </div>
              ) :
              boosts.map(b => 
                <div className="shop__item">
                  <div className="shop__item-icon">{b.icon_utf}</div>
                  <div className="shop__item-text">
                    <h4 className="shop__item-title">
                      {b.title}
                    </h4>
                    <span className="shop__item-subtitle">Multiply by x{b.performance} for {b.ttl} sec.</span>
                  </div>
                  <button
                    className='shop__item-button'
                    onClick={() => openPopup({
                      id: b.id,
                      icon_utf: b.icon_utf,
                      text: `Multiply by x${b.performance} for ${b.ttl} sec.`,
                      name: b.title,
                      price: b.price,
                      type: 'boost'
                    })}
                  />
                </div>
              )
          }
        </div>
      </section>
      {
      selectedItem &&
          <ItemPopup
            onClose={() => setSelectedItem(null)}
            onSubmit={buyItem}
            item={selectedItem}
            balance={balance}
          />
      }
      {isOk && <Notification type='Success'/>}
      {error !== '' && <Notification type='Error' text={error}/>}
    </div>
  )
}

export default Perks