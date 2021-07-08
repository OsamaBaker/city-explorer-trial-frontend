import React, { Component } from 'react'

export class Weather extends Component {
    render() {
        return (
            <div>
                <p>Date: {this.props.valid_date}</p>
                <p>Feels: {this.props.description}</p>
            </div>
        )
    }
}

export default Weather;
