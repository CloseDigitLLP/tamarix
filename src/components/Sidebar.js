import React from 'react'
import { Link } from 'react-router-dom';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className='sidebar-part'>
                <div className='sidebar-logo'>
                <Link to={'/'}>TAMARIX</Link>
                </div>
                <div className='link-part'>
                <ul>
                    <li>
                    <div>
                        <i className="fa-solid fa-chart-line"></i>
                        <a href="#">Portfolio</a>
                    </div>
                    </li>
                    <li>
                    <div>
                        <i className="fa-regular fa-pen-to-square"></i>
                        <a href="#">Scenarios</a>
                    </div>
                    </li>
                    <li>
                    <div>
                        <i className="fa-solid fa-chart-simple"></i>
                        <a href="#">Projection</a>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
        )
    }
}