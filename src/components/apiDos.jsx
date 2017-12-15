import React,{Component} from "react";
import Delete from "./baise/Delete.jsx"
import {connect} from "react-redux"
class apiDos extends Component{
    constructor(props) {
        super(props);
        console.log("this:",this);
        this.state={liked:false,visible:false};
        this.handleClick=this.handleClick.bind(this);

        // return {liked: false};
    }
    handleClick=()=> {
        this.setState({visible:true});
        this.setState({liked: !this.state.liked});

    }
    handleDialog=(para,isDelete)=>{
        this.setState({visible:para});
        if(isDelete){
            console.log("可以调用Api了")
        }
        console.log("api:",isDelete)
    }
    render(){
        var text = this.state.liked ? '喜欢' : '不喜欢';
        return (
            <p onClick={this.handleClick}>
                你<b>{text}</b>我。点我切换状态。
                <Delete deleteHandle={this.handleDialog} visible={this.state.visible}/>
            </p>
        );
    }
}
function select(state){
   return {
       del:state.todos
   }
}
export default connect(select)(apiDos)