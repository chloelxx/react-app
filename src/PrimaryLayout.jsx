import React from "react";
import { render } from "react-dom";
import { BrowserRouter,HashRouter, Route, Link } from "react-router-dom";
import LinkCom from './component/Link.jsx'
import PathCom from './component/Router.jsx'
const PrimaryLayout=React.createClass({
    render(){
        return (
            <div className="primary-layout">
                <header>
                    Our React Router 4 App
                </header>
                    <LinkCom />
                <main>
                    {this.props.name}
                    <PathCom />
                </main>
            </div>
        )
    }
})
export default PrimaryLayout