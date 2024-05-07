import { LevelI, ProfileI } from "types/types"

const ranks: any = {
  1: {
    level_1: "🔰",
    level_2: "🔰 🔰",
    level_3: "🔰 🔰 🔰"
  },
  2: {
    level_1: "🎓",
    level_2: "🎓 🎓",
    level_3: "🎓 🎓 🎓"
  },
  3: {
    level_1: "🌟",
    level_2: "🌟 🌟",
    level_3: "🌟 🌟 🌟"
  },
  4: {
    level_1: "⚔️",
    level_2: "⚔️ ⚔️",
    level_3: "⚔️ ⚔️ ⚔️"
  },
  5: {
    level_1: "🛡️",
    level_2: "🛡️ 🛡️",
    level_3: "🛡️ 🛡️ 🛡️"
  },
  6: {
    level_1: "🏹",
    level_2: "🏹 🏹",
    level_3: "🏹 🏹 🏹"
  },
  7: {
    level_1: "🏅",
    level_2: "🏅 🏅",
    level_3: "🏅 🏅 🏅"
  },
  8: {
    level_1: "🏆",
    level_2: "🏆 🏆",
    level_3: "🏆 🏆 🏆"
  },
  9: {
    level_1: "🥇",
    level_2: "🥇 🥇",
    level_3: "🥇 🥇 🥇"
  },
  10: {
    level_1: "💎",
    level_2: "💎 💎",
    level_3: "💎 💎 💎"
  },
}

const initialLevel: LevelI = {
  id: 0,
  title: '',
  icon_utf: '',
  number: 0,
  start_range: 0,
  end_range: 0,
  external_id: ''
}

const emptyProfile: ProfileI = {
  avatar: '',
  regDate: '',
  daysRow: 0,
  lvl: 0,
  perks: 0,
  invites: 0,
  referralCode: '',
  balance: 0,
}

const perkText = (name: 'Passive'|'Click', performance: number) => {
  return name === 'Click' ?
    `Multiplies the number of coins per TAP. Get extra ${performance} coins per TAP.` :
    `Activate the Passive perk for a surge in coin collection every time you're on the app. Watch your riches grow with each second`
}

export { ranks, initialLevel, emptyProfile, perkText }