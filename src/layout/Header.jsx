import React,{Component} from 'react';
import "../asset/main.css"
export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="header">
               <div className="logo">logo</div>
                <div className="userInfo">userName</div>
            </div>
        )
    }
}