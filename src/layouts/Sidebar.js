import React from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
export default class SidebarLayout extends React.Component {
    state = {
        showSideBar: false
    }
    toggleSidebar= () => this.setState({ showSideBar: !this.state.showSideBar })
    render() {
        return (
            <div className='dashboard-page'>
                <Sidebar toggleSidebar={this.toggleSidebar} showSideBar={this.state.showSideBar} />
                <div className='main-content-part'>
                    <div onClick={this.toggleSidebar} className={`blanck-white-part ${this.state.showSideBar ? 'd-block' : 'd-none'}`}></div>
                    <Header toggleSidebar={this.toggleSidebar} />
                    {this.props.children}
                </div>
            </div>
        )
    }
}