import { Container, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'


export default function Unauthorized() {

    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/');
    }

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                backgroundColor: 'background.default',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    mb: 4,
                }}
            >
                <LockOutlinedIcon sx={{ fontSize: 100, color: 'error.main' }} />
                <Typography variant="h1" component="h1" sx={{ mt: 2 }}>
                    403
                </Typography>
                <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
                    Forbidden
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                    You do not have permission to view this page. Please contact support if you believe this is an error.
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGoHome}
                sx={{ mt: 3 }}
            >
                Go to Homepage
            </Button>
        </Container>
    )
}