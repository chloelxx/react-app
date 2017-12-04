import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './index.css';
import Main from './PrimaryLayout.jsx';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './component/redux/contain.jsx'
import todoApp from './component/redux/reducers.jsx'



import registerServiceWorker from './registerServiceWorker';
let store = createStore(todoApp)
ReactDOM.render(
    <Provider store={store}>
        <App />
        {/*<BrowserRouter >*/}
            {/*<Main />*/}
        {/*</BrowserRouter>*/}
    </Provider>
        ,document.getElementById('root'));
registerServiceWorker();
