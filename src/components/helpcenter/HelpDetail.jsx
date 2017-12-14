import React,{Component} from "react";
import {Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Table, Divider,Row, Col,Input,Icon,Modal,Button} from 'antd';
import api from "../../ajax/api.js"
import parseUrl from "../../ajax/parseURL.js"

const Search = Input.Search;
class HelpList extends Component{
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

    },{
            title: '排序',
            dataIndex: 'showIndex',
            rowKey : 'showIndex',
        },{
            title:"设置",
            rowKey :"set",
            render:(text)=>(
                <span>
                  <Link to={"/helpDetail/helpDetailModify?id="+text.id} style={{marginRight:"20px"}}>修改</Link>
                  <Link to={"/helpDetail?id="+text.id}>删除</Link>
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
        api.getAllHelpDetail(params).then((res)=>{
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
    render(){
        return (
            <div  style={{padding:"30px"}}>
                <h1 style={{margin:"20px 20px"}}>问题详情</h1>
                <hr/>
                <Row style={{margin:"10px"}}>
                    <Col span={8}>
                    </Col>
                    <Col span={4} offset={12} style={{float:"right"}}>
                        {/*<Link to="/bannerConfig/addBanner">*/}
                            <span onClick={this.showModal}> <Icon type="plus-circle-o" style={{marginRight:"5px"}}/>新增</span>
                        {/*</Link>*/}
                    </Col>
                </Row>
                <Table columns={this.columns} rowKey="id"  dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange} />
                <Modal
                    visible={this.state.visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}

/*
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
}, {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
    ],
    width: '20%',
}, {
    title: 'Email',
    dataIndex: 'email',
}];

class HomePage extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
            url: 'https://randomuser.me/api',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
            console.log("pagination:",pagination)
        });
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        return (
            <Table columns={columns}
                   rowKey={record => record.registered}
                   dataSource={this.state.data}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
            />
        );
    }
}*/

{/*   <div  style={{padding:"30px"}}>
                {
                    this.state.operator?<AddBanner handle={isAdd=>this.mutiOperator(isAdd)}/>:<div>
                    <h1 style={{margin:"20px 20px"}}>商户banner</h1>
                    <hr/>
                    <Row style={{margin:"10px"}}>
                        <Col span={8}>banner名称：
                            <Search placeholder="input search text" size="large" style={{width:"50%"}} onSearch={value=>{this.search(value)}}/>
                        </Col>
                        <Col span={4} offset={12} style={{float:"right"}}>
                            <Link to="/bannerConfig/addBanner">
                                <span onClick={this.addBanner}> <Icon type="plus-circle-o" style={{marginRight:"5px"}}/>新增</span>
                            </Link>
                        </Col>
                    </Row>
                    <Table columns={this.columns} rowKey="id"  dataSource={this.state.data}
                           pagination={this.state.pagination}
                           loading={this.state.loading}
                           onChange={this.handleTableChange} />
                    </div>
                }
            </div>*/}

export default HelpList