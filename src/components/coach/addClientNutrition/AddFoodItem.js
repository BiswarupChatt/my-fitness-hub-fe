import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid, TextField, InputAdornment } from '@mui/material';
import SelectFoodItemModal from './SelectFoodItem';

const validationSchema = yup.object({
    foodItem: yup.string().required('Required'),
    quantity: yup.number().required('Required').min(1),
    note: yup.string(),
});

const initialValues = {
    foodItem: 'Mango',
    quantity: '100',
    calories: 10,
    fat: 10,
    protein: 10,
    carbohydrates: 10,
    note: 'Note Example',
};

export default function AddFoodItem({ onAdd }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleFoodModalOpen = () => setModalOpen(true);

    const handleFoodModalClose = () => {
        return setModalOpen(false);
    };

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
            <Grid component="form" xs={12} md={6} onSubmit={handleSubmit} sx={{ mt: 3, p: 2, border: '1px solid grey' }}>
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
                            onClick={handleFoodModalOpen}
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
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
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
                    <>
                        <SelectFoodItemModal open={modalOpen} handleFoodModalClose={handleFoodModalClose} />
                    </>
                </Grid>
                <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
                    Add Food
                </Button>
            </Grid>
        </Grid>
    );
};

