import React, { FC, useState } from 'react'
import './Onboarding.scss'
import mainGif from 'images/onboardingIcon.gif'
import Button from 'ui/Button/Button'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router-dom'
import { api } from 'utilits/api'

const Onboarding: FC = () => {
  useLockBodyScroll()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const handleOnboarding = () => {
    setLoading(true)
    api.updateOnboarding()
      .then(() => navigate('/'))
      .catch()
  }
  return (
    <div className='onboarding'>
      <img src={mainGif} alt="" className="onobarding__img" />
      <div className="onboarding__description">
        <h2 className="onboarding__title">Welcome to Untitled Coin</h2>
        <span className="onboarding__caption">
          Tap, collect coins, and conquer. Receive gifts for activity. Let's dive in and unleash the excitement! 💪💰✨
        </span>
      </div>
      <div className="onboarding__mechanics">
        <div className="onboarding__mechanic">
          <span className="onboarding__mechanic-icon">✨</span>
          <div className="onboarding__mechanic-texts">
            <span className="onboarding__mechanic-name">Tap to Farm Coins</span>
            <span className="onboarding__mechanic-caption">Tap the screen to collect as many coins as you can! The more you tap, the more </span>
          </div>
        </div>
        <div className="onboarding__mechanic">
          <span className="onboarding__mechanic-icon">🤝</span>
          <div className="onboarding__mechanic-texts">
            <span className="onboarding__mechanic-name">Invite Friends</span>
            <span className="onboarding__mechanic-caption">Tap with friends, earn rewards! Share, compete, conquer together!"</span>
          </div>
        </div>
        <div className="onboarding__mechanic">
          <span className="onboarding__mechanic-icon">💪</span>
          <div className="onboarding__mechanic-texts">
            <span className="onboarding__mechanic-name">Purchase Perks&Boosts</span>
            <span className="onboarding__mechanic-caption">Upgrade your tapping experience! Boost speed, multiply coins</span>
          </div>
        </div>
      </div>
      <Button
        shape='Large'
        className="onboarding__button"
        onClick={handleOnboarding}
        loading={loading}
        disabled={loading}
      >
        Start Playing
      </Button>
    </div>
  )
}

export default Onboarding