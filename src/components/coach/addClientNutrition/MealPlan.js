import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import MealPlanTable from './MealPlanTable';
import AddFood from './AddFood';
import { useDispatch } from 'react-redux';
import { updateMealPlan, deleteMealPlan } from '../../../services/redux/action/nutritionPlan-action';

export default function MealPlan({ index, mealPlan }) {
    const dispatch = useDispatch();
    const [foods, setFoods] = useState(mealPlan.foods || []);
    const [title, setTitle] = useState(mealPlan.title || '');

    const addFood = (foodItem) => {
        const updatedFoods = [...foods, foodItem];
        setFoods(updatedFoods);
        dispatch(updateMealPlan(index, { ...mealPlan, foods: updatedFoods, title }));
    };

    const deleteFood = (foodIndex) => {
        const updatedFoods = foods.filter((_, i) => i !== foodIndex);
        setFoods(updatedFoods);
        dispatch(updateMealPlan(index, { ...mealPlan, foods: updatedFoods, title }));
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        dispatch(updateMealPlan(index, { ...mealPlan, foods, title: e.target.value }));
    };

    const deleteMealPlanHandler = () => {
        dispatch(deleteMealPlan(index));
    };

    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                fullWidth
                variant="standard"
                label="Meal Plan Title"
                value={title}
                onChange={handleTitleChange}
                sx={{ mb: 2 }}
            />
            <MealPlanTable mealPlan={foods} onDelete={deleteFood} />
            <AddFood onAdd={addFood} />
            <Button color="error" variant="contained" onClick={deleteMealPlanHandler} sx={{ mt: 2 }}>
                Delete Meal Plan
            </Button>
        </Box>
    );
}
