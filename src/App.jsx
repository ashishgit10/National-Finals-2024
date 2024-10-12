import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Home from './Screen/Home'
import RegisterWallet from './Components/RegisterWallet'
import Dashboard from './Screen/Dashboard'
import Transaction from './Screen/Transaction'
import Marketplace from './Screen/Marketplace'



const App = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<QRScanner />} /> */}
         {/*  <Route exact path="/" element={<RegisterWallet />} /> */}
          <Route exact path="/" element={<Home />} />
          <Route  path="/dashboard" element={<Dashboard />} />
          <Route  path="/transact" element={<Transaction />} />
          <Route  path="/buy" element={<Marketplace />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
