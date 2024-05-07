import React, { ExoticComponent, memo } from 'react'
import './ClickIndicator.scss'

const ClickIndicator: ExoticComponent<{multiplayer: number}> = memo(({multiplayer}) => {
  return (
    <span
      className="click-indicator"
      style={{
        top: `${Math.floor(Math.random() * 10)}%`,
        left: `${Math.floor(Math.random() * 60) + 20}%`
      }}
    >
      {1 * multiplayer}
    </span>
  )
})

export default ClickIndicator