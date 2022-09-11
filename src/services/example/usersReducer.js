import  * as actionTypes from './actionTypes'
let initialState = {
    success: false,
    loading: false,
    error: '',
    data: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.USERS_LIST:
            return { 
                ...state, 
                success: false, 
                loading: true, 
                error: '',
                data: []
            }
        case actionTypes.USERS_LIST_SUCCESS:
            return { 
                ...state, 
                success: true, 
                loading: false, 
                error: '',
                data: action.payload,
            }
        case actionTypes.USERS_LIST_FAILED:
            return { 
                ...state,
                success: false,
                loading: false, 
                error: action.payload,
                data: []
            }
        default:
            return state
    }
}
export default usersReducer