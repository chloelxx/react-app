import { combineReducers } from 'redux'
import { menudata} from './action.jsx'
function todos(state = [], action) {
    switch (action.type) {
        case "menudata":
            return [...state,action.payload];
        case "delete":
            return [...state,action.payload]
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos
})

export default todoApp