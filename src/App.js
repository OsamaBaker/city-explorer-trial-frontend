import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Location from "./components/Location";
import { Card, CardGroup } from "react-bootstrap";
import Weather from "./components/Weather";
import Movie from "./components/Movie";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      cityData: {},
      locationImage: "",
      weatherInfo: [],
      movieInfo: [],
    };
  }

  // Get Location

  handleEvents = async (e) => {
    e.preventDefault();

    await this.setState({
      searchQuery: e.target.city.value,
    });

    //locationIQ
    let url = `${process.env.REACT_APP_REACTAPP_SERVER}/location?searchQuery=${this.state.searchQuery}`;

    let resData = await axios.get(url);

    await this.setState({
      cityData: resData.data,
    });
    await this.setState({
      locationImage: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`,
    });

    // Get Weather
    let weatherUrl = `${process.env.REACT_APP_REACTAPP_SERVER}/weather?searchQuery=${this.state.searchQuery}`;

    let weatherData = await axios.get(weatherUrl);

    await this.setState({
      weatherInfo: weatherData.data,
    });

    // Get Movies
    let moviesUrl = `${process.env.REACT_APP_REACTAPP_SERVER}/movies?searchQuery=${this.state.searchQuery}`;

    let moviesData = await axios.get(moviesUrl);

    await this.setState({
      movieInfo: moviesData.data,
    });
  };

  render() {
    return (
      <div>
        <CardGroup>
          <Card>
            <Location
              source={this.state.locationImage}
              display_name={this.state.cityData.display_name}
              onSubmit={this.handleEvents}
            />
          </Card>
        </CardGroup>
        {this.state.weatherInfo.map((item, idx) => {
          return (
            <CardGroup>
              <Card>
                <Weather
                  valid_date={item.valid_date}
                  description={item.description}
                />
              </Card>
            </CardGroup>
          );
        })}
        {this.state.movieInfo.map((item, idx) => {
          return (
            <CardGroup>
              <Card>
                <Movie
                  title={item.title}
                  vote_average={item.vote_average}
                  poster_path={item.poster_path}
                />
              </Card>
            </CardGroup>
          );
        })}
      </div>
    );
  }
}

export default App;
