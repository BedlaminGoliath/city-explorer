import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
    render() {
        return (
            <>

                {this.props.weather.map((day, idx) => (
                    <Card style={{ width: '18rem' }} key={idx}>
                        <Card.Body>
                            <Card.Title>{day.date}</Card.Title>
                            <Card.Text>{day.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
                }
            </>
        )
    }
}

export default Weather;