import { Box, Button, Grid, Typography, ListItem, ListItemText, TextField, InputAdornment, IconButton, Paper, Tooltip } from '@mui/material'
import { Add, RemoveCircle } from '@mui/icons-material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PieChart } from '@mui/x-charts/PieChart';


// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: {
//         xs: '90%', sm: '80%', md: '60%', lg: '50%', xl: '30%',
//     },
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     borderRadius: 2,
//     p: 4,
//     maxHeight: '75vh',
//     overflowY: 'auto',
// }

const data = [
    { id: 0, value: 20, label: 'Protein' },
    { id: 1, value: 30, label: 'Fats' },
    { id: 2, value: 50, label: 'Carbohydrates' },
];


export default function AddClientNutrition() {

    return (
        <Grid component="form" noValidate>
            <Typography variant="h4" component="h2">
                Create Nutrition Plan
            </Typography>
            <Paper elevation={3}>
                <Grid mb={2} p={2}>
                    <TextField
                        fullWidth
                        id="mealPlanTitle"
                        name="mealPlanTitle"
                        label="Meal Plan Title"
                        placeholder='eg: Breakfast / Day-1'
                    />
                    <Paper elevation={5} sx={{ m: 2, p: 2, position: 'relative' }}>
                        <Tooltip title="Remove">
                            <IconButton color="error" sx={{ position: 'absolute', top: 5, right: 5 }} >
                                <RemoveCircle />
                            </IconButton>
                        </Tooltip>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} margin={1}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={6} lg={6}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            id="foodName"
                                            name="foodName"
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
                                            onClick={() => { }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            id="quantity"
                                            name="quantity"
                                            label="Quantity"
                                            type="number"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        g {/* Hardcoded unit */}
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Nutrition Information</Typography>
                                        <Typography variant="body2" sx={{ backgroundColor: '#f0f0f0', p: 1, borderRadius: 1 }}>Calories: N/A</Typography>
                                        <Typography variant="body2" sx={{ backgroundColor: '#e0e0e0', p: 1, borderRadius: 1 }}>Protein: N/A g</Typography>
                                        <Typography variant="body2" sx={{ backgroundColor: '#d0d0d0', p: 1, borderRadius: 1 }}>Fats: N/A g</Typography>
                                        <Typography variant="body2" sx={{ backgroundColor: '#c0c0c0', p: 1, borderRadius: 1 }}>Carbohydrates: N/A g</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Button variant="outlined" color="primary" sx={{ mt: 3, ml: 1 }} >
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" sx={{ mt: 3, ml: 1 }} >
                        Add More
                    </Button>
                </Grid>
            </Paper >

            {/* here i want to add total nutrition value component  */}

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Another Meal Plan
            </Button>


            <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Total Nutrition Values</Typography>
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
            <TextField
                fullWidth
                id="additionalNotes"
                name="additionalNotes"
                label="Additional Notes"
                sx={{ mt: 2 }}
                placeholder='eg: Chew Your Food Properly ' />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }} >
                Submit
            </Button>

        </Grid >
    );
};

