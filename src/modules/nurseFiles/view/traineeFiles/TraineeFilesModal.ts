import { observable, computed } from "mobx";
import { traineeFilesApi } from "./api/TraineeFilesApi";
import { fileDownload } from "src/utils/file/file";
import moment from "moment";
import { appStore } from "src/stores";
import { message } from "antd";

class TraineeFilesModal {
  @observable public selectedYear: any = moment(); //年份
  @observable public selectdEdu = ""; //学历
  @observable public selectdSex = ""; //性别
  @observable public keyWord: any = undefined; //关键字
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @observable public isOnJob = '1'; //表格loading


  @computed
  get postObj() {
    return {
      year: moment(this.selectedYear).format("YYYY"),
      education: this.selectdEdu,
      sex: this.selectdSex,
      keyWord: this.keyWord,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isOnJob: this.isOnJob
    };
  }

  onload() {
    console.log(1111)
    this.tableLoading = true;
    traineeFilesApi.queryPageList(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }

  //导出Excel
  export() {
    traineeFilesApi.exportPageList({
      ...this.postObj,
      fileName: appStore.queryObj.fileName || undefined
    }).then(res => {
      fileDownload(res);
    });
  }
  /** 获取导入模板 */
  getImportTemplate() {
    traineeFilesApi.exportSheetTemplate()
      .then(res => fileDownload(res))
  }

  /** 根据模板导入实习生轮科表 */
  import() {
    let importElId = 'sxslrb_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      this.tableLoading = true;

      traineeFilesApi.importSheetFromFile1(file)
        .then(res => {
          message.success('导入成功')
          this.onload()
        }, err => this.tableLoading = false)

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  }
}

export const traineeFilesModal = new TraineeFilesModal();
