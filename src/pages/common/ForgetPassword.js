import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkComponent } from 'react-router-dom';
import { useFormik } from 'formik';
import { ForgetPasswordValidation } from '../../validations/forgetPasswordValidation';
import { loadingToast, updateToast } from '../../utils/toastify';
import axios from '../../services/api/axios';

const defaultTheme = createTheme();

export default function ForgetPassword() {


    const [isSubmitting, setIsSubmitting] = useState(false)

    const initialValues = {
        email: ''
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: ForgetPasswordValidation,
        onSubmit: async (value) => {
            // console.log(value)
            try {
                setIsSubmitting(true)
                loadingToast("Sending Email", 'forgetPassword-toast')
                const forgetPasswordResponse = await axios.post('/users/forgetPassword', value)
                const forgetPassword = forgetPasswordResponse.data
                console.log(forgetPassword)
                updateToast('Email Sent Successfully', 'forgetPassword-toast', 'success')
                resetForm({ values: initialValues })
            } catch (err) {
                console.log(err)
                if (err.response) {
                    const errorMessage = err.response.data.errors || 'An error occurred'
                    updateToast(errorMessage, 'forgetPassword-toast', 'error')
                } else if (err.request) {
                    updateToast('No response from server', 'forgetPassword-toast', 'error')
                } else {
                    updateToast('An unknown error occurred', 'forgetPassword-toast', 'error')
                }
            } finally {
                setIsSubmitting(false)
            }
        }
    })


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginX: 'auto',
                        width: 1
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" fontWeight='bold'>
                        Forget Password
                    </Typography>
                    <Typography component="h2" variant="body1" sx={{ width: .5, mt: 1 }}>
                        Please enter your registered email address below.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate
                        sx={{
                            mt: 1,
                            width: { xs: '85%', sm: '85%', md: '70%', lg: '60%', xl: '50%' }

                        }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            placeholder='yourEmail@example.com'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && !!errors.email}
                            helperText={(touched && errors.email)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send E-Mail
                        </Button>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Link component={LinkComponent} to='/login' variant="body2" >
                                    Already have an account? Log In
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={LinkComponent} to='/coach-signup' variant="body2" >
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}