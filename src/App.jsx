import { useCallback, useEffect, useState } from 'react';
import parse from 'html-react-parser'
import './App.scss';
import MySvgComponent from './cardIcon';
import api from './Api';
import { langUrl } from './consts';

const tg = window.Telegram.WebApp
const url = window.location.href
let lang = ''
if(url.includes(langUrl)) {
  lang = url.replace(`${langUrl}?`, '')
  lang = lang.slice(0, lang.indexOf('#'))
} else {
  lang = 'it'
}

function App() {
  const [isCardSelected, setIsCardSelected] = useState(false)
  const [isStatOpen, setIsStatOpen] = useState(false)
  const [texts, setTexts] = useState(null)
  const [isSub, setIsSub] = useState(false)
  const [user, setUser] = useState(null)
  const [cardNumber,setCardNumber] = useState('')
  const [withdrawValue, setWithdrawValue] = useState('')
  const [isWithdrawOk, setIsWithdrawOk] = useState(false)

  const handleCardInput = (e) => {
    setCardNumber(e.target.value)
  }

  const handleWithdrawInput = (e) => {
    setWithdrawValue(e.target.value)
  }

  const handleAdvSub = () => {
    api.newSub(lang, user.id)
      .then(res => {
        if(res) {
          console.log(res)
          window.open(res, "_blank")
          setIsSub(true)
        }
      })
      .then(() => {
        api.checkSub(lang, user.id)
        .then(res => console.log(res))
      })
  }

  useEffect(() => {
    if(cardNumber.length > 5 && withdrawValue > 0 && isSub) {
      tg.MainButton.text = texts.withdraw_money_button
      tg.MainButton.show()
    } else {
      tg.MainButton.hide()
    }
  }, [cardNumber, withdrawValue, isSub])

  const onSendData = useCallback(() => {
    api.withdraw(lang, user.id)
      .then(() => {
        setIsWithdrawOk(true)
      })
    console.log(withdrawValue, cardNumber, user)
  }, [withdrawValue, cardNumber, user])

  useEffect(() => {
    tg.ready()
    setUser(tg.initDataUnsafe.user)
  }, [])

  useEffect(() => {
    api.getText(lang, user)
      .then(res => {
        setTexts(res)
      })
  }, [user])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {tg.offEvent('mainButtonClicked', onSendData)}
  })

  useEffect(() => {
    isWithdrawOk && 
      setTimeout(() => {tg.close()
      console.log('f')}, 5000)
  }, [isWithdrawOk])

  return texts !== null && (
    <div className="app">
      <header className="header">
        <span className="header__caption">{texts.select_payment}</span>
        <button className="header__exit-btn" onClick={tg.close}>{texts.withdraw_cancel}</button>
      </header>
      {
        isCardSelected ?
        <form className="card-form">
          <button type='buuton' className="card-form__adv-btn" onClick={() => setIsCardSelected(false)}>{texts.main_back}</button>
          <input type="number" className='card-form__input' placeholder={texts.card_data_placeholder} value={cardNumber} onChange={handleCardInput} maxLength='16'/>
          <input type="number" className='card-form__input' placeholder={texts.amount_placeholder} value={withdrawValue} onChange={handleWithdrawInput}/>
          <span className="card-form__adv">{texts.advertisement_button_text}</span>
          <button type='button' className="card-form__adv-btn" onClick={handleAdvSub}>{texts.advertising_button}</button>
        </form> :
        <div className="main">
          <div className="cards">
            <div className="card">
              <MySvgComponent />
              <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>{texts.withdrawal_method_1}</button>
            </div>
            <div className="card">
              <MySvgComponent />
              <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>{texts.withdrawal_method_2}</button>
            </div>
            {
              texts.withdrawal_method_3 && 
              <div className="card">
                <MySvgComponent />
                <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>{texts.withdrawal_method_2}</button>
              </div>
            }
            {
              texts.withdrawal_method_4 && 
              <div className="card">
                <MySvgComponent />
                <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>{texts.withdrawal_method_4}</button>
              </div>
            }
            {
              texts.withdrawal_method_5 && 
              <div className="card">
                <MySvgComponent />
                <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>{texts.withdrawal_method_5}</button>
              </div>
            }
          </div>
          <div className="stats">
            {
              isStatOpen ? 
                parse(texts.statistic_to_user) :
                <button className="stats__btn" onClick={() => {setIsStatOpen(true)}}>{texts.main_statistic}</button>
            }
          </div>
        </div>
      }
      {
        isWithdrawOk &&
        <span className="ok-banner">{texts.successfully_withdrawn}</span>
      }
    </div>
  );
}

export default App;
