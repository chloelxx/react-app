export const menudata = '"menudata"';

/*
 * 其它的常量
 */


/*
 * action 创建函数
 */

export function getMeun(text) {
    console.log("action addTodo:",text);
    return { type: menudata, text }
}
