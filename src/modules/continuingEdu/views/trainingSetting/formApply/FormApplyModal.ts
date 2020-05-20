import { observable, computed } from "mobx";
import { crrentMonth } from "src/utils/moment/crrentMonth";

class FormApplyModal {
  @observable public getTitle = ""; //表单名称
  @observable public keyWord = ""; //关键字
  @observable public stateType = ""; //类型
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public tableList = [
    {
      title: "临床带教老师资质申请",
      starDate: "2013-09-01 11:22:23",
      endDate: "2015-01-01 11:22:23",
      state: "待护理部审核",
      world: "11111111111111111"
    }
  ]; //表格内容
  @observable public tableLoading = false; //表格loading

  @computed
  get postObj() {
    return {
      stateType: this.stateType, //类型
      keyWord: this.keyWord, //关键字
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

export const formApplyModal = new FormApplyModal();
