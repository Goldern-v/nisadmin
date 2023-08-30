import { type } from 'os';
import { observable, computed } from "mobx";


class FourDataDetails{

  @observable public detailsData: any= localStorage.getItem('qqualityMWSummaryDetail') ? JSON.parse(localStorage.getItem('qqualityMWSummaryDetail') || '') : {}

  @observable public tableLoading = false; //表格loading
 
  @observable public reportName: String = `护理质量检查总结` // 2023年第一季度全院护理质量检查总结

  @observable public performance: string= ''
 

  // 创建表
  @observable public Addtable = false;
  @observable public nameTS = ""


  @observable public tableList: any = []
   


  getTableList(){
    // this.firstTableList_UD = [
    //   {
    //     id: 1,
    //     qcName: '2023年第一季度全院护理质量检查总结'
    //   },
    //   {
    //     id: 1,
    //     qcName: 'www1'
    //   },
    //   {
    //     id: 2,
    //     qcName: 'www2'
    //   },
    //   {
    //     id: 2,
    //     qcName: 'www2'
    //   }
    // ];

    // this.firstTableList_DE = [
    //   {
    //     id: 1,
    //     qcName: '2023年第一季度全院护理质量检查总结'
    //   },
    //   {
    //     id: 1,
    //     qcName: 'www1'
    //   },
    //   {
    //     id: 2,
    //     qcName: 'www2'
    //   },
    //   {
    //     id: 2,
    //     qcName: 'www2'
    //   }
    // ]

    // this.tableLoading = true
    // qcZzwyApi.getInspectionSummary({...this.postObj,...times}).then(res=>{
    //   this.tableLoading = false
    //   // console.log(res.data)
    //   // this.tableList = this.flattenArray(res.data);
      
    // }).catch(err=>{
    //   this.tableLoading = false

    // })
    
  }


  tableAddOk(value: any) {
    const { name } = value
    this.nameTS = name
    // 创建成功
    this.tableAddonCancel()

  }
  tableAddonCancel() {
    this.Addtable = false
  }
}
export const fourData = new FourDataDetails()