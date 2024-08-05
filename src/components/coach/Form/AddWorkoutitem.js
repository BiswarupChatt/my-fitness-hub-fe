import { useState } from 'react'
import { useFormik } from 'formik'
import axios from '../../../services/api/axios'
import { loadingToast, updateToast } from '../../../utils/toastify'
import { TextField, Grid, Button, Typography, Modal, Box } from '@mui/material'
import { addWorkoutItemValidation } from '../../../validations/addWorkoutItemValidation'

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
    maxHeight: '75vh',
    overflowY: 'auto',
}

export default function AddWorkoutItem({ onChange, title }) {

    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleToggle = () => {
        setOpen((ele) => {
            return !ele
        })
    }

    const initialValues = {
        exerciseName: '',
        videoLink: '',
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: addWorkoutItemValidation,
        onSubmit: async (value, { resetForm }) => {
            try {

                setIsSubmitting(true)
                loadingToast("Adding workout item", 'client-invite-toast')

                console.log('value', value)
                await axios.post('/workout', value, {
                    headers: {
                        Authorization: token
                    }
                })
                updateToast('Workout item added successfully', 'client-invite-toast', 'success')
                resetForm()
                onChange()
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
    })

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleToggle}>
                {title}
            </Button>

            <Modal open={open} onClose={handleToggle}>
                <Box sx={modalStyle} component="form" noValidate onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h2">
                        Add Workout Item
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="exerciseName"
                                label="Exercise Name"
                                name="exerciseName"
                                autoComplete="exerciseName"
                                value={values.exerciseName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.exerciseName && !!errors.exerciseName}
                                helperText={(touched.exerciseName && errors.exerciseName)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="videoLink"
                                label="Youtube Link"
                                name="videoLink"
                                autoComplete="videoLink"
                                value={values.videoLink}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.videoLink && !!errors.videoLink}
                                helperText={(touched.videoLink && errors.videoLink)}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleToggle} color="primary" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button type='submit' color="primary" variant="contained" disabled={isSubmitting}>
                            Add Workout Item
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}