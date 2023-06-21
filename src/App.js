import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Coins from './components/Coins'
import Coin from './routes/Coin'
import Navbar from './components/Navbar'

function App () {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const getCryptosValues = () =>
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        )
        .then(response => {
          setCoins(response.data)
          // console.log(response.data[0])
        })
        .catch(error => {
          console.log(error)
        })
    getCryptosValues()
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Coins coins={coins} />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
