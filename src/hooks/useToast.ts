import { useSnackbar } from 'notistack'

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar()
  const toastError = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
    })
  }
  const toastSuccess = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
    })
  }
  const toastInfo = (message) => {
    enqueueSnackbar(message, {
      variant: 'info',
    })
  }
  const toastWarning = (message) => {
    enqueueSnackbar(message, {
      variant: 'warning',
    })
  }
  return { toastError, toastSuccess, toastInfo, toastWarning }
}
export default useToast
