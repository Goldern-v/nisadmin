import { observable, computed } from "mobx";
import { stepServices } from "../../services/stepServices";

class QuesBankView {
  @observable public deptCode: any = ""; //厚街所选科室
  @observable public deptCodeList: any = []; //厚街所有科室
  @observable public selectedLabel: any = []; //选中标签
  @observable public bankType: any = 1; //题库类型
  @observable public questionType = "单选题"; //题目类型
  @observable public keyWord = ""; //关键字查询
  @observable public checkLabelList = []; // 选题搜索所需数据
  @observable public allData = []; // 选题搜索全部数据
  @observable public keyWordSelect = ""; //选题搜索关键字搜索
  @observable public selectLoading = false;
  @observable public tableList = []; // 表格内容
  @observable public tableLoading = false;
  @observable public pageIndex: any = 1;
  @observable public pageSize: any = 20;
  @observable public total: any = 0;
  @observable public questionIdList: any = []; // 问题ID
  @observable public selectedRows: any = []; // 勾中的问题
  @observable public questionList: any = []; // 已选问题
  @observable public allQuestionNum: any = 0; // 已选问题条数
  @observable public RadioQuestionNum: any = 0; // 单选条数
  @observable public checkBoxQuestionNum: any = 0; // 多选条数
  @observable public TKQuestionNum: any = 0; // 填空条数
  @observable public JDQuestionNum: any = 0; // 简答条数
  @observable public saveData: any = []; // 保存数据

  @computed get checkObj() {
    return {
      keyWord: this.keyWordSelect,
      pageIndex: 1,
      pageSize: 100
    };
  }

  @computed get allCheckObj() {
    return {
      keyWord: "",
      pageIndex: 1,
      pageSize: 20,
      getAll: true
    };
  }

  @computed get postObj() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      bankType: this.bankType,
      deptCode: this.deptCode,
      questionType: this.questionType,
      keyWord: this.keyWord,
      questionLabelIdList: this.selectedLabel
    };
  }

  async initAllData() {
    await Promise.all([
      stepServices.getAllDeptList().then(res => {
        this.deptCodeList = res.data.deptList || [];
      }),
      stepServices.searchLabels(this.allCheckObj).then(res => {
        this.allData = res.data.list || [];
      })
    ]);
  }

  // 初始化查询数据（题库所有数据）
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

  //按需获取前100条数据
  initData(obj?: any) {
    this.selectLoading = true;
    stepServices.searchLabels(obj ? obj : this.checkObj).then(res => {
      this.selectLoading = false;
      this.checkLabelList = res.data.list || [];
    });
  }

  clearData() {
    this.selectedLabel = [];
    this.bankType = 1;
    this.questionType = "单选题";
    this.keyWord = "";
    this.questionIdList = [];
    this.selectedRows = [];
    this.questionList = [];
    this.pageIndex = 1;
    this.pageSize = 20;
    this.allQuestionNum = 0;
    this.RadioQuestionNum = 0;
    this.checkBoxQuestionNum = 0;
    this.TKQuestionNum = 0;
    this.JDQuestionNum = 0;
    this.tableList = [];
  }
  //获取所有标签数据
  // initAllData() {
  //   stepServices.searchLabels(this.allCheckObj).then(res => {
  //     this.allData = res.data.list || [];
  //   });
  // }

  // // 获取所有科室
  // getAllDeptList() {
  //   stepServices.getAllDeptList().then(res => {
  //     this.deptCodeList = res.data.deptList || [];
  //     console.log(res.data.deptList, "1111111111111", this.deptCodeList);
  //   });
  // }

  // 获取各类型题目数量
  questionNum() {
    this.allQuestionNum = this.questionList.length;
    this.RadioQuestionNum = this.questionList.filter(
      (item: any) => item.questionType === "单选题"
    ).length;
    this.checkBoxQuestionNum = this.questionList.filter(
      (item: any) => item.questionType === "多选题"
    ).length;
    this.TKQuestionNum = this.questionList.filter(
      (item: any) => item.questionType === "填空题"
    ).length;
    this.JDQuestionNum = this.questionList.filter(
      (item: any) => item.questionType === "问答题"
    ).length;
  }

  async init() {
    await this.initAllData();
    this.initData();
    this.onload();
  }
}

export const quesBankView = new QuesBankView();
