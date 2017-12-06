import { combineReducers } from 'redux'
import { add,change,del } from './action.jsx'


function todos(state = [], action) {
    console.log("reducer todos:",action)
    switch (action.type) {
        case add:
            console.log("reducer todos function ADD_TODO:",add)
            return [
                ...state,
                {
                    text: action.text,
                }
            ]
        case change:
            return [
                ...state,
                {
                    text: parseInt(action.text)*2+"",
                }
            ]
        case del:
            console.log("reducer del",state)
            for(var i=0;i<state.length;i++){
                 if(state[i].text==action.text){
                   break;
                 }
            }
            console.log("i==",i)
             state.splice(i,1);
            console.log("state del:",state);
              return [...state]
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos
})

export default todoApp