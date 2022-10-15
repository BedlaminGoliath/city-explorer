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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: '',
      lat: '',
      lon: '',
      mapUrl: '',
      errorMessage: '',
      weather: '',
      description: '',
    }
  }
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  getLocation = async (event) => {
    this.setState({searchQuery: event.target.value})
    // things to change for the sake of the pull request
    // key: YOUR_ACCESS_TOKEN
    // q: SEARCH_STRING
    // format: 'json'
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      console.log('url ', url);
      // .query
      const response = await axios.get(url);
      console.log('response Object: ', response);
      console.log(this.state.searchQuery);
      console.log(response.data[0].lat, response.data[0].lon);
      this.setState({ location: response.data[0].display_name, lat: response.data[0].lat, lon: response.data[0].lon, errorMessage: false }, ()=> this.getWeather() );

    } catch (error) {
      this.setState({ errorMessage: true })
    }
  }

// go line by line

  getWeather = async () => {

    try {
      const url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.searchQuery}`;
      console.log('url ', url);
      // .query
      console.log('searchquery ', this.state.searchQuery);
      
      // const response = await axios.get(url, {params: {latitude : lat , longitude: lon, searchQuery: this.state.searchQuery}});
        const response = await axios.get(url);
      console.log('response Object: ', response);
      console.log(response.data);
      this.setState({ weather: response.data, errorMessage: false } );
    } catch (error) {
      this.setState({ errorMessage: true })
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
              <Button onClick ={this.getLocation}>Explore!</Button>
              {this.state.errorMessage &&
                < Alert key='primary' type='danger'><p> enter a valid query</p></Alert>}
            </Form>
            <h2>The City you searched for: {this.state.location}</h2>
            {this.state.location &&
              <Map map={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`} />
            }
            <Weather
            weather={this.state.weather}
            description={this.state.description}
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

