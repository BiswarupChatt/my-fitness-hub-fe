import { Box, Button, Grid, Typography, ListItem, ListItemText, TextField, InputAdornment, IconButton, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
    maxHeight: '75vh',
    overflowY: 'auto',
}

export default function AddClientNutrition() {
    return (
        <Box component="form" noValidate>
            <Typography variant="h4" component="h2">
                Create Nutrition Plan
            </Typography>
            <Paper elevation={3}>
                <Box mb={2} p={2}>
                    <TextField
                        fullWidth
                        id="mealPlanTitle"
                        name="mealPlanTitle"
                        label="Meal Plan Title"
                    />
                    <Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <Grid container spacing={2} m={1} flexGrow={1} alignItems="center">
                                <Grid item xs={6}>
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
                                <Grid item xs={6}>
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
                                                    g  {/* Hardcoded unit */}
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Box display="flex" alignItems="center" m={1}>
                                <IconButton>
                                    <RemoveCircleIcon />
                                </IconButton>
                                <IconButton>
                                    <AddCircleIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Grid item xs={12} sm={6} md={4} display='flex' alignItems='center' justifyContent='flex-start' flexWrap='wrap'>
                            <Typography variant="body2" sx={{ marginLeft: 2 }}>Calories: N/A</Typography>
                            <Typography variant="body2" sx={{ marginLeft: 2 }}>Protein: N/A g</Typography>
                            <Typography variant="body2" sx={{ marginLeft: 2 }}>Fats: N/A g</Typography>
                            <Typography variant="body2" sx={{ marginLeft: 2 }}>Carbohydrates: N/A g</Typography>
                        </Grid>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mr: 1 }}
                    >
                        Add Item
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Reset
                    </Button>
                </Box>
            </Paper>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Another Meal Plan
            </Button>
            <TextField fullWidth id="additionalNotes" name="additionalNotes" label="Additional Notes" sx={{ mt: 2 }} />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} >
                Submit
            </Button>

        </Box>
    );
};

