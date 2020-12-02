import React from 'react';
import './error404.scss'
import {Link} from 'react-router-dom'

function Error404() {
    return (
        <div className="error404">
            <h1>Error 404 ups</h1>
            <h2>Página no encontrada</h2>
            <Link to={`/`}>Volver al inicio</Link>
        </div>
    );
}

export default Error404;
