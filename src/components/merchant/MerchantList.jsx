import React,{Component} from "react";
import {Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Table, Divider,Row, Col,Input,Icon} from 'antd';
import api from "../../ajax/api.js"

const Search = Input.Search;
class HomePage extends Component{
    state={
        pageSize:5,
        data:[],
        pageTotal:0,
        currentPage:1,
        pagination: {},
        loading: false,
        operator:false,
    }
    columns = [{
        title: '商户名称',
        dataIndex: 'companyName',
        rowKey : 'name',

    },
         {
            title: '状态',
            dataIndex: '',
            rowKey : 'status',
             render: (text) =>(
                 <span>
                   {text.status==1?"过期":"使用中"}
                 </span>
             )
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            rowKey : 'onlineTime',
        },{
            title:"过期时间",
            dataIndex:"expireTime",
            rowKey :"offlineTime"
        },
        /*{
            title: '状态',
            dataIndex: 'onlineStatus',
            rowKey : 'onlineStatus',
            render: (text) =>(
                <span>
                {text.onlineStatus==2?"下线":"上线"}
            </span>
            ),
        },*/
        {
            title:"操作",
            rowKey :"operator",
            render:(text)=>(
                <span>
                <Link to={"/merchantMan/addMerchant?id="+text.id}>编辑</Link>
            </span>
            )
        }];
    constructor(props){
        super(props);
        this.addBanner=this.addBanner.bind(this)
    }
    componentDidMount(){
        var params={
            companyName:"",
            pageNum:this.state.currentPage,
            pageSize:this.state.pageSize,
        }
        this.getBannerData(params);
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize=this.state.pageSize;
        this.setState({
            pagination: pager,
        });
        var params={
            companyName:"",
            pageNum:pagination.current,
            pageSize:this.state.pageSize,
        }
        this.getBannerData(params)
    }
    getBannerData(params){
        this.setState({ loading: true });
        api.merchantsList(params).then((res)=>{
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
    search(value){
        var params={
            companyName:value,
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
                <h1 style={{margin:"20px 20px"}}>商户管理</h1>
                <hr/>
                <Row style={{margin:"10px"}}>
                    <Col span={8}>商户名称：
                        <Search placeholder="input search text" size="large" style={{width:"50%"}} onSearch={value=>{this.search(value)}}/>
                    </Col>
                    <Col span={4} offset={12} style={{float:"right"}}>
                        <Link to="/main/addMerchant">
                            <span onClick={this.addBanner}> <Icon type="plus-circle-o" style={{marginRight:"5px"}}/>新增</span>
                        </Link>
                    </Col>
                </Row>
                <Table columns={this.columns} rowKey="id"  dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange} />
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

export default HomePage