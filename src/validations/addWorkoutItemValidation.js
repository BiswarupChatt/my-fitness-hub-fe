import * as Yup from 'yup';

const youtubeLinkRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?v=)?([^""&\n\s]{11})|youtu\.be\/([^""&\n\s]{11}))$/;

export const addWorkoutItemValidation = Yup.object({
    exerciseName: Yup.string()
        .required('Exercise Name is required'),
    videoLink: Yup.string()
        .matches(youtubeLinkRegex, 'Please enter a valid YouTube link')
        .required('YouTube Link is required')
});
