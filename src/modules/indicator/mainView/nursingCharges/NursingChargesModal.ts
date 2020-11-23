import { observable, computed } from "mobx";
import { nursingChargesApi } from "./api/NursingChargesApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";

class NursingChargesModal {
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public indicatorCode: any = ""; //科室
  @observable public wardCode: any = ""; //指标
  @observable public deptList: any = []; //科室列表
  @observable public chargesList: any = []; //指标列表
  @observable public dataLoading: any = false;
  @observable public tableHeaderList: any = []; //表头
  @observable public tableContentList: any = []; // 表内容

  async initData() {
    await Promise.all([
      // 科室
      nursingChargesApi.getDeptList().then(res => {
        this.deptList = res.data.deptList || [];
      }),
      // 指标
      nursingChargesApi.getIndicatorDict().then(res => {
        this.chargesList = res.data || [];
      })
    ]);
  }

  @computed
  get postObj() {
    return {
      beginDate: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      endDate: this.selectedDate[1].format("YYYY-MM-DD"), // 结束时间
      indicatorCode: this.indicatorCode,
      wardCode: this.wardCode
    };
  }

  //查询数据
  onload() {
    this.dataLoading = true;
    nursingChargesApi.getRate(this.postObj).then(res => {
      this.dataLoading = false;
      this.tableHeaderList = res.data.resultList ? res.data.resultList[0] : [];
      let data: any = res.data.resultList
        ? res.data.resultList.filter((item: any, index: Number) => index != 0)
        : [];
      let obj: Object = {};
      let arr: any = [];
      data.map((item: any, index: Number) => {
        obj = { ...item };
        arr.push(obj);
      });
      this.tableContentList = arr;
      console.log("tableContentList", typeof this.tableContentList);
    });
  }

  //导出Excel
  export() {
    nursingChargesApi.exportRate(this.postObj).then(res => {
      fileDownload(res);
    });
  }

  async init() {
    await this.initData();
    this.onload();
  }
}

export const nursingChargesModal = new NursingChargesModal();
