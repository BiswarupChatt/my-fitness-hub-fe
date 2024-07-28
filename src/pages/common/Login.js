import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkComponent, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginValidation } from '../../validations/loginValidations';
import axios from '../../services/api/axios'
import { loadingToast, updateToast } from '../../utils/toastify';
import { useAuth } from '../../services/context/AuthContext'
import { Helmet } from 'react-helmet';

const defaultTheme = createTheme();

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                MyFitnessHub
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Login() {

    const location = useLocation()
    const navigate = useNavigate()
    const { dispatch } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const initialValues = {
        email: 'chatterjeebiswarup61@gmail.com',
        password: 'secret123'
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginValidation,
        onSubmit: async (value) => {
            try {
                setIsSubmitting(true)
                loadingToast("Logging in...", 'login-toast')
                const response = await axios.post('/users/login', value)
                const token = response.data.token
                localStorage.setItem("token", token)

                const getAccountResponse = await axios.get('/users/account', {
                    headers: {
                        Authorization: token
                    }
                })
                const account = getAccountResponse.data

                let url
                if (account.role === 'coach' || account.role === 'admin') {
                    url = '/coach'
                } else {
                    url = '/client'
                }

                const getProfileResponse = await axios.get(url, {
                    headers: {
                        Authorization: token
                    }
                })
                const profile = getProfileResponse.data

                dispatch({ type: 'LOGIN', payload: { account: account, profile: profile } })
                updateToast('Logged In Successfully', 'login-toast', 'success')
                const from = location.state?.from?.pathname || '/'
                navigate(from, { replace: true })
            } catch (err) {
                if (err.response) {
                    const errorMessage = err.response.data.errors || 'An error occurred'
                    updateToast(errorMessage, 'login-toast', 'error')
                } else if (err.request) {
                    updateToast('No response from server', 'login-toast', 'error')
                } else {
                    updateToast('An unknown error occurred', 'login-toast', 'error')
                }
                // console.log(err)
            } finally {
                setIsSubmitting(false)
            }
        }
    })

    return (
        <ThemeProvider theme={defaultTheme}>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item xs={false} sm={4} md={7} sx={{
                        backgroundImage:
                            'url("https://cdn.pixabay.com/photo/2024/05/17/19/35/woman-8768904_960_720.jpg")',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" fontWeight='bold'>
                            Log In
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && !!errors.email}
                                helperText={(touched && errors.email)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    ),
                                }}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && !!errors.password}
                                helperText={(touched && errors.password)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                disabled={isSubmitting}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Link component={LinkComponent} to='/forget-password' variant="body2" >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link component={LinkComponent} to='/coach-signup' variant="body2" >
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}