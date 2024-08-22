import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const defaultTheme = createTheme();

const subscriptions = [
  {
    title: 'Monthly Subscription',
    price: 599,
    features: [
      'Full Access to Features',
      'Priority Support',
      'Cancel Anytime',
    ],
    buttonText: 'Choose Monthly',
    hoverLabel: 'Normal',
    borderColor: 'blue',
    popupMessage: 'This is the standard option with no discounts.',
  },
  {
    title: 'Yearly Subscription',
    price: Math.round(599 * 12 * 0.9),
    discount: '10% OFF',
    features: [
      'Full Access to Features',
      'Priority Support',
      'Cancel Anytime',
      'Save 10% with Yearly Billing',
    ],
    buttonText: 'Choose Yearly',
    hoverLabel: 'Best Buy',
    borderColor: 'red',
    popupMessage: 'Get the best value with our yearly plan and save 10%.',
  },
];

export default function Pricing() {
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
          Subscription Plans
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" component="p">
          Choose the plan that best suits your needs. Whether you need flexibility or long-term savings, we have a plan for you.
        </Typography>
      </Container>

      {/* Subscription Options */}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} justifyContent="center">
          {subscriptions.map((subscription) => (
            <Grid item key={subscription.title} xs={12} sm={6} md={5}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#e0e0e0',
                    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
                  },
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    {subscription.title}
                  </Typography>
                  {subscription.discount && (
                    <Typography variant="h6" align="center" color="error">
                      {subscription.discount}
                    </Typography>
                  )}
                  <Typography variant="h4" align="center" color="text.primary" gutterBottom>
                    ${subscription.price}
                  </Typography>
                  <ul>
                    {subscription.features.map((feature) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={feature}
                        sx={{ listStyleType: 'none', mb: 1 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: 'white',
                    border: `2px solid ${subscription.borderColor}`,
                    display: 'none',
                    '&:hover': {
                      display: 'block',
                    },
                  }}
                >
                  <Typography variant="subtitle2" color={subscription.borderColor}>
                    {subscription.hoverLabel}
                  </Typography>
                </Box>
                <CardActions>
                  <Button fullWidth variant="contained" color="primary">
                    {subscription.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
