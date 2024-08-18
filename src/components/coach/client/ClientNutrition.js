import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CreateMealPlan from "../MealPlan/createMealPlan/CreateMealPlan";
import GetMealPlan from '../MealPlan/getMealPlan/GetMealPlan';

export default function ClientNutrition({ clientId, mealPlan }) {

    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    console.log('Client ID in ClientNutrition:', clientId);

    return (
        <>
            <GetMealPlan mealPlan={mealPlan} />

            <Accordion
                expanded={expanded}
                onChange={handleAccordionChange}
                sx={{
                    backgroundColor: '#fafafa',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    mb: 2,
                    '&:before': { display: 'none' },
                }}
            >
                <AccordionSummary
                    expandIcon={expanded ? (<RemoveCircleIcon sx={{ color: '#ffffff' }} />) : (<AddCircleIcon sx={{ color: '#ffffff' }} />)}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ 
                        backgroundColor: '#1976d2', 
                        color: '#fff', 
                        '&:hover': { backgroundColor: '#155a9d' }, 
                        borderRadius: '8px',
                        transition: 'background-color 0.3s',
                        padding: '0 16px',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                        Add Meal Plan
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '0 0 8px 8px' }}>
                    <CreateMealPlan clientId={clientId} />
                </AccordionDetails>
            </Accordion>
        </>
    );
}
