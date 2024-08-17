import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid, TextField, InputAdornment } from '@mui/material';
import SelectFoodItemModal from './SelectFoodItem';

const validationSchema = yup.object({
    foodName: yup.string().required('Required'),
    quantity: yup.number().required('Required').min(1),
    note: yup.string(),
});

const initialValues = {
    foodId: '',
    foodName: '',
    quantity: '',
    unit: '', // Include unit here
    calories: 0,
    fat: 0,
    protein: 0,
    carbohydrate: 0,
    note: '',
};

export default function AddFood({ onAdd }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    const handleFoodModalOpen = () => {
        setModalOpen(true);
    };

    const handleFoodModalClose = () => {
        setModalOpen(false);
    };

    const handleFoodItemSelect = (foodItem) => {
        setSelectedFood(foodItem);
    };

    const { values, handleChange, handleSubmit, touched, errors, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
            onAdd(values);
            setSelectedFood(null);
            setValues(initialValues)
        },
    });

    useEffect(() => {
        if (selectedFood) {
            setValues({
                foodId: selectedFood._id,
                foodName: selectedFood.foodName,
                quantity: 0,
                unit: selectedFood.unit || '',
                calories: selectedFood.calories || 0,
                fat: selectedFood.fat || 0,
                protein: selectedFood.protein || 0,
                carbohydrate: selectedFood.carbohydrate || 0,
                note: '',
            });
        }
    }, [selectedFood, setValues]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseFloat(e.target.value) || 0; // Default to 0 if NaN
        if (selectedFood && newQuantity > 0) {
            const factor = newQuantity / selectedFood.quantity;
            setValues({
                ...values,
                quantity: newQuantity,
                calories: selectedFood.calories * factor,
                fat: selectedFood.fat * factor,
                protein: selectedFood.protein * factor,
                carbohydrate: selectedFood.carbohydrate * factor,
            });
        } else {
            setValues({ ...values, quantity: newQuantity });
        }
    };

    return (
        <Grid container justifyContent="flex-end">
            <Grid
                component="form"
                item
                xs={12}
                md={6}
                onSubmit={handleSubmit}
                sx={{ mt: 3, p: 2, border: '1px solid grey' }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            id="foodName"
                            name="foodName"
                            label="Food Item"
                            value={values.foodName} // Use values.foodName to display the selected item
                            onChange={handleChange}
                            onClick={handleFoodModalOpen}
                            error={touched.foodName && Boolean(errors.foodName)}
                            helperText={touched.foodName && errors.foodName}
                            InputProps={{
                                readOnly: true,
                            }}
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
                            onChange={handleQuantityChange}
                            error={touched.quantity && Boolean(errors.quantity)}
                            helperText={touched.quantity && errors.quantity}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {selectedFood ? selectedFood.unit : null}
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
                            placeholder="e.g., Chew Your Food"
                            value={values.note}
                            onChange={handleChange}
                            error={touched.note && Boolean(errors.note)}
                            helperText={touched.note && errors.note}
                        />
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
                    Add Food
                </Button>
            </Grid>
            <SelectFoodItemModal
                open={modalOpen}
                handleFoodModalClose={handleFoodModalClose}
                onFoodItemSelect={handleFoodItemSelect} // Pass the handler here
            />
        </Grid>
    );
}
