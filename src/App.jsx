import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Home from './Screen/Home'
import RegisterWallet from './Components/RegisterWallet'
import Dashboard from './Screen/Dashboard'
import Transaction from './Screen/Transaction'



const App = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<QRScanner />} /> */}
          <Route exact path="/" element={<RegisterWallet />} />
          <Route path="/home" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/transact" element={<Transaction />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
