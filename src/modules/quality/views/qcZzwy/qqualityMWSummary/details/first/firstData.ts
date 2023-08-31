import { type } from 'os';
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

  @observable public detailsData: any= localStorage.getItem('qqualityMWSummaryDetail') ? JSON.parse(localStorage.getItem('qqualityMWSummaryDetail') || '') : {}

  @observable public tableLoading = false; //表格loading
 
  @observable public reportName: String = `护理质量检查总结` // 2023年第一季度全院护理质量检查总结
 

  // 创建表
  @observable public firstModalAdd = false;
  @observable public type_nurse = ""
  @observable public name_nurse = ""

  @observable public type_deptName = ""
  @observable public name_deptName = ""

  @observable public edit_type = "nurse"
  @observable public edit_name = ""

  // 护理部表
  @observable public firstTableList_UD: any = []

  // 科室表
  @observable public firstTableList_DE: any = []
   


  tableAddOk(value: any) {
    const { type, name } = value
    if (type === 'nurse') { 
      this.type_nurse = type
      this.name_nurse = name
    } else {
      this.type_deptName = type
      this.name_deptName = name
    }
    // 创建成功
    this.tableAddonCancel()

  }
  tableAddonCancel() {
    this.firstModalAdd = false
  }
}
export const firstData = new FirstDataDetails()