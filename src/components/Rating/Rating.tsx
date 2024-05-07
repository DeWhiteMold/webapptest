import React, { FC, useEffect, useState } from 'react'
import './Rating.scss'
import RatingCard from './RatingCard/RatingCard'
import { RatingUserI } from 'types/types'
import { api } from 'utilits/api'
import Notification from 'ui/Notification/Notification'
import WebApp from '@twa-dev/sdk'

const Rating: FC = () => {
  const [user, setUser] = useState<RatingUserI|null>(null)
  const [users, setUsers] = useState<RatingUserI[]>([])
  const [error, setError] = useState<string>('')

  const showError = (text: string) => {
    WebApp.HapticFeedback.notificationOccurred('error')
    setError(text)
    setTimeout(() => setError(''), 3000);
  }

  const getLeaderBoard = () => {
    api.getRating()
      .then((res: any) => {
        setUser(res.user)
        setUsers(res.leaderboard)
      })
      .catch(err => showError(err.error))
  }

  useEffect(getLeaderBoard, [])
  return (
    <div className='rating'>
      <h1 className="rating__title">Rating</h1>
      {
        user !== null && <RatingCard user={user} />
      }
      <h2 className="rating__subtitle">Top players</h2>
      <div className="rating__list">
        {
          users.map(user => <RatingCard key={user.tg_user_id} user={user} />) 
        }
      </div>
      { error !== '' && <Notification type='Error' text={error} /> }
    </div>
  )
}

export default Rating