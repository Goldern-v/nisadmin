import { observable, computed } from "mobx";
import { onlineLearningApi } from "./api/OnlineLearningApi";

class OnlineLearningModal {
  @observable public teachingMethod = null; //类型
  @observable public tpStatus = "tobeginAndongoing"; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @observable public taskCount: any = {}; //数量统计

  @computed
  get postObj() {
    return this.tpStatus === "finished"
      ? {
          tpStatus: this.tpStatus,
          pageIndex: this.pageIndex, //页码
          pageSize: this.pageSize //每页大小
        }
      : {
          teachingMethod: this.teachingMethod,
          tpStatus: this.tpStatus,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
  }

  onload() {
    this.tableLoading = true;
    onlineLearningApi.queryPageList(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }

  getTaskCount() {
    onlineLearningApi.getTaskCount().then(res => {
      this.taskCount = res.data;
      console.log("taskCount", this.taskCount);
    });
  }

  init() {
    this.getTaskCount();
    this.onload();
  }
}

export const onlineLearningModal = new OnlineLearningModal();
