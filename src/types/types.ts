interface LevelI {
  id: number,
  title: string,
  icon_utf: string,
  number: number,
  start_range: number,
  end_range: number,
  external_id: string
}

interface RatingUserI {
  tg_user_id: number,
  first_name: string,
  last_name: string,
  username: string,
  position: number,
  coin: number,
  avatar: string,
  level: LevelI
}

interface ProfileI {
  avatar: string;
  regDate: string;
  daysRow: number;
  lvl: number;
  perks: number;
  invites: number;
  referralCode: string;
  balance: number;
}

interface PerkI {
  id: number,
  name: 'Passive'|'Click',
  performance: number,
  price: number,
  level: number,
  icon_utf: string,
  type: string,
  external_id: string
}

interface BoostI {
  id: number,
  title: string,
  price: number,
  performance: number,
  ttl: number,
  external_id: string,
  icon_utf: string,
}

interface ShopItemI {
  id: number,
  icon_utf: string,
  text: string,
  name: string,
  lvl?: number,
  price: number,
  type: 'perk'|'boost'
}

interface GiftI {
  id: number,
  title: string,
  link: string,
  perk: { name: string },
  checked?: boolean
}

export type {
  LevelI,
  RatingUserI,
  ProfileI,
  PerkI,
  BoostI,
  ShopItemI,
  GiftI
}