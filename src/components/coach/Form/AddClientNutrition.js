// import React from 'react';
// import { Box, Button, Grid, Typography, TextField, InputAdornment, IconButton, Paper, Tooltip, Divider } from '@mui/material';
// import { Add, RemoveCircle } from '@mui/icons-material';
// import { Formik, Field, FieldArray } from 'formik';

// const initialValues = {
//   mealPlans: [{
//     title: '',
//     meals: [{
//       foodName: '',
//       unit: '',
//       quantity: 0,
//       calories: 0,
//       carbohydrate: 0,
//       protein: 0,
//       fats: 0,
//       note: ''
//     }]
//   }],
//   additionalNotes: ''
// };

// const handleSelectFoodClick = (index) => {
//   console.log('select food Clicked', index)
// }

// function NutritionInfo() {
//   return (
//     <Grid item xs={12}>
//       <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//         Nutrition Information
//       </Typography>
//       <Grid display={{ xs: 'block', sm: 'flex' }} justifyContent='center' flexWrap='wrap'>
//         <Typography variant="body2" sx={{ backgroundColor: '#f0f0f0', p: 1, m: 1, borderRadius: 1 }}>
//           Calories: N/A
//         </Typography>
//         <Typography variant="body2" sx={{ backgroundColor: '#e0e0e0', p: 1, m: 1, borderRadius: 1 }}>
//           Protein: N/A g
//         </Typography>
//         <Typography variant="body2" sx={{ backgroundColor: '#d0d0d0', p: 1, m: 1, borderRadius: 1 }}>
//           Fats: N/A g
//         </Typography>
//         <Typography variant="body2" sx={{ backgroundColor: '#c0c0c0', p: 1, m: 1, borderRadius: 1 }}>
//           Carbohydrates: N/A g
//         </Typography>
//       </Grid>
//     </Grid>
//   );
// }

// function TotalNutritionValues() {
//   return (
//     <Paper elevation={3} sx={{ m: 2, p: 2 }}>
//       <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//         Total Nutrition Values
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="body2">Total Calories:</Typography>
//           <Typography variant="body1" sx={{ fontWeight: 'bold' }}>0 kcal</Typography>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="body2">Total Protein:</Typography>
//           <Typography variant="body1" sx={{ fontWeight: 'bold' }}>0 g</Typography>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="body2">Total Fats:</Typography>
//           <Typography variant="body1" sx={{ fontWeight: 'bold' }}>0 g</Typography>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="body2">Total Carbohydrates:</Typography>
//           <Typography variant="body1" sx={{ fontWeight: 'bold' }}>0 g</Typography>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }

// function MealForm({ mealIndex, removeMeal, planIndex }) {
//   return (
//     <Paper elevation={5} sx={{ m: 2, p: 2, position: 'relative' }}>
//       <Tooltip title="Remove">
//         <IconButton color="error" sx={{ position: 'absolute', top: 5, right: 5 }} onClick={() => removeMeal(mealIndex)}>
//           <RemoveCircle />
//         </IconButton>
//       </Tooltip>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} margin={1}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={4}>
//               <Field
//                 as={TextField}
//                 fullWidth
//                 variant="standard"
//                 name={`mealPlans.${planIndex}.meals.${mealIndex}.foodName`}
//                 label="Select Food"
//                 onClick={() => {
//                   return (
//                     handleSelectFoodClick(mealIndex)
//                   )
//                 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton>
//                         <Add />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}

//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Field
//                 as={TextField}
//                 fullWidth
//                 variant="standard"
//                 name={`mealPlans.${planIndex}.meals.${mealIndex}.quantity`}
//                 label="Quantity"
//                 type="number"
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       g
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Field
//                 as={TextField}
//                 fullWidth
//                 variant="standard"
//                 name={`mealPlans.${planIndex}.meals.${mealIndex}.note`}
//                 label="Note"
//                 type="text"
//               />
//             </Grid>
//             <NutritionInfo />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }

