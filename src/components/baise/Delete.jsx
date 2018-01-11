import React,{Component} from "react";
import {connect} from "react-redux"
import { Form, Input, Upload, Icon, message, Button,Modal } from 'antd';
import Api from "../../ajax/api.js"

class Delete extends Component{
    state={
        visible:true,
        loading:false,
    }
    constructor(props){
        super(props);
    }
    handleOk = () => {
        console.log("handleOk props:",this.props)
         this.setState({ loading: true });
         const deleApi=this.props.deleteData,api=deleApi.api;
        console.log("deleApi:",api)
        //this.props.deleteHandle(false,true)
        Api[api](deleApi.param).then(data=>{
            message.success("删除成功")
            this.setState({ loading: false });
            this.props.dispatch({type:"delDialog",payload:{visible:false}})
            this.props.handelDel()
        }).catch(data=>{
            message.error(data.msg)
            this.setState({ loading: false });
            this.props.dispatch({type:"delDialog",payload:{visible:false}})
        })
    }
    handleCancel = () => {
        //this.setState({ visible: false });
       // this.props.deleteHandle(false,false)
        this.props.dispatch({type:"delDialog",payload:{visible:false}})
        console.log("props:",this.props)
    }
    render(){
        console.log("delete this.props:",this.props);
        // const {del}=this.props.deleteApi;
        let vis=false
        if(this.props.deleteData&&this.props.deleteData.visible){
            vis=true
        }else{
            vis=false;
        }
        return (
            <Modal
                visible={vis}
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
        deleteData:state.todos.delDialog,
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Delete)
