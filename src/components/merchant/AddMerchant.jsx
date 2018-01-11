import React,{Component} from "react";
import {Link } from "react-router-dom";
import moment from 'moment';
import { Form, Input, Upload, Icon, message, Button,DatePicker,Steps } from 'antd';
import Api from "../../ajax/api.js"
import uploadUrl from "../../ajax/upload.js"
import parseUrl from "../../ajax/parseURL.js"
const FormItem = Form.Item;

const Step = Steps.Step;
const content1=() =><h2>h2 content</h2>
const steps = [{
    title: '基础信息',
    content: content1,
}, {
    title: '代理信息',
    content: 'Second-content',
}];

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
function onOk(value){
    console.log('onOk: ', value);
}
class addMerchant extends React.Component {
    state = {
        current:0,
        confirmDirty: false,
        autoCompleteResult: [],
        imageUrl:"",
        addBanner:{},
        isModify:false,
    };
    constructor(props){
        super(props);
        this.test=this.test.bind(this);
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var ban=this.state.addBanner,st=this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            var param={
                name:values.bannerName,
                imgUrl: ban.imgUrl,
                url:ban.url,
                orderNo:values.sort,
                onlineTime:ban.onlineTime,
                offlineTime:ban.offlineTime,
            }
            var key=st.isModify?"updateSysList":"addSysList";
            var success=st.isModify?"修改成功":"新增成功";
            param=st.isModify?{...param,id:ban.id}:param;
            Api[key](param).then(()=>{
                message.success(success);
                this.props.history.push("/main/banner")
                this.test();
            }).catch((msg)=>{
                message.error(msg)
            })
        });
    }
    handleChange = (info) => {
        console.log("info:",info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log("file:",info.file)

            this.setState({addBanner:{...this.state.addBanner,imgUrl:info.file.response.bizData},loading: false})
            console.log('add:',...this.state.addBanner);
        }
    }
    onChangeOfflienTime=(value, dateString) =>{
        this.setState({addBanner:{...this.state.addBanner,offlineTime:dateString}})
    }
    onChangeOnline=(value, dateString) =>{
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.setState({addBanner:{...this.state.addBanner,onlineTime:dateString}})
        console.log('onlineTime state', this.state);
    }
    changeURL=e=>{
        this.setState({addBanner:{...this.state.addBanner,url:e.target.value}})
    }
    test(){
        // window.location.href="/"
    }
    componentDidMount(){
        var params=parseUrl(window.location.search);
        if(params.id){
            console.log("id:",params.id)
            this.getOneData(params.id)
            this.setState({isModify:true});
        }
    }
    getOneData(id){
        Api.bannerfindOne({id:id}).then((data)=>{
            this.setState({addBanner:data.bizData})
            console.log("this state:",this.state,data.bizData);
            // this.props.form.bannerName=data.bizData.name
        }).catch((data)=>{
            message.error(data.msg);
            if(data.rtnCode=="biz_error_20002"){
                window.history.pushState(null,null,"/login");
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { current } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        const initBan=this.state.addBanner;
        const imageUrl = this.state.addBanner.imgUrl;
        console.log("initBan:,this.props",initBan,this.props)
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">
                    {steps[this.state.current].content}
                </div>
                <div className="steps-action">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>下一步</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>保存</Button>
                    }
                    {
                        this.state.current > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    }
                </div>
            </div>
        );
    }
}

const addMer = Form.create()(addMerchant);
export default addMer
