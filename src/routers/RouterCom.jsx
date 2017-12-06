import React,{ Component }  from "react";
import { BrowserRouter, Route, Link ,Redirect,Switch } from "react-router-dom";
import Homepage from "../components/HomePage.jsx";
import BannerConfig from "../components/BannerConfig.jsx";
import MerchantMan from "../components/MerchantMan.jsx";
import MessageMan from "../components/MessageMan.jsx";
import APIDosMan from "../components/apiDos.jsx";
import PermissionMan from "../components/PermissionMan.jsx";
import AuthRouter from './AuthRouter.jsx'

import Login from "../login/Login.jsx"
const RouterCom =({ match }) =>(
    <div>
            {/*<Switch>*/}
            <Route path="/" component={Homepage} />{/* 加上了exact就只会匹配路由的一个，如果没有exact就点击的路由的所有组件都会渲染*/}
            <Route path="/bannerConfig" component={BannerConfig} />
            <Route path="/merchantMan" component={MerchantMan} />
            <Route path="/messageMan" component={MessageMan} />
            <Route path="/APIDosMan" component={APIDosMan} />
            <Route path="/permissionMan" component={PermissionMan} />


            {/*</Switch>*/}
            {/*</Route>*/}
            {/*<Redirect  from="/"  to="/login"/>*/}

    </div>
)
export default RouterCom