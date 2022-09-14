import React from 'react'
import Select from 'react-select'
import SidebarLayout from '../layouts/Sidebar'
import Slider from '@mui/material/Slider';
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as portfolioActions from '../services/portfolios/actions';
import * as scenarioActions from '../services/scenarios/actions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { toast } from "react-toastify"
import customStyles from '../assets/dropdownStyles';

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    // height: 25,
    
    '& .MuiSlider-track': {
      border: 'none',
      backgroundColor: '#65A8C9',
    },
    '& .MuiSlider-thumb': {
      height: 20,
      width: 20,
      backgroundColor: '#65A8C9',
      border: '0px solid #fff',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-rail': {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
      },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#65a9c9',
      transformOrigin: 'bottom left',
      boxShadow: 'rgba(0,0,0,0.14) -4px,9px,10px,-6px',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });
  

class Scenarios extends React.Component {

    componentDidMount() {
        if(!this?.props?.activePortfolio?.value) {
            this.configureState()
        } else {
            this.props.getScenarios()
        }

        if(!this?.props?.activeScenario?.value && this.props.scenarios.success) {
            this.configureActiveScenario()
        }

        if(this?.props?.activeScenario?.value) {
            this.props.getScenarioDetails()
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps?.activePortfolio?.value !== this?.props?.activePortfolio?.value) {
            this.props.getScenarios()
        }

        if(!this?.props?.activeScenario?.value && this?.props?.scenarios?.success && this?.props?.scenarios?.data?.scenarios?.length) {
            this.configureActiveScenario()
        }

        if(prevProps?.activeScenario?.value !== this?.props?.activeScenario?.value) {
            this.props.getScenarioDetails()
        }
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

    updateScenario(data_key, item_key, value, e) {
        let { scenario_data } = (this?.props?.scenarioDetails?.data || {})
        if(!scenario_data[data_key] || (!scenario_data[data_key][item_key] && scenario_data[data_key][item_key] !== 0)) {
            return toast.error('Something went wrong')
        }

        if(scenario_data[data_key][item_key] === value) {
            return
        }

        scenario_data[data_key][item_key] = value
        this.props.changeScenarioDetails(scenario_data)
    }

    render() {
        const { loading, error, data } = this.props.scenarios
        const { scenarioDetails, updateScenarioDetailsMeta } = this.props

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
        const { scenario_data } = scenarioDetails.data
        return(
            <SidebarLayout>
                <div className='portfolio_title'>
                    <h5 className='page-name'>
                        Scenarios 
                    </h5>
                </div>
                <div className='dropdown-part mt-4'>
                    <Select styles={customStyles} value={this.props.activeScenario} onChange={this.props.changeActiveScenario} options={data.scenarios.map(scenario => ({ label: scenario, value: scenario }))} />
                </div>
                {scenarioDetails.success && 
                    <>  
                        <div className='titlebar'>
                            <div className='title-part'>Top Down Expectations</div>
                            <div>
                                <span className='me-3 text-danger'>{updateScenarioDetailsMeta.error}</span>
                                <button className='btn btn-primary' onClick={this.props.updateScenarioDetails} disabled={!scenarioDetails.isChanged}>{updateScenarioDetailsMeta.loading ? <i className='fa fa-circle-o-notch fa-spin' /> : 'Save'}</button>
                            </div>
                        </div>
                        <div>
                        </div>
                        <div className='row'>
                            {Object.keys(scenario_data?.rates || {}).map((title) => (
                                <div className='col-xl-6 col-lg-12 mt-3' key={title}>
                                    <div className='custom-container'>
                                    <h4 className='radio-btn-heading'>Expected pace of cash flows</h4>
                                    <h6 className='radio-btn-text'>{title}</h6>
                                        <div className='custom-radio-part mb-2'>
                                            <div class="selecotr-item">
                                                <input type="radio" id={`radio_${title}`} name={title} className="selector-item_radio" onClick={(e) => this.updateScenario('rates', title, 'Slow', e)} checked={scenario_data?.rates[title] === 'Slow'}/>
                                                <label for={`radio_${title}`} className="selector-item_label">Slow</label>
                                            </div>
                                            <div className="selecotr-item">
                                                <input type="radio" id={`radio_2_${title}`} name={title} className="selector-item_radio" onClick={(e) => this.updateScenario('rates', title, 'Average', e)} checked={scenario_data?.rates[title] === 'Average'}/>
                                                <label for={`radio_2_${title}`} className="selector-item_label">Average</label>
                                            </div>
                                            <div className="selecotr-item">
                                                <input type="radio" id={`radio_3_${title}`} name={title} className="selector-item_radio" onClick={(e) => this.updateScenario('rates', title, 'Fast', e)} checked={scenario_data?.rates[title] === 'Fast'}/>
                                                <label for={`radio_3_${title}`} className="selector-item_label">Fast</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}  
                        </div>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 mt-3'>
                                <div className='custom-container'>
                                    <h4 className='radio-btn-heading'>Expected IRRs by strategy</h4>
                                    {Object.keys(scenario_data?.cmas || {}).map((title, index) => (
                                        <React.Fragment key={index}>
                                            <h6 className='radio-btn-text'>{title}</h6>
                                            <div className='slider-part'>
                                                <PrettoSlider value={Math.round((scenario_data?.cmas[title] || 0) * 100)} onChange={(e, value) => this.updateScenario('cmas', title, value/100)} aria-label="Default" valueLabelDisplay="auto" min={-100} max={100} />
                                                <div className='slider-measure'>
                                                    <p>-100%</p>
                                                    <p>100%</p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-12 col-md-12  col-sm-12 mt-3'>
                                <div className='custom-container'>
                                    <h4 className='radio-btn-heading'>Expected IRRs by fund</h4>
                                    {Object.keys(scenario_data?.overrides || {}).map((title, index) => (
                                        <React.Fragment key={index}>
                                            <h6 className='radio-btn-text'>{title}</h6>
                                            <div className='slider-part'>
                                            <PrettoSlider defaultValue={Math.round((scenario_data?.overrides[title] || 0) * 100)} onChange={(e, value) => this.updateScenario('overrides', title, value/100)} aria-label="Default" valueLabelDisplay="auto" min={-100} max={100} />
                                            <div className='slider-measure'>
                                                <p>-100%</p>
                                                <p>{Math.round((scenario_data?.overrides[title] || 0) * 100)}</p>
                                                <p>100%</p>
                                            </div>
                                        </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    scenarioDetails.loading &&
                    <Loader />
                }
                {
                    scenarioDetails.error &&
                    <Error message={scenarioDetails.error} />
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
    updateScenarioDetailsMeta: state.updateScenarioDetails
})

const mapDispatchToProps = {
    changeActivePortfolio: portfolioActions.changeActivePortfolio,
    getScenarios: scenarioActions.getScenarios,
    changeActiveScenario: scenarioActions.changeActiveScenario,
    getScenarioDetails: scenarioActions.getScenarioDetails,
    updateScenarioDetails: scenarioActions.updateScenarioDetails,
    changeScenarioDetails: scenarioActions.changeScenarioDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Scenarios)


