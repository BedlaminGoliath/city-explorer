import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

class Movies extends React.Component {
    render() {
        return (
            <Row>
                {this.props.movies.map((movie, idx) => (
                    <Movie
                    key={idx}
                        movie={movie}
                    />
                ))}
            </Row>
        )
    }
}


class Movie extends React.Component {

    render() {
        const movie = this.props.movie;
        return (

            < >
                <Col>
                    <Card style={{ width: '18rem' }} >
                        <Card.Img
                            // src={`https://image.tmdb.org/t/p/original${movie.image_url}`}
                            src = {movie.image_url}
                            alt={movie.overview}
                        />
                        <Card.Body>
                            <Card.Text>Title: {movie.title}</Card.Text>
                            <Card.Text>Overview{movie.overview}</Card.Text>
                            <Card.Text>Released On: {movie.released_on}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </>
        )
    }

}

export default Movies;
