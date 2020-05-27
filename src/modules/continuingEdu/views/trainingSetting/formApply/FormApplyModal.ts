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

// 人员执业
const defaultRYZY: any = {
  f00001: "", //姓名
  f00003_1: "", //性别
  f00007: "", //技术职称
  f00005: "", //所在科室名称
  f00006: "", //参加工作时间
  f00054: "", //专业技术资格及取得时间
  f00055: "", //最高学历及取得时间
  f00056: "", //以”病人为中心“，人文精神为病人提供的服务
  f00057: "", //自我形象
  f00058: "", //身体语言的应用
  f00059: "", //沟通协调能力（含投诉、纠纷的应对等）
  f00060: "", //查对制度
  f00061: "", //危重患者抢救制度
  f00062: "", //护理交接班制度
  f00063: "", //不良事件报告处理制度
  f00064: "", //医嘱、护嘱执行制度
  f00065: "", //掌握护理岗位职责、护理常规、操作规程及工作标准
  f00066: "", //正确实施各项治疗护理措施，提供康复和健康指导
  f00067: 0, //护理危重患者数量
  f00068: 0, //例；一级护理患者数量
  f00069: 0, //例；二级护理患者数量
  f00070: "", //危重患者护理质量
  f00071: "", //体现在本岗位解决实际问题的能力情况
  f00072: "", //考核成绩
  f00073: "", //护理技术操作考核名称：基础护理技术
  f00074: "", //专科操作技术
  f00075: "", //考核成绩
  f00076: "", //夜班准入考核情况（附考评表）
  f00077: "", //考核成绩
  f00078: "", //具备以下层级的能力
  f00019: "", //申请人工号
  f00020: "", //申请人姓名
  f00021: "", //申请时间
  f00022: "", //科室审批人工号
  f00023: "", //科室审批人姓名
  f00024: "", //科室审批结果
  f00025: "", //科室审批意见
  f00026: "", //科室审批时间
  f00047: "", //护理部审批人工号
  f00048: "", //护理部审批人姓名
  f00049: "", //护理部审批结果
  f00050: "", //护理部审批意见
  f00051: "", //护理部审批时间
  f00052: "" //状态
};

// 高风险
const defaultGFXZL: any = {
  f00005: "", //所在科室
  f00079: 0, //年度
  f00001: "", //姓名
  f00007: "", //专业技术职称
  f00080: 0, //获得职称年限
  f00081: 0, //从事本专业工作年限
  f00017: "", //相关技术培训和进修经历
  f00082: [
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    },
    {
      f00083: "",
      f00084: 0,
      f00085: 1
    }
  ], //高风险诊疗技术
  f00019: "", //申请人工号
  f00020: "", //申请人姓名
  f00021: "", //申请时间
  f00022: "", //科室审批人工号
  f00023: "", //科室审批人姓名
  f00024: "", //科室审批结果
  f00025: "", //科室审批意见
  f00026: "", //科室审批时间
  f00047: "", //护理部审批人工号
  f00048: "", //护理部审批人姓名
  f00049: "", //护理部审批结果
  f00050: "", //护理部审批意见
  f00051: "", //护理部审批时间
  f00052: "" //状态
};

//人员资质
const defaultRYZZ: any = {
  f00005: "", //所在科室
  f00079: 0, //年度
  f00001: "", //姓名
  f00007: "", //专业技术职称
  f00080: 0, //获得职称年限
  f00081: 0, //从事本专业工作年限
  f00086: "", //工作经历
  f00087: [
    {
      f00088: "",
      f00089: "",
      f00090: "",
      f00091: ""
    },
    {
      f00088: "",
      f00089: "",
      f00090: "",
      f00091: ""
    },
    {
      f00088: "",
      f00089: "",
      f00090: "",
      f00091: ""
    }
  ] //工作经历
};

