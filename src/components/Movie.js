import React, { Component } from 'react'

export class Movie extends Component {
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <img src={this.props.poster_path} alt={this.props.title} />
                <p>{this.props.vote_average}</p>
            </div>
        )
    }
}

export default Movie
