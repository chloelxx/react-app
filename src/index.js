import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main/main'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from "./redux/reducers.jsx"


import "./asset/main.css"
import "./asset/third-part/mathquill/mathquill.css"
import "./asset/less/editor.css"

import registerServiceWorker from './registerServiceWorker';


let store=createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
       <Main />
    </Provider>,document.getElementById("root"));



registerServiceWorker();
