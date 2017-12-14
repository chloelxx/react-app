import ajax from "./ajax.js"
const url=""
export default {
    login(params) {
        return ajax('/login',params)
    },
    getMenuPermissions(params){
        return ajax('/getMenuPermissionsMap',params)
    },
    getMenuData(params){
        return ajax("/getMenuPermissions",params)
    },
    messageList(params){
        return ajax('/message/findAll',params)
    },
    message(params){
        return ajax('/message/findOne',params)
    },
    merchantsList(params){
        return ajax('/company/list',params)
    },
    getMerchantConfig(params){
        return ajax('/company/getConfig',params)
    },
    addcompany(params){
        return ajax('/company/add',params)
    },
    insterMessage(params){
        return ajax('/message/insert',params)
    },
    updateMessage(params){
        return ajax('/message/update',params)
    },
    getMerchantLists(params){
        return ajax('/company/list',params)
    },
    singleMsgSearch(params){
        return ajax('/message/findOne',params)
    },
    // 获取权限功能列表
    getPermissionsList(params){
        return ajax('/permission/treelist',params)
    },
    // 角色部分
    getPermissionsRoleList(params){
        return ajax('/role/list',params)
    },
    addPermissionsRole(params){
        return ajax('/role/insert',params)
    },
    rewritePermissionsRole(params){
        return ajax('/role/update',params)
    },
    deletedPermissionsRole(params){
        return ajax('/role/delete',params)
    },
    modifyPermissionsRole(params){
        return ajax('/role/modifyState',params)
    },
    // 用户部分
    getPermissionsUserList(params){
        return ajax('/user/list',params)
    },
    addPermissionsUser(params){
        return ajax('/user/insert',params)
    },
    rewritePermissionsUser(params){
        return ajax('/user/update',params)
    },
    deletedPermissionsUser(params){
        return ajax('/user/delete',params)
    },
    modifyPermissionsUser(params){
        return ajax('/user/modifyState',params)
    },
    companyGetId(params){
        return ajax('/company/getById',params)
    },
    sysBannerList(params){
        return ajax('/sysBanner/findAll',params);
    },
    addSysList(params){
        return ajax('/sysBanner/insert',params);
    },
    updateSysList(params){
        return ajax('/sysBanner/update',params);
    },
    updateSysbanner(params){
        return ajax('/sysBanner/update',params);
    },
    bannerfindOne(params){
        return ajax('/sysBanner/findOne',params);
    },
    banneroffline(params){
        return ajax('/sysBanner/offline',params);
    },
//  修改商户
    updateMerchant(params){
        return ajax('/company/update',params);
    },
    /*
    *   帮助中心
    * */
    HelpCenterGroup(params){
        return ajax('/helpCenter/findAllGroup',params);
    },
    //新增问题
    addNewHelpGroup(params){
        return ajax('/helpCenter/insertGroup',params);
    },
    //修改问题
    updateHelpGroup(params){
        return ajax('/helpCenter/updateGroup',params);
    },
    deleteHelpGroup(params){
        return ajax('/helpCenter/deleteGroup',params);
    },
    //查询当前问题组下的所有问题
    getAllHelpDetail(params){
        return ajax('/helpCenter/findAll',params);
    },
//	获取当前问题的相关问题
    getOrderRelated(params){
        return ajax('/helpCenter/getOrderByRelated',params);
    },
    //新增问题
    helpDetailInsert(params){
        return ajax('/helpCenter/insert',params);
    },
    updateHelpDetail(params){
        return ajax('/helpCenter/update',params);
    },
    deleteHelpDetail(params){
        return ajax('/helpCenter/delete',params);
    },
    //api文档组查询
    getApiGroupData(params){
        return ajax('/apiDocument/findAllGroup',params);
    },
    //新增api组文档
    apiInserGroupData(params){
        return ajax('/apiDocument/insertGroup',params);
    },
    //修改api组文档
    updateApiGroup(params){
        return ajax('/apiDocument/updateGroup',params);
    },
    //api文档查询
    getApiData(params){
        return ajax('/apiDocument/findAll',params);
    },
    //新增api文档
    apiInserData(params){
        return ajax('/apiDocument/insert',params);
    },
    //删除api组
    apiDeleteGroup(params){
        return ajax('/apiDocument/deleteGroup',params);
    },
    //新增api问题描述
    addApiProblem(params){
        return ajax('/apiDocument/insert',params);
    },
    getApiProblemDetail(params){
        return ajax('/apiDocument/findAll',params);
    },
    //修改api文档
    updataApi(params){
        return ajax('/apiDocument/update',params);
    },
    //删除api文档中问题
    deleteApiDetail(params){
        return ajax('/apiDocument/delete',params);
    },
    loginOut(params){
        return ajax('/loginOut',params)
    }
}
