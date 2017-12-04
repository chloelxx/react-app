import React,{Component} from "react";

const Username = ({ match }) => {
    return <h1>Hello, {match.url}!</h1>
}
const HomePage = () => <h1>Home Page</h1>;

export default HomePage