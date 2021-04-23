import { observable, computed } from "mobx";
import { workloadApi } from "./api/WorkloadApi";
import { fileDownload } from "src/utils/file/file";
import moment from "moment";

class WorkloadModal {
  @observable public title: any = null; //菜单名
  @observable public indexKey: any = '1'; //菜单对应key
  @observable public selectedYear: any = moment(); //年份
  @observable public selectedMonth: any = ''; //月份
  @observable public selectedBq: any = ''; //病区
  @observable public selectedDept: any = ''; //科室
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public tableList: any = []; //表格列表数据
  @observable public tableLoading = false; //表格loading
  @observable public bqList: any = []; //病区字典列表数据

  @computed
  get postObj() {
    return {
      year: moment(this.selectedYear).format("YYYY"),
      selectedMonth: this.selectedMonth,
      selectedBq: this.selectedBq,
      selectedDept: this.selectedDept,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
  }

  // 获取字典
  async initData() {
    await Promise.all([
      //病区
    ]);
  }

  // 查询
  onload = () => {
    let ajaxMap: any = {
      1: "queryPageListFwzx",
      2: "queryPageListJsns",
      3: "queryPageListGzltj"
    };
    // this.tableLoading = true;
    (workloadApi as any)[ajaxMap[this.indexKey as any] as any](this.postObj).then((res: any) => {
      // this.tableLoading = false;
      // this.tableList = res.data.list;
      // this.total = res.data.totalCount;
      // this.pageIndex = res.data.pageIndex;
      // this.pageSize = res.data.pageSize;
    });
  };

  //导出Excel
  export() {
    workloadApi.exportPageList(this.postObj).then(res => {
      fileDownload(res);
    });

  }

  // 初始化
  async init() {
    await this.initData();
    this.onload()
  }
}

export const workloadModal = new WorkloadModal();
