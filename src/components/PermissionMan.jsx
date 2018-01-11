import React,{Component} from "react";
import Control from "../components/permission/permissionControl.jsx"
class bannerConfig extends Component{
    constructor(props){
        super(props)
    }
    getChildContext() {
        return {color: "purple",text:{name:"xx",id:11}};
    }
    render(){
        console.log("context:",this.context)
        return (
            <div>
               <h1>权限控制</h1>
                <Control />
            </div>
        )
    }
}
bannerConfig.childContextTypes = {
    color: React.PropTypes.string,
    text:React.PropTypes.object,
}
export default bannerConfig