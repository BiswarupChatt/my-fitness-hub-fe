
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, InputAdornment, TableFooter } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';

// Validation schema for formik
const validationSchema = yup.object({
  foodItem: yup.string().required('Required'),
  quantity: yup.number().required('Required').min(1),
  fat: yup.number().required('Required').min(0),
  calories: yup.number().required('Required').min(0),
  protein: yup.number().required('Required').min(0),
  carbohydrates: yup.number().required('Required').min(0),
});

const AddMeal = ({ onAdd }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      foodItem: 'Mango',
      quantity: '100',
      fat: 10,
      calories: 10,
      protein: 10,
      carbohydrates: 10,
      note: 'Note Here'
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onAdd(values);
      resetForm();
    },
  });

  return (
    // <Paper sx={{ padding: 2, marginY: 2 }} elevation={3}>
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 1, border: '1px solid grey' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="standard"
            id="foodItem"
            name="foodItem"
            label="Food Item"
            value={values.foodItem}
            onChange={handleChange}
            error={touched.foodItem && Boolean(errors.foodItem)}
            helperText={touched.foodItem && errors.foodItem}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="standard"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            value={values.quantity}
            onChange={handleChange}
            error={touched.quantity && Boolean(errors.quantity)}
            helperText={touched.quantity && errors.quantity}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  g
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="standard"
            id="note"
            name="note"
            label="Note"
            type="text"
            placeholder='eg: Chew Your Food'
            value={values.note}
            onChange={handleChange}
            error={touched.note && Boolean(errors.note)}
            helperText={touched.note && errors.note}
          />
        </Grid>
      </Grid>
      <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
        Add Food
      </Button>
    </Box>
    // </Paper>
  );
};

const MealTable = ({ meals, onDelete }) => {
  const totals = meals.reduce((acc, meal) => {
    acc.calories += meal.calories || 0;
    acc.fat += meal.fat || 0;
    acc.protein += meal.protein || 0;
    acc.carbohydrates += meal.carbohydrates || 0;
    return acc;
  }, { calories: 0, fat: 0, protein: 0, carbohydrates: 0 });

  return (
    // <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
    <Box sx={{ overflowX: 'auto', maxHeight: '350px', overflowY: 'auto', border: '1px solid grey' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Food Item</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat</TableCell>
            <TableCell>Protein</TableCell>
            <TableCell>Carbohydrates</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal, index) => (
            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff" }}>
              <TableCell>
                <Typography variant="body1">{meal.foodItem}</Typography>
                <Typography variant="body2" color="textSecondary">{` ${meal.quantity} g`}</Typography>
              </TableCell>
              <TableCell>{meal.calories}</TableCell>
              <TableCell>{meal.fat}</TableCell>
              <TableCell>{meal.protein}</TableCell>
              <TableCell>{meal.carbohydrates}</TableCell>
              <TableCell>{meal.note}</TableCell>
              <TableCell>
                <IconButton color="secondary" onClick={() => onDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={7}
              sx={{
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'background.paper',
                borderTop: '1px solid rgba(224, 224, 224, 1)',
                padding: '16px',
                boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Typography variant="body2" align="right" sx={{ fontWeight: 'bold' }}>
                Total:
                <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                  Calories: {totals.calories} kCal
                </Typography>
                <Typography component="span" variant="body2" sx={{ ml: 2 }}>
                  Fat: {totals.fat} g
                </Typography>
                <Typography component="span" variant="body2" sx={{ ml: 2 }}>
                  Protein: {totals.protein} g
                </Typography>
                <Typography component="span" variant="body2" sx={{ ml: 2 }}>
                  Carbohydrates: {totals.carbohydrates} g
                </Typography>
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
    // </Paper>
  );
};

const MealPlan = ({ index, mealPlan, setMealPlans }) => {
  const [meals, setMeals] = useState(mealPlan.meals || []);

  const addMeal = (meal) => {
    const updatedMeals = [...meals, meal];
    setMeals(updatedMeals);
    updateMealPlan(index, updatedMeals);
  };

  const deleteMeal = (mealIndex) => {
    const updatedMeals = meals.filter((_, i) => i !== mealIndex);
    setMeals(updatedMeals);
    updateMealPlan(index, updatedMeals);
  };

  const updateMealPlan = (index, updatedMeals) => {
    setMealPlans((prevMealPlans) => {
      const updatedMealPlans = [...prevMealPlans];
      updatedMealPlans[index] = { ...updatedMealPlans[index], meals: updatedMeals };
      return updatedMealPlans;
    });
  };

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Box>
        <Typography variant="h5" component="div" gutterBottom>
          Meal Plan {index + 1}
        </Typography>
        <MealTable meals={meals} onDelete={deleteMeal} />
        <AddMeal onAdd={addMeal} />
      </Box>
    </Paper>
  );
};

const MealPlanComponent = () => {
  const [mealPlans, setMealPlans] = useState([{ meals: [] }]);

  const addMealPlan = () => {
    setMealPlans([...mealPlans, { meals: [] }]);
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Add Meal Plans
      </Typography>
      {mealPlans.map((mealPlan, index) => (
        <MealPlan key={index} index={index} mealPlan={mealPlan} setMealPlans={setMealPlans} />
      ))}
      <Button color="primary" variant="contained" fullWidth onClick={addMealPlan} sx={{ mt: 3 }}>
        Add More Meal Plan
      </Button>
    </Box>
  );
};

export default MealPlanComponent;
