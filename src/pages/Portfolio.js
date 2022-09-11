import React from 'react';
import SidebarLayout from '../layouts/Sidebar';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import '../assets/owl.scss'
import Chart from './components/PieChart';
import BarChart from './components/BarChart';

export default class Portfolio extends React.Component {
    render() {
        return (
            <SidebarLayout>
                <h5 className='page-name'>Portfolio</h5>

                <h5 className='title mt-3'>Summary Statistics</h5>
                <div className='custom-container mt-3'>
                    <OwlCarousel 
                        className="owl-theme"  
                        loop={false}
                        nav={true}
                        margin={-100} 
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
                            1000:{
                                items: 3
                            }
                        }}
                    >  
                        <div className='top-tile'>
                            <div className="tile-content">
                                <h5>Funds</h5>
                                <h2>20</h2>
                            </div>
                            <div className='tile-icon'>
                                <i class="fa-duotone fa-2x fa-dollar-sign"></i>
                            </div>
                        </div>
                        <div className='top-tile'>
                        <div className="tile-content">
                                <h5>Commited</h5>
                                <h2>$5000.4 M</h2>
                            </div>
                            <div className='tile-icon'>
                                <i class="fa-solid fa-2x fa-handshake"></i>
                            </div>
                        </div>
                        <div className='top-tile'>
                            <div className="tile-content">
                                <h5>Strategies</h5>
                                <h2>4</h2>
                            </div>
                            <div className='tile-icon'>
                                <i class="fa-solid fa-2x fa-chess"></i>
                            </div>
                        </div>
                        <div className='top-tile'>
                            <div className="tile-content">
                                <h5>Unfunded</h5>
                                <h2>$520.6M</h2>
                            </div>
                            <div className='tile-icon'>
                                {/* <i class="fa-duotone fa-3x fa-dollar-sign"></i> */}
                                {/* <i class="fa-regular fa-3x fa-sack-dollar"></i> */}
                                <i class="fa-solid fa-2x fa-sack-dollar"></i>
                            </div>
                        </div>
                        <div className='top-tile'>
                            <div className="tile-content">
                                <h5>NAV</h5>
                                <h2>$600.32</h2>
                            </div>
                            <div className='tile-icon'>
                                {/* <i class="fa-duotone fa-3x fa-dollar-sign"></i> */}
                                <i class="fa-solid fa-2x fa-hand-holding-dollar"></i>
                            </div>
                        </div>
                        <div className='top-tile'>
                            <div className="tile-content">
                                <h5>TVPI</h5>
                                <h2>200.2X</h2>
                            </div>
                            <div className='tile-icon'>
                                <i class="fa-solid fa-2x fa-money-bill-trend-up"></i>
                                {/* <i class="fa-duotone fa-3x fa-dollar-sign"></i> */}
                            </div>
                        </div>
                    </OwlCarousel>  
                </div>


                <h5 className='title mt-3'>Summary Statistics</h5>
                <div className='custom-container mt-3'>
                    <div className='section-title-container'>
                        <h5 className='title'>Exposures</h5>
                        <div className='selector-btns-container'>
                            <button className='selector-button active'>
                                Commitment
                            </button>
                            <button className='selector-button'>
                                Total Called
                            </button>
                            <button className='selector-button'>
                                Total Unfunded
                            </button>
                            <button className='selector-button'>
                                NAV
                            </button>
                        </div>
                    </div>
                    <div>
                        <Chart chartContainer={this.chartContainer} />
                    </div>
                </div>


                <h5 className='title mt-3'>Summary Statistics</h5>
                <div className='custom-container mt-3'>
                    <div className='section-title-container'>
                        <h5 className='title'>Exposures</h5>
                        <div className='selector-btns-container'>
                            <button className='selector-button active'>
                                Commitment
                            </button>
                            <button className='selector-button'>
                                Total Called
                            </button>
                            <button className='selector-button'>
                                Total Unfunded
                            </button>
                            <button className='selector-button'>
                                NAV
                            </button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <BarChart />
                    </div>
                </div>
            </SidebarLayout>
        )
    }
}