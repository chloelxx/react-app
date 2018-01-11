import { combineReducers } from 'redux'
import { menudata} from './action.jsx'
function todos(state = {}, action) {
    switch (action.type) {
        case "menudata":
            return {...state,menudata:action.payload};
        case "delete":
            return {...state,delelte:action.payload}
        case "delDialog":
            return {...state,delDialog:action.payload}
        case "modify":
            return {...state,modify:action.payload}
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos
})

export default todoApp