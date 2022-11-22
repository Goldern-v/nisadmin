import { observable, computed } from "mobx";
import moment from 'moment'
import {nursingHandlerApi} from './../api/NursingHandlerApi';

class WorkInfoData {

  // 年份汇总数据
//   @observable public deptCode = ""; //科室
  @observable public deptName = ""; //科室名称
  @observable public month = moment().month()+1; //yue份
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public quarter = moment().quarter() as unknown; //季度
  // 年份汇总数据 end

  @observable public deptCode = ['']; //科室
  @observable public treeDeptData = {} as any;//存储科室数据，默认的片区科室等
  @observable public showDeptCode = ['',''];//
  @observable public job = "护士长";//护理部|护士长|科护士长
  @observable public user = JSON.parse(sessionStorage.getItem('user') || '')


  // 监听年变化，修改表头
  @computed get yearChange(){
    return this.year?.year()
  }
  // 科室年度汇总
  // @computed get postObj(){
  //   return {
  //     year:this.year?.year(),
  //     deptCode:this.deptCode,
  //     month:this.month>9?this.month:'0'+this.month,
  //   }
  // }

  @computed get deptNameChange(){
    return this.deptName
  }

}
export const workInfoData = new WorkInfoData();