import React, { Component, PropTypes } from 'react'

export default class DeleteTodo extends Component {
    render() {
        console.log("DeleteTodo render props:",this.props);
        return (
            <span onClick={this.props.onClickDel}>删除</span>

        )
    }
}

DeleteTodo.propTypes = {
    onClickDel: PropTypes.func.isRequired,
}
