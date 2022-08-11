import { observable, computed } from "mobx";
// import {PromotionManagementApi} from "./api/PromotionManagement";
import { clinicalApi } from "../ClinicalApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import { message } from "antd";
import moment from 'moment'

class ClinicalDataQuarter {

  // 年份汇总数据
  @observable public deptCodeYear = ""; //科室
  @observable public yearYear = moment() as undefined | moment.Moment; //年份
  @observable public quarter = moment().quarter() as unknown; //季度
  // 年份汇总数据 end


  // 监听年变化，修改表头
  @computed get yearChange(){
    return this.yearYear?.year()
  }
  // 科室年度汇总
  @computed get postObjYear(){
    return {
      year:this.yearYear?.year(),
      deptCode:this.deptCodeYear
    }
  }
}
export const clinicalDataQuarter = new ClinicalDataQuarter();