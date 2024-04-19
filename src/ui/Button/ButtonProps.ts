import { ReactNode } from "react"

interface ButtonProps {
  shape?: 'Rounded'|'Default'|'Large',
  type?: 'Default'|'Bazeled'|'Plain'|'Gray'|'Outline'|'White',
  disabled?: boolean,
  loading?: boolean,
  children: ReactNode,
  action?: 'button'|'reset'|'submit',
  className?: string,
  onClick?: () => void
}
export default ButtonProps