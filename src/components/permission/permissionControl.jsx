import React,{Component} from "react";
import User from "./permissionUser.jsx"
class control extends Component{
    constructor(props){
        super(props)
    }
    render(){
     //   this.context.color="red";
        this.context.text={
            name:"hxp",id:12345
        }
        console.log("this.props:",this.context)
        return (
            <div>
                {this.context.color},{this.context.text.name},{this.context.text.id}
                <User/>
            </div>
        )
    }
}
control.contextTypes = {
    color: React.PropTypes.string,
    text:React.PropTypes.object,
};

export default control