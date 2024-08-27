import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import Footer from '../../components/Footer';

export default function Terms() {
    const sections = [
        {
            title: "Introduction",
            content: "By accessing this application, we assume you accept these terms and conditions. Do not continue to use the service if you do not agree to all of the terms and conditions stated on this page.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Intellectual Property Rights",
            content: "Other than the content you own, under these terms, we own all the intellectual property rights and materials contained in this application.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Restrictions",
            content: "You are specifically restricted from all of the following:",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "",
            content: [
                "Publishing any application material in any other media",
                "Selling, sublicensing, and/or otherwise commercializing any application material",
                "Using this application in any way that is or may be damaging to this application",
                "Using this application contrary to applicable laws and regulations",
                "Engaging in any data mining, data harvesting, data extracting, or any other similar activity concerning this application",
                "Using this application to engage in any advertising or marketing",
            ],
            variant: "body1",
            component: "ul",
            align: "left",
        },
        {
            title: "Your Content",
            content: "In these terms and conditions, 'Your Content' shall mean any audio, video text, images, or other material you choose to display on this application. By displaying Your Content, you grant us a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it in any and all media.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "",
            content: "Your Content must be your own and must not be infringing on any third party's rights. We reserve the right to remove any of Your Content from this application at any time without notice.",
            variant: "body1",
            component: "p",
            align: "left",
        },
        {
            title: "No warranties",
            content: "This application is provided 'as is,' with all faults, and we express no representations or warranties of any kind related to this application or the materials contained on this application. Also, nothing contained on this application shall be interpreted as advising you.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Limitation of liability",
            content: "In no event shall we, nor any of our officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this application whether such liability is under contract. We, including our officers, directors, and employees, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this application.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Indemnification",
            content: "You hereby indemnify to the fullest extent us from and against any and all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these terms.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Severability",
            content: "If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Variation of Terms",
            content: "We are permitted to revise these terms at any time as it sees fit, and by using this application you are expected to review these terms on a regular basis.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Assignment",
            content: "We are allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Entire Agreement",
            content: "These terms constitute the entire agreement between us and you in relation to your use of this application and supersede all prior agreements and understandings.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
        {
            title: "Governing Law & Jurisdiction",
            content: "These terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the State for the resolution of any disputes.",
            variant: "h6",
            component: "h2",
            align: "left",
        },
    ];

    return (
        <>
            <Container sx={{ marginTop: 3 }}>
                <Typography variant="h3" component="h2" gutterBottom align="center">
                    Terms and Conditions
                </Typography>
                <Divider />
                {sections.map((section, index) => (
                    <React.Fragment key={index}>
                        {section.title && (
                            <Typography
                                variant={section.variant}
                                component={section.component}
                                gutterBottom
                                align={section.align}
                            >
                                {section.title}
                            </Typography>
                        )}
                        {Array.isArray(section.content) ? (
                            <Typography 
                                component="ul" 
                                align={section.align} 
                                sx={{ marginTop: section.variant === "h3" ? 3 : 0, marginBottom: 3 }}
                            >
                                {section.content.map((item, subIndex) => (
                                    <Typography 
                                        component="li" 
                                        key={subIndex} 
                                        variant="body1" 
                                        paragraph 
                                        align="left"
                                    >
                                        {item}
                                    </Typography>
                                ))}
                            </Typography>
                        ) : (
                            <Typography
                                variant="body1"
                                component="p"
                                paragraph
                                align={section.align}
                                sx={{ marginTop: section.variant === "h3" ? 3 : 0, marginBottom: 3 }}
                            >
                                {section.content}
                            </Typography>
                        )}
                    </React.Fragment>
                ))}
            </Container>
            <Footer />
        </>
    );
}
