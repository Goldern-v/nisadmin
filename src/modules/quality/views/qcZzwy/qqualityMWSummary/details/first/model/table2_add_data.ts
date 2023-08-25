import { observable, computed } from "mobx";
import moment from 'moment'
import { quarterTimes } from "src/enums/date";
import service from "src/services/api";


class Table2AddDaeta{

  @observable public tableLoading = false; //表格loading
 
  @observable public tableList: any = []

  // 创建表
  @observable public table2_add = false;
  @observable public type = "护理部目标值"
  @observable public name = ""
  @observable public mockData:any = []
  @observable public targetKeys:any = []
  @observable public selectedRowKeys:any = []
  @observable public onSearch = '' // 分组过滤
  @observable public tableList_group:any = []


  getTableList(){
    this.tableList = [
      {
        id: 1,
        name: '2023年第'
      },
      {
        id: 1,
        name: 'www1'
      },
    ];
    this.tableList_group = [
      {
        id: 1,
        name: '2023年第',
        value: '',
        value1: '',
        readOnly: true,
      },
      {
        id: 2,
        name: '2023年第1',
        value1: '',
        value: '',
        readOnly: true,
      },
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
    this.table2_add = false
  }
}
export const table2AddDaeta = new Table2AddDaeta()