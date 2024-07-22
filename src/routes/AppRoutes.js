import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import About from '../pages/About'
import Profile from '../pages/Profile'
import Account from '../pages/Account'
import ForgetPassword from '../pages/ForgetPassword'
import CoachRegister from '../pages/CoachSignup'
import Terms from '../pages/Terms'
import Pricing from '../pages/Pricing'

export default function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/account' element={<Account />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/coach-signup' element={<CoachRegister />} />
            <Route path='/terms' element={<Terms/>} />
            <Route path='/pricing' element={<Pricing/>} />
        </Routes>
    )
}