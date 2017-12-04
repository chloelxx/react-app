import React,{Component} from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import "../asset/main.css"

import RouterCom from "../routers/RouterCom.jsx";
import LinkCom from "../routers/LinkCom.jsx";
export default class MainBody extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                 <div className="side">
                    <LinkCom />
                </div>
                <div className="mainBody">
                    <div className="content">
                        <RouterCom />
                    </div>
                </div>
            </div>
        )
    }
}