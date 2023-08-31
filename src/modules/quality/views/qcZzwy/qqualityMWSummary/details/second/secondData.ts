import { observable, computed } from "mobx";
import { api } from 'src/modules/quality/views/qcZzwy/qqualityMWSummary/api'

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

  @observable public case: any = ''

  @observable public detailLists:any = []

  // 表单
  @observable public formList: any = []

  // 选中表单
  @observable public formArr:any = []


  getTableList(){
    // this.tableList = []
  }
  
  tableAddonCancel() {
    this.secondtModalAdd = false
  }
}
export const secondData = new SecondDataDetails()