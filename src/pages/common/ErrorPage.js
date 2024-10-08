import { Container, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'


export default function ErrorPage() {

    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
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
                <ErrorOutlineIcon sx={{ fontSize: 100, color: 'primary.main' }} />
                <Typography variant="h1" component="h1" sx={{ mt: 2 }}>
                    404
                </Typography>
                <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                Apologies, the page you are looking for does not exist. It might have been moved or deleted.
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