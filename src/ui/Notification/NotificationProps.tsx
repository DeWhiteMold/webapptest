interface NotificationProps {
  type: 'Link'|'Coin'|'Success'|'Error',
  coins?: number,
  text?: string
  onCancel?: () => void,
}
export default NotificationProps