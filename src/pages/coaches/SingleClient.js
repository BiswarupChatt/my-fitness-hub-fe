import { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Box, Tab, Paper } from '@mui/material';


export default function SingleCLient() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <h2>Single Client Screen</h2>
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
                                    <Tab label="Workout" value="Workout" />
                                    <Tab label="Nutrition" value="Nutrition" />
                                    <Tab label="Progress" value="Progress" />
                                    <Tab label="Program" value="Program" />
                                </TabList>
                            </Box>
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