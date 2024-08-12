import React, { useState } from 'react';
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import MealPlan from './MealPlan';
import axios from '../../../services/api/axios';
import { loadingToast, updateToast } from '../../../utils/toastify'

export default function AddClientNutrition({ clientId: clientId }) {

  const [additionalNotes, setAdditionalNotes] = useState('');
  const [mealPlans, setMealPlans] = useState([{ id: '', title: '', foods: [] }]);
  const token = localStorage.getItem('token');
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addMealPlan = () => {
    setMealPlans([...mealPlans, { id: '', title: '', foods: [] }]);
  };

  const deleteMealPlan = (index) => {
    setMealPlans((prev) => prev.filter((_, i) => i !== index));
  };

  // console.log('Client ID:', clientId)

  const handleSubmit = async () => {
    const formattedMealPlans = mealPlans.map(plan => ({
      title: plan.title || 'Untitled Meal Plan',
      foods: plan.foods.map(food => ({
        foodId: food.foodId,
        unit: food.unit,
        quantity: Number(food.quantity),
        calories: Number(food.calories),
        carbohydrate: Number(food.carbohydrate || 0),
        protein: Number(food.protein || 0),
        fat: Number(food.fat || 0),
        note: food.note || '',
      })),
    }));

    const data = {
      mealPlans: formattedMealPlans,
      additionalNotes: additionalNotes || '',
    };

    console.log('data before axios', data);

    try {
      setIsSubmitting(true)
      loadingToast("Adding Nutrition Plan", 'nutrition-plan')
      const response = await axios.post(`/nutrition-plan/${clientId}`, data, {
        headers: {
          Authorization: token
        }
      });
      updateToast('Nutrition Plan Added Successfully', 'nutrition-plan', 'success')
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.errors?.[0]?.msg || err.response.data.errors || 'An error occurred'
        updateToast(errorMessage, 'nutrition-plan', 'error')
      } else if (err.request) {
        updateToast('No response from server', 'nutrition-plan', 'error')
      } else {
        updateToast('An unknown error occurred', 'nutrition-plan', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  };

  const handleNoteChange = (e) => {
    setAdditionalNotes(e.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Create Nutrition Plan
      </Typography>
      {mealPlans.map((mealPlan, index) => (
        <React.Fragment key={index}>
          <Paper elevation={4} sx={{ p: 2, m: 2 }}>
            <MealPlan
              index={index}
              mealPlan={mealPlan}
              setMealPlans={setMealPlans}
              onDeleteMealPlan={deleteMealPlan}
            />
          </Paper>
          <Divider />
        </React.Fragment>
      ))}
      <TextField
        label='Additional Notes'
        multiline
        rows={3}
        value={additionalNotes}
        onChange={handleNoteChange}
        variant='outlined'
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      />
      <Button variant="contained" onClick={addMealPlan} sx={{ mt: 2 }}>
        Add More Meal Plan
      </Button>
      <Button variant="contained" disabled={isSubmitting} onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

// function generateUniqueId() {
//   // Implement a unique ID generation logic, e.g., using UUID
//   return '_' + Math.random().toString(36).substr(2, 9);
// }
