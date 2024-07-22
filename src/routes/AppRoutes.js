import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../pages/HomeScreen'
import LoginScreen from '../pages/LoginScreen'

export default function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
        </Routes>
    )
}