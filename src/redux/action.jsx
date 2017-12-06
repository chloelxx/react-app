export const todo = 'todo';
export const list = 'list';
export const filters = 'filters'

/*
 * 其它的常量
 */


/*
 * action 创建函数
 */

export function addTodo(text) {
    console.log("action addTodo:",text);
    return { type: todo, text }
}

export function completeTodo(index) {
    console.log("action completeTodo:",index);
    return { type: list, index }
}

export function setVisibilityFilter(filter) {
    console.log("action setVisibilityFilter:",filter);
    return { type: filters, filter }
}