import React,{Component} from 'react';
import Login from "../login/Login.jsx"
import { BrowserRouter, Route, Redirect,withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import AthRouter from "./withRouter.jsx"
import { todo, list, filters } from '../redux/action.jsx'

import Body from "../layout/Body.jsx"

class Main extends Component{
    state={
        isLogin:true,
        show:"none"
    }
    constructor(props) {
        super(props)
        console.log("withRouter:",this.props)
    }
    componentWillMount(){

    }
    componentDidMount() {
        this.handelState(true)
    }
    handelState(params){
        this.setState({
            isLogin:params
        })
    }
     render(){
      //   const { dispatch, items } = this.props;
         {/* <div>
                {this.state.isLogin?  <Login handelState={isLogin=>this.handelState(isLogin)} />
                 :<div >
                     <Header  handelState={isLogin=>this.handelState(isLogin)} />
                     <LeftMenu />
                     <Footer />
                 </div>}
             </div>*/}

         return (

         <BrowserRouter>
             <switch>
                 <AthRouter></AthRouter>
                 <Route path="/login" exact component={Login}/>
                 <Route path="/main" component={Body}/>
             </switch>
         </BrowserRouter>
         )
     }
}

// Main.propTypes = {
//     items:React.PropTypes.object,
// }


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
// function select(state) {
//     return {
//         items:state.todos,
//     }
// }

//const tt=connect(select)(Main)
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
//export default connect(select)(Main)
export default Main