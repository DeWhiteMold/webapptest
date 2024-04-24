import React, { FC } from 'react'
import './Rating.scss'
import RatingCard from './RatingCard/RatingCard'
import { RatingUserI } from 'types/types'

const Rating: FC = () => {
  const user: RatingUserI = {
    name: 'username',
    place: 123,
    coins: 123456,
    level: {
      rank: 10,
      level: 3,
    },
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg'
  }
  return (
    <div className='rating'>
      <h1 className="rating__title">Rating</h1>
      <RatingCard user={user} />
      <h2 className="rating__subtitle">Top players</h2>
      <div className="rating__list">
        <RatingCard user={user} />
        <RatingCard user={user} />
        <RatingCard user={user} />
        <RatingCard user={user} />
        <RatingCard user={user} />
        <RatingCard user={user} />
        <RatingCard user={user} />
        <RatingCard user={user} />
      </div>
    </div>
  )
}

export default Rating