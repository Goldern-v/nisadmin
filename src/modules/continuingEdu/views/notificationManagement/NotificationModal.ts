import { observable, computed } from "mobx";
import { notificationApi } from "./api/NotificationApi";
import { getCurrentMonthNow,getCurrentMonth } from 'src/utils/date/currentMonth'
import { appStore } from 'src/stores'

const currentMonth = (()=>{
  return ['jmfy'].includes(appStore.HOSPITAL_ID) ? getCurrentMonth() : getCurrentMonthNow()
})()

class NotificationModal {
  @observable public keyWord = ""; //菜单名
  @observable public selectedType = ""; //类型
  @observable public selectedState = ""; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public selectedDate: any = currentMonth; //日期
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading

  @computed
  get postObj() {
    return {
      teachingMethod: this.selectedType, //类型
      status: this.selectedState, //状态
      keyWord: this.keyWord, //菜单名
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      beginTime: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      endTime: this.selectedDate[1].format("YYYY-MM-DD") // 结束时间
    };
  }

  onload() {
    this.tableLoading = true;
    notificationApi.getData(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }
}

export const notificationModal = new NotificationModal();
