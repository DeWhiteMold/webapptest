import React, { FC, useEffect, useState } from 'react'
import './Main.scss'
import ClickIndicator from './ClickIndicator/ClickIndicator'
import ProgressBar from '@ramonak/react-progress-bar'
import { displayDightsWithCommas } from 'utilits/displayDightsWithCommas'
import arrowImg from 'images/Arrow/arrow_right_24.svg'
import { useDebouncedCallback } from 'use-debounce'
import LevelPopup from './LevelPopup/LevelPopup'
import WebApp from '@twa-dev/sdk'
import { api } from 'utilits/api'
import { LevelI } from 'types/types'
import { initialLevel } from 'consts/consts'
import Countdown from 'react-countdown'

const Main: FC = () => {
  const [clicks, setClicks] = useState<number>(0)
  const [levelInfo, setLevelInfo] = useState<LevelI>(initialLevel)
  const [nextLevelInfo, setNextLevelInfo] = useState<LevelI>(initialLevel)
  const [rating, setRating] = useState<number>(0)
  const [multiplayer, setMultiplayer] = useState<number>(1)
  const [expireDate, setExpireDate] = useState<string>('')

  const [isNewLevelPopupOpen, setIsNewLevelPopupOpen] = useState(false)

  const [clickEvents, setClickEvents] = useState<number[]>([])

  const clearClicksStack = useDebouncedCallback(() => {
    api.updateBalance(clickEvents.length * multiplayer)
      .then(() => {
        clicks + 1 * multiplayer > levelInfo.end_range ?
        refreshInitalInfo() :
        refreshBalance()
      })
    setClickEvents([])
  }, 300)

  const handleTap = () => {
    setClickEvents([...clickEvents, 1])
    setClicks(clicks => clicks + (1 * multiplayer))
    clicks + 1 * multiplayer > levelInfo.end_range && setIsNewLevelPopupOpen(true) 
    clearClicksStack()
    WebApp.HapticFeedback.impactOccurred('medium')
  }

  const handleBoostEnd = () => {
    setTimeout(refreshInitalInfo, 500)
    api.updateBalance(clickEvents.length * multiplayer)
      .then(() => {
        clicks + 1 * multiplayer > levelInfo.end_range ?
        refreshInitalInfo() :
        refreshBalance()
      })
    setClickEvents([])
  }

  const refreshBalance = () => {
    api.getBalance()
      .then((res: {coin: number, level: LevelI}) => {
        setClicks(res.coin)
        setLevelInfo(res.level)
      })
  }

  const refreshInitalInfo = () => {
    api.getInitialData()
      .then((res: {coin: number, level: LevelI, next_level: LevelI, rating: number, active_boost: any}) => {
        setClicks(res.coin)
        setLevelInfo(res.level)
        setNextLevelInfo(res.next_level)
        setRating(res.rating)
        res.active_boost.active ? setExpireDate(res.active_boost.expired_at) : setExpireDate('')
      })
    api.getMultiplier()
      .then(res => setMultiplayer(res.multiplier))
      .catch(() => {})
  }

  useEffect(() => {
    refreshInitalInfo()
  }, [])

  return (
    <div className='main'>
      {/* <section className="challenge-card">
        <div className="challenge-card__icon">
          {
            false &&
              <span className="challenge-card__icon-badge challenge-card__icon-badge_done">
                33
              </span>
          }
        </div>
        <div className="challenge-card__info">
          <span className="challenge-card__name">challenge</span>
          <span className="challenge-card__caption">info</span>
        </div>
        <Button shape='Rounded'>Change</Button>
      </section> */}
      <section className="stats">
        <span className="stats__clicks">{displayDightsWithCommas(clicks)}</span>
        <div className="stats__info">
          <span className="stats__rating">􁊘{rating}􁊙</span>
          {
            expireDate &&
              <Countdown
                date={new Date(expireDate)}
                renderer={props => 
                  <>
                    <span className="stats__divider"/>
                    <span className="stats__boost">&#128640; {props.minutes}:{props.seconds < 10 && 0}{props.seconds}</span>
                  </>
                }
                onComplete={handleBoostEnd}
              />
          }
        </div>
      </section>
      <section className='clicker'>
        <button
          className="clicker__tap-box"
          onClick={handleTap}
          onDoubleClick={e => e.preventDefault()}
        />
        { clickEvents.map((_, i) => <ClickIndicator multiplayer={multiplayer} key={i} />) }
      </section>
      <section className="progress">
        <div className="progress__info">
          <div className="progress__rank">
            {levelInfo.icon_utf}{levelInfo.number > 1 && levelInfo.icon_utf}{levelInfo.number > 2 && levelInfo.icon_utf}
            <img src={arrowImg} alt="" className="progress__rank-arrow" />
            {
              levelInfo.number === 3 ?
              nextLevelInfo.icon_utf :
              `${levelInfo.icon_utf}${levelInfo.icon_utf}${levelInfo.number > 1 ? levelInfo.icon_utf : ''}`
            }
            
          </div>
          <span className="progress__clicks">
            {displayDightsWithCommas(clicks)} - {displayDightsWithCommas(levelInfo.end_range || 0)}
          </span>
        </div>
        <ProgressBar
          completed={clicks - levelInfo.start_range}
          maxCompleted={levelInfo.end_range - levelInfo.start_range}
          isLabelVisible={false}
          height='11px'
          bgColor='#fff'
          baseBgColor='#00000010'
        />
      </section>
      {
        isNewLevelPopupOpen &&
          <LevelPopup 
            onClose={() => setIsNewLevelPopupOpen(false)}
          />
      }
      
    </div>
  )
}

export default Main