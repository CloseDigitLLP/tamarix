import React from 'react'
import Select from 'react-select'
import SidebarLayout from '../layouts/Sidebar'
import { connect } from 'react-redux'
import * as portfolioActions from '../services/portfolios/actions';
import * as scenarioActions from '../services/scenarios/actions';
import * as forecastActions from '../services/forecasts/actions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import StackedBarChart from './components/StackedBarChart';
import customStyles from '../assets/dropdownStyles';

class Projections extends React.Component {

    componentDidMount() {
        if(!this?.props?.activePortfolio?.value) {
            this.configureState()
        } else {
            this.props.getScenarios()
        }

        if(!this?.props?.activeScenario?.value && this.props.scenarios.success) {
            this.configureActiveScenario()
        }

        if(this?.props?.activeScenario?.value && this?.props?.activePortfolio?.value && (!this.props.forecasts.success || !this.props.forecasts.loading)) {
            this.props.getForecast()
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps?.activePortfolio?.value !== this?.props?.activePortfolio?.value) {
            this.props.getScenarios()
        }

        if(!this?.props?.activeScenario?.value && this?.props?.scenarios?.success && this?.props?.scenarios?.data?.scenarios?.length) {
            this.configureActiveScenario()
        }
        if(prevProps?.activePortfolio?.value !== this?.props?.activePortfolio?.value || this?.props?.activeScenario?.value !== prevProps.activeScenario?.value)
            this.props.getForecast()
    }

    configureActiveScenario() {
        try {
            let [ scenario ] = this?.props?.scenarios?.data?.scenarios
            this.props.changeActiveScenario({ label: scenario, value: scenario })
        } catch (error) {

        }
    }

    configureState() {
        const { portfolios } = this.props
        let portfolioList = portfolios?.data?.portfolios || []
        this.props.changeActivePortfolio({ label: portfolioList[0], value: portfolioList[0] })
    }

    render() {
        const { loading, error, data } = this.props.scenarios
        const { forecasts } = this.props

        if(loading) {
            return <SidebarLayout>
                <Loader />
            </SidebarLayout>
        }

        if(error) {
            return <SidebarLayout>
                <Error message={error} />
            </SidebarLayout>
            
        }
        
        return(
            <SidebarLayout>
                <div className='portfolio_title'>
                    <h5 className='page-name'>
                        Projections
                    </h5>
                </div>
                <div className='dropdown-part mt-4'>
                    <Select styles={customStyles} value={this.props.activeScenario} onChange={this.props.changeActiveScenario} options={data.scenarios.map(scenario => ({ label: scenario, value: scenario }))} />
                </div>
                {forecasts.success && 
                    <div className='row'>
                        <div className='col-lg-6 mt-3'>
                            <div className='custom-container mt-3'>
                                <div className='section-title-container'>
                                    <h5 className='title'>Cash Flow: calls - cum</h5>
                                </div>
                                <div className='mt-3'>
                                    <StackedBarChart portfolio={forecasts.data.portfolio} metric={'calls - cum'} />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 mt-3'>
                            <div className='custom-container mt-3'>
                                <div className='section-title-container'>
                                    <h5 className='title'>Actial NAV exposure: Entire Portfolio</h5>
                                </div>
                                <div className='mt-3'>
                                    <StackedBarChart portfolio={forecasts.data.portfolio} metric={'nav'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                }
                {
                    forecasts.loading &&
                    <Loader />
                }
                {
                    forecasts.error &&
                    <Error message={forecasts.error} />
                }
            </SidebarLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    portfolios: state.portfolios,
    activePortfolio: state.activePortfolio,
    scenarios: state.scenarios,
    activeScenario: state.activeScenario,
    scenarioDetails: state.scenarioDetails,
    updateScenarioDetailsMeta: state.updateScenarioDetails,
    forecasts: state.forecasts
})

const mapDispatchToProps = {
    changeActivePortfolio: portfolioActions.changeActivePortfolio,
    getScenarios: scenarioActions.getScenarios,
    changeActiveScenario: scenarioActions.changeActiveScenario,
    getScenarioDetails: scenarioActions.getScenarioDetails,
    updateScenarioDetails: scenarioActions.updateScenarioDetails,
    changeScenarioDetails: scenarioActions.changeScenarioDetails,
    getForecast: forecastActions.getForecasts
}

export default connect(mapStateToProps, mapDispatchToProps)(Projections)


