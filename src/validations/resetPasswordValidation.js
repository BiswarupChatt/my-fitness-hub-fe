import * as Yup from 'yup'

export const resetPasswordValidation = Yup.object({
    password: Yup.string()
        .required('New password is required')
        .min(8, 'New password must be at least 8 characters')
        .max(128, 'New password must not exceed 128 characters'),
    confirmPassword: Yup.string()
        .required('Confirm new password is required')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
})