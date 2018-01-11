import React,{Component} from "react";
import {Link } from "react-router-dom";
import { Form, Input, Upload, Icon, message, Button,DatePicker } from 'antd';
import Api from "../../ajax/api.js"
import Txt from "../../editor.jsx"
import parseUrl from "../../ajax/parseURL.js"

import {connect} from "react-redux"

function beforeUpload(file) {
    const exg=/(.gif|.jpg|.jpeg|.png|.bmp)$/
    const isJPG = exg.test(file.type);
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        message.error('上传头像图片只能是gif,jpg,jpeg,png,bmp格式!');
    }
    if (!isLt2M) {
        message.error('上传头像图片大小不能超过 2MB!');
    }
    return file.type && isLt2M;
}
class addHelpDetail extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        imageUrl:"",
        addBanner:{},
        isModify:false,
        title:"",
        sort:"",
        problemId:"",
        content:"",
    };
    constructor(props){
        super(props);
        // this.onChangeInput=this.onChangeInput.bind(this)
    }
    setTitle=(e)=>{
        this.setState({
            title:e.target.value
        })
    }
    setSort=(e)=>{
        this.setState({
            sort:e.target.value,
        })
    }
    save=()=>{
        var msg="新增成功",key="helpDetailInsert",
             param= {
                problemTitle: this.state.title,
                terminalType: "PC",
                isHot: "1",
                showIndex: this.state.sort,
                problemSolution: this.state.content,
                client: [],
                helpCenterId: this.state.helpCenterId,
            }
        if(this.state.id){
            msg="修改成功";
            key="updateHelpDetail"
           // param=this.props.modifyData;
           Object.assign(param,{
                id:this.state.id,
                createUid:this.props.modifyData.createUid,
                createTime:this.props.modifyData.createTime,
            })
        }

        Api[key](param)
            .then(data=>{
                this.props.history.push("/main/helpDetail?id="+this.state.helpCenterId);
                message.success(msg)
            })
            .catch(data=>{
                message.error(data.msg);
            })
    }
    componentDidMount(){
       //console.log("this.props add help detail:",this.props);
        var params=parseUrl(window.location.search),msg="",key="helpDetailInsert";
        if(params.id){
            console.log("id:",params.id)
            this.setState({helpCenterId:params.id});
        }
       if(params.modifyid) {
           this.setState({
               title: this.props.modifyData.problemTitle,
               sort: this.props.modifyData.showIndex,
               content: this.props.modifyData.problemSolution,
               id:this.props.modifyData.id
           })
       }
       if(params.modifyid &&!this.props.modifyData){
            this.props.history.push("/main/helpDetail?id="+params.id)
       }
    }
    cancel=()=>{
        this.props.history.push("/main/helpDetail?id="+this.state.helpCenterId);
    }
    getChildContent=(param)=>{
        this.setState({content:param});
    }
    componentWillUnmount(){

        this.state={}
        console.log("this componentWillUnmount:",this.state)
    }
    render() {
        const initBan=this.state.addBanner;
       // console.log("initBan:,this.props",initBan,this.props)
        return (
            <div>
                <h1>新增问题 <hr/></h1>
                <div className="ex-input">
                    <label> 问题标题：
                        <Input size="large"
                               placeholder="default size"
                               maxLength="10"
                               value={this.state.title}
                               onChange={this.setTitle}
                        />
                    </label>
                </div>
                <div className="ex-input">
                   <span>问题解答：</span>
                    <Txt style={{display:"inline-block"}}
                         handleContent={this.getChildContent}
                         content={this.state.content}/>
                </div>
                <div className="ex-input">
                    <label> 问题排序：
                        <Input size="large"
                               placeholder="default size"
                               type="Number"
                               maxLength="5"
                               value={this.state.sort}
                               onChange={this.setSort}
                        />
                    </label>
                </div>
                <div className="ex-input" style={{textAlign:"center"}}>
                    <Button type="primary"
                            size="large"
                            htmlType="submit"
                            onClick={this.save}
                            style={{marginRight:"20px",padding:"0px 20px"}}>确认</Button>
                    <Button size="large"
                            style={{marginRight:"20px",padding:"0px 20px"}}
                            onClick={this.cancel}
                          >
                       取消
                    </Button>
                </div>
            </div>
        );
    }
}


function select(state) {
  //  console.log("LinkCOm contain select is sign connent(select) state args param:",state)
    return {
        modifyData:state.todos.modify?state.todos.modify:null,
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(addHelpDetail)
/*const add = Form.create()(addHelpDetail);
export default add*/
