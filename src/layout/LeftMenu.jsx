import React,{Component} from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import "../asset/main.css"
import MainBody from "./MainBody"
import RouterCom from "../routers/RouterCom.jsx";
import LinkCom from "../routers/LinkCom.jsx";
import Main from "../PrimaryLayout"
export default class LeftMenu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                <BrowserRouter >
                   {/* <div className="side">
                        <LinkCom />
                    </div>
                    <div className="mainBody">
                        <div className="content">
                            <RouterCom />
                        </div>
                    </div>*/}
                    <MainBody />
                </BrowserRouter>
        )
    }
}