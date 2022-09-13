import { combineReducers } from 'redux';
import portfolios from './portfolios/portfoliosReducer';
import portfolioDetails from './portfolios/portfolioDetailsReducer';
import activePortfolio from './portfolios/activePortfolioReducer';
import scenarios from './scenarios/scenariosReducer';
import activeScenario from './scenarios/activeScenarioReducer';
import scenarioDetails from './scenarios/scenarioDetailsReducer';
import updateScenarioDetails from './scenarios/updatescenarioDetailsReducer';
export default combineReducers({
    portfolios,
    portfolioDetails,
    activePortfolio,
    scenarios,
    activeScenario,
    scenarioDetails,
    updateScenarioDetails
})