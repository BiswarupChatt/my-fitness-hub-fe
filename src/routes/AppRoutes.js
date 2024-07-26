import { Routes, Route } from 'react-router-dom'
import Home from '../pages/common/Home'
import Login from '../pages/common/Login'
import About from '../pages/common/About'
import Profile from '../pages/common/Profile'
import Account from '../pages/common/Account'
import ForgetPassword from '../pages/common/ForgetPassword'
import ResetPassword from '../pages/common/ResetPassword'
import CoachSignup from '../pages/common/CoachSignup'
import Terms from '../pages/common/Terms'
import Pricing from '../pages/common/Pricing'

export default function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/account' element={<Account />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/coach-signup' element={<CoachSignup />} />
            <Route path='/terms' element={<Terms/>} />
            <Route path='/pricing' element={<Pricing/>} />
        </Routes>
    )
}