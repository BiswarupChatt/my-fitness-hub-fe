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

const faqItems = [
    {
        question: "How can I get assistance if I encounter an issue with the app?",
        answer: (
            <>
                If you experience any issues with the app, you can reach out to our dedicated support team via email at&nbsp;
                <Link href="mailto:support@myfitenesshub.com">support@myfitenesshub.com</Link> or by calling our toll-free number. Our support team is available to assist you promptly and ensure your experience remains seamless.
            </>
        ),
    },
    {
        question: "What is your return policy if I'm not satisfied with the app?",
        answer: (
            <>
                We stand by the quality of our app. If you're not completely satisfied, you can return the product within 30 days of purchase for a full refund. Our goal is to ensure you have the best experience possible.
            </>
        ),
    },
    {
        question: "How does your app differentiate from others in the market?",
        answer: (
            <>
                Our app is designed with adaptability, durability, and user-friendliness at its core. It stands out through its ability to evolve with your needs, offering innovative features that make managing your fitness coaching easier and more efficient.
            </>
        ),
    },
    {
        question: "Is there a warranty included with the app?",
        answer: (
            <>
                Yes, our app comes with a one-year warranty that covers any defects in functionality. We are committed to delivering a reliable product, and if any issues arise, our support team is here to help.
            </>
        ),
    },
    {
        question: "How do I update the app to the latest version?",
        answer: (
            <>
                Updating the app is easy! Simply visit your app store and check for updates. If an update is available, you'll see an option to download and install it. We recommend keeping your app updated to enjoy the latest features and improvements.
            </>
        ),
    },
    {
        question: "Can I use the app on multiple devices?",
        answer: (
            <>
                Yes, our app is designed to be used across multiple devices. You can install it on your smartphone, tablet, and even desktop to manage your coaching on the go. Simply log in with the same account credentials on each device.
            </>
        ),
    },
    {
        question: "Is my data safe and secure with your app?",
        answer: (
            <>
                Absolutely. We prioritize your data security and use industry-standard encryption methods to protect your information. Our app complies with all relevant data protection regulations to ensure your personal and client data is secure.
            </>
        ),
    },
    {
        question: "Do you offer training or tutorials on how to use the app?",
        answer: (
            <>
                We offer a range of tutorials and training materials to help you get the most out of the app. You can find these resources in the help section of the app, or visit our website for detailed guides and video tutorials.
            </>
        ),
    },
    {
        question: "How can I provide feedback or suggest new features?",
        answer: (
            <>
                We value your feedback and are always looking for ways to improve the app. You can provide feedback or suggest new features by visiting the feedback section within the app or emailing us directly at&nbsp;
                <Link href="mailto:feedback@myfitenesshub.com">feedback@myfitenesshub.com</Link>.
            </>
        ),
    },
];

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
                Frequently Asked Questions
            </Typography>
            <Box sx={{ width: '100%' }}>
                {faqItems.map((item, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}d-content`}
                            id={`panel${index}d-header`}
                        >
                            <Typography component="h3" variant="subtitle2" textAlign="left">
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ maxWidth: { sm: '100%', md: '70%' }, textAlign: 'left' }}
                            >
                                {item.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button component={LinkComponent} to={'/coach-signup'} variant="contained" color="primary" sx={{ mb: 2 }}>
                    Get Started
                </Button>
                <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
                    No Credit Card Required. <br />By clicking &quot;Get Started as a coach&quot; you agree to our&nbsp;
                    <Link component={LinkComponent} to={'/terms'} target='_blank' color="primary">
                        Terms & Conditions
                    </Link>
                    .
                </Typography>
            </Box>
        </Container>
    );
}
