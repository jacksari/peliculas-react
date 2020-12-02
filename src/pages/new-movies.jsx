import React,{useState, useEffect} from 'react';
import {API, URL_API} from "../utils/constants";
import {Row,Col} from "antd";
import Loading from "../components/Loading/Loading";
import MovieCatalog from "../components/MovieCatalog/MovieCatalog";
import Pagination from "../components/Pagination/Pagination";

function NewMovies() {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        ( async () => {
            try{
                const res = await fetch(`${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=${page}`);
                const json = await res.json();
                setMovieList(json);
            } catch (e) {
                console.log(e)
            }
        })()
    }, [page]);

    const onChange = page => {
        setPage(page);
    }

    return (
        <Row justify="center">
            <Col span={24} style={{textAlign: "center", marginTop: 25}}>
                <h1 style={{fontSize: 35, fontWeight: "bold"}}>Últimos lanzamientos</h1>
            </Col>
            {movieList.results ? (
                <>
                    <Col span={24}>
                        <MovieCatalog movies={movieList.results}/>
                    </Col>
                    <Col span={24}>
                        <Row justify="center">
                            <Pagination
                                currentPage={movieList.page}
                                totalItems={movieList.total_results}
                                onChangePage={onChange}
                            />
                        </Row>
                    </Col>
                </>
            ):(
                <Col>
                    <Loading/>
                </Col>
            )}
        </Row>
    );
}

export default NewMovies;
