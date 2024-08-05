import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import axios from '../../../services/api/axios'
import { loadingToast, updateToast } from '../../../utils/toastify'

export default function DeleteWorkoutItem({ open, handleClose, workoutItem, onChange }) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const token = localStorage.getItem('token')

    const confirmDelete = async () => {
        try {
            setIsSubmitting(true)
            loadingToast("Deleting Workout", 'delete-workout-item')

            await axios.delete(`/workout/${workoutItem._id}`, {
                headers: { Authorization: token }
            })
            updateToast('Workout Deleted Successfully', 'delete-workout-item', 'success')
            onChange()
            handleClose()
            console.log('delete')
        } catch (err) {
            console.error('Error caught in catch block:', err)

            if (err.response) {
                const errorMessage = err.response.data.errors?.[0]?.msg || err.response.data.errors || 'An error occurred'
                updateToast(errorMessage, 'delete-workout-item', 'error')
            } else if (err.request) {
                updateToast('No response from server', 'delete-workout-item', 'error')
            } else {
                updateToast('An unknown error occurred', 'delete-workout-item', 'error')
            }
        } finally {
            setIsSubmitting(false)
            handleClose()
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
                    Are you sure you want to delete this workout item?
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