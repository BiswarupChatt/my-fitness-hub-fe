import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import MealPlanTable from './MealPlanTable'
import AddFood from './AddFood'
import axios from '../../../services/api/axios'
import { updateToast, loadingToast } from '../../../utils/toastify'


export default function AddMealPlan({ index, initialMealPlan, onUpdate, clientId }) {
    const [foods, setFoods] = useState([])
    const [title, setTitle] = useState('')
    const [additionalNotes, setAdditionalNotes] = useState('')
    const [titleError, setTitleError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)



    const addFood = (foodItem) => {
        const updatedFoods = [...foods, foodItem]
        setFoods(updatedFoods)
        onUpdate(index, { ...initialMealPlan, foods: updatedFoods, title })
    }

    const deleteFood = (foodIndex) => {
        const updatedFoods = foods.filter((_, i) => i !== foodIndex)
        setFoods(updatedFoods)
        if (onUpdate) {
            onUpdate(index, { ...initialMealPlan, foods: updatedFoods, title })
        }
    }

    const handleTitleChange = (e) => {
        const newTitle = e.target.value
        setTitle(newTitle)
    }

    const handleAdditionalNotesChange = (e) => {
        const newNotes = e.target.value
        setAdditionalNotes(newNotes)

    }

    const data = { foods, title, additionalNotes }

    const handleSubmit = async () => {

        let hasError = false

        if (title.trim() === '') {
            setTitleError('Meal Plan title cannot be empty.')
            hasError = true
        }
        if (hasError) return

        console.log("Meal Plan Before Axios", { foods, title, additionalNotes })

        try {
            setIsSubmitting(true)
            loadingToast("Adding Meal Plan", 'add-meal-plan')

            const token = localStorage.getItem('token')
            const response = await axios.post(`/meal-plan/${clientId}`, data, {
                headers: {
                    Authorization: token
                }
            })

            console.log("Meal Plan After Axios", response.data)
            updateToast('Meal Plan Added Successfully', 'add-meal-plan', 'success')

            setFoods([])
            setTitle('')
            setAdditionalNotes('')

        } catch (err) {
            console.log('error while passing axios', err)

            if (err.response) {
                const errorMessage = err.response.data.errors?.[0]?.msg || err.response.data.errors || 'An error occurred'
                updateToast(errorMessage, 'add-meal-plan', 'error')
            } else if (err.request) {
                updateToast('No response from server', 'add-meal-plan', 'error')
            } else {
                updateToast('An unknown error occurred', 'add-meal-plan', 'error')
            }

        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Meal Plan Title"
                value={title}
                onChange={handleTitleChange}
                sx={{ mb: 2 }}
                error={Boolean(titleError)}
                helperText={titleError}
                placeholder='Breakfast/Lunch'
            />
            <MealPlanTable mealPlan={foods} onDelete={deleteFood} />
            <AddFood onAdd={addFood} />
            <TextField
                fullWidth
                variant="outlined"
                label="Additional Notes"
                value={additionalNotes}
                onChange={handleAdditionalNotesChange}
                sx={{ my: 2 }}
                placeholder='Chew Your Food Properly'
            />
            <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
                Create Meal
            </Button>
        </Box>
    )
}
