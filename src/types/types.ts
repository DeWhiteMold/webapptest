interface LevelI {
  rank: number,
  level: 1|2|3
}

interface RatingUserI {
  name: string,
  place: number,
  coins: number,
  level: LevelI,
  avatar: string
}

export type {
  LevelI,
  RatingUserI
}