import React, { FC } from 'react'
import './RatingCard.scss'
import RatingCardProps from './RatingCardProps'
import { displayDightsWithCommas } from 'utilits/displayDightsWithCommas'

const RatingCard: FC<RatingCardProps> = ({user}) => {
  const getPlaceClasses = (place: number) => {
    switch (place) {
      case 1:
        return 'rating-card__place_first'
      case 2:
        return 'rating-card__place_second'
      case 3:
        return 'rating-card__place_third'
      default:
        return place > 99 ? 'rating-card__place_long' : ''
    }
  }
  return (
    <div className='rating-card'>
      <span className={`rating-card__place ${getPlaceClasses(user.position)}`}>
        {user.position}
      </span>
      <img src={user.avatar} alt={user.username} className="rating-card__avatar" />
      <div className="rating-card__info">
        <span className="rating-card__username">{user.username}</span>
        <span className="rating-card__level">
          {user.level.icon_utf}{user.level.number > 1 && user.level.icon_utf}{user.level.number > 2 && user.level.icon_utf}
        </span>
      </div>
      <div className="rating-card__balance">
        <span className="rating-card__amount">{displayDightsWithCommas(user.coin)}</span>
        <div className="rating-card__coin-icon"/>
      </div>
    </div>
  )
}

export default RatingCard