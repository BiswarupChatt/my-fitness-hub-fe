import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkComponent } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../validations/resetPasswordValidation';
import { loadingToast, updateToast } from '../utils/toastify';
import axios from '../services/api/axios';

const defaultTheme = createTheme();

export default function ResetPassword() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const initialValues = {
        password: '',
        confirmPassword: ''
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: resetPasswordValidation,
        
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
                        Reset Password
                    </Typography>
                    {/* <Typography component="h2" variant="body1" sx={{ width: .5, mt: 1 }}>
                        Please enter your registered email address below.
                    </Typography> */}
                    <Box component="form" onSubmit={handleSubmit} noValidate
                        sx={{
                            mt: 1,
                            width: { xs: '85%', sm: '85%', md: '70%', lg: '60%', xl: '50%' }

                        }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Enter New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            name="password"
                            // autoComplete="email"
                            // placeholder='yourEmail@example.com'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && !!errors.password}
                            helperText={(touched && errors.password)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm New Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword && !!errors.confirmPassword}
                            helperText={(touched && errors.confirmPassword)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                ),
                            }}
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