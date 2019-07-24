import service from "../service"
// 作业请求


//创建作业
export const createJob=(data)=>{
    return service({
        url:"/job/createJob",
        method:"post",
        data
    })
}
//获取所有任务组
export const getAllTaskGroup=(param)=>{
    return service({
        url:"/taskGroup/getAllTaskGroupBeforeCreate",
        method:"get",
        param
    })
}