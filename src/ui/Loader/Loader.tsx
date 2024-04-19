import React, { FC } from 'react'
import './Loader.scss'
import LoaderProps from './LoaderProps'

const Loader: FC<LoaderProps> = ({size}) => {
  return (
    <div className='loader' style={size ? {width: size, height: size} : {}}/>
  )
}

export default Loader