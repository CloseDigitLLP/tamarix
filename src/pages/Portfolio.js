import React from 'react';
import SidebarLayout from '../layouts/Sidebar';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import '../assets/owl.scss'
import Chart from './components/PieChart';
import BarChart from './components/BarChart';
import { connect } from 'react-redux';
import * as portfolioActions from '../services/portfolios/actions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { convertToInternationalCurrencySystem } from '../utils/currency';
  
class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // ...this.configureState(),
            pieMetrics: 'Commitment ',
            barMetrics: 'Commitment '
        }
    }

    componentDidMount() {
        if(this?.props?.activePortfolio?.value) {
            this.props.getPortfolioDetails(this?.props?.activePortfolio?.value)
        } else {
            this.configureState()
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.activePortfolio.value !== this.props.activePortfolio.value) {
            if(this?.props?.activePortfolio?.value) {
                this.props.getPortfolioDetails(this?.props?.activePortfolio?.value)
            }
        }
    }

    configureState() {
        const { portfolios } = this.props
        let portfolioList = portfolios?.data?.portfolios || []
        this.props.changeActivePortfolio({ label: portfolioList[0], value: portfolioList[0] })
    }

    getTotalFundCount(port_data) {
        return Object.keys(port_data['Fund name'] || {}).length
    }
    getTotalCommited(port_data) {
        return Object.keys(port_data['Commitment ']).reduce((total, commit) => total + port_data['Commitment '][commit], 0)
    }
    getStratergiesCount(port_data) {
        let strategies = {}
        for(let key in port_data['Strategy']) {
            strategies[port_data['Strategy'][key]] = true
        }
        return Object.keys(strategies).length
    }

    getTotalCalled(port_data) {
        return Object.keys(port_data['Total called']).reduce((total, commit) => total + port_data['Total called'][commit], 0)
    }

    getTotalNav(port_data) {
        return Object.keys(port_data['NAV']).reduce((total, commit) => total + port_data['NAV'][commit], 0)
    }

    getTotalDistributed(port_data) {
        return Object.keys(port_data['Total distributed ']).reduce((total, commit) => total + port_data['Total distributed '][commit], 0)
    }

    getTVPI(port_data) {
        let totalDistributed = this.getTotalDistributed(port_data)
        let totalNAV = this.getTotalNav(port_data)
        let totalCalled = this.getTotalCalled(port_data)

        return ((totalDistributed + totalNAV)/totalCalled).toFixed(2)
    }

    getTotalUnfunded(port_data) {
        let totalCommited = this.getTotalCommited(port_data)
        let totalCalled = this.getTotalCalled(port_data)

        return convertToInternationalCurrencySystem(totalCommited - totalCalled)
    }

    render() {
        const { portfolios, portfolioDetails } = this.props
        const { activePortfolio } = this.props

        if(portfolios.loading || portfolioDetails.loading) {
            if(portfolios.loading) {
                return <Loader />
            }
            return <SidebarLayout>
                <Loader />
            </SidebarLayout>
        }

        if(portfolios.error || portfolioDetails.error) {
            if(portfolios.error) {
                return <Error message={portfolios.error || portfolioDetails.error} />
            }
            return <SidebarLayout>
                <Error />
            </SidebarLayout>
        }
        const { port_data } = portfolioDetails.data

        return (
            <SidebarLayout>
                {portfolioDetails.success && activePortfolio && activePortfolio.value && 
                <>
                    <h5 className='title mt-3'>Summary Statistics</h5>
                    <div className='custom-container mt-3'>
                        <OwlCarousel 
                            className="owl-theme"  
                            loop={false}
                            nav={true}
                            margin={20} 
                            dots={false}
                            autoWidth={false}
                            navText= {[
                                '<i class="fa-solid fa-chevron-left"></i>',
                                '<i class="fa-solid fa-chevron-right"></i>'
                            ]}
                            responsive={{
                                0:{
                                    items: 1
                                },
                                600:{
                                    items: 1
                                },
                                991:{
                                    items: 2
                                },
                                1280:{
                                    items: 3
                                },
                                2000:{
                                    items: 6
                                },
                            }}
                        >  
                            <div className='top-tile'>
                                <div className="tile-content">
                                    <h5>Funds</h5>
                                    <h2>{this.getTotalFundCount(port_data)}</h2>
                                </div>
                                <div className='tile-icon'>
                                    <i className="fa-duotone fa-2x fa-dollar-sign"></i>
                                </div>
                            </div>
                            <div className='top-tile'>
                            <div className="tile-content">
                                    <h5>Commited</h5>
                                    <h2>{convertToInternationalCurrencySystem(this.getTotalCommited(port_data))}</h2>
                                </div>
                                <div className='tile-icon'>
                                    <i className="fa-solid fa-2x fa-handshake"></i>
                                </div>
                            </div>
                            <div className='top-tile'>
                                <div className="tile-content">
                                    <h5>Strategies</h5>
                                    <h2>{this.getStratergiesCount(port_data)}</h2>
                                </div>
                                <div className='tile-icon'>
                                    <i className="fa-solid fa-2x fa-chess"></i>
                                </div>
                            </div>
                            <div className='top-tile'>
                                <div className="tile-content">
                                    <h5>Unfunded</h5>
                                    <h2>{this.getTotalUnfunded(port_data)}</h2>
                                </div>
                                <div className='tile-icon'>
                                    <i className="fa-solid fa-2x fa-sack-dollar"></i>
                                </div>
                            </div>
                            <div className='top-tile'>
                                <div className="tile-content">
                                    <h5>NAV</h5>
                                    <h2>{convertToInternationalCurrencySystem(this.getTotalNav(port_data))}</h2>
                                </div>
                                <div className='tile-icon'>
                                    <i className="fa-solid fa-2x fa-hand-holding-dollar"></i>
                                </div>
                            </div>
                            <div className='top-tile'>
                                <div className="tile-content">
                                    <h5>TVPI</h5>
                                    <h2>{this.getTVPI(port_data)}x</h2>
                                </div>
                                <div className='tile-icon'>
                                    <i className="fa-solid fa-2x fa-money-bill-trend-up"></i>
                                </div>
                            </div>
                        </OwlCarousel>  
                    </div>


                    <h5 className='title mt-3'>Summary Statistics</h5>
                    <div className='custom-container mt-3'>
                        <div className='section-title-container'>
                            <h5 className='title'>Exposures</h5>
                            <div className='selector-btns-container'>
                                <button onClick={() => this.setState({ pieMetrics: 'Commitment ' })} className={`selector-button ${this.state.pieMetrics === 'Commitment ' && 'active'}`}>
                                    Commitment
                                </button>
                                <button onClick={() => this.setState({ pieMetrics: 'Total called' })} className={`selector-button ${this.state.pieMetrics === 'Total called' && 'active'}`}>
                                    Total Called
                                </button>
                                <button onClick={() => this.setState({ pieMetrics: 'Total unfunded' })} className={`selector-button ${this.state.pieMetrics === 'Total unfunded' && 'active'}`}>
                                    Total Unfunded
                                </button>
                                <button onClick={() => this.setState({ pieMetrics: 'NAV' })} className={`selector-button ${this.state.pieMetrics === 'NAV' && 'active'}`}>
                                    NAV
                                </button>
                            </div>
                        </div>
                        <div>
                            <Chart port_data={port_data} metric={this.state.pieMetrics} />
                        </div>
                    </div>


                    {/* <h5 className='title mt-3'></h5> */}
                    <div className='custom-container mt-3'>
                        <div className='section-title-container'>
                            <h5 className='title'>Distribution of fund performance</h5>
                            {/* <div className='selector-btns-container'>
                                <button onClick={() => this.setState({ barMetrics: 'Commitment ' })} className={`selector-button ${this.state.barMetrics === 'Commitment ' && 'active'}`}>
                                    Commitment
                                </button>
                                <button onClick={() => this.setState({ barMetrics: 'Total called' })} className={`selector-button ${this.state.barMetrics === 'Total called' && 'active'}`}>
                                    Total Called
                                </button>
                                <button onClick={() => this.setState({ barMetrics: 'Total unfunded' })} className={`selector-button ${this.state.barMetrics === 'Total unfunded' && 'active'}`}>
                                    Total Unfunded
                                </button>
                                <button onClick={() => this.setState({ barMetrics: 'NAV' })} className={`selector-button ${this.state.barMetrics === 'NAV' && 'active'}`}>
                                    NAV
                                </button>
                            </div> */}
                        </div>
                        <div className='mt-3'>
                            <BarChart port_data={port_data} metric={this.state.barMetrics} />
                        </div>
                    </div>
                </>
                }

                {(!activePortfolio || !activePortfolio.value) &&
                    <Error message="Please select a portfolio to get the stats" />
                }

            </SidebarLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    portfolios: state.portfolios,
    portfolioDetails: state.portfolioDetails,
    activePortfolio: state.activePortfolio
})

const mapDispatchToProps = {
    getPortfolios: portfolioActions.getPortfolios,
    getPortfolioDetails: portfolioActions.getPortfolioDetails,
    changeActivePortfolio: portfolioActions.changeActivePortfolio
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)