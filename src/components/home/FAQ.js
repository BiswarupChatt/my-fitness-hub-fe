import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as LinkComponent } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container
            id="faq"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Typography
                component="h2"
                variant="h4"
                color="text.primary"
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                Frequently asked questions
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <Typography component="h3" variant="subtitle2" textAlign="left">
                            How do I contact customer support if I have a question or issue?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', textAlign: 'left', textAlign: 'left' } }}
                        >
                            You can reach our customer support team by emailing
                            <Link> support@email.com </Link>
                            or calling our toll-free number. We&apos;re here to assist you
                            promptly.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                    >
                        <Typography component="h3" variant="subtitle2" textAlign="left">
                            Can I return the product if it doesn&apos;t meet my expectations?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', textAlign: 'left' } }}
                        >
                            Absolutely! We offer a hassle-free return policy. If you&apos;re not
                            completely satisfied, you can return the product within [number of
                            days] days for a full refund or exchange.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                    >
                        <Typography component="h3" variant="subtitle2" textAlign="left">
                            What makes your product stand out from others in the market?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', textAlign: 'left' } }}
                        >
                            Our product distinguishes itself through its adaptability, durability,
                            and innovative features. We prioritize user satisfaction and
                            continually strive to exceed expectations in every aspect.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel4'}
                    onChange={handleChange('panel4')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4d-content"
                        id="panel4d-header"
                    >
                        <Typography component="h3" variant="subtitle2" textAlign="left">
                            Is there a warranty on the product, and what does it cover?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', textAlign: 'left' } }}
                        >
                            Yes, our product comes with a [length of warranty] warranty. It covers
                            defects in materials and workmanship. If you encounter any issues
                            covered by the warranty, please contact our customer support for
                            assistance.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button component={LinkComponent} to={'/coach-signup'} variant="contained" color="primary" sx={{ mb: 2 }}>
                    Get started
                </Button>
                <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
                    No Credit Card Required. <br />By clicking &quot;Get Started as a coach&quot;  you agree to our&nbsp;
                    <Link component={LinkComponent} to={'/terms'} target='_blank' color="primary">
                        Terms & Conditions
                    </Link>
                    .
                </Typography>
            </Box>
        </Container>
    );
}