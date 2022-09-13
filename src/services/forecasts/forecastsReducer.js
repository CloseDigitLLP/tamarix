import  * as actionTypes from './actionTypes'
let initialState = {
    success: false,
    loading: true,
    error: '',
    data: {}
}

const forecastsReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FORECASTS:
            return { 
                ...state, 
                success: false, 
                loading: true, 
                error: '',
                data: {}
            }
        case actionTypes.FORECASTS_SUCCESS:
            return { 
                ...state, 
                success: true, 
                loading: false, 
                error: '',
                data: action.payload,
            }
        case actionTypes.FORECASTS_FAILED:
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
export default forecastsReducer