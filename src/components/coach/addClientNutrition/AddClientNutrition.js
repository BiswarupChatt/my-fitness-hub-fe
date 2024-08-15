import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import MealPlan from './MealPlan';
import { useDispatch, useSelector } from 'react-redux';
import { addMealPlan, startGetNutritionPlan } from '../../../services/redux/action/nutritionPlan-action';

export default function AddClientNutrition({ clientId }) {
  const dispatch = useDispatch();
  const nutritionPlan = useSelector((state) => state.nutritionPlan.data);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('nutritionPlan', nutritionPlan)

  useEffect(() => {
    dispatch(startGetNutritionPlan(clientId, localStorage.getItem('token')));
  }, [dispatch, clientId]);

  const addMealPlanHandler = () => {
    dispatch(addMealPlan({ id: '', title: '', foods: [] }));
  };

  const handleNoteChange = (e) => {
    setAdditionalNotes(e.target.value);
  };

  const handleSubmit = async () => {
    if (!nutritionPlan?.mealPlans) {
      console.error("Meal Plans are undefined");
      return;
    }

    const formattedMealPlans = nutritionPlan.mealPlans.map((plan, index) => {
      // if (!plan || typeof plan !== 'object') {
      //   console.error(`Meal Plan at index ${index} is undefined or not an object`);
      //   return {
      //     title: 'Untitled Meal Plan',
      //     foods: []
      //   };
      // }

      return {
        title: plan.title || 'Untitled Meal Plan',
        foods: (plan.foods || []).map(food => ({
          foodId: food.foodId?._id || '',
          unit: food.unit || '',
          quantity: Number(food.quantity) || 0,
          calories: Number(food.calories) || 0,
          carbohydrate: Number(food.carbohydrate || 0),
          protein: Number(food.protein || 0),
          fat: Number(food.fat || 0),
          note: food.note || '',
        })),
      };
    });

    const data = {
      mealPlans: formattedMealPlans,
      additionalNotes: additionalNotes || '',
    };

    console.log('Nutrition Plan Submitted:', data);

    setIsSubmitting(false);
    setAdditionalNotes('');
  };


  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Create Nutrition Plan
      </Typography>
      {nutritionPlan?.mealPlans?.map((mealPlan, index) => (
        <React.Fragment key={index}>
          <Paper elevation={4} sx={{ p: 2, m: 2 }}>
            <MealPlan
              index={index}
              mealPlan={mealPlan}
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
      <Button variant="contained" onClick={addMealPlanHandler} sx={{ mt: 2 }}>
        Add More Meal Plan
      </Button>
      <Button variant="contained" disabled={isSubmitting} onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
