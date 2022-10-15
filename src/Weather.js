import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{this.props.weather.date}</Card.Title>
        <Card.Text>{this.props.weather.description} </Card.Text>
      </Card.Body>
    </Card>
        )
    }
}

export default Weather;