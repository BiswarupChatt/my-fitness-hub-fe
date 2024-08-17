import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import MealPlanTable from './MealPlanTable'
import AddFood from './AddFood'
import axios from '../../../services/api/axios'


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
            const token = localStorage.getItem('token')
            const response = await axios.post(`/meal-plan/${clientId}`, data, {
                headers: {
                    Authorization: token
                }
            })
            console.log("Meal Plan After Axios", response.data)
        } catch (err) {
            console.log('error while passing axios', err)
        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                fullWidth
                variant="standard"
                label="Meal Plan Title"
                value={title}
                onChange={handleTitleChange}
                sx={{ mb: 2 }}
                error={Boolean(titleError)}
                helperText={titleError}
            />
            <MealPlanTable mealPlan={foods} onDelete={deleteFood} />
            <AddFood onAdd={addFood} />
            <TextField
                fullWidth
                variant="standard"
                label="Additional Notes"
                value={additionalNotes}
                onChange={handleAdditionalNotesChange}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }} disabled={isSubmitting}>
                Create Meal
            </Button>
        </Box>
    )
}
