import React from 'react'
import { connect } from 'react-redux';
import Select from 'react-select'
import * as portfolioActions from '../services/portfolios/actions';
import customStyles from '../assets/dropdownStyles';
import Dropdown from 'react-bootstrap/Dropdown';
import MenuIcon from '../assets/images/menu.png'
import { Link } from 'react-router-dom'


class Header extends React.Component {
    render() {
        const { username, portfolios } = this.props.portfolios.data
        const { toggleSidebar } = this.props
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
                    <button onClick={toggleSidebar} className="menu-icon"><img src={MenuIcon} alt="menu" /></button>
                    <Select className="custom-select" value={this.props.activePortfolio} onChange={e => this.props.changeActivePortfolio(e)} styles={customStyles} options={portfolioList.map(portfolio => ({ label: portfolio, value: portfolio }))} />
                <div className='user-info'>
                    <div className='placeolder-image'>
                        <h6 className='person-Initiative'>{letters}</h6>
                    </div>
                    <div className='person-name'>
                        <p className='m-0 mt-1'>{username}</p>
                        <Link to="/">
                            <p className='m-0 logout'>Logout</p>
                        </Link>
                    </div>
                </div>
                <div className='user-info-drop-down'>
                    <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic">
                            {letters}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item  className='name-link'>{username}</Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to={'/'}>
                                        Logout
                                    </Link>
                                </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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