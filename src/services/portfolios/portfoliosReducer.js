import  * as actionTypes from './actionTypes'
let initialState = {
    success: false,
    loading: false,
    error: '',
    data: {}
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PORTFOLIOS:
            return { 
                ...state, 
                success: false, 
                loading: true, 
                error: '',
                data: {}
            }
        case actionTypes.PORTFOLIOS_SUCCESS:
            return { 
                ...state, 
                success: true, 
                loading: false, 
                error: '',
                data: action.payload,
            }
        case actionTypes.PORTFOLIOS_FAILED:
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
export default usersReducer