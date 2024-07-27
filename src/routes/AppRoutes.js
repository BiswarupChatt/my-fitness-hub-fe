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
import PrivateRoute from './PrivateRoute'
import Client from '../pages/coaches/Client'
import Subscription from '../pages/coaches/Subscription'
import FoodItem from '../pages/coaches/FoodItem'
import WorkoutItem from '../pages/coaches/WorkoutItem'

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
            <Route path='/terms' element={<Terms />} />
            <Route path='/pricing' element={<Pricing />} />

            {/* coach page */}
            <Route path='/client' element={
                <PrivateRoute permittedRoles={['coach', 'admin']}>
                    <Client />
                </PrivateRoute>
            } />
            <Route path='/subscription' element={
                <PrivateRoute permittedRoles={['coach', 'admin']}>
                    <Subscription />
                </PrivateRoute>
            } />
            <Route path='/food-item' element={
                <PrivateRoute permittedRoles={['coach', 'admin']}>
                    <FoodItem />
                </PrivateRoute>
            } />
            <Route path='/workout-item' element={
                <PrivateRoute permittedRoles={['coach', 'admin']}>
                    <WorkoutItem />
                </PrivateRoute>
            } />
        </Routes>
    )
}