import React from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
export default class SidebarLayout extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className='dashboard-page'>
                <Sidebar />
                <div className='main-content-part'>
                    <Header />
                    {this.props.children}
                </div>
            </div>
        )
    }
}