import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link as LinkComponent } from 'react-router-dom';

export default function Hero() {
    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 15 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h1"
                        sx={{
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                            fontWeight: 'Medium',
                        }}
                    >
                        The Best Platform for Managing Client's for <Box sx={{ color: '#1976d2' }}>Fitness Coaches</Box>
                    </Typography>

                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        Effortlessly manage clients, track progress. Elevate your coaching business today!
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignSelf="center"
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                    >
                        <Button component={LinkComponent} to={'/coach-signup'} variant="contained" color="primary">
                            Get Started
                        </Button>
                    </Stack>
                    <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
                        No Credit Card Required. <br />By clicking &quot;Get Started&quot; you agree to our&nbsp;
                        <Link component={LinkComponent} to={'/terms'} target='_blank' color="primary">
                            Terms & Conditions
                        </Link>
                        .
                    </Typography>

                </Stack>
                <Box
                    id="image"
                    sx={(theme) => ({
                        mt: { xs: 8, sm: 10 },
                        alignSelf: 'center',
                        height: { xs: 200, sm: 700 },
                        width: '100%',
                        backgroundImage:
                            theme.palette.mode === 'light'
                                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                                : 'url("/static/images/templates/templates-images/hero-dark.png")',
                        backgroundSize: 'cover',
                        borderRadius: '10px',
                        outline: '1px solid',
                        outlineColor:
                            theme.palette.mode === 'light'
                                ? alpha('#BFCCD9', 0.5)
                                : alpha('#9CCCFC', 0.1),
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
                    })}
                />
            </Container>
            <Divider variant="middle"/>
        </Box>
    );
}