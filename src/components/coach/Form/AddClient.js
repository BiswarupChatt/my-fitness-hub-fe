import {TextField, Grid, Button, Typography, Modal, Box,  } from '@mui/material'
import { useFormik } from 'formik'
import { loadingToast, updateToast} from '../../../utils/toastify';
import axios from '../../../services/api/axios';
import { inviteClientValidation } from '../../../validations/inviteClientValidations'
import { useState } from 'react'


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%', sm: '80%', md: '60%', lg: '50%', xl: '30%',
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};


export default function AddClient() {


    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleToggle = () => {
        setOpen((ele) => {
            return !ele;
        });
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: { email: '' },
        validationSchema: inviteClientValidation,
        onSubmit: async (value, { resetForm }) => {
            try {

                setIsSubmitting(true)
                loadingToast("Sending Invitation", 'client-invite-toast')

                await axios.post('/coach/sendInvitationEmail', value, {
                    headers: {
                        Authorization: token
                    }
                })
                console.log('1')
                updateToast('Sent Invitation Successfully', 'client-invite-toast', 'success')
                resetForm()
            } catch (err) {
                console.error('Error caught in catch block:', err)

                if (err.response) {
                    const errorMessage = err.response.data.errors?.[0]?.msg || err.response.data.errors || 'An error occurred'
                    updateToast(errorMessage, 'client-invite-toast', 'error')
                } else if (err.request) {
                    updateToast('No response from server', 'client-invite-toast', 'error')
                } else {
                    updateToast('An unknown error occurred', 'client-invite-toast', 'error')
                }
            } finally {
                console.log('5')
                setIsSubmitting(false)
                handleToggle()
            }
        }
    });

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between" pb={4}>
                <Grid item>
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="medium">
                        Client List
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleToggle}>
                        Invite Client
                    </Button>
                </Grid>
            </Grid>

            <Modal open={open} onClose={handleToggle}>
                <Box sx={modalStyle} component="form" noValidate onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h2">
                        Invite Client
                    </Typography>
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
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleToggle} color="primary" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button type='submit' color="primary" variant="contained" disabled={isSubmitting}>
                            Send Invitation
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}