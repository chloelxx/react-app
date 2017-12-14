import React,{Component} from "react";
import {Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Table, Divider,Row, Col,Input,Icon,Modal,Button,message} from 'antd';
import Api from "../../ajax/api.js"


const Search = Input.Search;
class HelpList extends Component{
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
        title: '问题类型',
        dataIndex: 'problemName',
        rowKey : 'name',

    },
        {
            title: '包含问题数',
            rowKey : 'imgUrl',
            // dataIndex:"imgUrl"
            render: (text) => <Link to={"/helpCenterDetail?id="+text.id}>{text.problemNumber}</Link>,
        }, {
            title: '排序',
            dataIndex: 'showIndex',
            rowKey : 'showIndex',
        },{
            title:"设置",
            rowKey :"set",
            render:(text)=> {
                return (
                    <span>
                        {/*onClick={this.showModal(text)} 会报错，render中必须是纯函数*/}
                      <a style={{marginRight: "20px"}} onClick={() => this.showModal(text)}>修改</a>
                      <Link to={"/helpCenter?id=" + text.id}>删除</Link>
                   </span>
                )
            }
        }];
    constructor(props){
        super(props);
        this.showModal=this.showModal.bind(this);

    }
    componentDidMount(){
        this.getBannerData();
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize=this.state.pageSize;
        this.setState({
            pagination: pager,
        });
        var params={
            pageNum:pagination.current,
            pageSize:this.state.pageSize,
        }
        // this.setState({currentPage:pagination.current+1,pageSize:this.state.pageSize})
        // console.log("this.state:",this.state,params);
        this.getBannerData(params)
    }
    getBannerData(params){
        this.setState({ loading: true });
        var p={
            pageNum:this.state.currentPage,
            pageSize:this.state.pageSize,
        }
        var agv=params?params:p;
        Api.HelpCenterGroup(agv).then((res)=>{
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
    showModal = (text) => {
        this.setState({
            visible: true,
        });
        console.log("text:",text);
        console.log("state:",this.state);
         this.setState({...text})
       // this.setState({showIndex:11,problemName:"text"})

    }
    handleOk = () => {
        this.setState({ loading: true });
        this.insertGroup()
    }
    handleCancel = () => {
        this.setState({ visible: false });
        this.initState();
    }
    nameChange=e=>{
        this.setState({problemName:e.target.value})
    }
    sortChange=e=>{
        this.setState({showIndex:e.target.value})
        //this.setState({showIndex:e})
    }
    insertGroup(){
        let key=this.state.id?"updateHelpGroup":"addNewHelpGroup",tips=this.state.id?"修改成功":"新增成功",
            params={
              showIndex:this.state.showIndex,
              problemName:this.state.problemName,
            };
        if(this.state.id){
            params.id=this.state.id;
        }
        Api[key](params).then((msg)=>{
            this.setState({ loading: false,visible:false});
            message.success(tips);
            this.getBannerData();
            this.initState()
        }).catch((msg)=>{
            message.error(msg);
        })
    }
    initState(){
        this.setState({id:0,showIndex:"",problemName:""})
    }
    render(){
        return (
            <div  style={{padding:"30px"}}>
                <h1 style={{margin:"20px 20px"}}>帮助中心</h1>
                <hr/>
                <Row style={{margin:"10px"}}>
                    <Col span={8}>
                    </Col>
                    <Col span={4} offset={12} style={{float:"right"}}>
                        {/*<Link to="/bannerConfig/addBanner">*/}
                            <span onClick={e=>this.showModal()}> <Icon type="plus-circle-o" style={{marginRight:"5px"}}/>新增</span>
                        {/*</Link>*/}
                    </Col>
                </Row>
                <Table columns={this.columns} rowKey="id"  dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange} />
                <Modal
                    visible={this.state.visible}
                    title="新增问题组"
                    onOk={this.handleOk}
                    className="helpCenter"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            保存
                        </Button>,
                    ]}
                    bodyStyle={{textAlign:"center"}}
                >
                    <p style={{margin:"20px 0"}}>
                        <label style={{textAlign:"right"}}>问题组名称：
                            <Input type={"text"} maxLength={"10"}
                                   value={this.state.problemName} style={{width:"50%"}}
                                   onChange={this.nameChange}
                            />
                        </label>
                    </p>
                    <p>
                        <label style={{textAlign:"right"}}>排序：
                            <Input type={"Number"} style={{width:"50%"}}
                                   value={this.state.showIndex}
                                   onChange={this.sortChange}/>
                        </label>
                    </p>
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