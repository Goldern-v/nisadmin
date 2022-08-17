import { observable, computed } from "mobx";
// import {PromotionManagementApi} from "./api/PromotionManagement";
// import { clinicalApi } from "../ClinicalApi";
// import { crrentMonth } from "src/utils/moment/crrentMonth";
// import { fileDownload } from "src/utils/file/file";
// import { appStore } from "src/stores/index";
// import { T } from "antd/lib/upload/utils";
// import { message } from "antd";
import moment from 'moment'

class SumData {

  // 年份汇总数据
  @observable public deptCode = ""; //科室
  @observable public deptName = ""; //科室名称
  @observable public month = moment().month()+1; //yue份
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public quarter = moment().quarter() as unknown; //季度
  
  // 年份汇总数据 end


  // 监听年变化，修改表头
  @computed get yearChange(){
    return this.year?.year()
  }
  // 科室年度汇总
  @computed get postObj(){
    return {
      year:this.year?.year(),
      deptCode:this.deptCode,
      month:this.month>9?this.month:'0'+this.month,
    }
  }

  @computed get deptNameChange(){
    return this.deptName
  }
}
export const sumData = new SumData();