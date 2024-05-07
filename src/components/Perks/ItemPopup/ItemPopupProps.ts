import { ShopItemI } from "types/types"

interface ItemPopupProps {
  onClose: () => void,
  onSubmit: () => void,
  item: ShopItemI,
  balance: number,
}
export default ItemPopupProps