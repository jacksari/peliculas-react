import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { Layout } from 'antd'
import Home from "./pages/home/home";
import NewMovies from "./pages/new-movies";
import Popular from "./pages/popular";
import Search from "./pages/search/search";
import Movie from "./pages/movie/movie";
import Error404 from "./pages/error404/error404";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";



function App() {
    const {Header, Content} = Layout;
    return (
    <Layout>
        <Router>
            <Header>
                <Menu/>
            </Header>

            <Content>
                <Switch>
                    <Route path="/" exact={true}>
                        <Home/>
                    </Route>
                    <Route path="/new-movies" exact={true}>
                        <NewMovies/>
                    </Route>
                    <Route path="/popular" exact={true}>
                        <Popular/>
                    </Route>
                    <Route path="/search" exact={true}>
                        <Search/>
                    </Route>
                    <Route path="/movie/:id" exact={true}>
                        <Movie/>
                    </Route>
                    <Route path="*" exact={true}>
                        <Error404/>
                    </Route>

                </Switch>
            </Content>

            <Footer/>
        </Router>
    </Layout>
  );
}

export default App;
