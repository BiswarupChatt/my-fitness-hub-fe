import { Zoom, toast } from "react-toastify";

const toastStyle = {
    position: "top-center",
    autoClose: 3000,
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

const loadingToast = (message, toastId) => {
    toast.loading(message, {
        toastId: toastId,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
    })
}

const updateToast = (message, toastId, type) => {
    toast.update(toastId, {
        render: message,
        type: type,
        isLoading: false,
        autoClose: 3000,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
    })
}
export { successToast, errorToast, loadingToast, updateToast }