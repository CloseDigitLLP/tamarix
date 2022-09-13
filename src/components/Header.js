import React from 'react'
import { connect } from 'react-redux';
import Select, { NonceProvider } from 'react-select'
import * as portfolioActions from '../services/portfolios/actions';

const customStyles = {
    container: (styles) => ({ ...styles, background: 'white', outline: 'none', marginLeft: 10, borderRadius: 90, justifyContent: 'space-between', display: 'flex', paddingLeft: 10, paddingRight: 20, minWidth: 300 }),
    control: (styles, {isFocused, isSelected}) => ({ ...styles, flex: 1, background: 'transparent', border: 'none',  fontSize: 18, fontWeight: 400, letterSpacing: 0.5, ':hover': { borderColor: '#fff', boxShadow: 'none' },  boxShadow: isSelected ? '#65a9c98a' : undefined,  boxShadow: isFocused ? undefined : undefined }),
    indicatorSeparator: () => ({ display: 'none' }),
    indicatorsContainer: (styles) => ({ ...styles }),
    dropdownIndicator: (styles) => ({ ...styles, background: '#65A8C9', color: 'white', borderRadius: 99 }),
    menu: (styles) => ({ ...styles, zIndex: 9 }),
    option: (styles, {isFocused, isSelected}) =>{
        return{
            ...styles,
            cursor: 'pointer',
            'hover' : {backgroundColor:'#65a9c98a'},
            backgroundColor: isFocused ? '#000' : '',
            backgroundColor: isSelected ? '#65a9c98a' : '#fff',
            'hover' : {backgroundColor:'#65a9c98a'},
            boxShadow: undefined,
            // 'active' : {backgroundColor:'#65a9c98a'}
        };
    }
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