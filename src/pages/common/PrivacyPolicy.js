import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <Container sx={{ marginTop: 3 }}>
                <Typography variant="h3" component="h2" gutterBottom align="center">
                    Privacy Policy
                </Typography>
                <Divider />
                <Typography variant="body1" paragraph align="left" sx={{ marginTop: 3 }}>
                    Your privacy is important to us. This privacy policy document outlines the types of personal information that is received and collected by our application and how it is used.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom align="left">
                    Information We Collect
                </Typography>
                <Typography variant="body1" paragraph align="left">
                    We collect several types of information for various purposes to provide and improve our service to you. This includes:
                </Typography>
                <Typography component="ul" paragraph align="left">
                    <Typography component="li">Personal Identification Information: Name, email address, phone number, etc.</Typography>
                    <Typography component="li">Usage Data: Information on how you access and use the service, such as your IP address, browser type, and pages visited.</Typography>
                    <Typography component="li">Cookies and Tracking Technologies: Data collected using cookies and similar technologies to track activity and hold certain information.</Typography>
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom align="left">
                    How We Use Your Information
                </Typography>
                <Typography variant="body1" paragraph align="left">
                    The information we collect is used in various ways, including to:
                </Typography>
                <Typography component="ul" paragraph align="left">
                    <Typography component="li">Provide, operate, and maintain our service.</Typography>
                    <Typography component="li">Improve and personalize your experience with our service.</Typography>
                    <Typography component="li">Communicate with you, either directly or through one of our partners, including for customer service, updates, and promotional purposes.</Typography>
                    <Typography component="li">Process your transactions and manage your account.</Typography>
                    <Typography component="li">Analyze how our service is used to improve our service.</Typography>
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom align="left">
                    Data Security
                </Typography>
                <Typography variant="body1" paragraph align="left">
                    We value your trust in providing us your personal information, thus we are striving to use commercially acceptable means of protecting it. However, remember that no method of transmission over the internet, or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom align="left">
                    Sharing Your Information
                </Typography>
                <Typography variant="body1" paragraph align="left">
                    We do not share your personal information with third parties except as necessary to provide our services or as required by law.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom align="left">
                    Changes to This Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph align="left">
                    We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom align="left">
                    Contact Us
                </Typography>
                <Typography variant="body1" paragraph align="left">
                    If you have any questions about this privacy policy, please contact us.
                </Typography>

            </Container>
            <Footer />
        </>
    )
}
