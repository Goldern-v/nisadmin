import { observable, computed } from "mobx";
import moment from 'moment'
import { cpus } from "os";
class DatasSumYear{
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public deptCode = "042202"; //科室
  @observable public deptName = ""; //科室名称
  @computed get postObj(){
    return{
      deptCode:this.deptCode,
      year: this.year?.year(),
    }
  }
}
export const datasSumYear = new DatasSumYear()