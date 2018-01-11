import React from 'react'
import Editor from 'react-umeditor'
export default class Txt extends React.Component {
    static defaultProps={
        content:"",
    }
    constructor(props){
        super(props);
        this.state = {
            content: ""
        }
    }
    handleChangeContent(content){
        console.log("content11111:",content);
        this.setState({
            content: content
        })
         this.props.handleContent(content)
    }
    getIcons(){
        var icons = [
            "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
            "paragraph fontfamily fontsize | ",
            "insertorderedlist insertunorderedlist | ",
            "cleardoc  | indent outdent | justifyleft justifycenter justifyright |",
            "image"
        ]
        return icons;
    }
    getQiniuUploader(){
        return {
            url:'http://upload.qiniu.com',
            type:'qiniu',
            name:"file",
            request: "image_src",
            qiniu:{
                app:{
                    Bucket:"liuhong1happy",
                    AK:"l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
                    SK:"eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
                },
                domain:"http://o9sa2vijj.bkt.clouddn.com",
                genKey:function(options){
                    return options.file.type +"-"+ options.file.size +"-"+ options.file.lastModifiedDate.valueOf() +"-"+ new Date().valueOf()+"-"+options.file.name;
                }
            }
        }
    }
    save=()=>{
        console.log("content:",this.state.content);
    }
   /* componentWillReceiveProps(){
        console.log("componentWillReceiveProps this.state:",this.state)
        console.log("componentWillReceiveProps this.props:",this.props)
    }
    componentDidMount(){
        // this.setState({content:this.props.problemSolution})
        console.log("componentDidMount this.state:",this.state)
        console.log("componentDidMount this.props:",this.props)
    }
    componentWillMount(){
        console.log("componentWillMount:")
    }*/
    componentDidMount(){
        console.log("componentDidMount this.props:",this.props)
    }
    componentWillUnmount(){
        this.props={}
        console.log("editor componentWillUnmount:",this.props)
    }
    render(){
        var icons = this.getIcons();
        var uploader = this.getQiniuUploader();
        var plugins = {
            image:{
                uploader:uploader
            }
        }
        var count = 100;
        var editors = [];
        for(var i=0;i<count;i++){
            editors.push({
                icons:icons,
                plugins:plugins
            })
        }
        console.log("editor this.props:",this.props)
      //  var val=this.props.content?this.props.content:""
        return (

                <Editor ref="editor"
                        icons={icons}
                        value={this.state.content}
                         defaultValue={this.props.content}
                        onChange={this.handleChangeContent.bind(this)}
                        plugins={plugins}
                />

        )
    }
}
