import React,{Component} from "react";
/*
import {Input,Button } from 'antd'
class addBanner extends Component{
    constructor(props) {
        super(props);
        console.log("this:",this);
        this.state={liked:false};
        this.handleClick=this.handleClick.bind(this);
        // return {liked: false};
    }
    handleClick=()=> {
        this.setState({liked: !this.state.liked});
    }
    render(){
        var text = this.state.liked ? '喜欢' : '不喜欢';
        return (
            <div>
                <div>banner名称：<Input /></div>
                <div>banner图片：<img /></div>
                <div>跳转URL：<img /></div>
                <div>排序：<img /></div>
                <div>上线时间：<img /></div>
                <div>结束：<img /></div>
                <div><Button type="primary">保存</Button><Button>取消</Button></div>
            </div>
        );
    }
}

export default addBanner*/
import {connect} from "react-redux"
import { Form, Input, Upload, Icon, message, Button,Modal } from 'antd';


class Delete extends Component{
    state={
        visible:true,
        loading:false,
    }
    constructor(props){
        super(props);
    }
    handleOk = () => {
        this.setState({ loading: true });
        this.props.deleteHandle(false,true)
    }
    handleCancel = () => {
        this.setState({ visible: false });
        this.props.deleteHandle(false,false)
        console.log("props:",this.props)
    }
    render(){
        console.log("delete this.props:",this.props);
        return (
            <Modal
                visible={this.props.visible}
                title="提示"
                onOk={this.handleOk}
                className="helpCenter"
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary"
                            loading={this.state.loading}
                            onClick={this.handleOk}>
                        确定
                    </Button>,
                ]}
                style={{color:"#fff"}}
                bodyStyle={{textAlign:"center"}}
            >
                <p style={{textAlign:"center"}}>是否确定删除</p>

            </Modal>
        )
    }

}
function select(state) {
    console.log("LinkCOm contain select is sign connent(select) state args param:",state)
    return {
        delete:state.todos[0],
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Delete)
