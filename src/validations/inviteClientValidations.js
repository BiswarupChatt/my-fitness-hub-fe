import * as Yup from 'yup'

export const inviteClientValidation = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .email('Enter valid email address')
})