import service from "../service"
// 作业请求


//创建作业
export const createJob = (data) => {
    return service({
        url: "/job/createJob",
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
        data
    })
}
//获取所有任务组
export const getAllTaskGroup = (param) => {
    return service({
        url: "/taskGroup/getAllTaskGroupBeforeCreate",
        method: "get",
        param
    })
}

//获取作业核心对象
export const jobentrys = (param) => {
    return service({
        url: "/job/jobentrys",
        method: "get",
        param
    })
}