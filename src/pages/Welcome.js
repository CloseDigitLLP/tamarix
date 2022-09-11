import React from 'react'
import { Link } from 'react-router-dom';

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome-page">
                <div className='header-parts'>
                <div className='logo-part'>
                    <a href="">
                    <h1 className='logo-text'>TAMARIX</h1>
                    </a>
                </div>
                <div className='description'>
                    <h3 className='welcome-text mt-5'>Welcome</h3>
                    <p className='sentence mt-4'>The future of private markets investment management.</p>
                    <Link to={'/portfolio'}>
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