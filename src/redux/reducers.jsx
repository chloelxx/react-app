import { combineReducers } from 'redux'
import { menudata} from './action.jsx'
function todos(state = [], action) {
    console.log("reducer todos:",action,menudata)
    switch (action.type) {
        case "menudata":
            console.log("reducer todos menudata",menudata)
            console.log("nenudata:", [
                ...state,
                action.payload,
            ])
            return [...state,action.payload];

           
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos
})

export default todoApp