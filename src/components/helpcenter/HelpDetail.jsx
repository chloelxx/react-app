import React,{Component} from "react";
import {Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Table, Divider,Row, Col,Input,Icon,Modal,Button,message} from 'antd';
import Api from "../../ajax/api.js"
import parseUrl from "../../ajax/parseURL.js"
import Delete from "../baise/Delete.jsx"
import {connect} from "react-redux"

const Search = Input.Search;
class HelpDetailList extends Component{
    state={
        pageSize:1,
        data:[],
        pageTotal:0,
        currentPage:1,
        pagination: {},
        loading: false,
        operator:false,
        helpCenterId:"",
        dialog:false,
    }
    columns = [{
        title: '问题名',
        dataIndex: 'problemTitle',
        rowKey : 'name',

    }, {
        title: '问题描述',
        dataIndex: 'problemSolution',
        rowKey: 'detail',
        width: "400px",
        render: (problemSolution) => (
            <div dangerouslySetInnerHTML={{__html: problemSolution}} />
        )
    }, {
            title: '排序',
            dataIndex: 'showIndex',
            rowKey : 'showIndex',
        },{
            title:"设置",
            rowKey :"set",
            render:(text)=>(
                <span>
                 {/* <Link to={"/main/helpDetailModify?id="+text.id} style={{marginRight:"20px"}}>修改</Link>*/}
                  <a onClick={()=>this.modifyHelpDetail(text)} style={{marginRight:"20px"}}>修改</a>
                  <a onClick={()=>this.deleteHelpDetail(text.id)}>删除</a>
               </span>
            )
        }];
    constructor(props){
        super(props);
        this.addBanner=this.addBanner.bind(this)
    }
    componentDidMount(){
        var obj=parseUrl(window.location.search);
        var params={
            helpCenterId: obj.id,
            pageNum:this.state.currentPage,
            pageSize:this.state.pageSize,
        }
        this.getBannerData(params);
        this.setState({helpCenterId:obj.id})
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize=this.state.pageSize;
        this.setState({
            pagination: pager,
        });
        var params={
            helpCenterId:this.state.helpCenterId,
            pageNum:pagination.current,
            pageSize:this.state.pageSize,
        }
        this.getBannerData(params)
    }
    getBannerData(params){
        this.setState({ loading: true });
        var pm={
            helpCenterId:this.state.helpCenterId,
            pageNum:this.state.currentPage,
            pageSize:this.state.pageSize,
        }
        params=params?params:pm;
        Api.getAllHelpDetail(params).then((res)=>{
            const pagination = { ...this.state.pagination };
            this.setState({data:res.bizData.list,pageTotal:res.bizData.total})
            pagination.total=parseInt(res.bizData.total);
            pagination.pageSize=this.state.pageSize;
            console.log(pagination)
            this.setState({
                loading: false,
                pagination,
            });
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    search(value){
        var params={
            name:value,
            pageNum:this.state.currentPage,
            pageSize:this.state.pageSize,
        }
        this.getBannerData(params);
    }
    mutiOperator(arg){
        this.setState({operator:arg})
    }
    addBanner(){
        this.setState({operator:true})
    }
    modifyHelpDetail=(data)=>{
        this.props.dispatch({type:"modify",payload:data})
        this.props.history.push("/main/helpDetailModify?modifyid="+data.id+"&id="+data.helpCenterId);
    }
    deleteHelpDetail=(id)=>{
        console.log("helpcenter:",this.props);
        this.props.dispatch({type:"delDialog",
            payload:{
                visible:true,
                param:{
                    id:id,
                },
                api:"deleteHelpDetail"
            }
        })
    }
    handleDialog=(para,isDelete)=>{
        this.setState({
            delete: true,
        });
        if(isDelete){
            Api.deleteHelpDetail({
                id: this.state.deleteId,
            }).then(data => {
                message.success("删除成功");
                this.getBannerData();
                this.setState({delete:false});
            }).catch((data)=>{
                message.error(data.msg)
            });
        }
        this.getBannerData();
    }
    render(){
        return (
            <div  style={{padding:"30px"}}>
                <h1 style={{margin:"20px 20px"}}>问题详情</h1>
                <hr/>
                <Row style={{margin:"10px"}}>
                    <Col span={8}>
                    </Col>
                    <Col span={4} offset={12} style={{float:"right"}}>
                        <Link to={"/main/helpDetailInsert?id="+this.state.helpCenterId}>
                            <span onClick={this.showModal}> <Icon type="plus-circle-o" style={{marginRight:"5px"}}/>新增</span>
                        </Link>
                    </Col>
                </Row>
                <Table columns={this.columns} rowKey="id"  dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange} />
                <Delete handelDel={this.handleDialog}/>
            </div>
        )
    }
}

function select(state) {
    console.log("LinkCOm contain select is sign connent(select) state args param:",state)
    return {
        data:state.todos.menudata,
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(HelpDetailList)