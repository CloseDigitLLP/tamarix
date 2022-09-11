import React from 'react'

export default class Loader extends React.Component {
    render() {
        return <>
            <div style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}>
                {/* <i className='fa fa-4x fa-circle-o-notch fa-spin'></i> */}
                {/* <i className="fa-regular  fa-circle-exclamation"></i> */}
                <i className="fa-solid fa-4x fa-circle-exclamation"></i>
                <h2 className='mt-3'>{this.props.message}</h2>
            </div>
        </>
    }
}