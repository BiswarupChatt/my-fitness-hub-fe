import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../pages/HomeScreen'
import LoginScreen from '../pages/LoginScreen'
import AboutScreen from '../pages/AboutScreen'
import ProfileScreen from '../pages/ProfileScreen'
import AccountScreen from '../pages/AccountScreen'
import ForgetPasswordScreen from '../pages/ForegetPasswordScreen'
import CoachRegisterScreen from '../pages/CoachSignupScreen'

export default function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/account' element={<AccountScreen />} />
            <Route path='/account' element={<AccountScreen />} />
            <Route path='/forget-password' element={<ForgetPasswordScreen />} />
            <Route path='/coach-signup' element={<CoachRegisterScreen />} />
        </Routes>
    )
}