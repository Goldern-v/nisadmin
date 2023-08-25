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

class SecondDataDetails{

  @observable public tableLoading = false; //表格loading
 
  @observable public secondtModalAdd = false;


  @observable public tableList: any = []

  // 表单
  @observable public formList: any = [
    {
      name: '表单1',
      code: '1'
    },
    {
      name: '表单2',
      code: '2'
    },
    {
      name: '表单3',
      code: '3'
    }
  ]

  // 选中表单
  @observable public formArr:any = []


  getTableList(){
    this.tableList = [
      {
        id: 1,
        eventType: '分级护理制度1',
        name: 'xxx', 
        value: 'vvv',
      },
      {
        id: 1,
        eventType: '分级护理制度1',
        name: 'xxx', 
        value: 'vvv',
      }
    ];

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
    this.secondtModalAdd = false
  }
}
export const secondData = new SecondDataDetails()