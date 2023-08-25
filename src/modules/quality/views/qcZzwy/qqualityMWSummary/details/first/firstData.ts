import { observable, computed } from "mobx";
import moment from 'moment'
import { quarterTimes } from "src/enums/date";
import service from "src/services/api";
import { qcZzwyApi } from "../../../qcZzwyApi";

let quarter = {
  0: '全年',
  1: '第一季度',
  2: '第二季度',
  3: '第三季度',
  4: '第四季度',
}

class FirstDataDetails{

  @observable public tableLoading = false; //表格loading
 
  @observable public reportName: String = `护理质量检查总结` // 2023年第一季度全院护理质量检查总结
 

  // 创建表
  @observable public firstModalAdd = false;
  @observable public type = "护理部目标值"
  @observable public name = ""

  // 护理部表
  @observable public firstTableList_UD: any = []

  // 科室表
  @observable public firstTableList_DE: any = []
   


  getTableList(){
    this.firstTableList_UD = [
      {
        id: 1,
        qcName: '2023年第一季度全院护理质量检查总结'
      },
      {
        id: 1,
        qcName: 'www1'
      },
      {
        id: 2,
        qcName: 'www2'
      },
      {
        id: 2,
        qcName: 'www2'
      }
    ];

    this.firstTableList_DE = [
      {
        id: 1,
        qcName: '2023年第一季度全院护理质量检查总结'
      },
      {
        id: 1,
        qcName: 'www1'
      },
      {
        id: 2,
        qcName: 'www2'
      },
      {
        id: 2,
        qcName: 'www2'
      }
    ]

    // this.tableLoading = true
    // qcZzwyApi.getInspectionSummary({...this.postObj,...times}).then(res=>{
    //   this.tableLoading = false
    //   // console.log(res.data)
    //   // this.tableList = this.flattenArray(res.data);
      
    // }).catch(err=>{
    //   this.tableLoading = false

    // })
    
  }


  tableAddOk() {

  }
  tableAddonCancel() {
    this.firstModalAdd = false
  }
}
export const firstData = new FirstDataDetails()