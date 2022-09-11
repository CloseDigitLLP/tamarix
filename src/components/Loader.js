import React from 'react'

export default class Loader extends React.Component {
    render() {
        return <>
            <div style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <i className='fa fa-4x fa-circle-o-notch fa-spin'></i>
            </div>
        </>
    }
}