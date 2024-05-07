import React, { FC, useEffect, useState } from 'react'
import './Profile.scss'
import Button from 'ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ProfileI } from 'types/types'
import { emptyProfile } from 'consts/consts'
import { api } from 'utilits/api'
import Notification from 'ui/Notification/Notification'
import { getDateString } from 'utilits/getDateString'

const Profile: FC = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<ProfileI>(emptyProfile)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const shareLink = () => {
    window.open(`https://telegram.me/share/url?url=${'bot_link'}/${profile.referralCode}&text=Play with me at notnotcoin`, '_blank')
  }
  const copyLink = () => {
    navigator.clipboard.writeText('bot_link' + '/' + profile.referralCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 5000)
  }

  const getProfile = () => {
    api.getProfile()
      .then((res: any) => {
        setProfile({
          ...profile,
          invites: res.count_referrals,
          daysRow: res.days_activity_in_row,
          lvl: res.level.number,
          perks: res.count_purchased_perks,
          balance: res.coin,
          referralCode: res.referral_code,
          avatar: res.avatar,
          regDate: res.created_at
        })
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getProfile, [])
  return (
    <div className='profile'>
      <div className="profile__header">
        <h1 className="profile__title">Profile</h1>
        <button
          className="profile__settings-btn"
          onClick={() => navigate('/settings')}
        />
      </div>
      <img src={profile.avatar} alt="" className="profile__avatar" />
      <div className="profile__info">
        <span className="profile__info-caption">Coin ballance</span>
        <div className="profile__balance">
          <span className="profile__balance-coins">{profile.balance}</span>
          <div className="profile__balance-coin-icon"/>
        </div>
        <span className="profile__reg-info">Clicking since – {getDateString(profile.regDate)}</span>
      </div>
      <div className="profile__stats">
        <div className="profile__stats-card">
          <span className="profile__stats-card-icon">&#128293;</span>
          <div className="profile__stats-card-texts">
            <span className="profile__stats-card-count">{profile.daysRow}</span>
            <span className="profile__stats-card-caption">Days in row</span>
          </div>
        </div>
        <div className="profile__stats-card">
          <span className="profile__stats-card-icon">&#128184;</span>
          <div className="profile__stats-card-texts">
            <span className="profile__stats-card-count">{profile.perks}</span>
            <span className="profile__stats-card-caption">Perks Purchased</span>
          </div>
        </div>
        <div className="profile__stats-card">
          <span className="profile__stats-card-icon">&#127941;</span>
          <div className="profile__stats-card-texts">
            <span className="profile__stats-card-count">{profile.lvl}</span>
            <span className="profile__stats-card-caption">Lvl</span>
          </div>
        </div>
        <div className="profile__stats-card">
          <span className="profile__stats-card-icon">&#129312;</span>
          <div className="profile__stats-card-texts">
            <span className="profile__stats-card-count">{profile.invites}</span>
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
          <Button onClick={shareLink}><div className="profile__friends-btns-icon profile__friends-btns-icon_invite"/> invite</Button>
          <Button onClick={copyLink} type='Bazeled'><div className="profile__friends-btns-icon profile__friends-btns-icon_link"/>Copy link</Button>
        </div>
      </div>
      {/* <h3 className="profile__challenges-heading">Daily challenge</h3>
      <div className="profile__challenges">
        <div className="profile__challenge">
          <div className="challenge-card__icon"/>
          <div className="challenge-card__info">
            <span className="challenge-card__name">challenge</span>
            <span className="challenge-card__caption">info</span>
          </div>
          <Button shape='Rounded'>Change</Button>
        </div>
      </div> */}
      { isCopied && <Notification type='Link' />}
    </div>
  )
}

export default Profile