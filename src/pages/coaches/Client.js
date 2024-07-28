import ShowAllClients from "../../components/coach/ShowAllClient"
import { Helmet } from "react-helmet"
export default function Client() {
    return (
        <>
            <Helmet>
                <title>Client</title>
            </Helmet>
            <ShowAllClients />
        </>

    )
}