import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CreateMealPlan from "../MealPlan/createMealPlan/CreateMealPlan";
import GetMealPlan from '../MealPlan/getMealPlan/GetMealPlan';
import { useParams } from "react-router-dom";

export default function ClientNutrition() {
    const { clientId } = useParams()
    const [expanded, setExpanded] = useState(false)

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    console.log('Client ID in ClientNutrition:', clientId);

    return (
        <>
            <GetMealPlan />
            <Accordion
                expanded={expanded}
                onChange={handleAccordionChange}
                sx={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    mb: 2,
                    '&:before': { display: 'none' },
                }}
            >
                <AccordionSummary
                    expandIcon={expanded ? (<RemoveCircleIcon sx={{ color: '#ffffff' }} />) : (<AddCircleIcon sx={{ color: '#ffffff' }} />)}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#155a9d' }, }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Add Meal Plan
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ backgroundColor: '#e3f2fd', padding: '16px', borderRadius: '0 0 8px 8px', }}>
                    <CreateMealPlan clientId={clientId} />
                </AccordionDetails>
            </Accordion>
        </>
    );
}
