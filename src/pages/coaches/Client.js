import ClientTable from "../../components/coach/Table/ClientTable"
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