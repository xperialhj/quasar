import service from "../service"
// 数据库连接请求


//获取列表数据
export const findPage=(data)=>{
    return service({
        url:"/dataDb/findPage",
        method:"post",
        data
    })
}

//获取连接类型
export const getType=()=>{
    return service({
        url:"/dataDict/findByKey",
        method:"get",
        params:{type:'db_type'}
    })
}

//获取版本号 根据dbtype获取
export const getVersion=(params)=>{
    return service({
        url:"/dataDict/findByDbType",
        method:"get",
        params
    })
}