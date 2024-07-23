import React from 'react';
import { Container, Typography, Divider } from '@mui/material'

export default function Terms() {
    return (
        <Container sx={{ marginTop: 3 }}>
            <Typography variant="h3" component="h2" gutterBottom align="center">
                Terms and Conditions
            </Typography>
            <Divider />
            <Typography variant="body1" paragraph align="left" sx={{ marginTop: 3 }}>
                Welcome to our application. These terms and conditions outline the rules and regulations for the use of our service.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Introduction
            </Typography>
            <Typography variant="body1" paragraph align="left">
                By accessing this application, we assume you accept these terms and conditions. Do not continue to use the service if you do not agree to all of the terms and conditions stated on this page.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Intellectual Property Rights
            </Typography>
            <Typography variant="body1" paragraph align="left">
                Other than the content you own, under these terms, we own all the intellectual property rights and materials contained in this application.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Restrictions
            </Typography>
            <Typography variant="body1" paragraph align="left">
                You are specifically restricted from all of the following:
            </Typography>
            <Typography component="ul" paragraph align="left">
                <Typography component="li">Publishing any application material in any other media</Typography>
                <Typography component="li">Selling, sublicensing, and/or otherwise commercializing any application material</Typography>
                <Typography component="li">Using this application in any way that is or may be damaging to this application</Typography>
                <Typography component="li">Using this application contrary to applicable laws and regulations</Typography>
                <Typography component="li">Engaging in any data mining, data harvesting, data extracting, or any other similar activity concerning this application</Typography>
                <Typography component="li">Using this application to engage in any advertising or marketing</Typography>
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Your Content
            </Typography>
            <Typography variant="body1" paragraph align="left">
                In these terms and conditions, "Your Content" shall mean any audio, video text, images, or other material you choose to display on this application. By displaying Your Content, you grant us a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it in any and all media.
            </Typography>
            <Typography variant="body1" paragraph align="left">
                Your Content must be your own and must not be infringing on any third party's rights. We reserve the right to remove any of Your Content from this application at any time without notice.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                No warranties
            </Typography>
            <Typography variant="body1" paragraph align="left">
                This application is provided "as is," with all faults, and we express no representations or warranties of any kind related to this application or the materials contained on this application. Also, nothing contained on this application shall be interpreted as advising you.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Limitation of liability
            </Typography>
            <Typography variant="body1" paragraph align="left">
                In no event shall we, nor any of our officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this application whether such liability is under contract. We, including our officers, directors, and employees, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this application.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Indemnification
            </Typography>
            <Typography variant="body1" paragraph align="left">
                You hereby indemnify to the fullest extent us from and against any and all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these terms.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Severability
            </Typography>
            <Typography variant="body1" paragraph align="left">
                If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Variation of Terms
            </Typography>
            <Typography variant="body1" paragraph align="left">
                We are permitted to revise these terms at any time as it sees fit, and by using this application you are expected to review these terms on a regular basis.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Assignment
            </Typography>
            <Typography variant="body1" paragraph align="left">
                We are allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Entire Agreement
            </Typography>
            <Typography variant="body1" paragraph align="left">
                These terms constitute the entire agreement between us and you in relation to your use of this application and supersede all prior agreements and understandings.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="left">
                Governing Law & Jurisdiction
            </Typography>
            <Typography variant="body1" paragraph align="left">
                These terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the State for the resolution of any disputes.
            </Typography>
        </Container>
    )
}