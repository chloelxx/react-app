import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './component/redux/contain.jsx'
import todoApp from './component/redux/reducers.jsx'

let store = createStore(todoApp)

let rootElement = document.getElementById('root')
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)