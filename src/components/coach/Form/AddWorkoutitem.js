import { TextField, Grid, Button, Typography, Modal, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import { loadingToast, updateToast } from '../../../utils/toastify'
import axios from '../../../services/api/axios'
import { addWorkoutItemValidation } from '../../../validations/addWorkoutItemValidation'
import { useState, useEffect } from 'react'

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
    const [message, setMessage] = useState('')

    const handleToggle = () => {
        setOpen((ele) => {
            return !ele
        })
    }

    const initialValues = {
        exerciseName: '',
        videoLink: '',
    }

    const units = [
        { value: 'grams', label: 'Grams', quantity: '100' },
        { value: 'milliliters', label: 'Milliliters', quantity: '100' },
        { value: 'liters', label: 'Liters', quantity: '1' },
        { value: 'pounds', label: 'Pounds', quantity: '1' },
        { value: 'ounces', label: 'Ounces', quantity: '1' },
        { value: 'piece', label: 'Piece', quantity: '1' },
    ]

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: addWorkoutItemValidation,
        onSubmit: async (value, { resetForm }) => {
            try {

                setIsSubmitting(true)
                loadingToast("Adding food item", 'client-invite-toast')

                console.log('value', value)
                await axios.post('/workout', value, {
                    headers: {
                        Authorization: token
                    }
                })
                updateToast('Food item added successfully', 'client-invite-toast', 'success')
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

    useEffect(() => {
        const selectedUnit = units.find((ele) => {
            return ele.value === values.unit
        })
        if (selectedUnit) {
            setFieldValue('quantity', selectedUnit.quantity)
            setMessage(`Note: Please ensure that all values are based on the default quantity of ${selectedUnit.quantity} ${selectedUnit.label} for ${values.foodName ? values.foodName : 'this food item'}.`)
        } else {
            setMessage('')
        }
    }, [values.unit, setFieldValue, values.foodName])

    useEffect(() => {
        const protein = parseFloat(values.protein) || 0
        const fat = parseFloat(values.fat) || 0
        const carbohydrate = parseFloat(values.carbohydrate) || 0

        const calories = (protein * 4) + (fat * 9) + (carbohydrate * 4)
        if (!isNaN(calories)) {
            setFieldValue('calories', calories.toFixed(2))
        } else {
            setFieldValue('calories', '0')
        }
    }, [values.protein, values.fat, values.carbohydrate, setFieldValue])

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
                    <Typography variant="body2" color="error" mt={2} ml={2}>
                        {message}
                    </Typography>
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