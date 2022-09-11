import  * as actionTypes from './actionTypes'
let initialState = {
    success: false,
    loading: true,
    error: '',
    data: {}
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PORTFOLIO_DETAILS:
            return { 
                ...state, 
                success: false, 
                loading: true, 
                error: '',
                data: {}
            }
        case actionTypes.PORTFOLIO_DETAILS_SUCCESS:
            return { 
                ...state, 
                success: true, 
                loading: false, 
                error: '',
                data: action.payload,
            }
        case actionTypes.PORTFOLIO_DETAILS_FAILED:
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