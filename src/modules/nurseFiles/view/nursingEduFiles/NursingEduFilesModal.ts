import { observable, computed } from "mobx";
import moment from "moment";
import { fileDownload } from "src/utils/file/file";
import { nursingEduFilesApi } from "./api/NursingEduFilesApi";
import service from "src/services/api"; //获取科室公共接口
import { appStore } from "src/stores";
import { message } from "antd";

class NursingEduFilesModal {
  @observable public showType = 1; //花都小弹窗类型选择
  @observable public selectdType = ""; //花都类型
  @observable public selectedYear: any = moment(); //年份
  @observable public selectdEdu = ""; //学历
  @observable public isOnJob = ""; //在院状态
  @observable public selectdSex = ""; //性别
  @observable public keyWord: any = undefined; //关键字
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @observable public empNoSearch: any = null; //成员
  @observable public empNoList: any = []; //所有成员
  @observable public empNo: any = null; //成员

  @computed
  get postObj() {
    return {
      year: moment(this.selectedYear).format("YYYY"),
      education: this.selectdEdu,
      sex: this.selectdSex,
      keyWord: this.keyWord,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      type: appStore.HOSPITAL_ID == "gzhd" ? this.selectdType : null,
      isOnJob: ['hj','qhwy', 'whhk', 'dglb', 'dghm'].includes(appStore.HOSPITAL_ID) ? this.isOnJob : null,
    };
  }

  async initData() {
    await Promise.all([
      //人员
      nursingEduFilesApi.getAllEmpName(this.empNoSearch).then(res => {
        this.empNoList = res.data.list || [];
      })
    ]);
  }

  onload() {
    this.tableLoading = true;
    nursingEduFilesApi.queryPageList(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }

  //导出Excel
  export() {
    nursingEduFilesApi.exportPageList(this.postObj).then(res => {
      fileDownload(res);
    });
  }
  
  /** 获取导入模板 */
  getImportTemplate() {
    nursingEduFilesApi.exportSheetTemplate()
      .then(res => fileDownload(res))
  }
  /** 根据模板导入进修生轮科表 */
  import(callback: Function) {
    let importElId = 'sxslrb_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      // this.tableLoading = true;
      
      nursingEduFilesApi.importExcel(file)
      .then(res => {
        message.success('导入成功')
        // this.tableLoading = false;
        callback(res.data)
          // this.onload()
        }, err => this.tableLoading = false)

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  }
  /**
   * 批量保存
   */
  batchSave(data: any, callback: Function) {
    nursingEduFilesApi.batchSave(data).then(res => {
      message.success('批量保存成功')
      callback()
      this.onload()
    })

  }
  async init() {
    await this.initData();
    this.onload();
  }
}

export const nursingEduFilesModal = new NursingEduFilesModal();
