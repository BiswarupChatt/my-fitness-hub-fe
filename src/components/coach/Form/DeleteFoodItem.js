import { useState } from 'react'
import axios from '../../../services/api/axios'
import { errorToast } from '../../../utils/toastify'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'

export default function DeleteFoodItem({ open, handleClose, foodItem, onChange }) {

    const token = localStorage.getItem('token')

    const confirmDelete = async () => {
        try {
            await axios.delete(`/food-item/${foodItem._id}`, {
                headers: { Authorization: token }
            })
            handleClose()
            onChange()
        } catch (err) {
            console.error('Error deleting food item:', err)
            const errorMessage = err.response?.data?.errors?.[0]?.msg || err.response?.data?.errors || 'An error occurred'
            errorToast(errorMessage || 'An unknown error occurred')
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
                    Are you sure you want to delete this food item?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={confirmDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}