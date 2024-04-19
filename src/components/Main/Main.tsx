import React, { FC, useState } from 'react'
import './Main.scss'
import Button from 'ui/Button/Button'
import ClickIndicator from './ClickIndicator/ClickIndicator'
import ProgressBar from '@ramonak/react-progress-bar'
import { ranks } from 'consts/consts'
import { displayDightsWithCommas } from 'utilits/displayDightsWithCommas'
import arrowImg from 'images/Arrow/arrow_right_24.svg'
import { useDebouncedCallback } from 'use-debounce'

const Main: FC = () => {
  const [clicks, setClicks] = useState<number>(123456)
  const [nextLevelRequied, setNextLevelRequied] = useState<number>(150000)

  const [clickEvents, setClickEvents] = useState<number[]>([])
  const rank = {rank: 3, level: 3}

  const clearClicksStack = useDebouncedCallback(() => {
    setClickEvents([])
  }, 600)

  const handleTap = () => {
    setClickEvents([...clickEvents, 1])
    setClicks(clicks => clicks + 1)
    clearClicksStack()
  }

  return (
    <div className='main'>
      <section className="challenge-card">
        <div className="challenge-card__icon"/>
        <div className="challenge-card__info">
          <span className="challenge-card__name">challenge</span>
          <span className="challenge-card__caption">info</span>
        </div>
        <Button shape='Rounded'>Change</Button>
      </section>
      <section className="stats">
        <span className="stats__clicks">{displayDightsWithCommas(clicks)}</span>
        <div className="stats__info">
          <span className="stats__rating">􁊘34,384􁊙</span>
          <span className="stats__divider"/>
          <span className="stats__boost">&#128640; 5:34</span>
        </div>
      </section>
      <section className='clicker'>
        <button className="clicker__tap-box" onClick={handleTap} onDoubleClick={e => e.preventDefault()}/>
        { clickEvents.map((_, i) => <ClickIndicator key={i} />) }
      </section>
      <section className="progress">
        <div className="progress__info">
          <div className="progress__rank">
            {ranks[rank.rank][`level_${rank.level}`]}
            <img src={arrowImg} alt="" className="progress__rank-arrow" />
            {ranks[rank.level === 3 ? (rank.rank + 1) : rank.rank][`level_${rank.level === 3 ? 1 : (rank.level + 1)}`]}
          </div>
          <span className="progress__clicks">
            {displayDightsWithCommas(clicks)} - {displayDightsWithCommas(nextLevelRequied)}
          </span>
        </div>
        <ProgressBar
          completed={clicks}
          maxCompleted={nextLevelRequied}
          isLabelVisible={false}
          height='11px'
          bgColor='#fff'
          baseBgColor='#00000010'
        />
      </section>
    </div>
  )
}

export default Main