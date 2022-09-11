import React from 'react'

export default class Header extends React.Component {
    render() {
        return (
            <div className='header-part'>
                <div className='heder-content'>
                <div className='user-info'>
                    <div className='placeolder-image'>
                        <h6 className='person-Initiative'>RV</h6>
                    </div>
                    <div className='person-name'>
                        <p className='m-0 mt-1'>Rajan Vasani</p>
                        <p className='m-0 logout'>Logout</p>
                    </div>
                </div>
                </div>
            
            </div>
        )
    }
}