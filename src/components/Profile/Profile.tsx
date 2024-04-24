import React, { FC } from 'react'
import './Profile.scss'
import Button from 'ui/Button/Button'
import { useNavigate } from 'react-router-dom'

const Profile: FC = () => {
  const navigate = useNavigate()
  return (
    <div className='profile'>
      <div className="profile__header">
        <h1 className="profile__title">Profile</h1>
        <button
          className="profile__settings-btn"
          onClick={() => navigate('/settings')}
        />
      </div>
      <img src='https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg' alt="" className="profile__avatar" />
      <div className="profile__info">
        <span className="profile__info-caption">Coin ballance</span>
        <div className="profile__balance">
          <span className="profile__balance-coins">144,880</span>
          <div className="profile__balance-coin-icon"/>
        </div>
        <span className="profile__reg-info">Clicking since – 03.04.2024</span>
      </div>
      <div className="profile__stats">
        <div className="profile__stats-card">
          <span className="profile__stats-card-icon">&#128293;</span>
          <div className="profile__stats-card-texts">
            <span className="profile__stats-card-count">0</span>
            <span className="profile__stats-card-caption">Days in row</span>
          </div>
        </div>
        <div className="profile__stats-card">
          <span className="profile__stats-card-icon">&#128184;</span>
          <div className="profile__stats-card-texts">
            <span className="profile__stats-card-count">0</span>
            <span className="profile__stats-card-caption">Perks Purchased</span>
          </div>
        </div>
        <div className="profile__stats-card">
          <span className="profile__stats-card-icon">&#127941;</span>
          <div className="profile__stats-card-texts">
            <span className="profile__stats-card-count">0</span>
            <span className="profile__stats-card-caption">Lvl</span>
          </div>
        </div>
        <div className="profile__stats-card">
          <span className="profile__stats-card-icon">&#129312;</span>
          <div className="profile__stats-card-texts">
            <span className="profile__stats-card-count">0</span>
            <span className="profile__stats-card-caption">Friends invited</span>
          </div>
        </div>
      </div>
      <div className="profile__divider"/>
      <div className="profile__friends">
        <div className="profile__friends-heading">
          <div className="profile__friends-text">
            <span className="profile__friends-headline">Invite your friends</span>
            <span className="profile__friends-subheadline">More gifts for invited friends </span>
          </div>
          <span className="profile__friends-icon">👥</span>
        </div>
        <div className="profile__friends-btns">
          <Button><div className="profile__friends-btns-icon profile__friends-btns-icon_invite"/> invite</Button>
          <Button type='Bazeled'><div className="profile__friends-btns-icon profile__friends-btns-icon_link"/>Copy link</Button>
        </div>
      </div>
      <h3 className="profile__challenges-heading">Daily challenge</h3>
      <div className="profile__challenges">
        <div className="profile__challenge">
          <div className="challenge-card__icon"/>
          <div className="challenge-card__info">
            <span className="challenge-card__name">challenge</span>
            <span className="challenge-card__caption">info</span>
          </div>
          <Button shape='Rounded'>Change</Button>
        </div>
        <div className="profile__challenge">
          <div className="challenge-card__icon"/>
          <div className="challenge-card__info">
            <span className="challenge-card__name">challenge</span>
            <span className="challenge-card__caption">info</span>
          </div>
          <Button shape='Rounded'>Change</Button>
        </div>
        <div className="profile__challenge">
          <div className="challenge-card__icon"/>
          <div className="challenge-card__info">
            <span className="challenge-card__name">challenge</span>
            <span className="challenge-card__caption">info</span>
          </div>
          <Button shape='Rounded'>Change</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile