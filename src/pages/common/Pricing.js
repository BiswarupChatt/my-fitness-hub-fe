import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Grid, Typography, Container, Button, Card, CardContent, CardActions } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Footer from '../../components/Footer';
import { useAuth } from '../../services/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../utils/toastify';
import axios from '../../services/api/axios';

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
    subTitle: 'Best Value',
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
  const token = localStorage.getItem('token')
  console.log("user", user)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleButtonClick = async (price, title, color) => {

    if (!user || !user.isLoggedIn) {
      navigate('/login', { state: { from: location }, replace: true });
    }
    console.log(`The selected subscription is $${price} ${title}`);

    try {
      const loaded = await loadRazorpayScript()

      if (!loaded) {
        errorToast('Razorpay failed to load. Are you online?')
      }

      const response = await axios.post('/subscription/create-order', {
        amount: price,
        plan: title
      }, {
        headers: {
          'Authorization': token
        }
      })
      console.log("response", response.data)

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: response.data.order.amount,
        currency: response.data.order.currency,
        name: 'MyFitnessHub',
        description: `Purchase of ${title} for MyFitnessHub`,
        order_id: response.data.order.id,
        handler: async (ele) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = ele

          try {
            const result = await axios.post('/subscription/verify-signature', {
              order_id: razorpay_order_id,
              payment_id: razorpay_payment_id,
              signature: razorpay_signature,
              coachId: response.data.order.notes.coachId || response.data.subscription.coach,
              status: 'success',
              plan: response.data.order.notes.plan
            })

            if (result.data.status === 'Payment Successful') {
              successToast('Payment Successful')
              window.location.reload()
              setTimeout(() => {
                navigate('/')
              }, 1000);
            }

          } catch (err) {
            console.log('An error occurred while verifying the payment signature:', err);
            errorToast('An error occurred while processing your payment. Please try again.')
          }
        },
        theme: {
          color
        },
        modal: {
          ondismiss: async () => {
            try {
              const result = await axios.post('/subscription/verify-signature', {
                order_id: response.data.order.id,
                payment_id: null,
                signature: null,
                subscriptionId: response.data.subscription._id,
                coachId: response.data.order.notes.coachId || response.data.subscription.coach,
                status: 'failed'
              })
              console.log('Payment failed status stored', result)
              errorToast('Payment Dismissed')
            } catch (err) {
              console.log('Payment Dismissed', err)
              errorToast('Payment Dismissed')
            }
          },
          confirm_close: true
        }
      }
      const rzp1 = new window.Razorpay(options)
      rzp1.open()
    } catch (err) {
      console.log("error in pricing", err)
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
                  <Button onClick={() => handleButtonClick(subscription.price, subscription.title, subscription.color)} fullWidth variant="contained" sx={{
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
