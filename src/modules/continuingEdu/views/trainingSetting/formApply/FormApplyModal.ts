import { cloneJson } from "src/utils/json/clone";
import { observable, computed } from "mobx";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { trainingSettingApi } from "../api/TrainingSettingApi";

// 临床字段
const defaultLCDJ: any = {
  f00001: "", //姓名
  f00002: "", //出生日期
  f00007: "", //专业技术职称
  f00009: "", //来院时间
  f00010: "", //参加临床带教时间
  f00011: "", //最高学历
  f00014: "", //护士层级
  f00015: "", //联系方式
  f00016: 1, //申报类别
  f00017: "", //教学培训经历
  f00018: "", //院内外授课/授课竞赛/技能竞赛情况
  f00019: "", //申请人工号
  f00020: "", //申请人姓名
  f00021: "", //申请时间
  f00022: "", //科室审批人工号
  f00023: "", //科室审批人姓名
  f00024: "", //科室审批结果（1通过；-1退回）
  f00025: "", //科室审批时间
  f00026: "", //准入考评小组审批人工号
  f00027: "", //准入考评小组审批人姓名
  f00028: "", //准入考评小组审批结果（1通过；-1退回）
  f00029: "", //准入考评小组审批时间
  f00030: "", //护理部审批人工号
  f00031: "", //护理部审批人姓名
  f00032: "" //护理部审批时间
};
type DefaultLCDJ = typeof defaultLCDJ;

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
  @observable public LCDJformContent: DefaultLCDJ = cloneJson(defaultLCDJ); //临床带教
  @observable public RYZYformContent = {}; //人员执业
  @observable public GFXZLformContent = {}; //高风险诊疗
  @observable public RYZZformContent = {}; //人员资质
  @observable public CJJSformContent = {}; //层级晋升
  @observable public TSGWformContent = {}; //特殊岗位
  @observable public YNJXformContent = {}; //院内进修

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

  // 获取表单列表
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

  // 清空数据
  public cleanAllStepData = () => {
    this.LCDJformContent = cloneJson(defaultLCDJ);
  };

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
