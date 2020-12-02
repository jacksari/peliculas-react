import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, List} from 'antd';
import Loading from "../Loading/Loading";
import {RightOutlined} from '@ant-design/icons';
import './MovieList.scss';

function MovieList({movies, title}) {
    const {  loading, result } = movies

    if (loading || !result){
        return (<Loading/>)
    }
    return (
        <List
            className="movie-list"
            size="default"
            header={<h2>{title}</h2>}
            bordered
            dataSource={result.results}
            renderItem={movie => <RenderMovie movie={movie}/>}
        />
    );
}

function RenderMovie({movie}){
    const {id, title, poster_path} = movie;
    const ImageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    return (
        <List.Item className="movie-list__movie">
            <List.Item.Meta
                avatar={<Avatar src={ImageUrl} shape="square"/>}
                title={<List to={`/movie/${id}`}>{title}</List>}
            />
            <Link to={`/movie/${id}`}>
                <Button type="primary" shpe="circle" icon={<RightOutlined />}/>
            </Link>
        </List.Item>
    )
}

export default MovieList;
