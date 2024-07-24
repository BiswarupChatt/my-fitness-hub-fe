import * as Yup from 'yup'

export const loginValidation = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .email('Enter valid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be 8-128 characters')
})