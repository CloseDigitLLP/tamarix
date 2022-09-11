import React from 'react'
import { connect } from 'react-redux';
class Header extends React.Component {
    render() {
        const { username } = this.props.portfolios.data
        var letters = 'TX'
        if(username) {
            var matches = username.match(/\b(\w)/g); 
            var acronym = matches.join('');
    
            letters = acronym
        }
        return (
            <div className='header-part'>
                <div className='heder-content'>
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
    portfolios: state.portfolios   
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)