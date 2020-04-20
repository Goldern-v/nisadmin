import { authStore } from "./../../../../../../stores/index";
import { observable, computed } from "mobx";
import { stepServices } from "../../services/stepServices";

class QuesBankView {
  @observable public checkLabelList = [];
  @observable public selectedLabel: any = []; //选中标签
  @observable public bankType: any = "系统题库"; //题库类型
  @observable public questionType = "单选题"; //题目类型
  @observable public keyWord = ""; //关键字
  @observable public tableList = []; // 表格内容
  @observable public tableLoading = false;
  @observable public pageIndex: any = 1;
  @observable public pageSize: any = 20;
  @observable public total: any = 0;
  @observable public string = "";
  @observable public questionIdList: any = []; // 问题ID
  @observable public selectedRows: any = []; // 勾中的问题
  @observable public questionList: any = []; // 已选问题

  async initData() {
    await Promise.all([
      //标签
      stepServices.searchLabels(this.checkObj).then(res => {
        this.checkLabelList = res.data.list;
      })
    ]);
  }

  @computed
  get checkObj() {
    return {
      keyWord: "",
      pageIndex: 1,
      pageSize: 100
    };
  }
  get postObj() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      bankType: this.bankType,
      questionType: this.questionType,
      keyWord: this.keyWord,
      questionLabelIdList: this.selectedLabel
    };
  }

  onload() {
    this.tableLoading = true;
    stepServices.queryQuestionsByPage(this.postObj).then(res => {
      this.tableList = res.data.list;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
      this.total = res.data.totalCount;
      this.tableLoading = false;
    });
  }

  async init() {
    await this.initData();
    await this.onload();
  }
}

export const quesBankView = new QuesBankView();
