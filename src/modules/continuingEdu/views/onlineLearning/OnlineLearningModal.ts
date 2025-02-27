import { observable, computed } from "mobx";
import { onlineLearningApi } from "./api/OnlineLearningApi";
import { appStore } from "src/stores";
import { getCurrentMonthNow,getCurrentMonth } from 'src/utils/date/currentMonth'

const currentMonth = (()=>{
  return ['jmfy'].includes(appStore.HOSPITAL_ID) ? getCurrentMonth() : []
})()

class OnlineLearningModal {
  @observable public selectedDate: any = currentMonth; //日期
  @observable public taskStatus: any = ''; //状态
  @observable public taskStatus2: any = ''; //工作反思状态
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
          : null,
        endTime: this.selectedDate.length
          ? this.selectedDate[1].format("YYYY-MM-DD")
          : null,
        taskStatus: this.taskStatus,
        tpStatus: this.tpStatus,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      : {
        beginTime: this.selectedDate.length
          ? this.selectedDate[0].format("YYYY-MM-DD")
          : null,
        endTime: this.selectedDate.length
          ? this.selectedDate[1].format("YYYY-MM-DD")
          : null,
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
        : null,
      endTime: this.selectedDate.length
        ? this.selectedDate[1].format("YYYY-MM-DD")
        : null,
      taskStatus: this.taskStatus
    };
  }

  /** 获取表格数据 */
  async onload() {
    this.tableLoading = true;
    let res = null
    if (['hj', 'lyyz', 'qzde'].includes(appStore.HOSPITAL_ID) && this.teachingMethod === 6) {
      const params = { ...this.postObj }
      params.taskStatus = this.taskStatus2
      res = await onlineLearningApi.getMyWorkList(params)
    } else {
      res = await onlineLearningApi.queryPageList(this.postObj)
    }
    this.tableLoading = false;
    this.tableList = res.data.list;
    this.total = res.data.totalCount;
    this.pageIndex = res.data.pageIndex;
    this.pageSize = res.data.pageSize;
  }

  /** 获取任务数 */
  getTaskCount() {
    onlineLearningApi.getTaskCount(this.getTaskCountObj).then(res => {
      this.taskCount = res.data;
    });
    const params = { ...this.getTaskCountObj }
    params.taskStatus = this.taskStatus2
    onlineLearningApi.getWorkTaskCount(params).then(res => {
      this.taskCount.workReviewCount = res.data.workReviewCount
    });
  }

  /** tabs变化函数 */
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

  /** 厚街tabs变化函数 */
  hjTabsChanged(key: any) {
    if (key == 0) return;
    const arr: any = [null, 1, 2, 3, 4, "finished", 6];
    let res = arr[key - 1];
    if (res === "finished") {
      this.teachingMethod = res;
      this.tpStatus = "finished";
    } else {
      this.teachingMethod = res;
      this.tpStatus = "tobeginAndongoing";
    }
    this.onload();
  }

  /** 数据清除 */
  clean() {
    this.tpStatus = "tobeginAndongoing";
    this.teachingMethod = null;
  }

  /** 初始化函数 */
  init() {
    this.clean();
    this.getTaskCount();
    this.onload();
  }
}

export const onlineLearningModal = new OnlineLearningModal();
