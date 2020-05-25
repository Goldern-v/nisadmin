import { observable, computed } from "mobx";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { trainingSettingApi } from "../api/TrainingSettingApi";

class FormApplyModal {
  @observable public getTitle = ""; //表单名称
  @observable public getFormCode = ""; //表单code值
  @observable public keyWord = ""; //关键字
  @observable public stateType = ""; //类型
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @observable public LCDJformContent = {}; //临床
  @observable public CJJSformContent = {}; //临床

  @computed
  get postObj() {
    return {
      formCode: this.getFormCode, //表单code值
      status: this.stateType, //类型
      keyWord: this.keyWord, //关键字
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      createTimeBegin: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      createTimeEnd: this.selectedDate[1].format("YYYY-MM-DD") // 结束时间
    };
  }

  onload() {
    this.tableLoading = true;
    trainingSettingApi.getFormList(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }
  // 通过form值判断入参
  getData() {
    const formArr: any = [
      formApplyModal.LCDJformContent,
      formApplyModal.CJJSformContent
    ];
    const key = Number(
      formApplyModal.getFormCode.substring(
        formApplyModal.getFormCode.length - 1
      )
    );
    return formArr[key - 1];
  }

  getForm() {
    trainingSettingApi.field(this.getFormCode).then(res => {
      // console.log(res.data, "pppppp");
    });
  }

  async init() {
    await this.onload();
    // this.getForm();
  }
}

export const formApplyModal = new FormApplyModal();
