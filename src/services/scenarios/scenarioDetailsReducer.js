import  * as actionTypes from './actionTypes'
let initialState = {
    success: false,
    loading: false,
    error: '',
    isChanged: false,
    data: {}
}

const scenarioDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SCENARIO_DETAILS:
            return { 
                ...state, 
                success: false, 
                loading: true, 
                error: '',
                isChanged: false,
                data: {}
            }
        case actionTypes.SCENARIO_DETAILS_SUCCESS:
            return { 
                ...state, 
                success: true, 
                loading: false, 
                error: '',
                isChanged: false,
                data: action.payload,
            }
        case actionTypes.SCENARIO_DETAILS_FAILED:
            return { 
                ...state,
                success: false,
                loading: false, 
                isChanged: false,
                error: action.payload,
                data: {}
            }
        case actionTypes.CHANGE_SCENARIO_DETAILS:
            return {
                ...state,
                isChanged: true,
                data: { ...state.data, ...action.payload }
            }
        case actionTypes.UPDATE_SCENARIO_DETAILS_SUCCESS:
            return {
                ...state,
                isChanged: false
            }
        default:
            return state
    }
}
export default scenarioDetailsReducer