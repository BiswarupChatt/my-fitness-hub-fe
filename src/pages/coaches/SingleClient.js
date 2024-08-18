import { useState, useEffect } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Box, Tab, Paper, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startGetClient } from '../../services/redux/action/client-action';
import { startGetMealPlan } from '../../services/redux/action/mealPlan-action';
import { Helmet } from 'react-helmet-async';

import ClientProfile from '../../components/coach/client/ClientProfile';
import ClientWorkout from '../../components/coach/client/ClientWorkout';
import ClientNutrition from '../../components/coach/client/ClientNutrition';
import ClientProgress from '../../components/coach/client/ClientProgress';
import ClientProgram from '../../components/coach/client/ClientProgram';


export default function SingleCLient() {
    const [value, setValue] = useState('Nutrition');
    const { clientId } = useParams()
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    useEffect(() => {
        if (clientId && token) {
            dispatch(startGetClient(clientId, token))
            dispatch(startGetMealPlan(clientId, token))
        }
    }, [clientId, token, dispatch])

    const client = useSelector((state) => {
        return state.client.data
    })
    const mealPlan = useSelector((state) => {
        return state.mealPlan.data
    })
    const error = useSelector((state) => {
        return state.client.error
    })

    // console.log('mealPlan', mealPlan)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <Helmet>
                <title>{client ? `${client.firstName} ${client.lastName}` : 'Client'}</title>
            </Helmet>
            <Container sx={{ py: { xs: 8, sm: 4 } }}>
                <Paper elevation={3} sx={{ padding: 1 }}>
                    <Box sx={{ width: '100%', }}>
                        {!client ? (<CircularProgress />) : (
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons={true}
                                        aria-label="scrollable auto tabs example"
                                        allowScrollButtonsMobile
                                    >
                                        <Tab label="Profile" value="Profile" />
                                        <Tab label="Workout" value="Workout" />
                                        <Tab label="Nutrition" value="Nutrition" />
                                        <Tab label="Progress" value="Progress" />
                                        <Tab label="Program" value="Program" />
                                    </TabList>
                                </Box>
                                <TabPanel value="Profile"><ClientProfile client={client} /></TabPanel>
                                <TabPanel value="Workout"><ClientWorkout /></TabPanel>
                                <TabPanel value="Nutrition"><ClientNutrition clientId={clientId} mealPlan={mealPlan} /></TabPanel>
                                <TabPanel value="Progress"><ClientProgress /></TabPanel>
                                <TabPanel value="Program"><ClientProgram /></TabPanel>
                            </TabContext>
                        )}
                    </Box>
                </Paper>
            </Container>
        </>
    )
}