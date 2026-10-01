
import './App.css'
import { Route, Router, BrowserRouter, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Plan from './pages/Plan'
import Workout from './pages/Workout'
import Chart from './pages/Chart'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/plan' element={<Plan />} />
          <Route path='/workout' element={<Workout />} />
          <Route path='/chart' element={<Chart />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
