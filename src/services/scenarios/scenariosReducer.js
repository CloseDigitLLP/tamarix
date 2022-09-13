import  * as actionTypes from './actionTypes'
let initialState = {
    success: false,
    loading: true,
    error: '',
    data: {}
}

const scenariosReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SCENARIOS:
            return { 
                ...state, 
                success: false, 
                loading: true, 
                error: '',
                data: {}
            }
        case actionTypes.SCENARIOS_SUCCESS:
            return { 
                ...state, 
                success: true, 
                loading: false, 
                error: '',
                data: action.payload,
            }
        case actionTypes.SCENARIOS_FAILED:
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
export default scenariosReducer