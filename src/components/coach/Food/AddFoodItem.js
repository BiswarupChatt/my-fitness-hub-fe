import { useState, useEffect } from 'react';
import axios from '../../../services/api/axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, TextField, Button, Container, Divider, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Modal, Box
} from '@mui/material';
import { useFormik } from 'formik';
import { addFoodItemValidation } from '../../../validations/addFoodItemValidation';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%', sm: '80%', md: '60%', lg: '50%', xl: '30%',
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

export default function AddFoodItem() {

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSend = () => {
        // Handle the send action here, like sending the email address to the server
        console.log(email);
        setEmail('')
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const initialValues = {
        foodName: ''
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: addFoodItemValidation,
        onSubmit: async (value, { resetForm }) => {
            try {


            } catch (err) {

            } finally {

            }
        }
    });


    return (
        <Container id="clients" sx={{ py: { xs: 8, sm: 4 } }}>
            <Grid container alignItems="center" justifyContent="space-between" pb={4}>
                <Grid item>
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="medium">
                        Food List
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Add Food Item
                    </Button>
                </Grid>
            </Grid>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        Add Food Item
                    </Typography>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Food Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={values.foodName}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose} color="primary" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSend} color="primary" variant="contained">
                            Send Invitation
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container >
    )
}