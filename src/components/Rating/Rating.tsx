import React, { FC, useEffect, useState } from 'react'
import './Rating.scss'
import RatingCard from './RatingCard/RatingCard'
import { RatingUserI } from 'types/types'
import { api } from 'utilits/api'

const Rating: FC = () => {
  const [user, setUser] = useState<RatingUserI|null>(null)
  const [users, setUsers] = useState<RatingUserI[]>([])

  const getLeaderBoard = () => {
    api.getRating()
      .then((res: any) => {
        setUser(res.user)
        setUsers(res.leaderboard)
      })
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
    </div>
  )
}

export default Rating