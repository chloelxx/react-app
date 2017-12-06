/*
 * action 类型
 */

export const add = 'add';
export const change="change"
export const del="del"
/*
 * 其它的常量
 */



export function addTodo(text) {
    console.log("action addTodo:",text);
    return { type: add, text }
}

export function changeTodo(text) {
    return { type: change, text }
}
export function deleteTodo(text) {
    return { type: del, text }
}