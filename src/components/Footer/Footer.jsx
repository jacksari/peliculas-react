import React from 'react';
import './Footer.scss'
import {Layout} from "antd";

function Footer(props) {
    const {Footer} = Layout
    return (
        <Footer className="footer">
            <p>Jack Sari <span>Dev</span> 2020</p>
        </Footer>
    );
}

export default Footer;
