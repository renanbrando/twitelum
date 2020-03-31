import React, { Component } from 'react'
import './dashboard.scss'

class Dashboard extends Component {
    render() {
        return (
            <div className={`dashboard dashboard__${this.props.posicao}`}>
                {this.props.children}
            </div>
        )
    }
}

export default Dashboard