import React from 'react'
import './App.css';
import axios from 'axios';
import Weather from './Weather';
import Map from './Map';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayError: false,
      displayResults: false,
      searchQuery: '',
      location: '',
      lat: '',
      lon: '',
      mapUrl: '',
      errorMessage: '',
      weather: [],
      movies: []
    }
  }
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  getLocation = async (event) => {
    event.preventDefault();

    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      console.log('url ', url);
      // .query
      const response = await axios.get(url);
      console.log('location: ', response);
      console.log(this.state.searchQuery);
      console.log(response.data[0].lat, response.data[0].lon);
      this.setState({
        location: response.data[0].display_name,
        lat: response.data[0].lat,
        lon: response.data[0].lon, errorMessage: false }, () => {
        this.getMovies();
        this.getWeather();
      });

    } catch (error) {
      this.setState({
        displayResults: false,
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data
      })
    }
  }

  // go line by line

  getWeather = async () => {

    try {
      const url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.searchQuery}&lat=${this.state.lat}&lon=${this.state.lon}`;
      console.log('url ', url);
      console.log('searchquery ', this.state.searchQuery);

      const response = await axios.get(url);
      console.log('weather: ', response);
      console.log(response.data);
      this.setState({ weather: response.data });
    } catch (error) {
      // console.log("error in getweather : ", error.response.data)
      this.setState({
        displayResults: false,
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data
      })
    }
  }


  getMovies = async () => {

    try {
      const url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchQuery}`;
      console.log('url ', url);
      // .query
      console.log('searchquery ', this.state.searchQuery);

      const response = await axios.get(url);
      console.log('movie' , response.data);
      this.setState({ movies: response.data });
    } catch (error) {
      // console.log("error in getweather : ", error.response.data)
      this.setState({
        displayResults: false,
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data
      })
    }
  }

  render() {
    return (
      <>
        <div className="App">
          <div className='body'>

            <h1>City Explorer</h1>

            <Form >
              <Form.Control
                type="text" onChange={this.handleChange}
                placeholder="search for your city here"
              />
              <Button onClick={this.getLocation}>Explore!</Button>
              {this.state.errorMessage &&
                < Alert key='primary' type='danger'><p> enter a valid query</p></Alert>}
            </Form>
            <h2>The City you searched for: {this.state.location}</h2>
            {this.state.location &&
              <Map map={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`} />
            }
            <Weather
              weather={this.state.weather}
            />

            <Movies 
              movies={this.state.movies}
            />
            <Accordion>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>
                  City Name:
                </Accordion.Header>
                <Accordion.Body>
                  <h2>{this.state.location}</h2>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>
                  lat and lon:
                </Accordion.Header>
                <Accordion.Body>
                  <h2> lat {this.state.lat}, lon {this.state.lon}</h2>
                </Accordion.Body>
              </Accordion.Item>



            </Accordion>
          </div>



        </div>
      </>
    );
  }
}

export default App;

