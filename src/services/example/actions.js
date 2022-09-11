import axios from "../../utils/axios"
import * as actionTypes from './actionTypes'
import * as authActionTypes from '../auth/actionTypes'
import * as urls from '../../configs/urls'
import { toast } from "react-toastify"

export const getUsers = () =>  (dispatch) => {
    dispatch({ type: actionTypes.USERS_LIST })
    try {
        axios().get(urls.users)
        .then(res => {
            let { data } = res
            return dispatch({ type: actionTypes.USERS_LIST_SUCCESS, payload: data })
        })
        .catch(error => {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
            return dispatch({ type: actionTypes.USERS_LIST_FAILED, payload: error?.response?.data?.message || error.message })
        }) 
    } catch(error) {
        console.log(error)
        return dispatch({ type: actionTypes.USERS_LIST_FAILED, payload: error.message })
    }
}
