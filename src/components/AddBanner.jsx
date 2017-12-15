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
import {Link } from "react-router-dom";
import moment from 'moment';
import { Form, Input, Upload, Icon, message, Button,DatePicker } from 'antd';
import Api from "../ajax/api.js"
import uploadUrl from "../ajax/upload.js"
import parseUrl from "../ajax/parseURL.js"
const FormItem = Form.Item;


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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
/*function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}*/
function onOk(value){
    console.log('onOk: ', value);
}
class addBanner extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        imageUrl:"",
        addBanner:{},
        isModify:false,
    };
    constructor(props){
        super(props);
        this.test=this.test.bind(this);
        // this.onChangeInput=this.onChangeInput.bind(this)
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
                this.test();
            }).catch((msg)=>{
                message.error(msg)
            })
           /* if(this.state.isModify){

                Api.updateSysList(param).then(()=>{
                    message.success('新增成功');
                    // this.props.handle(false);
                    this.test();
                }).catch((msg)=>{
                    message.error(msg)
                })
            }else{
                Api.addSysList(param).then(()=>{
                    message.success('修改成功');
                    // this.props.handle(false);
                    this.test();
                }).catch((msg)=>{
                    message.error(msg)
                })
            }*/

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
           /* getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));*/
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
        window.location.href="/"
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
   /* onChangeInput=(e)=>{
        this.setState({bannerName:e.target.value})
        console.log("bannerName:",this.state.bannerName)
    }*/
    render() {
        const { getFieldDecorator } = this.props.form;

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
        console.log("initBan:",initBan)
        return (
            <Form onSubmit={this.handleSubmit} style={{width:"50%",margin:"0 auto",padding:"30px"}}>
               {/*<input value={this.state.bannerName} onChange={this.onChangeInput}/>*/}
                <FormItem
                    {...formItemLayout}
                    label="banner名称"
                >
                    {getFieldDecorator("bannerName", {
                       initialValue:initBan.name,
                        rules: [{},{
                            required: true, message: '请输入banner名称',
                        }],
                    })(
                        <Input maxLength={"10"} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="banner图片"
                >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={uploadUrl}
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="" style={{width:"100%"}}/> : uploadButton}
                    </Upload>
                    <p>支持gif,jpg,jpeg,png,bmp格式 1660*120 大小<strong style={{color:"red"}}>不超过2M</strong></p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="排序"
                >
                    {getFieldDecorator('sort', {
                       initialValue:initBan.orderNo,
                        rules: [{
                            required: true, message: '',
                        }],
                    })(
                        <Input type={"Number"}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="跳转URL"
                >
                    <Input value={initBan.url} onChange={this.changeURL}/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="上线时间"
                >
                   {/* {getFieldDecorator('onlinetime', {
                        rules: [{
                            required: true, message: '',
                        }],
                    })(
                    */}
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select Time"
                            onChange={this.onChangeOnline}
                            onOk={onOk}
                            value={initBan.onlineTime?moment(initBan.onlineTime, this.format):null}
                        />
                   {/*    )}*/}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="结束时间"
                >
           {/*         {getFieldDecorator('endtime', {
                        rules: [{
                            required: true, message: '',
                        }],
                    })(
                    */}
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select Time"
                            onChange={this.onChangeOfflienTime}
                            onOk={onOk}
                            value={initBan.offlineTime?moment(initBan.offlineTime, this.format):null}
                        />
           {/*     )}*/}
                </FormItem>
                <FormItem    wrapperCol={{ span:7, offset: 8 }}>
                    {/*htmlType="submit"*  onClick={this.test}*/}
                    <Button type="primary" htmlType="submit"><Link to="/banner">确认</Link></Button>
                    <Button ><Link to="/banner">取消</Link></Button>
                </FormItem>
            </Form>
        );
    }
}

const addBanner1 = Form.create()(addBanner);
export default addBanner1
