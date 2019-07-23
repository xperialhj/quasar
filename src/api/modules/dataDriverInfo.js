import service from "../service"
// 数据库连接请求



//保存数据库驱动信息
export const driverSave=(data)=>{
    return service({
        url:"/dataDriverInfo/save",
        method:"post",
        data
    })
}

//删除数据库驱动信息
export const driverDelete=(data)=>{
    return service({
        url:"/dataDriverInfo/delete",
        method:"post",
        data
    })
}
//基础分页查询
export const findPage=(data)=>{
    return service({
        url:"/dataDriverInfo/findPage",
        method:"post",
        data
    })
}

//根据主键查询
export const findById=(params)=>{
    return service({
        url:"/dataDict/findById",
        method:"get",
        params
    })
}