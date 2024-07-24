import { Zoom, toast, Slide } from "react-toastify";

const toastStyle = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
}

const successToast = (message) => {
    toast.success(message, toastStyle)
}

const errorToast = (message) => {
    toast.error(message, toastStyle)
}

export { successToast, errorToast }