import WebApp from "@twa-dev/sdk"

class Api {
  private url: string
  private userId: number

  constructor(url: string, id: number) {
    this.url = url
    this.userId = id
  }

  private getResponse(res: Response) {
    if (res.ok) {
      return res.json()
    }

    return res.text().then(text => {throw JSON.parse(text)})
  }

  private checkError(res: Response) {
    if(!res.ok) {
      return Promise.reject(`Ошибка: ${res.json()}`)
    }
    return
  }

  updateOnboarding() {
    return fetch(`${this.url}/api/user/onboarding/update?tgUserId=${this.userId}`)
      .catch(this.checkError)
  }
  
  getInitialData() {
    return fetch(`${this.url}/api/user/clicker?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  getBalance() {
    return fetch(`${this.url}/api/user/balance?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  updateLastseen(userId: number) {
    return fetch(`${this.url}/api/user/lastseen/update?tgUserId=${userId}`)
      .then(this.checkError)
  }

  getProfile() {
    return fetch(`${this.url}/api/user/profile?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  getMultiplier() {
    return fetch(`${this.url}/api/perk/multiplier?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  updateBalance(coins: number) {
    return fetch(`${this.url}/api/user/balance/update?tgUserId=${this.userId}&coins=${coins}`)
  }

  getRating() {
    return fetch(`${this.url}/api/user/ratings?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  getPerks() {
    return fetch(`${this.url}/api/perk/all?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  getUserPerks() {
    return fetch(`${this.url}/api/perk/purchased?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  buyPerk(perkId: number) {
    return fetch(`${this.url}/api/perk/buy?tgUserId=${this.userId}&perkId=${perkId}`)
      .then(this.checkError)
  }

  getBoosts() {
    return fetch(`${this.url}/api/boost/all`)
      .then(this.getResponse)
  }

  buyBoost(boostId: number) {
    return fetch(`${this.url}/api/boost/buy?tgUserId=${this.userId}&boostId=${boostId}`)
      .then(this.checkError)
  }

  getUserGifts() {
    return fetch(`${this.url}/api/gift/all?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  buyGift(giftId: number) {
    return fetch(`${this.url}/api/gift/buy?tgUserId=${this.userId}&giftId=${giftId}`)
      .then(this.checkError)
  }

  getReferrals() {
    return fetch(`${this.url}/api/user/referrals?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  getReferralCode() {
    return fetch(`${this.url}/api/user/referral-code?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  getSettings() {
    return fetch(`${this.url}/api/user/settings?tgUserId=${this.userId}`)
      .then(this.getResponse)
  }

  updateFakeName() {
    return fetch(`${this.url}/api/user/settings/fakename/update?tgUserId=${this.userId}`)
      .then(this.checkError)
  }

  updatePrivacy() {
    return fetch(`${this.url}/api/user/settings/private/update?tgUserId=${this.userId}`)
      .then(this.checkError)
  }
}

const api = new Api('https://hymiside.ru', WebApp.initDataUnsafe.user?.id || 290796289)

export { api }