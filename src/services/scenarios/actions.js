import Api from '../../utils/api'
import * as actionTypes from './actionTypes'
import * as urls from '../../configs/urls'
import { toast } from "react-toastify"

export const getScenarios = () =>  (dispatch, getStore) => {
    let store = getStore()
    if(!store?.activePortfolio?.value) {
        return toast.error('Please select a portfolio to get the stats')
    }
    dispatch({ type: actionTypes.SCENARIOS })
    try {
        return  new Api('get', urls.scenarios(store.activePortfolio.value), {}, {})
        .then(res => {
            let { data } = res
            return dispatch({ type: actionTypes.SCENARIOS_SUCCESS, payload: data })
        })
        .catch(error => {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
            return dispatch({ type: actionTypes.SCENARIOS_FAILED, payload: error?.response?.data?.message || error.message })
        }) 
    } catch(error) {
        console.log(error)
        return dispatch({ type: actionTypes.SCENARIOS_FAILED, payload: error.message })
    }
}

export const getScenarioDetails = () =>  (dispatch, getStore) => {
    let store = getStore()
    if(!store?.activePortfolio?.value) {
        return toast.error('Please select a portfolio to get the stats')
    }
    if(!store?.activeScenario?.value) {
        return toast.error('Please select a scenario to get the stats')
    }
    dispatch({ type: actionTypes.SCENARIO_DETAILS })
    try {
        return  new Api('get', urls.scenariosDetails(store.activePortfolio.value, store?.activeScenario?.value), {}, {})
        .then(res => {
            let { data } = res
            return dispatch({ type: actionTypes.SCENARIO_DETAILS_SUCCESS, payload: data })
        })
        .catch(error => {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
            return dispatch({ type: actionTypes.SCENARIO_DETAILS_FAILED, payload: error?.response?.data?.message || error.message })
        }) 
    } catch(error) {
        console.log(error)
        return dispatch({ type: actionTypes.SCENARIO_DETAILS_FAILED, payload: error.message })
    }
}

export const changeActiveScenario = (item) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_ACTIVE_SCENARIO, payload: item })
}

export const changeScenarioDetails = (payload) => (dispatch) => {
    if(payload && Object.keys(payload).length > 0) {
        dispatch({ type: actionTypes.CHANGE_SCENARIO_DETAILS, payload })
    }
}

export const updateScenarioDetails = () =>  (dispatch, getStore) => {
    let store = getStore()
    console.log(store.scenarioDetails)
    if(!store?.activePortfolio?.value) {
        return toast.error('Please select a portfolio to get the stats')
    }
    if(!store?.activeScenario?.value) {
        return toast.error('Please select a scenario to get the stats')
    }
    if(!store?.scenarioDetails?.isChanged || !store?.scenarioDetails?.data) {
        return 
    }
    dispatch({ type: actionTypes.UPDATE_SCENARIO_DETAILS })
    try {
        return  new Api('put', urls.scenariosDetails(store?.activePortfolio?.value, store?.activeScenario?.value), store?.scenarioDetails?.data, {})
        .then(res => {
            let { data } = res
            return dispatch({ type: actionTypes.UPDATE_SCENARIO_DETAILS_SUCCESS, payload: data })
        })
        .catch(error => {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
            return dispatch({ type: actionTypes.UPDATE_SCENARIO_DETAILS_FAILED, payload: error?.response?.data?.message || error.message })
        }) 
    } catch(error) {
        console.log(error)
        return dispatch({ type: actionTypes.UPDATE_SCENARIO_DETAILS_FAILED, payload: error.message })
    }
}

