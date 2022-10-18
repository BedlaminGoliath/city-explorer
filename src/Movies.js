import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

class Movies extends React.Component {
    render() {
        return (
            <Row>
                {this.props.movies.map((movie, idx) => (
                    <Col>
                        <Card style={{ width: '18rem' }} key={idx}>
                            <Card.Img 
                            src={movie.image_url}
                            alt={movie.overview}
                            />
                            <Card.Body>
                                <Card.Text>Title: {movie.title}</Card.Text>
                                <Card.Text>Overview{movie.overview}</Card.Text>
                                <Card.Text>Released On: {movie.released_on}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        )
    }
}

export default Movies;