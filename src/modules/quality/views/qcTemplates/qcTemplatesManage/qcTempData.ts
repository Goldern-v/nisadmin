import { observable, computed } from "mobx";
import moment from 'moment'
import { nursingChargesApi } from "src/modules/indicator/mainView/nursingCharges/api/NursingChargesApi";
import { authStore } from 'src/stores'
// import { nursingHandlerApi } from "../../api/NursingHandlerApi";
import { fileDownload } from "src/utils/file/file";
import {
    Badge, ColumnProps,
    message,
    Input,
    Select,
    DatePicker,
    Steps,
    Button,
    Modal,
    Icon,
    Row, Col,
    Empty
} from 'src/vendors/antd'
import { qcTempApi } from "./QcTempApi";

class qcTempData {
  @observable public tableLoading = false;
  @observable public tableList = [];
  @observable public modalVisible = false;//创建弹框
  @observable public startDate:string = '';
  @observable public endDate:string = '';
  @observable public levalList=[
    {name:'全部',status:''},
    {name:'一级质控',status:'1'},
    {name:'二级质控',status:'2'},
    {name:'三级质控',status:'3'},
];
@observable public levalText = {
  1:'一级质控',
  2:'二级质控',
  3:'三级质控',
  4:'四级质控'
}
@observable public selectLevel:string = '';
@observable public keyWord = '';

@computed get postObj(){
  return {
    beginDate:this.startDate,
    endDate:this.endDate,
    qcLevel:this.selectLevel,
    empName:this.keyWord,
    pageIndex:1,
    pageSize:20
  }
}
  

  
  


     /** 下载模板 */
     getDownloadTemplate() {
      qcTempApi.downloadTemplate()
        .then(res => fileDownload(res))
    }

     /** 下载所有模板 */
     downloadAllTemplate() {
      qcTempApi.downloadTemplate()
        .then(res => fileDownload(res))
    }

  

    /**获取表格数据 */
    getList(id?:any){
        qcTempApi.getDataList(this.postObj).then(res=>{
          this.tableList = res.data?.list || []
        }).catch(err=>{

        })
    }


    /**改变状态 */
    changeItemStatus(obj:any){
      qcTempApi.changeStatus(obj).then(res=>{

      }).catch(err=>{

      })
    }

    /**导出单条模板 */
    exportItem(record:any){
      qcTempApi.downloadItemTemplate(record.qcCode).then(res=>{
        fileDownload(res)
      }).catch(err=>{
        
      })
    }
  
    /**撤销 */
    cancelSubmit(){
       
    }
    /**删除 */
  delItem(){
    
  }
  /**编辑页面导入 */
  importEditor(){
    let importElId = 'handler_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  
  }
  /**编辑页面导出 */
  exportEditor(){
    
  }

  /**导入附件 */
  importAttch(){
    let importElId = 'handlerattch_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
     

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  }

    // 计划导出
    exportPlan(){

    }
}
export const qcTempDatas = new qcTempData();