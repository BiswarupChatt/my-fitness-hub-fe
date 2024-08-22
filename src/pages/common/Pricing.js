import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Grid, Typography, Container, Button, Card, CardContent, CardActions } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Footer from '../../components/Footer';
import { useAuth } from '../../services/context/AuthContext';
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';

const defaultTheme = createTheme();

const subscriptions = [
  {
    title: 'Monthly Subscription',
    subTitle: 'Flexible',
    price: 599,
    features: [
      { text: 'Full Access to Features', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Cancel Anytime', included: true },
      { text: 'No Long-Term Commitment', included: false },
    ],
    buttonText: 'Start Monthly',
    color: '#3287a8',
  },
  {
    title: 'Yearly Subscription',
    subTitle: 'Long Time Commitment',
    price: (599 * 12 * 0.85).toFixed(2),
    discount: '15% OFF',
    features: [
      { text: 'Full Access to Features', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Cancel Anytime', included: true },
      { text: 'Save 10% with Yearly Billing', included: true },
    ],
    buttonText: 'Start Yearly',
    color: '#3aa832',
  },
];

export default function Pricing() {

  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  console.log("user", user)

  const handleButtonClick = (price, title) => {

    if (user && user.isLoggedIn) {
      console.log(`The selected subscription is $${price} ${title}`);
    } else {
      navigate('/login', { state: { from: location }, replace: true })
    }

  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      {/* Header */}
      <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Simple Pricing!
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" component="p">
          My FitnessHub is 100% free for your clients. We will never charge them!
        </Typography>
      </Container>

      {/* Subscription Options */}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} justifyContent="center">
          {subscriptions.map((subscription) => (
            <Grid item key={subscription.title} xs={12} sm={6} md={5}>
              <Card
                sx={{
                  display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f5f5f5', border: `4px solid ${subscription.color}`, '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#e0e0e0',
                    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
                  }, position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                  <Typography variant="h5" align="center" gutterBottom fontWeight='medium'>
                    {subscription.title}
                  </Typography>
                  <Typography variant="body1" align="center" gutterBottom fontWeight='medium' color={subscription.color}>
                    {subscription.subTitle}
                  </Typography>
                  {subscription.discount && (
                    <Typography variant="h6" align="center" color="error">
                      {subscription.discount}
                    </Typography>
                  )}
                  <Typography variant="h4" align="center" color="text.primary" gutterBottom>
                    &#8377; {subscription.price}
                  </Typography>
                  <ul>
                    {subscription.features.map((feature) => (
                      <Box
                        component="li"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={feature.text}
                        sx={{ listStyleType: 'none', mb: 1 }}
                      >
                        {feature.included ? (
                          <CheckCircleIcon sx={{ color: 'green', mr: 1 }} />
                        ) : (
                          <CancelIcon sx={{ color: 'red', mr: 1 }} />
                        )}
                        <Typography variant="subtitle1" align="center">
                          {feature.text}
                        </Typography>
                      </Box>
                    ))}
                  </ul>
                </CardContent>
                <Box
                  sx={{
                    position: 'absolute', top: -10, right: -10, padding: '10px', borderRadius: '5px', backgroundColor: 'white', border: `2px solid ${subscription.color}`, display: 'none', '&:hover': {
                      display: 'block',
                    },
                  }}
                >
                </Box>
                <CardActions>
                  <Button onClick={() => handleButtonClick(subscription.price, subscription.title)} fullWidth variant="contained" sx={{
                    backgroundColor: subscription.color,
                    '&:hover': {
                      backgroundColor: subscription.color,
                    },
                  }}
                  >
                    {subscription.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </ThemeProvider>
  );
}
