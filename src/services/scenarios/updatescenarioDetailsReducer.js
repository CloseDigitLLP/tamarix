import  * as actionTypes from './actionTypes'
let initialState = {
    success: false,
    loading: false,
    error: '',
    data: {}
}

const updateScenarioDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_SCENARIO_DETAILS:
            return { 
                ...state, 
                success: false, 
                loading: true, 
                error: '',
                data: {}
            }
        case actionTypes.UPDATE_SCENARIO_DETAILS_SUCCESS:
            return { 
                ...state, 
                success: true, 
                loading: false, 
                error: '',
                data: action.payload,
            }
        case actionTypes.UPDATE_SCENARIO_DETAILS_FAILED:
            return { 
                ...state,
                success: false,
                loading: false, 
                error: action.payload,
                data: {}
            }
        default:
            return state
    }
}
export default updateScenarioDetailsReducer