// 非嵌套组件间通信
import { EventEmitter } from 'events'
const emitter = new EventEmitter()
export default emitter

//
// import emitter from "./ev"
// 声明一个自定义事件
// 在组件装载完成以后
// this.eventEmitter = emitter.addListener("callMe",(msg)=>{
//     this.setState({
//         msg
//     })
// });

// 组件销毁前移除事件监听
// emitter.removeListener(this.eventEmitter);

// 触发自定义事件
// emitter.emit("callMe","Hello")

// https://www.jianshu.com/p/fb915d9c99c4
