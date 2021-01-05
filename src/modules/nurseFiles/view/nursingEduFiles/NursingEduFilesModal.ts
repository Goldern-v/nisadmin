import { observable, computed } from "mobx";
import moment from "moment";
import { fileDownload } from "src/utils/file/file";
import { nursingEduFilesApi } from "./api/NursingEduFilesApi";
import service from "src/services/api"; //获取科室公共接口
import { appStore } from "src/stores";

class NursingEduFilesModal {
  @observable public showType = 1; //花都小弹窗类型选择
  @observable public selectdType = ""; //花都类型
  @observable public selectedYear: any = moment(); //年份
  @observable public selectdEdu = ""; //学历
  @observable public selectdSex = ""; //性别
  @observable public keyWord: any = undefined; //关键字
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @computed
  get postObj() {
    return {
      year: moment(this.selectedYear).format("YYYY"),
      education: this.selectdEdu,
      sex: this.selectdSex,
      keyWord: this.keyWord,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      type: appStore.HOSPITAL_ID == "gzhd" ? this.selectdType : null
    };
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
}

export const nursingEduFilesModal = new NursingEduFilesModal();
