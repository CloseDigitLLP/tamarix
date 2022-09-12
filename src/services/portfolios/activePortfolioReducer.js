import  * as actionTypes from './actionTypes'
let initialState = {
    name: '',
    value: ''
}

const activePortfolioReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_ACTIVE_PORTFOLIO:
            return { 
                ...state, 
                ...action.payload
            }
        default:
            return state
    }
}
export default activePortfolioReducer