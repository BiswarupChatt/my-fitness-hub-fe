import * as Yup from 'yup'

export const registerValidation = Yup.object({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be 2 characters long'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be 2 characters long'),
    email: Yup.string()
        .required('Email is required')
        .email('Enter valid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be 8 characters long')
})