import React,{Component} from "react";
class apiDos extends Component{
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
            <p onClick={this.handleClick}>
                你<b>{text}</b>我。点我切换状态。
            </p>
        );
    }
}

export default apiDos