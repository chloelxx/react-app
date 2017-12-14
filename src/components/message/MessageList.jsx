import React,{Component} from "react";
import {Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Table, Divider,Row, Col,Input,Icon} from 'antd';
import api from "../../ajax/api.js"

const Search = Input.Search;
class HomePage extends Component{
    state={
        pageSize:1,
        data:[],
        pageTotal:0,
        currentPage:1,
        pagination: {},
        loading: false,
        operator:false,
    }
    columns = [{
        title: 'banner名称',
        dataIndex: 'name',
        rowKey : 'name',

    },
        {
            title: '图片',
            rowKey : 'imgUrl',
            // dataIndex:"imgUrl"
            render: text => <img src={text.imgUrl} style={{height:"80px",width:"100px"}}/> ,
        }, {
            title: '链接地址',
            dataIndex: 'url',
            rowKey : 'url',
        },{
            title:"排序",
            dataIndex:"orderNo",
            rowKey :"orderNo"
        },{
            title: '上线时间',
            dataIndex: 'onlineTime',
            rowKey : 'onlineTime',
        },{
            title:"下线时间",
            dataIndex:"offlineTime",
            rowKey :"offlineTime"
        },
        {
            title: '状态',
            dataIndex: 'onlineStatus',
            rowKey : 'onlineStatus',
            render: (text) =>(
                <span>
                {text.onlineStatus==2?"下线":"上线"}
            </span>
            ),
        },{
            title:"操作",
            rowKey :"operator",
            render:(text)=>(
                <span>
                <Link to={"/bannerConfig/addBanner?id="+text.id}>编辑</Link>
            </span>
            )
        }];
    constructor(props){
        super(props);
        this.addBanner=this.addBanner.bind(this)
    }
    componentDidMount(){
        var params={
            name:"",
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
            name:"",
            pageNum:pagination.current,
            pageSize:this.state.pageSize,
        }
        this.getBannerData(params)
    }
    getBannerData(params){
        this.setState({ loading: true });
        api.sysBannerList(params).then((res)=>{
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