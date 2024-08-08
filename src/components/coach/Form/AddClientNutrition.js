import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, InputAdornment, TableFooter } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';

const validationSchema = yup.object({
  foodItem: yup.string().required('Required'),
  quantity: yup.number().required('Required').min(1),
  fat: yup.number().required('Required').min(0),
  calories: yup.number().required('Required').min(0),
  protein: yup.number().required('Required').min(0),
  carbohydrates: yup.number().required('Required').min(0),
});

const initialValues = {
  foodItem: 'Mango',
  quantity: '100',
  fat: 10,
  calories: 10,
  protein: 10,
  carbohydrates: 10,
  note: 'Note Example'
}

const AddFoodItem = ({ onAdd }) => {
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onAdd(values);
      resetForm();
    },
  });

  return (
    <Grid container justifyContent="flex-end">
      <Grid component="form" xs={12} md={6} onSubmit={handleSubmit} sx={{ mt: 3, p: 1, border: '1px solid grey' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="standard"
              id="note"
              name="note"
              label="Note"
              type="text"
              placeholder='e.g., Chew Your Food'
              value={values.note}
              onChange={handleChange}
              error={touched.note && Boolean(errors.note)}
              helperText={touched.note && errors.note}
            />
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          Add Food Item
        </Button>
      </Grid>
    </Grid>
  );
};

const MealPlanTable = ({ mealPlan, onDelete }) => {

  const totals = mealPlan.reduce((acc, meal) => {
    acc.calories += meal.calories || 0;
    acc.fat += meal.fat || 0;
    acc.protein += meal.protein || 0;
    acc.carbohydrates += meal.carbohydrates || 0;
    return acc;
  }, { calories: 0, fat: 0, protein: 0, carbohydrates: 0 });

  return (
    <Box sx={{ overflowX: 'auto', maxHeight: '350px', overflowY: 'auto', border: '1px solid grey' }}>
      <Table>
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
          {mealPlan.map((meal, index) => (
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
              colSpan={10}
              sx={{
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'background.paper',
                borderTop: '1px solid rgba(224, 224, 224, 1)',
                padding: '16px',
                // borderRadius: '4px',
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
  );
};

const MealPlan = ({ index, mealPlan, setMealPlans, onDeleteMealPlan }) => {
  const [foods, setFoods] = useState(mealPlan.foods || []);
  const [title, setTitle] = useState(mealPlan.title || '');

  const addFood = (foodItem) => {
    setFoods(prevFoods => [...prevFoods, foodItem]);
    updateMealPlan(index, foods, title);
  };

  const deleteFood = (foodIndex) => {
    const updatedFoods = foods.filter((_, i) => i !== foodIndex);
    setFoods(updatedFoods);
    updateMealPlan(index, updatedFoods, title);
  };

  const updateMealPlan = (index, foods, title) => {
    setMealPlans(prev => {
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

export default function AddClientNutrition() {
  const [mealPlans, setMealPlans] = useState([{ title: '', foods: [] }]);

  const addMealPlan = () => {
    setMealPlans([...mealPlans, { title: '', foods: [] }]);
  };

  const deleteMealPlan = (index) => {
    setMealPlans(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Create Nutrition Plan
      </Typography>
      {mealPlans.map((mealPlan, index) => (
        <Paper sx={{ p: 2, m: 2 }} key={index}>
          <MealPlan
            index={index}
            mealPlan={mealPlan}
            setMealPlans={setMealPlans}
            onDeleteMealPlan={deleteMealPlan}
          />
        </Paper>
      ))}
      <Button variant="contained" onClick={addMealPlan} sx={{ mt: 2 }}>
        Add More Meal Plan
      </Button>
    </Box>
  );
};
