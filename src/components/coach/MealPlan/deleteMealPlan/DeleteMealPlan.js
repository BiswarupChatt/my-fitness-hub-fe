import { useState } from 'react'
import axios from '../../../../services/api/axios'
import { errorToast, updateToast, loadingToast } from '../../../../utils/toastify'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startGetMealPlan } from '../../../../services/redux/action/mealPlan-action'
import { useAuth } from '../../../../services/context/AuthContext'

export default function DeleteMealPlan({ open, handleClose, mealPlan, clientId }) {

    const token = localStorage.getItem('token')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch()
    const { user } = useAuth()
    console.log('mealPlan', mealPlan._id)

    const confirmDelete = async () => {
        try {
            setIsSubmitting(true)
            loadingToast("Deleting Meal plan", 'delete-meal-plan')
            const response = await axios.delete(`/meal-plan/delete/${mealPlan._id}`, {
                headers: {
                    Authorization: token
                }
            })
            console.log('Deleted successfully')
            handleClose()
            updateToast('Meal plan Deleted Successfully', 'delete-meal-plan', 'success')
            dispatch(startGetMealPlan(clientId, token, user))
        } catch (err) {
            console.error('Error deleting food item:', err)

            if (err.response) {
                const errorMessage = err.response.data.errors?.[0]?.msg || err.response.data.errors || 'An error occurred'
                updateToast(errorMessage, 'delete-meal-plan', 'error')
            } else if (err.request) {
                updateToast('No response from server', 'delete-meal-plan', 'error')
            } else {
                updateToast('An unknown error occurred', 'delete-meal-plan', 'error')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title">Confirm Deletion</DialogTitle>
            <DialogContent>
                <Typography id="dialog-description">
                    Are you sure you want to delete this meal?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={confirmDelete} disabled={isSubmitting}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}