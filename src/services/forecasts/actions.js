import Api from '../../utils/api'
import * as actionTypes from './actionTypes'
import * as urls from '../../configs/urls'
import { toast } from "react-toastify"
import { getPortfolioDetails } from '../portfolios/actions'

export const getForecasts = () =>  (dispatch, getStore) => {
    let store = getStore()
    if(!store || !store.activeScenario || !store.activeScenario.value || !store.activePortfolio || !store.activePortfolio.value) {
        return 
    }

    if(store.activePortfolio.value !== store.portfolioDetails.data.port_name) {
        return dispatch(getPortfolioDetails(store.activePortfolio.value, getForecasts))
    }

    dispatch({ type: actionTypes.FORECASTS })
    try {
        let { exposure_metrics } = store.portfolioDetails.data.port_settings
        let payload = {
            scenario_name: store.activeScenario.value,
            port_name: store.activePortfolio.value,
            metrics: ['nav', "calls - cum"],//exposure_metrics,
            roadmap: []
        }

        return  new Api('post', urls.forecasts(), payload, {})
        .then(res => {
            let { data } = res
            return dispatch({ type: actionTypes.FORECASTS_SUCCESS, payload: data })
        })
        .catch(error => {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
            return dispatch({ type: actionTypes.FORECASTS_FAILED, payload: error?.response?.data?.message || error.message })
        }) 
    } catch(error) {
        console.log(error)
        return dispatch({ type: actionTypes.FORECASTS_FAILED, payload: error.message })
    }
}