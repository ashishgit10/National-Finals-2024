import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Screen/Home'
import Dashboard from './Screen/Dashboard'
import SellEnergy from './Screen/SellEnergy'
import BuyEnergy from './Screen/BuyEnergy'
import Quest from './Screen/Quest'


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transact" element={<SellEnergy />} />
          <Route path="/buy" element={<BuyEnergy />} />
          <Route path="/quest" element={<Quest />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
