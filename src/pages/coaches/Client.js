import ClientTable from "../../components/coach/Client/ClientTable"
import { Helmet } from "react-helmet"
export default function Client() {
    return (
        <>
            <Helmet>
                <title>Client</title>
            </Helmet>
            <ClientTable />
        </>

    )
}