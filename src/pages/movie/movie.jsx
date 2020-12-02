import React,{useState} from 'react';
import {useParams} from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import moment from 'moment';
import {PlayCircleOutlined} from '@ant-design/icons'

import './movie.scss'
import {API, URL_API} from "../../utils/constants";
import Loading from "../../components/Loading/Loading";
import {Col, Row, Button} from "antd";
import ModalVideo from "../../components/ModalVideo/ModalVideo";


function Movie() {
    const {id} = useParams();
    const {error, loading, result} = useFetch(`${URL_API}/movie/${id}?api_key=${API}&language=es-ES`)

    if(loading || !result){
        return (<Loading/>)
    }
    return (
        <RenderMovie movie={result}/>
    );
}

function RenderMovie({movie}){
    const {id, title, backdrop_path, genres, overview, poster_path, tagline, vote_average, release_date } = movie
    const imageURL = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    return (
        <div className="movie" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('${imageURL}')`}}>

            <Row>
                <Col span={9} offset={1} className="movie__poster">
                    <PosterMovie poster_path={poster_path} tagline={tagline}/>
                </Col>
                <Col span={12} className="movie__info">
                    <InfoMovie title={title} genres={genres} id={id} overview={overview} vote_average={vote_average} release_date={release_date}/>
                </Col>
            </Row>

        </div>
    )
}

function PosterMovie({poster_path, tagline}){
    const imageURL = `https://image.tmdb.org/t/p/original${poster_path}`;
    return (
        <div className="movie__poster-card">
            <div className="image-poster" style={{backgroundImage: `url('${imageURL}')`}}/>
            <div>
                <h5>{tagline}</h5>
            </div>
        </div>
    )
}

function InfoMovie({id, title, genres, overview, vote_average, release_date}){
    const [isVisibleModalstate, setStateIsVisibleModal] = useState(false);
    const videoUrl = useFetch(`${URL_API}/movie/${id}/videos?api_key=${API}&language=es-ES`);


    const openModal = () => setStateIsVisibleModal(true);
    const closeModal = () => setStateIsVisibleModal(false);

    const renderVideo = () => {
        if(videoUrl.result){
            if (videoUrl.result.results.length > 0){
                return <>
                    <Button onClick={openModal} type="primary" icon={<PlayCircleOutlined />} size="large">
                        Ver trailer
                    </Button>
                    <ModalVideo
                        videoKey={videoUrl.result.results[0].key}
                        videoPlatform={videoUrl.result.results[0].site}
                        isOpen={isVisibleModalstate}
                        close={closeModal}
                    />
                </>
            }
        }
    }

    return(
        <>
            <div className="movie__info-header">
                <h1>{title}
                    <span>{moment(release_date, "YYYY-MM-DD").format('YYYY')}</span></h1>
                {renderVideo()}
            </div>
            <div className="movie__info-content">
                <h3>General</h3>
                <p>{overview}</p>
                <h3>Valoración: <span>{vote_average}</span></h3>
                <h3>Géneros</h3>
                <ul>
                    {genres.map(genre => (
                        <li key={genre.id}>{genre.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Movie;
