import React, { Component, PropTypes } from 'react'
import DeleteTodo from './DeleteTodo.jsx'

export default class Todo extends Component {

    render() {
        return (

            <li
                onClick={this.props.onClickD}
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none',
                    cursor: this.props.completed ? 'default' : 'pointer'
                }}>
                {this.props.text}：{this.props.children}
            </li>


        )
    }
}

Todo.propTypes = {
    onClickD: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    // onDeleteClick:PropTypes.func.isRequired,
    // onClickDel:PropTypes.func.isRequired,
}