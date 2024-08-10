import React, { useState } from 'react';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import MealPlan from './MealPlan';

export default function AddClientNutrition() {
  const foodItem = useSelector((state) => {
    return state.foodItem.data;
  });
  console.log('foodItem', foodItem);

  const [mealPlans, setMealPlans] = useState([{ title: '', foods: [] }]);

  const addMealPlan = () => {
    setMealPlans([...mealPlans, { title: '', foods: [] }]);
  };

  const deleteMealPlan = (index) => {
    setMealPlans((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Create Nutrition Plan
      </Typography>
      {mealPlans.map((mealPlan, index) => (
        <React.Fragment key={index}>
          <Paper elevation={4} sx={{ p: 2, m: 2 }}>
            <MealPlan index={index} mealPlan={mealPlan} setMealPlans={setMealPlans} onDeleteMealPlan={deleteMealPlan} />
          </Paper>
          <Divider />
        </React.Fragment>
      ))}
      <Button variant="contained" onClick={addMealPlan} sx={{ mt: 2 }}>
        Add More Meal Plan
      </Button>
    </Box>
  );
}

