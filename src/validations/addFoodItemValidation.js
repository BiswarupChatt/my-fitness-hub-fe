import * as Yup from 'yup'

export const addFoodItemValidation = Yup.object({
    foodName: Yup.string().required('Food Name is required'),
    unit: Yup.string().required('Unit is required'),
    quantity: Yup.number().required('Quantity is required'),
    calories: Yup.number().required('Calories is required'),
    protein: Yup.number().required('Protein is required'),
    fat: Yup.number().required('Fat is required'),
    carbohydrate: Yup.number().required('Carbohydrate is required'),
})