import { observable, computed } from "mobx";
import moment from 'moment'
import { quarterTimes } from "src/enums/date";
import service from "src/services/api";
import { qcZzwyApi } from "../../../qcZzwyApi";


class ThirdDataDetails{

  @observable public tableLoading = false; //表格loading

  @observable public evaluate:any = '' //效果评价
 
  @observable public tableList: any = []


  getTableList(){
    this.tableList = [];

    // this.tableLoading = true
    // qcZzwyApi.getInspectionSummary({...this.postObj,...times}).then(res=>{
    //   this.tableLoading = false
    //   // console.log(res.data)
    //   // this.tableList = this.flattenArray(res.data);
      
    // }).catch(err=>{
    //   this.tableLoading = false

    // })
    
  }
}
export const thirdData = new ThirdDataDetails()