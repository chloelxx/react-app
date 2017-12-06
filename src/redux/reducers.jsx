import { combineReducers } from 'redux'
import { todo, list} from './action.jsx'

function todos(state = [], action) {
    console.log("reducer todos:",action)
    switch (action.type) {
        case todo:
            console.log("reducer todos function ADD_TODO:",todo)
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case list:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ]
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos
})

export default todoApp