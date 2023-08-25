import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import MySvgComponent from './cardIcon';
import { cardRegExp, numberRegExp } from './consts';

const tg = window.Telegram.WebApp

function App() {
  const [isCardSelected, setIsCardSelected] = useState(false)
  const [cardNumber,setCardNumber] = useState('')
  const [withdrawValue, setWithdrawValue] = useState('')

  const handleCardInput = (e) => {
    setCardNumber(e.target.value)
  }

  const handleWithdrawInput = (e) => {
    setWithdrawValue(e.target.value)
  }

  useEffect(() => {
    if(cardRegExp.test(cardNumber) && withdrawValue > 0) {
      tg.MainButton.show()
    } else {
      tg.MainButton.hide()
    }
  }, [cardNumber, withdrawValue])

  const onSendData = useCallback(() => {
    console.log(withdrawValue, cardNumber)
  }, [withdrawValue, cardNumber])

  useEffect(() => {
    tg.ready()
  }, [])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {tg.offEvent('mainButtonClicked', onSendData)}
  })

  return (
    <div className="app">
      <header className="header">
        <span className="header__caption">Withdraw</span>
        <button className="header__exit-btn" onClick={tg.close}>close</button>
      </header>
      {
        isCardSelected ?
        <form className="card-form">
          <input type="number" className='card-form__input' placeholder='card number' value={cardNumber} onChange={handleCardInput} maxLength='16'/>
          <input type="number" className='card-form__input' placeholder='amount' value={withdrawValue} onChange={handleWithdrawInput}/>
          <span className="card-form__adv">reklamniy kal</span>
          <button className="card-form__adv-btn">knopka skam</button>
        </form> :
        <div className="cards">
          <div className="card">
            <MySvgComponent />
            <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>select</button>
          </div>
          <div className="card">
            <MySvgComponent />
            <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>select</button>
          </div>
          <div className="card">
            <MySvgComponent />
            <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>select</button>
          </div>
          <div className="card">
            <MySvgComponent />
            <button className="card__select-btn" onClick={() => {setIsCardSelected(true)}}>select</button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
