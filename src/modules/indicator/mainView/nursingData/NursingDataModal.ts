import { observable, computed } from "mobx";
import { nursingDataApi } from "./api/NursingDataApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";

class NursingDataModal {
  @observable public selectedDeptType = ""; //科室
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public dataList = []; //数据内容
  @observable public dataLoading = false; //内容loading

  @computed
  get postObj() {
    return {
      deptType: this.selectedDeptType, //科室
      beginTime: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      endTime: this.selectedDate[1].format("YYYY-MM-DD") // 结束时间
    };
  }

  //查询数据
  onload() {
    this.dataLoading = true;
    // nursingDataApi.getData(this.postObj).then(res => {
    //   this.tableLoading = false;
    //   this.tableList = res.data.list;
    //   this.total = res.data.totalCount;
    //   this.pageIndex = res.data.pageIndex;
    //   this.pageSize = res.data.pageSize;
    // });
  }

  //导出Excel
  export() {
    // nursingDataApi.exportData(this.postObj).then(res => {
    //   fileDownload(res);
    // });
  }

  async init() {
    await this.onload();
  }
}

export const nursingDataModal = new NursingDataModal();
