import { combineReducers } from 'redux';
import portfolios from './portfolios/portfoliosReducer';
import portfolioDetails from './portfolios/portfolioDetailsReducer';
import activePortfolio from './portfolios/activePortfolioReducer';
export default combineReducers({
    portfolios,
    portfolioDetails,
    activePortfolio
})