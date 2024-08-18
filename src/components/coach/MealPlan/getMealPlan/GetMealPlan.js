import React from 'react'
import { Box, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material'

export default function GetMealPlan({ mealPlan }) {

    console.log('mealPlan in get meal plan', mealPlan)

    if (!mealPlan || mealPlan.length === 0) {
        return <Typography variant="h6">No meal plans available</Typography>
    }

    return (
        <>
            {mealPlan.map((meal, index) => {

                const totals = meal.foods.reduce(
                    (acc, food) => {
                        acc.calories += food.calories || 0
                        acc.fat += food.fat || 0
                        acc.protein += food.protein || 0
                        acc.carbohydrate += food.carbohydrate || 0
                        return acc
                    },
                    { calories: 0, fat: 0, protein: 0, carbohydrate: 0 }
                )

                return (
                    <Box key={index} sx={{ maxHeight: '400px', overflow: 'auto', border: '1px solid grey', borderRadius: '5px', my: '10px' }}>

                        {/* Sticky Title */}
                        <Box sx={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: '#fff', padding: '10px', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{meal.title}</Typography>
                        </Box>

                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', top: '48px', position: 'sticky', zIndex: 1 }}>Food Item</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', top: '48px', position: 'sticky', zIndex: 1 }}>Calories</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', top: '48px', position: 'sticky', zIndex: 1 }}>Fat</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', top: '48px', position: 'sticky', zIndex: 1 }}>Protein</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', top: '48px', position: 'sticky', zIndex: 1 }}>Carbohydrates</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', top: '48px', position: 'sticky', zIndex: 1 }}>Note</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {meal.foods.map((foodItem, foodIndex) => (
                                    <TableRow
                                        key={foodIndex}
                                        sx={{ backgroundColor: foodIndex % 2 === 0 ? '#ffffff' : '#f7f7f7' }}
                                    >
                                        <TableCell>
                                            <Typography variant="body1">{foodItem.foodName}</Typography>
                                            <Typography variant="body2" color="textSecondary">{` ${foodItem.quantity} g`}</Typography>
                                        </TableCell>
                                        <TableCell>{foodItem.calories}</TableCell>
                                        <TableCell>{foodItem.fat}</TableCell>
                                        <TableCell>{foodItem.protein}</TableCell>
                                        <TableCell>{foodItem.carbohydrate}</TableCell>
                                        <TableCell>{foodItem.note}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        sx={{
                                            position: 'sticky',
                                            bottom: 0,
                                            backgroundColor: '#f0f0f0',
                                            borderTop: '2px solid rgba(224, 224, 224, 1)',
                                            padding: '10px',
                                            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', gap: '20px', textAlign: 'right' }}>

                                                {meal.additionalNotes ? (
                                                    <>
                                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                            Additional Notes:
                                                        </Typography>
                                                        <Typography component="span" variant="body2">
                                                            {meal.additionalNotes}
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    null
                                                )}

                                            </Box>
                                            <Box sx={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    Total:
                                                </Typography>
                                                <Typography component="span" variant="body2">
                                                    <strong>{totals.calories}</strong> kCal
                                                </Typography>
                                                <Typography component="span" variant="body2">
                                                    <strong>{totals.fat}</strong> g Fat
                                                </Typography>
                                                <Typography component="span" variant="body2">
                                                    <strong>{totals.protein}</strong> g Protein
                                                </Typography>
                                                <Typography component="span" variant="body2">
                                                    <strong>{totals.carbohydrate}</strong> g Carbs
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </Box>
                )
            })}
        </>
    )
}
