import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link component={RouterLink} to="/">
        MyFitnessHub&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const quickLinksRow1 = [
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Login', path: '/login' },
];

const quickLinksRow2 = [
  { name: 'Coach Signup', path: '/coach-signup' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 6, sm: 8 },
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-around',
            width: '100%',
            gap: { xs: 4, sm: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
              width: { xs: '100%', sm: '50%' },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
            >
              MyFitnessHub
            </Typography>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Subscribe to our Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Get weekly updates and promotions delivered directly to your inbox.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="newsletter-email"
                size="small"
                variant="outlined"
                fullWidth
                placeholder="Your email address"
                inputProps={{
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address',
                }}
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-end' }, // Adjusted to right-align
              width: { xs: '100%', sm: '50%' },
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 4 },
                justifyContent: 'flex-end', // Ensures the content inside is right-aligned
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {quickLinksRow1.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    color="text.secondary"
                    to={link.path}
                    underline="hover"
                    sx={{ fontSize: '0.875rem', textAlign: 'right' }} // Right-aligns the text
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {quickLinksRow2.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    color="text.secondary"
                    to={link.path}
                    underline="hover"
                    sx={{ fontSize: '0.875rem', textAlign: 'right' }} // Right-aligns the text
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            pt: { xs: 4, sm: 8 },
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Copyright />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: { xs: 2, sm: 0 },
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <IconButton
              color="inherit"
              href="https://github.com/mui"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com/mui"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com/company/mui/"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
