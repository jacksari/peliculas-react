import React from 'react';
import './SliderMovies.scss';
import {Link} from 'react-router-dom';
import {Button, Carousel } from "antd";
import Loading from "../Loading/Loading";


function SliderMovies({movies}) {
    const { loading, result } = movies;

    if(loading || !result){
        return (<Loading/>)
    }
    const { results } = result;

    return (
        <Carousel autoplay className="slider-movies" effect="fade">
            {results.map(movie => <Movie key={movie.id} movie={movie}/> )}
        </Carousel>
    );
}

function Movie({movie}){
    const {id, backdrop_path, overview, title } = movie;
    const imageURL = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    return (
        <div className="slider-movies__movie" style={{backgroundImage: `url('${imageURL}')`}}>
            <div className="slider-movies__movie-info">
                <div>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <Link to={`/movie/${id}`}>
                        <Button type="primary">Ver más</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SliderMovies;
