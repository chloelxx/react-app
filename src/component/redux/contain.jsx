import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo,changeTodo,deleteTodo} from './action.jsx'

import { BrowserRouter, Route, Link } from "react-router-dom";
import Main from "../../PrimaryLayout.jsx";

import AddTodo from './addTodo.jsx'
import TodoList from './TodoList.jsx'
import Footer from './footer.jsx'

class App extends Component {
    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos } = this.props;
        console.log("this.props：",this.props);
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    } />
                <TodoList
                    onChangeClick={text =>
                        dispatch(changeTodo(text))
                    }
                    onDeleteClick={text=>dispatch(deleteTodo(text))}
                    todos={visibleTodos}
                    />
                <BrowserRouter >
                    <Main />
                </BrowserRouter>
            </div>
        )
    }
}
App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
}
function select(state){
    return {
        visibleTodos:state.todos,
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)