import React, { FC, useEffect } from 'react'
import './Gifts.scss'
import Button from 'ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'

const Gifts: FC = () => {
  const navigate = useNavigate()

  WebApp.BackButton.onClick(() => {
    navigate('/perks')
    WebApp.BackButton.hide()
  })

  useEffect(() => {
    try {
      WebApp.BackButton.show()
    } catch {}
  }, [])
  return (
    <div className='gifts-page'>
      <h1 className="gifts-page__title">Gifts</h1>
      <div className="gifts-page__list">
        <div className="gift">
          <img src='https://images.squarespace-cdn.com/content/v1/5ea237e587e03021f9ef8cc2/1591632715798-GZ810CZ0DMW3J0HD2ODF/Group-members.jpg' alt='' className="gift__icon"/>
          <div className="gift__info">
            <span className="gift__name">sdfsdf</span>
            <span className="gift__description">asdfsadfsdf</span>
          </div>
          <Button className="gift__button">Subscribe</Button>
        </div>
        <div className="gift">
          <img src='https://images.squarespace-cdn.com/content/v1/5ea237e587e03021f9ef8cc2/1591632715798-GZ810CZ0DMW3J0HD2ODF/Group-members.jpg' alt='' className="gift__icon"/>
          <div className="gift__info">
            <span className="gift__name">sdfsdf</span>
            <span className="gift__description">asdfsadfsdf</span>
          </div>
          <Button className="gift__button">Subscribe</Button>
        </div>
        <div className="gift">
          <img src='https://images.squarespace-cdn.com/content/v1/5ea237e587e03021f9ef8cc2/1591632715798-GZ810CZ0DMW3J0HD2ODF/Group-members.jpg' alt='' className="gift__icon"/>
          <div className="gift__info">
            <span className="gift__name">sdfsdf</span>
            <span className="gift__description">asdfsadfsdf</span>
          </div>
          <Button className="gift__button">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

export default Gifts