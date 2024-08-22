import { Helmet } from "react-helmet"
import ClientNutritionPlan from "../../components/client/ClientNutritionPlan"
import { Container, Paper } from "@mui/material"

export default function Nutrition() {
    return (
        <>
            <Helmet>
                <title>Nutrition</title>
            </Helmet>
            <Container sx={{ py: { xs: 8, sm: 4 } }}>
                {/* <Paper elevation={3} sx={{ padding: 1 }}> */}

                    <h2>Nutrition Screen</h2>
                    <ClientNutritionPlan />
                {/* </Paper> */}
            </Container>
        </>

    )

}