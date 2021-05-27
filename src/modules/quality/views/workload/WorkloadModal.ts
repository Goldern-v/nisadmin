import { observable, computed } from "mobx";
import { workloadApi } from "./api/WorkloadApi";
import { fileDownload } from "src/utils/file/file";
import moment from "moment";

class WorkloadModal {
  @observable public title: any = null; //菜单名
  @observable public indexKey: any = '1'; //菜单对应key
  @observable public selectedYear: any = moment(); //年份
  @observable public month: any = ''; //月份
  @observable public deptCode: any = ''; //科室
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
      month: this.month,
      deptCode: this.deptCode,
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
    if (this.indexKey === '3') {
      this.tableList = []
      return
    }

    const queryListReq = ((indexKey: string) => {
      switch (indexKey) {
        case '2':
          return workloadApi.queryPageListJsns.bind(workloadApi)
        case '3':
          return workloadApi.queryPageListGzltj.bind(workloadApi)
        default:
          return workloadApi.queryPageListFwzx.bind(workloadApi)
      }
    })(this.indexKey)

    this.tableLoading = true;
    queryListReq(this.postObj).then((res: any) => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
    }, () => this.tableLoading = false);
  };

  //导出Excel
  export() {
    workloadApi.exportPageList(this.postObj, this.indexKey)
      .then(res => {
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
