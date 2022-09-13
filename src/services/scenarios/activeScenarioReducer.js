import  * as actionTypes from './actionTypes'
import * as portfolioActionTypes from '../portfolios/actionTypes'
let initialState = {
    name: '',
    value: ''
}

const activeScenarioReducer = (state = initialState, action) => {
    switch(action.type){
        case portfolioActionTypes.CHANGE_ACTIVE_PORTFOLIO:
            return {
                ...state,
                name: '',
                value: ''
            }
        case actionTypes.CHANGE_ACTIVE_SCENARIO:
            return { 
                ...state, 
                ...action.payload
            }
        default:
            return state
    }
}
export default activeScenarioReducer