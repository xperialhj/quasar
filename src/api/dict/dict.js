import service from "../../boot/service"
// 字典请求


//新增
export const save=(data)=>{
    return service({
        url:"/dataDict/save",
        method:"post",
        data
    })
}
//查询
export const findPage=()=>{
    return service({
        url:"/dataDict/findPage",
        method:"get",
    })
}