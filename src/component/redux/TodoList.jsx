import React, { Component, PropTypes } from 'react'
import Todo from './Todo.jsx'
import DeleteTodo from "./DeleteTodo";


export default class TodoList extends Component {
    render() {
        return (
            <ul>
                {this.props.todos.map((todo, index) => <div   key={index}>
                        <Todo {...todo}

                              onClickD={(event) => {
                                  console.log("Todo this.props", this.props, {...todo})
                                  this.props.onChangeClick(todo.text)
                              }}
                        >
                            <DeleteTodo onClickDel={(event) => {
                                console.log("span click",event)
                                event.stopPropagation()
                                this.props.onDeleteClick(todo.text)
                            }} />

                        </Todo>
                        {/*<DeleteTodo onClickDel={(event) => {*/}
                                {/*console.log("span click",event)*/}
                                {/*event.stopPropagation()*/}
                                {/*this.props.onDeleteClick(todo.text)*/}
                            {/*}} />*/}
                    </div>
                )}
            </ul>
        )
    }
}

TodoList.propTypes = {
    onDeleteClick:PropTypes.func.isRequired,
    onChangeClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
    }).isRequired).isRequired
}