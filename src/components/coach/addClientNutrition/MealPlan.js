// MealPlan.js

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import MealPlanTable from './MealPlanTable';
import AddFoodItem from './AddFoodItem';

export default function MealPlan({ index, mealPlan, setMealPlans, onDeleteMealPlan }) {
    const [foods, setFoods] = useState(mealPlan.foods || []);
    const [title, setTitle] = useState(mealPlan.title || '');

    const addFood = (foodItem) => {
        const updatedFoods = [...foods, foodItem];
        setFoods(updatedFoods);
        updateMealPlan(index, updatedFoods, title);
    };

    const deleteFood = (foodIndex) => {
        const updatedFoods = foods.filter((_, i) => i !== foodIndex);
        setFoods(updatedFoods);
        updateMealPlan(index, updatedFoods, title);
    };

    const updateMealPlan = (index, foods, title) => {
        setMealPlans((prev) => {
            const newMealPlans = [...prev];
            newMealPlans[index] = { title, foods };
            return newMealPlans;
        });
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        updateMealPlan(index, foods, e.target.value);
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
            <AddFoodItem onAdd={addFood} />
            <Button color="error" variant="contained" onClick={() => onDeleteMealPlan(index)} sx={{ mt: 2 }}>
                Delete Meal Plan
            </Button>
        </Box>
    );
};

