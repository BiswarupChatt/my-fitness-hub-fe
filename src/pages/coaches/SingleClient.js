import { useState, useEffect } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Box, Tab, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startGetClient } from '../../services/redux/action/client-action';


export default function SingleCLient() {
    const [value, setValue] = useState('Profile');
    const { userId } = useParams()
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId && token) {
            dispatch(startGetClient(userId, token))
        }
    }, [userId, token, dispatch])

    const client = useSelector((state) => {
        return state.client.data
    })
    const error = useSelector((state) => {
        return state.client.error
    })

    console.log('userId', userId)
    console.log('client', client)
    console.log('error', error)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <h2>Single Client Screen {userId}</h2>
            <Container sx={{ py: { xs: 8, sm: 4 } }}>
                <Paper>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    onChange={handleChange}
                                    variant="scrollable" scrollButtons={true}
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
                            <TabPanel value="Profile">Profile</TabPanel>
                            <TabPanel value="Workout">Workout</TabPanel>
                            <TabPanel value="Nutrition">Nutrition</TabPanel>
                            <TabPanel value="Progress">Progress</TabPanel>
                            <TabPanel value="Program">Program</TabPanel>
                        </TabContext>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}