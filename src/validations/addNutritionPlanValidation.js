import * as Yup from 'yup'

export const addNutritionPlanValidation = Yup.object({
    // additionalNotes: Yup.string(),
    mealPlans: Yup.array().of(
        Yup.object({
            title: Yup.string().required('Title is required'),
            meals: Yup.array().of(
                Yup.object({
                    foodName: Yup.string().required('Food name is required'),
                    // unit: Yup.string().required('Unit is required'),
                    quantity: Yup.number().required('Quantity is required').positive(),
                    // calories: Yup.number().required('Calories are required').positive(),
                    // carbohydrate: Yup.number().required('Carbohydrate is required').positive(),
                    // protein: Yup.number().required('Protein is required').positive(),
                    // fats: Yup.number().required('Fats are required').positive(),
                    // note: Yup.string()
                })
            )
        })
    )
})