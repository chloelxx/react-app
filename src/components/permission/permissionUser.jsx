import React,{Component} from "react";

class user extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log("this.props:",this.context)
        return (
            <div>
                <p style={{color:this.context.color}}>children:{this.context.text.name}</p>
            </div>
        )
    }
}
user.contextTypes = {
    color: React.PropTypes.string,
    text:React.PropTypes.object,
};
export default user