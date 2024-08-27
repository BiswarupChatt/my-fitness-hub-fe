import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
    {
        icon: <SettingsSuggestRoundedIcon />,
        title: 'Seamless Adaptability',
        description:
            'Effortlessly adapt to your clients\' evolving needs with our app. Whether it\'s tracking progress or adjusting plans, our platform simplifies every task, enhancing your efficiency and effectiveness as a coach.',
    },
    {
        icon: <ConstructionRoundedIcon />,
        title: 'Enduring Performance',
        description:
            'Built with longevity in mind, our app ensures consistent performance over time. Rely on a platform that\'s designed to grow with your coaching business, offering lasting value and reliability.',
    },
    {
        icon: <ThumbUpAltRoundedIcon />,
        title: 'Intuitive User Interface',
        description:
            'Experience an interface designed with fitness coaches in mind. Our app integrates smoothly into your daily routine, providing a user-friendly experience that minimizes learning curves and maximizes productivity.',
    },
    {
        icon: <AutoFixHighRoundedIcon />,
        title: 'Cutting-Edge Features',
        description:
            'Stay ahead in your coaching practice with innovative tools that set new industry standards. Our app offers features that evolve alongside your needs, ensuring you always have the best resources at your fingertips.',
    },
    {
        icon: <SupportAgentRoundedIcon />,
        title: 'Responsive Support',
        description:
            'Enjoy peace of mind with our dedicated support team. We\'re here to assist you with any challenges, providing ongoing help that ensures you and your clients have a seamless experience from day one.',
    },
    {
        icon: <QueryStatsRoundedIcon />,
        title: 'Precision-Driven Design',
        description:
            'Every detail in our app is crafted with care to enhance your coaching experience. From detailed tracking to customizable options, our platform ensures precision in every aspect of client management.',
    },
];

export default function Highlights() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                color: 'white',
                bgcolor: '#06090a',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography component="h2" variant="h4" fontWeight='Medium'>
                        Highlights
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.400' }}>
                        Explore why our product stands out: adaptability, durability,
                        user-friendly design, and innovation. Enjoy reliable customer support and
                        precision in every detail.
                    </Typography>
                </Box>
                <Grid container spacing={2.5}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Stack
                                direction="column"
                                color="inherit"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'grey.800',
                                    background: 'transparent',
                                    backgroundColor: 'grey.900',
                                }}
                            >
                                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                                <div>
                                    <Typography fontWeight="medium" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                        {item.description}
                                    </Typography>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
