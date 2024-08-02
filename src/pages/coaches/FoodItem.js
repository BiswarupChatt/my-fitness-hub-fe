import { Helmet } from "react-helmet"
import FoodItemTable from "../../components/coach/table/FoodItemTable"
export default function FoodItem() {
    return (
        <>
            <Helmet>
                <title>Food Item</title>
            </Helmet>
            <FoodItemTable />
        </>

    )
}