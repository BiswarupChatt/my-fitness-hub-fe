import { TextField, Grid, Button, Typography, Modal, Box, } from '@mui/material'
import { useFormik } from 'formik'
import { loadingToast, updateToast } from '../../../utils/toastify';
import axios from '../../../services/api/axios';
import { addFoodItemValidation } from '../../../validations/addFoodItemValidation'
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


export default function AddFoodItem() {


    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="unit"
                                label="Unit"
                                name="unit"
                                autoComplete="unit"
                                value={values.unit}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.unit && !!errors.unit}
                                helperText={(touched && errors.unit)}
                            />
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
                            />
                        </Grid>
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