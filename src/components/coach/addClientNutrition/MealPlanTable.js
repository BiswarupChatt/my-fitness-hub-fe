import React from 'react';
import { Box, IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MealPlanTable({ mealPlan, onDelete }) {

    const totals = mealPlan.reduce(
        (acc, meal) => {
            acc.calories += meal.calories || 0;
            acc.fat += meal.fat || 0;
            acc.protein += meal.protein || 0;
            acc.carbohydrate += meal.carbohydrate || 0;
            return acc;
        },
        { calories: 0, fat: 0, protein: 0, carbohydrate: 0 }
    );

    return (
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
                    {mealPlan.map((meal, index) => (
                        <TableRow
                            key={index}
                            sx={{ backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#ffffff' }}
                        >
                            <TableCell>
                                <Typography variant="body1">{meal.foodName}</Typography>
                                <Typography variant="body2" color="textSecondary">{` ${meal.quantity} g`}</Typography>
                            </TableCell>
                            <TableCell>{meal.calories}</TableCell>
                            <TableCell>{meal.fat}</TableCell>
                            <TableCell>{meal.protein}</TableCell>
                            <TableCell>{meal.carbohydrate}</TableCell>
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
                                boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
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
                                    Carbohydrates: {totals.carbohydrate} g
                                </Typography>
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Box>
    );
};

