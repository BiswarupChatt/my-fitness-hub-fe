import React from 'react';
import { Container, Typography, Box, Grid, Avatar, Card, CardContent, IconButton } from '@mui/material';
import { LinkedIn, Twitter } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Helmet } from "react-helmet";

const teamMembers = [
    {
        name: "John Doe",
        title: "Founder & CEO",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        linkedin: "https://www.linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe"
    },
    {
        name: "Jane Smith",
        title: "Chief Operating Officer",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        linkedin: "https://www.linkedin.com/in/janesmith",
        twitter: "https://twitter.com/janesmith"
    },
    {
        name: "Michael Johnson",
        title: "Chief Technology Officer",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        linkedin: "https://www.linkedin.com/in/michaeljohnson",
        twitter: "https://twitter.com/michaeljohnson"
    },
];

const coreValues = [
    {
        title: "Innovation",
        description: "We are constantly innovating to bring the best products and services to our customers, helping them stay ahead in their fitness journey.",
    },
    {
        title: "Integrity",
        description: "We operate with integrity in all our interactions, ensuring transparency and honesty in everything we do.",
    },
    {
        title: "Community",
        description: "We believe in the power of community and strive to create a supportive environment where everyone can succeed.",
    },
];

// Styled component for the card hover effect
const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    '&:hover .overlay': {
        opacity: 1,
        transform: 'translateY(0)',
    },
}));

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transform: 'translateY(100%)',
    transition: 'all 0.3s ease',
}));

export default function AboutUs() {
    return (
        <>
            <Helmet>
                <title>About MyFitnessHub</title>
            </Helmet>

            <Container sx={{ marginTop: 5 }}>
                {/* Mission Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        At MyFitnessHub, our mission is to empower individuals to achieve their fitness goals through innovative technology, personalized coaching, and a supportive community. We believe that with the right tools and guidance, everyone can lead a healthier, happier life.
                    </Typography>
                </Box>

                {/* Core Values Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Core Values
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {coreValues.map((value, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {value.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Team Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Meet Our Team
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <StyledCard sx={{ p: 2 }}>
                                    <Avatar alt={member.name} src={member.image} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {member.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {member.title}
                                        </Typography>
                                    </CardContent>
                                    <Overlay className="overlay">
                                        <Box>
                                            <IconButton 
                                                aria-label="LinkedIn" 
                                                component="a" 
                                                href={member.linkedin} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                sx={{ color: 'white' }}
                                            >
                                                <LinkedIn />
                                            </IconButton>
                                            <IconButton 
                                                aria-label="Twitter" 
                                                component="a" 
                                                href={member.twitter} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                sx={{ color: 'white' }}
                                            >
                                                <Twitter />
                                            </IconButton>
                                        </Box>
                                    </Overlay>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
