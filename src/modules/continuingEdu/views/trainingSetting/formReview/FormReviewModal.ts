import { observable, computed } from "mobx";
import { crrentMonth } from "src/utils/moment/crrentMonth";

class FormReviewModal {
  @observable public keyWord = ""; //关键字
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public tableList = [
    {
      title: "临床带教老师资质申请",
      empName: "王丽",
      empNo: "h3049",
      date: "2015-01-01 11:22:23",
      state: "待护理部审核"
    },
    {
      title: "特殊岗位资质准入申请",
      empName: "张敏",
      empNo: "h4786",
      date: "2013-09-01 11:22:23",
      state: "通过"
    }
  ]; //表格内容
  @observable public tableLoading = false; //表格loading

  @computed
  get postObj() {
    return {
      keyWord: this.keyWord, //菜单名
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      beginTime: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      endTime: this.selectedDate[1].format("YYYY-MM-DD") // 结束时间
    };
  }

  onload() {
    // this.tableLoading = true;
    // mainPageApi.getMainData(this.postObj).then(res => {
    //   this.tableLoading = false;
    //   this.tableList = res.data.list;
    //   this.total = res.data.totalCount;
    //   this.pageIndex = res.data.pageIndex;
    //   this.pageSize = res.data.pageSize;
    // });
  }

  async init() {
    await this.onload();
  }
}

export const formReviewModal = new FormReviewModal();
