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


export default function EditWorkoutItem({ open, handleClose, workoutItem, onChange }) {

    const token = localStorage.getItem('token')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const initialValues = {
        exerciseName: workoutItem.exerciseName || '',
        videoLink: workoutItem.videoLink || '',
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: addWorkoutItemValidation,
        onSubmit: async (value) => {
            try {
                setIsSubmitting(true)
                loadingToast("Updating Workout item", 'workout-update-toast')

                await axios.put(`/workout/${workoutItem._id}`, value, {
                    headers: {
                        Authorization: token
                    }
                })
                updateToast('Workout item updated successfully', 'workout-update-toast', 'success')
                onChange()
            } catch (err) {
                console.error('Error caught in catch block:', err)

                if (err.response) {
                    const errorMessage = err.response.data.errors?.[0]?.msg || err.response.data.errors || 'An error occurred'
                    updateToast(errorMessage, 'workout-update-toast', 'error')
                } else if (err.request) {
                    updateToast('No response from server', 'workout-update-toast', 'error')
                } else {
                    updateToast('An unknown error occurred', 'workout-update-toast', 'error')
                }
            } finally {
                setIsSubmitting(false)
                handleClose()
            }
        }
    })

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle} component="form" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6" component="h2">
                    Edit Workout Item
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
                    <Button onClick={handleClose} color="primary" sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button type='submit' color="primary" variant="contained" disabled={isSubmitting}>
                        Edit Workout Item
                    </Button>
                </Box>
            </Box>
        </Modal >
    )
}
