import React from 'react'
import { connect } from 'react-redux';
import Select from 'react-select'
import * as portfolioActions from '../services/portfolios/actions';

const customStyles = {
    container: (styles) => ({ ...styles, background: 'transparent', outline: 'none', marginLeft: 10 }),
    control: (styles) => ({ ...styles, background: 'transparent', border: 'none',  fontSize: 24, fontWeight: 600, letterSpacing: 0.5 }),
    indicatorSeparator: () => ({ display: 'none' }),
    menu: (styles) => ({ ...styles, zIndex: 9 })
}
class Header extends React.Component {
    render() {
        const { username, portfolios } = this.props.portfolios.data
        let portfolioList = portfolios || []
        var letters = 'TX'
        if(username) {
            var matches = username.match(/\b(\w)/g); 
            var acronym = matches.join('');
    
            letters = acronym
        }
        return (
            <div className='header-part'>
                <div className='heder-content'>
                    <Select value={this.props.activePortfolio} onChange={e => this.props.changeActivePortfolio(e)} styles={customStyles} options={portfolioList.map(portfolio => ({ label: portfolio, value: portfolio }))} />
                <div className='user-info'>
                    <div className='placeolder-image'>
                        <h6 className='person-Initiative'>{letters}</h6>
                    </div>
                    <div className='person-name'>
                        <p className='m-0 mt-1'>{username}</p>
                        <p className='m-0 logout'>Logout</p>
                    </div>
                </div>
                </div>
            
            </div>
        )
    }
}


const mapStateToProps = state => ({
    portfolios: state.portfolios,
    activePortfolio: state.activePortfolio
})

const mapDispatchToProps = {
    changeActivePortfolio: portfolioActions.changeActivePortfolio
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)