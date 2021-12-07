import storage from "src/utils/loginTimeOut/storage";
// import router from "@/router/index";
// import { MessageBox, Message, Notification } from "element-ui";
import store, { appStore } from 'src/stores'
import { createBrowserHistory, createHashHistory } from 'history';
import { Modal } from 'antd';


let lastTime = new Date().getTime(),//最后一次更新时间
    currenTime = new Date().getTime(),//当前时间
    timeOut: number = 3 * 60 * 1000,//超时时间 默认三分钟
    astrictInterval: any = null,//定时器对象
    // astrictHisList: Array<string> = ["lcey"];//需要启动超时登录的医院列表
    astrictHisList: Array<string> = [""];//需要启动超时登录的医院列表

//初始化方法
export const initAstrict = () => {
    // console.log(history)
    if (astrictHisList.includes(appStore.HOSPITAL_ID)) {
        console.log("执行")
        window.clearInterval(astrictInterval);
        astrictInterval = window.setInterval(checkTimeOut, 20000);//20秒执行一次
    }
}

//清除astrictInterval
export const clearAstrictInterval = () => {
    window.clearInterval(astrictInterval);
}

//是否为登录界面
export const isLogin = (): boolean => {
    const history = createBrowserHistory() // history模式
    return (history.location.hash).indexOf("/login") !== -1;
    //return false;
}

//显示登录超时 
export const initMessageBox = () => {
    //清除定时器
    clearAstrictInterval();
    Modal.confirm({
        title: '温馨提示',
        content: `${isLogin() ? '您的智慧护理信息系统已很久未操作了呢' : '登录已超时，请重新登录'}`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            //重启定时器
            initAstrict();
        },
        onCancel: () => {
            //重启定时器
            initAstrict();
        }
    });
}
//监听更新时间
window.onload = function () {
    window.document.onmousemove = function () {
        storage.setLocalStorageItem("lastTime", new Date().getTime());
        //window.localStorage.setItem("lastTime", (new Date().getTime()).toString());
    },
        window.document.onmousedown = function () {
            storage.setLocalStorageItem("lastTime", new Date().getTime());
            //window.localStorage.setItem("lastTime", (new Date().getTime()).toString());
        },
        window.document.onmouseup = function () {
            storage.setLocalStorageItem("lastTime", new Date().getTime());
            //window.localStorage.setItem("lastTime", (new Date().getTime()).toString());
        }
}
//检查是否登录超时
const checkTimeOut = () => {
    currenTime = new Date().getTime();
    console.log("currenTime")
    // lastTime =window.localStorage.getItem("lastTime") ? Number(window.localStorage.getItem("lastTime")) : -1;
    lastTime = storage.getLocalStorageItem("lastTime") ? Number(storage.getLocalStorageItem("lastTime")) : -1;
    switch (appStore.HOSPITAL_ID) {
        case "lcey":
            timeOut = 10 * 60 * 1000;;
            break;
        default:
            timeOut = 10 * 60 * 1000;
            break;

    }
    if (lastTime && lastTime != -1 && (currenTime - lastTime >= timeOut)) {
        //storage.removeLocalStorageItem("lastTime");
        //重启
        initMessageBox();
        if (isLogin()) return false;
        //const history = createBrowserHistory() // history模式
        try {
            appStore.history.replace('/login')
        } catch (error) {
            console.log(error)
        }


    }

}



// export default function () {
//     initAstrict();
//     console.log(appStore.history)
//     console.log(appStore.location)
// }