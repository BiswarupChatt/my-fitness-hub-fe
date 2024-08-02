import React from 'react';
import { Container, Paper, Typography, Box, Avatar, Grid } from '@mui/material';
import moment from 'moment';

export default function ClientProfile({ client }) {

    console.log('client coming from client profile Page', client)

    return (
        <Container sx={{ py: { xs: 4, sm: 8 }, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 2, maxWidth: 800, width: '100%' }}>
                <Box display="flex" justifyContent="center" mb={3}>
                    <Avatar
                        src={client.user.profileImage ? client.user.profileImage : client.firstName}
                        alt={client.firstName}
                        sx={{ width: 100, height: 100 }}
                    />
                </Box>
                <Typography variant="h4" align="center" gutterBottom>
                    {client.firstName} {client.lastName}
                </Typography>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Grid item xs={12} sm={6} sx={{ padding: 2 }} >
                        <Box sx={{ display: 'flex', justifyContent: 'left', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Email:</Typography>
                            <Typography variant="subtitle1" sx={{ marginX: 1, textAlign: 'left', wordBreak: 'break-all', overflowWrap: 'break-word' }}>{client.email}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'left', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Phone Number:</Typography>
                            <Typography variant="subtitle1" sx={{ marginX: 1, textAlign: 'left', wordBreak: 'break-all', overflowWrap: 'break-word' }}>{client.phoneNumber ? client.phoneNumber : 'N/A'}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'left', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Date of Birth:</Typography>
                            <Typography variant="subtitle1" sx={{ marginX: 1, textAlign: 'left', wordBreak: 'break-all', overflowWrap: 'break-word' }}>{client.dateOfBirth ? moment(client.dateOfBirth).format("Do MMMM YYYY") : 'N/A'}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'left', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Gender:</Typography>
                            <Typography variant="subtitle1" sx={{ marginX: 1, textAlign: 'left', wordBreak: 'break-all', overflowWrap: 'break-word' }}>{client.gender ? client.gender : 'N/A'}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'left', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Weight:</Typography>
                            <Typography variant="subtitle1" sx={{ marginX: 1, textAlign: 'left', wordBreak: 'break-all', overflowWrap: 'break-word' }}>{client.weight ? (`${client.weight} Kg`) : 'N/A'}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'left', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginX: 1, textAlign: 'left' }}>Height:</Typography>
                            <Typography variant="subtitle1" sx={{ marginX: 1, textAlign: 'left', wordBreak: 'break-all', overflowWrap: 'break-word' }}>{client.height ? (`${client.height} Cm`) : 'N/A'}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}