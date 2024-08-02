import { TextField, Grid, Button, Typography, Modal, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import { loadingToast, updateToast } from '../../../utils/toastify';
import axios from '../../../services/api/axios';
import { addFoodItemValidation } from '../../../validations/addFoodItemValidation'
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
};


export default function AddFoodItem() {


    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const handleToggle = () => {
        setOpen((ele) => {
            return !ele;
        });
    };

    const initialValues = {
        foodName: '',
        unit: '',
        quantity: '',
        protein: '',
        fat: '',
        carbohydrate: '',
        calories: '',
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
        validationSchema: addFoodItemValidation,
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

    useEffect(() => {
        const selectedUnit = units.find((ele) => {
            return ele.value === values.unit
        })
        if (selectedUnit) {
            setFieldValue('quantity', selectedUnit.quantity)
            setMessage(` Note:- You need to put all the value as per the ${selectedUnit.quantity} ${selectedUnit.label} quantity.`)
        } else {
            setMessage('');
        }
    }, [values.unit, setFieldValue])


    const handleUnitChange = (e) => {
        handleChange(e)
        const selectedUnit = units.find((ele) => {
            return ele.value === e.target.value
        })
        if (selectedUnit) {
            setFieldValue('quantity', selectedUnit.quantity)
        }
    }

    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'space-between' }, alignItems: 'center' }} pb={3}>
                <Grid item margin={1}>
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="medium">
                        Food Item List
                    </Typography>
                </Grid>
                <Grid item margin={1}>
                    <Button variant="contained" color="primary" onClick={handleToggle}>
                        Add Food Item
                    </Button>
                </Grid>
            </Grid>

            <Modal open={open} onClose={handleToggle}>
                <Box sx={modalStyle} component="form" noValidate onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h2">
                        Add FoodItem
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="foodName"
                                label="Food Name"
                                name="foodName"
                                autoComplete="email"
                                value={values.foodName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.foodName && !!errors.foodName}
                                helperText={(touched && errors.foodName)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl
                                fullWidth
                                margin="normal"
                                required error={touched.unit && !!errors.unit}
                            >
                                <InputLabel id="unit-label">Unit</InputLabel>
                                <Select
                                    labelId="unit-label"
                                    id="unit"
                                    name="unit"
                                    value={values.unit}
                                    onChange={handleUnitChange}
                                    onBlur={handleBlur}
                                    label="Unit"
                                >
                                    {units.map((ele) => (
                                        <MenuItem key={ele.value} value={ele.value}>
                                            {ele.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.unit && errors.unit && (
                                    <Typography color="error" variant="body2">
                                        {errors.unit}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="quantity"
                                label="Quantity"
                                name="quantity"
                                autoComplete="quantity"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.quantity && !!errors.quantity}
                                helperText={(touched && errors.quantity)}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Typography variant="body2" color="error" mt={2} ml={2}>
                            {message}
                        </Typography>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="protein"
                                label="Protein"
                                name="protein"
                                autoComplete="protein"
                                value={values.protein}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.protein && !!errors.protein}
                                helperText={(touched && errors.protein)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fat"
                                label="Fat"
                                name="fat"
                                autoComplete="fat"
                                value={values.fat}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.fat && !!errors.fat}
                                helperText={(touched && errors.fat)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="carbohydrate"
                                label="Carbohydrate"
                                name="carbohydrate"
                                autoComplete="carbohydrate"
                                value={values.carbohydrate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.carbohydrate && !!errors.carbohydrate}
                                helperText={(touched && errors.carbohydrate)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="calories"
                                label="Calories"
                                name="calories"
                                autoComplete="calories"
                                value={values.calories}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.calories && !!errors.calories}
                                helperText={(touched && errors.calories)}
                            />
                        </Grid>
                    </Grid>
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