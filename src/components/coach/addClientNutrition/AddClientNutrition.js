import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import MealPlan from './MealPlan';
import { useSelector, useDispatch } from 'react-redux';
import { startGetNutritionPlan } from '../../../services/redux/action/nutritionPlan-action';
import axios from '../../../services/api/axios';

export default function AddClientNutrition({ clientId }) {
  const dispatch = useDispatch();
  const [mealPlans, setMealPlans] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token')

  const nutritionPlan = useSelector((state) => state.nutritionPlan.data);
  console.log("nutritionPlan", nutritionPlan)
  useEffect(() => {
    if (clientId) {
      dispatch(startGetNutritionPlan(clientId, localStorage.getItem('token')));
    }
  }, [dispatch, clientId]);

  useEffect(() => {
    if (nutritionPlan) {
      setMealPlans(nutritionPlan.mealPlans || []);
      setAdditionalNotes(nutritionPlan.additionalNotes || '');
    }
  }, [nutritionPlan]);

  const addMealPlanHandler = () => {
    setMealPlans([...mealPlans, { title: '', foods: [] }]);
  };

  const updateMealPlan = (index, updatedMealPlan) => {
    const newMealPlans = mealPlans.map((mealPlan, i) => (i === index ? updatedMealPlan : mealPlan));
    setMealPlans(newMealPlans);
  };

  const deleteMealPlan = (index) => {
    const newMealPlans = mealPlans.filter((_, i) => i !== index);
    setMealPlans(newMealPlans);
  };

  const handleNoteChange = (e) => {
    setAdditionalNotes(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      mealPlans,
      additionalNotes,
    };

    console.log('Nutrition Plan Before Axios', data);

    // try {
    //   const response = await axios.post(`/nutrition-plan/${clientId}`, data, {
    //     headers: {
    //       Authorization: token
    //     }
    //   })
    //   console.log('Nutrition Plan After Axios', response.data)
    // } catch (err) {
    //   console.log(err)
    // }
    // Submit the data to your backend...
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Create Nutrition Plan
      </Typography>
      {mealPlans.length > 0 ? (
        mealPlans.map((mealPlan, index) => (
          <React.Fragment key={index}>
            <Paper elevation={4} sx={{ p: 2, m: 2 }}>
              <MealPlan
                index={index}
                initialMealPlan={mealPlan}
                onUpdate={updateMealPlan}
                onDelete={deleteMealPlan}
              />
            </Paper>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <Typography>No meal plans available</Typography>
      )}
      <TextField
        label="Additional Notes"
        multiline
        rows={3}
        value={additionalNotes}
        onChange={handleNoteChange}
        variant="outlined"
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

