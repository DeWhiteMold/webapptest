interface NotificationProps {
  type: 'Link'|'Coin'|'Success'|'Error',
  coins?: number,
  text?: string,
  main?: boolean,
  onCancel?: () => void,
}
export default NotificationProps