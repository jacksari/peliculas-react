import React from 'react';
import './MovieCatalog.scss'
import {Link} from 'react-router-dom'
import {Card, Col, Row} from "antd";
import Meta from "antd/es/card/Meta";
import {EyeOutlined} from '@ant-design/icons'

function MovieCatalog({movies}) {
    return (
        <Row justify="center" gutter={[16, 16]}>
            {movies.map(movie => (
                <Col key={movie.id} xs={18} sm={10} md={8} lg={7} xl={5} className="movie-catalog">
                    <MovieCard movie={movie}/>
                </Col>
            ))}
        </Row>
    )
}

function MovieCard({movie}){
    const {id,title,poster_path} = movie;
    const imageURL = `https://image.tmdb.org/t/p/original${poster_path}`;
    return (
        <Link to={`/movie/${id}`}>
            <Card
                hoverable
                style={{width:240}}
                cover={<img src={imageURL} alt={title}/>}
                actions={[<EyeOutlined />]}
            >
                <Meta title={title}/>
            </Card>
        </Link>
    )
}

export default MovieCatalog;
