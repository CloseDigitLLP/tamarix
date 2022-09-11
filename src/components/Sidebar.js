import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './Loader';
class Sidebar extends React.Component {
    render() {
        const { portfolios } = this.props
        if(portfolios.loading) {
            return <Loader />
        }
        let portfolioList = portfolios?.data?.portfolios || []
        return (
            <div className='sidebar-part'>
                <div className='sidebar-logo'>
                <Link to={'/'}>TAMARIX</Link>
                </div>
                <div className='link-part'>
                <ul>
                    <li className={window.location.pathname === '/portfolio' ? 'active' : ''}>
                    <div>
                        <i className="fa-solid fa-chart-line"></i>
                        <Link to={'/portfolio'}>Portfolio</Link>
                    </div>
                        <ul>
                            {portfolioList.map((portfolio, index) => (
                                index < 5 ?
                                <li key={index}>{portfolio}</li>
                                : <></>
                            ))}
                        </ul>
                    </li>
                    <li className={window.location.pathname === '/scenarios' ? 'active' : ''}>
                    <div>
                        <i className="fa-regular fa-pen-to-square"></i>
                        <Link to={'/scenarios'}>Scenarios</Link>
                    </div>
                    </li>
                    <li className={window.location.pathname === '/projection' ? 'active' : ''}>
                    <div>
                        <i className="fa-solid fa-chart-simple"></i>
                        <Link to={'/projection'}>Projection</Link>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    portfolios: state.portfolios   
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)