import React,{Component} from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../asset/main.css"
import Header from "../layout/Header"
import RouterCom from "../routers/RouterCom.jsx";
import LinkCom from "../routers/LinkCom.jsx";
import LeftMenu from "./LeftMenu";
export default class Body extends Component{
    state={

    }
    constructor(props){
        super(props);
        console.log("MainBody:",this.props);
    }

    render(){
        return (
            <div>
                <Header {...this.props} />
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
            </div>

            /* <div>
                  <div className="side">
                     <LinkCom />
                 </div>
                 <div className="mainBody">
                     <div className="content">
                         <RouterCom />
                     </div>
                 </div>
             </div>*/
        )
    }
}