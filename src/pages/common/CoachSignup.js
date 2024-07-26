import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, FormControlLabel, Checkbox, Tooltip, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkComponent } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { registerValidation } from '../../validations/registerValidation';
import axios from '../../services/api/axios';
import { updateToast, loadingToast } from '../../utils/toastify';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();


export default function CoachSignup() {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [termsChecked, setTermsChecked] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleTermsChange = (e) => {
        setTermsChecked(e.target.checked);
    }

    const initialValues = {
        firstName: "Biswarup",
        lastName: "Chatterjee",
        email: "chatterjeebiswarup61@gmail.com",
        password: 'secret123'
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registerValidation,
        onSubmit: async (value) => {
            try {
                setIsSubmitting(true)
                loadingToast('Creating Account...', 'signup-toast')
                await axios.post('/users/register/coach', value)
                // console.log(response.data)
                updateToast('Account Created Successfully', 'signup-toast', 'success')
                navigate('/login')
            } catch (err) {
                if (err.response) {
                    if (err.response.data.errors && err.response.data.errors.length > 0) {
                        const errorMessage = err.response.data.errors[0].msg
                        updateToast(errorMessage, 'signup-toast', 'error')
                    } else {
                        updateToast('An error occurred while creating account', 'signup-toast', 'error')
                    }
                }
                else if (err.request) {
                    updateToast('No response from server', 'signup-toast', 'error')
                } else {
                    updateToast('An unknown error occurred', 'signup-toast', 'error')
                }
            } finally {
                setIsSubmitting(false)
            }
        }
    })

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item xs={false} sm={4} md={7} sx={{
                        backgroundImage:
                            'url("https://media.istockphoto.com/id/1134255601/photo/handsome-hispanic-man-wearing-casual-t-shirt-at-home-smiling-in-love-showing-heart-symbol-and.jpg?s=2048x2048&w=is&k=20&c=oLZ-WQKWIPhn43_cn_HjjtVIuF0CR7SZpzryw1uOL0k=")',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" marginBottom={3} fontWeight='bold'>
                            Sign Up As a Coach
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="given-name"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.firstName && !!errors.firstName}
                                        helperText={touched && errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.lastName && !!errors.lastName}
                                        helperText={touched && errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
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
                                        helperText={touched && errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="new-password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.password && !!errors.password}
                                        helperText={touched && errors.password}
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox checked={termsChecked} onChange={handleTermsChange} color="primary" />}
                                        label={
                                            <span>
                                                I agree to the <Link component={LinkComponent} to="/terms" target='_blank' >terms and conditions</Link>.
                                            </span>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip

                                        title={!termsChecked ? "You must agree to the terms and conditions to proceed" : ""} arrow>
                                        <span>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                disabled={isSubmitting}
                                                sx={{ mt: 1, mb: 2 }}
                                                style={{ cursor: termsChecked ? 'pointer' : 'not-allowed' }}
                                                onClick={(e) => {
                                                    if (!termsChecked) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Sign Up For Free
                                            </Button>
                                        </span>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Link component={LinkComponent} to='/forget-password' variant="body2" >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link component={LinkComponent} to='/login' variant="body2" >
                                        Already have an account? Log In
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}