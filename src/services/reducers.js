import { combineReducers } from 'redux';
import portfolios from './portfolios/portfoliosReducer';
import portfolioDetails from './portfolios/portfolioDetailsReducer';

export default combineReducers({
    portfolios,
    portfolioDetails
})