import WorkoutItemTable from "../../components/coach/table/WorkoutItemTable"
import { Helmet } from "react-helmet"
export default function WorkoutItem() {
    return (
        <>
            <Helmet>
                <title>Workout Item</title>
            </Helmet>
            <h2><WorkoutItemTable /></h2>
        </>

    )
}