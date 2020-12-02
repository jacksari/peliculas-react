import React,{useState,useEffect} from 'react';
import './search.scss';
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import {API, URL_API} from "../../utils/constants";
import {Col, Row} from "antd";
import MovieCatalog from "../../components/MovieCatalog/MovieCatalog";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";

function Search(props) {
    const { location, history} = props;
    const [movieList, setMovieList] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const searchValue = queryString.parseUrl(location.search)
        const {s} = searchValue.query;
        if(s){
            ( async () => {
                try{
                    const res = await fetch(`${URL_API}/search/movie?api_key=${API}&language=es-ES&query=${s}&page=1&include_adult=true`);
                    const json = await res.json();
                    setMovieList(json);
                    setSearchValue(s);
                } catch (e) {
                    console.log(e)
                }
            })()
        }
    }, [location.search])
    //console.log(movieList)

    const onChangeSearch = (e) => {
        const ulrParams = queryString.parse(location.search)
        ulrParams.s = e.target.value;
        history.push(`?${queryString.stringify(ulrParams)}`);
        setSearchValue(e.target.value)
        //console.log(e.target.value)

    }

    return (
        <Row justify="center">
            <Col span={24} style={{textAlign: "center", marginTop: 25}} className="search">
                <h1 style={{fontSize: 35, fontWeight: "bold"}}>Busca tu película</h1>
                <input type="text" value={searchValue} onChange={onChangeSearch}/>
            </Col>
            {movieList.results ? (
                <>
                    <Col span={24}>
                        <MovieCatalog movies={movieList.results}/>
                    </Col>
                    <Col span={24}>
                        <Row justify="center">
                            pagination...
                        </Row>
                    </Col>
                </>
            ):(
                <Col>
                    <h3 className="title-search-inline">Busque una película por favor 😀 😀 😀</h3>
                    <Loading/>
                </Col>
            )}
        </Row>
    );
}


export default withRouter(Search);
