import { observable, computed } from "mobx";
import { traineeShiftApi } from "./api/TraineeShiftApi";
import { fileDownload } from "src/utils/file/file";

class TraineeShiftModal {
  @observable public isOkBtn: any = false; //二级菜单弹窗开关
  @observable public keyWord: any = undefined; //主页信息关键字
  @observable public sheetId: any = undefined; //主页信息关键字
  @observable public tableList: any = []; //表格内容
  @observable public tableLoading = false; //表格loading

  @computed
  get postObj() {
    return {
      keyWord: this.keyWord,
      sheetId: this.sheetId
    };
  }

  onload() {
    this.tableLoading = true;
    traineeShiftApi.querySheetCompleteInfo(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.rotateGroupsList;
    });
  }

  //导出Excel
  export() {
    traineeShiftApi.exportSheetCompleteInfo(this.postObj).then(res => {
      fileDownload(res);
    });
  }
}

export const traineeShiftModal = new TraineeShiftModal();
