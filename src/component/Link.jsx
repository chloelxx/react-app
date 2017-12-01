import React,{ Component }  from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

class Users extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/User">User</Link>
                </li>
                <li>
                    <Link to="/Country">Country</Link>
                </li>
                <li>
                    <Link to="/Info">Info</Link>
                </li>
                <li>
                    <Link to="/Manger">Manger</Link>
                </li>
                <li>
                    <Link to="/Date">Date</Link>
                </li>
                <li>
                    <Link to="/username/liuxx">username</Link>
                </li>
            </ul>
        )
    }
}
export default Users