// 层级晋升
const defaultCJJS: any = {
  f00001: "", //姓名
  f00003_1: "", //性别
  f00007: "", //技术职称
  f00005: "", //所在科室名称
  f00006: "", //参加工作时间
  f00054: "", //专业技术资格及取得时间
  f00055: "", //最高学历及取得时间
  f00013: "", //本院变更注册/首次注册时间
  f00065: "", //掌握护理岗位职责、护理常规、操作规程及工作标准
  f00066: "", //正确实施各项治疗护理措施，提供康复和健康指导
  f00067: 0, //护理危重患者数量
  f00068: 0, //例；一级护理患者数量
  f00069: 0, //例；二级护理患者数量
  f00070: "", //危重患者护理质量
  f00071: "", //体现在本岗位解决实际问题的能力情况
  f00092: "", //带教实习生
  f00093: "", //带教轮科生
  f00094: 0, //科室授课
  f00095: 0, //院内授课
  f00096: 0, //市内或省内授课
  f00097: 0, //书写完整个案
  f00098: 0, //组织病例讨论
  f00099: 0, //组织三级查房
  f00100: "", //参与科室质控小组
  f00101: "", //参与质量改善项目
  f00102: "", //任护理组长
  f00103: "", //承担科室二级质控工作
  f00104: 0, //新技术项目
  f00105: 0, //发表论文
  f00106: 0, //主持/参与课题项目
  f00107: 0, //主持或参与循证项目
  f00108: "", //参与护理会诊
  f00109: "", //参与专科护理门诊
  f00110: "", //指导基地专科学员
  f00111: "", //专科护士课程培训
  f00112: "", //指导专科小组开展工作
  f00113: "", //修订本专科护理常规及技术规范，省市创新
  f00114: "", //拟申请 晋级层级
  f00019: "", // //申请人工号
  f00020: "", //申请人姓名
  f00021: "", //申请时间
  f00022: "", //科室审批人工号
  f00023: "", //科室审批人姓名
  f00024: "", //科室审批结果
  f00025: "", //科室审批意见
  f00026: "", //科室审批时间
  f00047: "", //护理部审批人工号
  f00048: "", //护理部审批人姓名
  f00049: "", //护理部审批结果
  f00050: "", //护理部审批意见
  f00051: "", //护理部审批时间
  f00052: "" //状态
};

type DefaultLCDJ = typeof defaultLCDJ;
type DefaultRYZY = typeof defaultRYZY;
type DefaultGFXZL = typeof defaultGFXZL;
type DefaultRYZZ = typeof defaultRYZZ;
type DefaultCJJS = typeof defaultCJJS;

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
  @observable public LCDJFormContent: DefaultLCDJ = cloneJson(defaultLCDJ); //临床带教
  @observable public RYZYFormContent: DefaultRYZY = cloneJson(defaultRYZY); //人员执业
  @observable public GFXZLFormContent: DefaultGFXZL = cloneJson(defaultGFXZL); //高风险诊疗
  @observable public RYZZFormContent: DefaultRYZZ = cloneJson(defaultRYZZ); //人员资质
  @observable public CJJSFormContent: DefaultCJJS = cloneJson(defaultCJJS); //层级晋升
  @observable public TSGWFormContent = {}; //特殊岗位
  @observable public YNJXFormContent = {}; //院内进修

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
    this.LCDJFormContent = cloneJson(defaultLCDJ);
    this.RYZYFormContent = cloneJson(defaultRYZY);
    this.CJJSFormContent = cloneJson(defaultCJJS);
    this.GFXZLFormContent = cloneJson(defaultGFXZL);
    this.RYZZFormContent = cloneJson(defaultRYZZ);
  };

  getForm() {
    trainingSettingApi.field(this.getFormCode).then(res => {
      console.log(res.data, "pppppp");
    });
  }

  async init() {
    await this.onload();
    this.getForm();
  }
}

export const formApplyModal = new FormApplyModal();
