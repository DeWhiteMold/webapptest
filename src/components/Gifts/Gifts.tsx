import React, { FC, useEffect, useState } from 'react'
import './Gifts.scss'
import Button from 'ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { api } from 'utilits/api'
import { GiftI } from 'types/types'
import Notification from 'ui/Notification/Notification'

const Gifts: FC = () => {
  const navigate = useNavigate()

  const [gifts, setGifts] = useState<GiftI[]>([])
  const [selectedLink, setSelectedLink] = useState<string>('')
  const [error, setError] = useState<string>('')

  const showError = (text: string) => {
    WebApp.HapticFeedback.notificationOccurred('error')
    setError(text)
    setTimeout(() => setError(''), 3000);
  }

  const getGifts = () => {
    api.getUserGifts()
      .then(setGifts)
      .catch(err => showError(err.error))
  }

  const openLink = (link: string, id: number) => {
    window.open(`https://t.me/${link}`, '_blank')
    setSelectedLink(link)
    api.buyGift(id)
      .then(() => {
        const editedGifts = gifts.map(g => {
          return g.id === id ? {...g, checked: true} : g
        })
        setGifts(editedGifts)
      })
      .catch(err => {
        showError(err.error)
      })
      .finally(() => setSelectedLink(''))
  }

  WebApp.BackButton.onClick(() => {
    navigate('/perks')
    WebApp.BackButton.hide()
  })

  useEffect(() => {
    WebApp.BackButton.show()
    getGifts()
  }, [])
  return (
    <div className='gifts-page'>
      <h1 className="gifts-page__title">Gifts</h1>
      <div className="gifts-page__list">
        {
          gifts.map(g => 
            <div className="gift">
              <img src='https://images.squarespace-cdn.com/content/v1/5ea237e587e03021f9ef8cc2/1591632715798-GZ810CZ0DMW3J0HD2ODF/Group-members.jpg' alt='' className="gift__icon"/>
              <div className="gift__info">
                <span className="gift__name">{g.title}</span>
                <span className="gift__description">{g.perk.name}</span>
              </div>
              <Button
                className="gift__button"
                onClick={() => openLink(g.link, g.id)}
                loading={selectedLink === g.link}
                disabled={selectedLink === g.link || g.checked}
              >
                {g.checked ? 'Done' : 'Subscribe'}
              </Button>
            </div>
          )
        }
      </div>
      {error !== '' && <Notification type='Error' text={error} />}
    </div>
  )
}

export default Gifts