import React,{Component} from 'react';
import Api from "../ajax/api.js"
import "../asset/main.css"

import RouterCom from "../routers/RouterCom.jsx";
import LinkCom from "../routers/LinkCom.jsx";
export default class MainBody extends Component{
    state={

    }
    constructor(props){
        super(props);
        console.log("MainBody:",this.props);
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