import React, { FC } from 'react'
import './Menu.scss'
import { Link, useLocation } from 'react-router-dom'

const Menu: FC = () => {
  const location = useLocation()
  return (
    <div className='menu'>
      <Link 
        to='/'
        className={`menu__button ${location.pathname === '/' && 'menu__button_current'}`}
      >
        <div className="menu__button-icon menu__button-icon_main"/>
        <span className="menu__button-name">Main</span>
      </Link>
      <Link
        to='/perks'
        className={`menu__button ${(location.pathname === '/perks' || location.pathname === '/gifts') && 'menu__button_current'}`}
      >
        <div className="menu__button-icon menu__button-icon_perks"/>
        <span className="menu__button-name">Perks</span>
      </Link>
      <Link
        to='/rating'
        className={`menu__button ${location.pathname === '/rating' && 'menu__button_current'}`}
      >
        <div className="menu__button-icon menu__button-icon_rating"/>
        <span className="menu__button-name">Rating</span>
      </Link>
      <Link
        to='/profile'
        className={`menu__button ${location.pathname === '/profile' && 'menu__button_current'}`}
      >
        <div className="menu__button-icon menu__button-icon_profile"/>
        <span className="menu__button-name">Profile</span>
      </Link>
    </div>
  )
}

export default Menu