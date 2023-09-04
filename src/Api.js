import { baseUrl } from "./consts";

class Api {
  constructor(url) {
    this._url = url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getText(lang, user) {
    return fetch(`${this._url}/text`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        bot_lang: lang,
        ...(user && {user: user})
      })
    })
    .then(res => this._getResponse(res))
  }

  checkSub(lang, userId) {
    return fetch(`${this._url}/check_subscribe`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        bot_lang: lang,
        user_id: userId,
      })
    })
    .then(res => this._getResponse(res))
  }

  newSub(lang, userId) {
    return fetch(`${this._url}/advert_url`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        bot_lang: lang,
        user_id: userId,
      })
    })
    .then(res => this._getResponse(res))
  }

  withdraw(lang, userId) {
    return fetch(`${this._url}/withdraw`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        bot_lang: lang,
        user_id: userId,
      })
    })
  }
}

const api = new Api(baseUrl)

export default api