import Api from '../../utils/api'
import * as actionTypes from './actionTypes'
import * as urls from '../../configs/urls'
import { toast } from "react-toastify"

export const getPortfolios = () =>  (dispatch) => {
    dispatch({ type: actionTypes.PORTFOLIOS })
    try {
        return  new Api('get', urls.portfolios(), {}, {})
        .then(res => {
            let { data } = res
            return dispatch({ type: actionTypes.PORTFOLIOS_SUCCESS, payload: data })
        })
        .catch(error => {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
            return dispatch({ type: actionTypes.PORTFOLIOS_FAILED, payload: error?.response?.data?.message || error.message })
        }) 
    } catch(error) {
        console.log(error)
        return dispatch({ type: actionTypes.PORTFOLIOS_FAILED, payload: error.message })
    }
}
