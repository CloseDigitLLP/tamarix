import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
class Welcome extends React.Component {
    render() {
        const { portfolios } = this.props
        if(portfolios.loading) {
            return <Loader />
        }
        return (
            <div className="welcome-page">
                <div className='header-parts'>
                <div className='logo-part'>
                    <Link to={'/'}>
                    <h1 className='logo-text'>TAMARIX</h1>
                    </Link>
                </div>
                <div className='description'>
                    <h3 className='welcome-text mt-5'>Welcome</h3>
                    <p className='sentence mt-4'>The future of private markets investment management.</p>
                    <Link to={`/portfolio`}>
                        <button type="button" className='button'>Go To Dashboard</button>
                    </Link>
                </div>
                </div>
                <div className='main-part'></div>
                <div className='left-Back'></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    portfolios: state.portfolios   
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)