import { observable, computed } from "mobx";
import { onlineLearningApi } from "./api/OnlineLearningApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";

class OnlineLearningModal {
  @observable public selectedDate: any = []; //日期
  @observable public taskStatus: any = 0; //状态
  @observable public teachingMethod = null; //类型
  @observable public tpStatus = "tobeginAndongoing"; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @observable public taskCount: any = {}; //数量统计
  @observable public key: any = null; //状态

  @computed
  get postObj() {
    return this.tpStatus === "finished"
      ? {
          beginTime: this.selectedDate.length
            ? this.selectedDate[0].format("YYYY-MM-DD")
            : null, //开始时间
          endTime: this.selectedDate.length
            ? this.selectedDate[1].format("YYYY-MM-DD")
            : null, // 结束时间
          taskStatus: this.taskStatus,
          tpStatus: this.tpStatus,
          pageIndex: this.pageIndex, //页码
          pageSize: this.pageSize //每页大小
        }
      : {
          beginTime: this.selectedDate.length
            ? this.selectedDate[0].format("YYYY-MM-DD")
            : null, //开始时间
          endTime: this.selectedDate.length
            ? this.selectedDate[1].format("YYYY-MM-DD")
            : null, // 结束时间
          taskStatus: this.taskStatus,
          teachingMethod: this.teachingMethod,
          tpStatus: this.tpStatus,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
  }

  @computed
  get getTaskCountObj() {
    return {
      beginTime: this.selectedDate.length
        ? this.selectedDate[0].format("YYYY-MM-DD")
        : null, //开始时间
      endTime: this.selectedDate.length
        ? this.selectedDate[1].format("YYYY-MM-DD")
        : null, // 结束时间
      taskStatus: this.taskStatus
    };
  }

  // 初始化表格
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

  // 获取任务数
  getTaskCount() {
    onlineLearningApi.getTaskCount(this.getTaskCountObj).then(res => {
      this.taskCount = res.data;
    });
  }

  //tabs变化函数
  tabsChanged(key: any) {
    const arr: any = [null, 1, 2, 3, 4, 5, 6, 7, "finished"];
    let res = arr[key];
    if (res === "finished") {
      this.tpStatus = "finished";
    } else {
      this.teachingMethod = res;
      this.tpStatus = "tobeginAndongoing";
    }
    this.onload();
  }

  clean() {
    this.tpStatus = "tobeginAndongoing";
    this.teachingMethod = null;
  }

  init() {
    this.clean();
    this.getTaskCount();
    this.onload();
  }
}

export const onlineLearningModal = new OnlineLearningModal();