// export default function AddClientNutrition() {
//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={values => {
//         console.log(values);
//       }}
//     >
//       {({ values, handleSubmit }) => (
//         <form onSubmit={handleSubmit}>
//           <Typography variant="h4" component="h2" fontWeight='bold'>
//             Create Nutrition Plan
//           </Typography>
//           <FieldArray name="mealPlans">
//             {({ push, remove }) => (
//               <>
//                 {values.mealPlans.map((plan, planIndex) => (
//                   <>
//                     <Paper key={planIndex} elevation={3} sx={{ m: 2, p: 2, position: 'relative' }}>
//                       <Tooltip title="Remove">
//                         <IconButton color="error" sx={{ position: 'absolute', bottom: 5, right: 5 }} onClick={() => remove(planIndex)}>
//                           <RemoveCircle />
//                         </IconButton>
//                       </Tooltip>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                           <Field
//                             as={TextField}
//                             fullWidth
//                             name={`mealPlans.${planIndex}.title`}
//                             label="Meal Plan Title"
//                             placeholder="e.g., Breakfast / Day-1"
//                           />
//                         </Grid>
//                         <FieldArray name={`mealPlans.${planIndex}.meals`}>
//                           {({ push: pushMeal, remove: removeMeal }) => (
//                             <div>
//                               {values.mealPlans[planIndex].meals.map((meal, mealIndex) => (
//                                 <MealForm key={mealIndex} mealIndex={mealIndex} removeMeal={removeMeal} planIndex={planIndex} />
//                               ))}
//                               <Button
//                                 type="button"
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => pushMeal({
//                                   foodName: '',
//                                   unit: '',
//                                   quantity: 0,
//                                   calories: 0,
//                                   carbohydrate: 0,
//                                   protein: 0,
//                                   fats: 0,
//                                   note: ''
//                                 })}
//                               >
//                                 Add Meal
//                               </Button>
//                             </div>
//                           )}
//                         </FieldArray>
//                       </Grid>
//                     </Paper>
//                     <Divider />
//                   </>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="contained"
//                   color="primary"
//                   onClick={() => push({
//                     title: '',
//                     meals: [{
//                       foodName: '',
//                       unit: '',
//                       quantity: 0,
//                       calories: 0,
//                       carbohydrate: 0,
//                       protein: 0,
//                       fats: 0,
//                       note: ''
//                     }]
//                   })}
//                   sx={{ marginTop: 2, }}
//                 >
//                   Add Meal Plan
//                 </Button>
//               </>
//             )}
//           </FieldArray>
//           <TotalNutritionValues />
//           <Field
//             as={TextField}
//             fullWidth
//             name="additionalNotes"
//             label="Additional Notes"
//             sx={{ mt: 2 }}
//             placeholder="e.g., Chew The Food Properly"
//           />
//           <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//             Submit
//           </Button>
//         </form>
//       )}
//     </Formik>
//   );
// }


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

const AddMealPlan = ({ onAdd }) => {
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
    <Paper sx={{ padding: 2, marginY: 2 }} elevation={3}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          Add
        </Button>
      </Box>
    </Paper>
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
      <Box sx={{ overflowX: 'auto', maxHeight: '350px', overflowY: 'auto' }}>
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
              <TableRow key={index} sx={{
                backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff",
              }}>
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
    </Paper>
  );
};

const MealPlanComponent = () => {
  const [mealPlanTitle, setMealPlanTitle] = useState('');
  const [meals, setMeals] = useState([]);

  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  };

  const deleteMeal = (index) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Add Meal Plan
      </Typography>
      <TextField
        fullWidth
        label="Meal Plan Title"
        value={mealPlanTitle}
        onChange={(e) => setMealPlanTitle(e.target.value)}
        sx={{ mb: 3 }}
      />
      <MealTable meals={meals} onDelete={deleteMeal} />
      <AddMealPlan onAdd={addMeal} />
    </Box>
  );
};

export default MealPlanComponent;
