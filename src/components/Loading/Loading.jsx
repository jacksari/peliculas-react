import React from 'react';
import './Loading.scss'
import { Spin} from "antd";

function Loading() {
    return (
        <div className="loading">
            <Spin size="large"/>
            <h5>Cargando, espere por favor...</h5>
        </div>
    );
}

export default Loading;
