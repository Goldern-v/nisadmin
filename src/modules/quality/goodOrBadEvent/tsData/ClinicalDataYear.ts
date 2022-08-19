import { observable, computed } from "mobx";
import moment from 'moment'

class ClinicalDataYear {

  // 年份汇总数据
  @observable public deptCodeYear = ""; //科室
  @observable public deptNameYear = ""; //科室名称
  @observable public yearYear = moment() as undefined | moment.Moment; //年份
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
export const clinicalDataYear = new ClinicalDataYear();