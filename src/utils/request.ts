import { Dispatch } from 'react'
import axios from 'axios'
import { clearUserInfo } from 'state/actions'

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_REQUEST_URL,
  timeout: 30000, // request timeout
})
let hasInit = false
export const initAxios = (dispatch: Dispatch<any>, toast) => {
  if (hasInit) return
  hasInit = true
  // request interceptor
  service.interceptors.request.use(
    (memo: any) => {
      // do something before request is sent

      memo.headers.Authorization = localStorage.getItem('token')
      return memo
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  // response interceptor
  service.interceptors.response.use(
    (response) => {
      const res: any = response.data
      if (res.code !== 200) {
        if (res.code === 401) {
          dispatch(clearUserInfo())
          // toast.toastError('Login expiration')
          return Promise.reject(new Error('Login expiration'))
        }
        // toast.toastError(res.message)
        return Promise.reject(res.message || 'Error')
      }
      return res
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}

export default service
