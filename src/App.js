import React from 'react'
import './App.css';
import axios from 'axios';
import Map from './Map';
import { Form, Button, } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: '',
      lat: '',
      lon: '',
      mapUrl: ''
    }
  }
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  getLocation = async () => {

    // things
    // key: YOUR_ACCESS_TOKEN
    // q: SEARCH_STRING
    // format: 'json'

    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    console.log('url ', url);
    // .query
    const response = await axios.get(url);
    console.log('response Object: ', response);
    console.log(response.data[0].lat, response.data[0].lon);
    this.setState({ location: response.data[0].display_name, lat: response.data[0].lat, lon: response.data[0].lon })
  }

  render() {
    return (
      <>
      <div className="App">
        <div className='body'>

          <h1>City Explorer</h1>

            <Form>
          <div className='form'>
            <Form.Label></Form.Label>
            <Form.Control
          type="text" onChange={this.handleChange}
            placeholder="search for your city here"
             />
          <Button onClick={this.getLocation}>Explore!</Button>
            </div>
            </Form>
          <h2>The City you searched for:{this.state.location.display_name}</h2>
          {this.state.location &&
          <Map map={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`} />
        }
          <p>{this.state.lat}, {this.state.lon}</p>
            
        </div>
        {/* <Container>

      </Container> */}
      </div>
      </>
    );
  }
}

export default App;

