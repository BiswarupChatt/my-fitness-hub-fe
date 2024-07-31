import React from 'react';
import { Container, Paper, Typography, Box, Avatar, Grid } from '@mui/material';

export default function ClientProfile() {

    const email = "yourEmail@email.com";
    const firstName = "John";
    const lastName = "Doe";
    const profilePicture = "https://picsum.photos/id/64/200";
    const dateOfBirth = "1990-01-01T00:00:00.000Z";
    const height = 180;
    const weight = 75;
    const gender = "Male";
    const phoneNumber = "1234567890";

    return (
        <Container sx={{ py: { xs: 4, sm: 8 }, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 2, maxWidth: 800, width: '100%' }}>
                <Box display="flex" justifyContent="center" mb={3}>
                    <Avatar
                        src={profilePicture}
                        alt={firstName}
                        sx={{ width: 100, height: 100 }}
                    />
                </Box>
                <Typography variant="h4" align="center" gutterBottom>
                    {firstName} {lastName}
                </Typography>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Grid item xs={12} md={6} sx={{ padding: 2 }} >
                        <Box display="flex">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Email:</Typography>
                            <Typography variant="subtitle1">{email}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ padding: 2 }}>
                        <Box display="flex">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Phone Number:</Typography>
                            <Typography variant="subtitle1">{phoneNumber}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ padding: 2 }}>
                        <Box display="flex">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Date of Birth:</Typography>
                            <Typography variant="subtitle1">{new Date(dateOfBirth).toLocaleDateString()}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ padding: 2 }}>
                        <Box display="flex">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Gender:</Typography>
                            <Typography variant="subtitle1">{gender}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ padding: 2 }}>
                        <Box display="flex">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Weight:</Typography>
                            <Typography variant="subtitle1">{weight} kg</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ padding: 2 }}>
                        <Box display="flex">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Height:</Typography>
                            <Typography variant="subtitle1">{height} cm</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}