import React from 'react';
import { Box, Button, Grid, Typography, TextField, InputAdornment, IconButton, Paper, Tooltip } from '@mui/material';
import { Add, RemoveCircle } from '@mui/icons-material';
import { Formik, Field, FieldArray } from 'formik';

function NutritionInfo() {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Nutrition Information
      </Typography>
      <Grid display={{ xs: 'block', sm: 'flex' }} justifyContent='center' flexWrap='wrap'>
        <Typography variant="body2" sx={{ backgroundColor: '#f0f0f0', p: 1, m: 1, borderRadius: 1 }}>
          Calories: N/A
        </Typography>
        <Typography variant="body2" sx={{ backgroundColor: '#e0e0e0', p: 1, m: 1, borderRadius: 1 }}>
          Protein: N/A g
        </Typography>
        <Typography variant="body2" sx={{ backgroundColor: '#d0d0d0', p: 1, m: 1, borderRadius: 1 }}>
          Fats: N/A g
        </Typography>
        <Typography variant="body2" sx={{ backgroundColor: '#c0c0c0', p: 1, m: 1, borderRadius: 1 }}>
          Carbohydrates: N/A g
        </Typography>
      </Grid>
    </Grid>
  );
}

function MealForm({ mealIndex, removeMeal, planIndex }) {
  return (
    <Paper elevation={5} sx={{ m: 2, p: 2, position: 'relative' }}>
      <Tooltip title="Remove">
        <IconButton color="error" sx={{ position: 'absolute', top: 5, right: 5 }} onClick={() => removeMeal(mealIndex)}>
          <RemoveCircle />
        </IconButton>
      </Tooltip>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} margin={1}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Field
                as={TextField}
                fullWidth
                variant="standard"
                name={`mealPlans.${planIndex}.meals.${mealIndex}.foodName`}
                label="Select Food"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field
                as={TextField}
                fullWidth
                variant="standard"
                name={`mealPlans.${planIndex}.meals.${mealIndex}.quantity`}
                label="Quantity"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      g
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field
                as={TextField}
                fullWidth
                variant="standard"
                name={`mealPlans.${planIndex}.meals.${mealIndex}.note`}
                label="Note"
                type="text"
              />
            </Grid>
            <NutritionInfo />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

function TotalNutritionValues() {
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Total Nutrition Values
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2">Total Calories:</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>0 kcal</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2">Total Protein:</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>0 g</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2">Total Fats:</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>0 g</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2">Total Carbohydrates:</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>0 g</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

const initialValues = {
  mealPlans: [{
    title: '',
    meals: [{
      foodName: '',
      unit: '',
      quantity: 0,
      calories: 0,
      carbohydrate: 0,
      protein: 0,
      fats: 0,
      note: ''
    }]
  }],
  additionalNotes: ''
};

export default function AddClientNutrition() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h2" fontWeight='bold'>
            Create Nutrition Plan
          </Typography>
          <FieldArray name="mealPlans">
            {({ push, remove }) => (
              <div>
                {values.mealPlans.map((plan, planIndex) => (
                  <Paper key={planIndex} elevation={3} sx={{ m: 2, p: 2, position: 'relative' }}>
                    <Tooltip title="Remove">
                      <IconButton color="error" sx={{ position: 'absolute', top: 5, right: 5 }} onClick={() => remove(planIndex)}>
                        <RemoveCircle />
                      </IconButton>
                    </Tooltip>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          name={`mealPlans.${planIndex}.title`}
                          label="Meal Plan Title"
                          placeholder="e.g., Breakfast / Day-1"
                        />
                      </Grid>
                      <FieldArray name={`mealPlans.${planIndex}.meals`}>
                        {({ push: pushMeal, remove: removeMeal }) => (
                          <div>
                            {values.mealPlans[planIndex].meals.map((meal, mealIndex) => (
                              <MealForm key={mealIndex} mealIndex={mealIndex} removeMeal={removeMeal} planIndex={planIndex} />
                            ))}
                            <Button
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={() => pushMeal({
                                foodName: '',
                                unit: '',
                                quantity: 0,
                                calories: 0,
                                carbohydrate: 0,
                                protein: 0,
                                fats: 0,
                                note: ''
                              })}
                            >
                              Add Meal
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    </Grid>
                  </Paper>
                ))}
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => push({
                    title: '',
                    meals: [{
                      foodName: '',
                      unit: '',
                      quantity: 0,
                      calories: 0,
                      carbohydrate: 0,
                      protein: 0,
                      fats: 0,
                      note: ''
                    }]
                  })}
                >
                  Add Meal Plan
                </Button>
              </div>
            )}
          </FieldArray>
          <TotalNutritionValues />
          <Field
            as={TextField}
            fullWidth
            name="additionalNotes"
            label="Additional Notes"
            sx={{ mt: 2 }}
            placeholder="e.g., Chew The Food Properly"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}
