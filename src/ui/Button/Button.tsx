import React, { FC } from 'react'
import './Button.scss'
import ButtonProps from './ButtonProps'
import Loader from 'ui/Loader/Loader'

const Button: FC<ButtonProps> = ({shape, type, disabled, loading, children, action, className, onClick}) => {
  const getBtnTypeClassname = () => {
    switch (type) {
      case 'Default':
        return 'button_type_default'
      case 'Bazeled':
        return 'button_type_blazed'
      case 'White':
        return 'button_type_white'
      case 'Gray':
        return 'button_type_gray'
      case 'Outline':
        return 'button_type_outline'
      case 'Plain':
        return 'button_type_plain'
      default: 
        return 'button_type_default'
    }
  }

  const getBtnShapeClassname = () => {
    switch (shape) {
      case 'Default':
        return 'button_shape_default'
      case 'Large':
        return 'button_shape_large'
      case 'Rounded':
        return 'button_shape_rounded'
      default:
        return 'button_shape_default'
    }
  }
  return (
    <button
      type={action || 'button'}
      disabled={disabled}
      className={
        `button 
        ${getBtnTypeClassname()} 
        ${getBtnShapeClassname()} 
        ${loading && 'button_loading'} 
        ${className}
        `
      }
      onClick={onClick}
    >
      {loading ? <Loader/> : children}
    </button>
  )
}

export default Button