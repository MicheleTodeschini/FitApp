
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Plan from './pages/Plan'
import Workout from './pages/Workout'
import Chart from './pages/Chart'
import ActiveWorkout from './pages/ActiveWorkout'
import Exercise from './pages/Exercise'
import Rest from './pages/Rest'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/plan' element={<Plan />} />
          <Route path='/workout' element={<Workout />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/workout/:id/active' element={<ActiveWorkout />} />
          <Route path='/workout/:id/exercise/:exIndex' element={<Exercise />} />
          <Route path='/workout/:id/rest/:exIndex' element={<Rest />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
