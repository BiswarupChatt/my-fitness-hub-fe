import React, { useState, useCallback } from 'react';
import { Box, Button, TextField } from '@mui/material';
import MealPlanTable from './MealPlanTable';
import AddFood from './AddFood';

export default function MealPlan({ index, initialMealPlan, onUpdate, onDelete }) {
  const [foods, setFoods] = useState(initialMealPlan?.foods || []);
  const [title, setTitle] = useState(initialMealPlan?.title || '');
  const [titleError, setTitleError] = useState('');

  const addFood = useCallback((foodItem) => {
    const updatedFoods = [...foods, foodItem];
    setFoods(updatedFoods);
    onUpdate(index, { ...initialMealPlan, foods: updatedFoods, title });
  }, [foods, index, initialMealPlan, title, onUpdate]);

  const deleteFood = useCallback((foodIndex) => {
    const updatedFoods = foods.filter((_, i) => i !== foodIndex);
    setFoods(updatedFoods);
    onUpdate(index, { ...initialMealPlan, foods: updatedFoods, title });
  }, [foods, index, initialMealPlan, title, onUpdate]);

  const handleTitleChange = useCallback((e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (newTitle.trim()) {
      setTitleError('');
    } else {
      setTitleError('Meal Plan title cannot be empty.');
    }

    onUpdate(index, { ...initialMealPlan, foods, title: newTitle });
  }, [foods, index, initialMealPlan, onUpdate]);

  const deleteMealPlanHandler = useCallback(() => {
    onDelete(index);
  }, [onDelete, index]);

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
      <Button color="error" variant="contained" onClick={deleteMealPlanHandler} sx={{ mt: 2 }}>
        Delete Meal Plan
      </Button>
    </Box>
  );
}
