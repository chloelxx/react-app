import React, { Component, PropTypes } from 'react'

export default class DeleteTodo extends Component {
    render() {
        return (
            <span onClick={this.props.onClickDel}>删除</span>

        )
    }
}

DeleteTodo.propTypes = {
    onClickDel: PropTypes.func.isRequired,
}
