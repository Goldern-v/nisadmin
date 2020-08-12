import { cloneJson } from "src/utils/json/clone";
import { observable, computed } from "mobx";
import { appStore, authStore } from "src/stores";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { trainingSettingApi } from "../api/TrainingSettingApi";

// 临床带教字段
const defaultLCDJ: any = {
  f00005: "", //所在科室
  f00137: "", //申请日期
  f00001: "", //姓名
  f00002: "", //出生日期
  f00007: "", //专业技术职称
  f00009: "", //来院时间
  f00010: "", //参加临床带教时间
  f00011: "", //最高学历
  f00014: "", //护士层级
  f00015: "", //联系方式
  f00016: "", //申报类别
  f00017: "", //教学培训经历
  f00018: "", //院内外授课/授课竞赛/技能竞赛情况
  f00019: "", //申请人工号
  f00020: "", //申请人姓名
  f00021: "", //申请时间
  f00022: "", //科室审批人工号
  f00023: "", //科室审批人姓名
  f00024: "", //科室审批结果
  f00025: "", //科室审批意见
  f00026: "", //科室审批时间
  f00027: "", //入考评小组审批人工号
  f00028: "", //准入考评小组审批人姓名
  f00029: "", //准入考评小组审批结果（1通过；-1退回）
  f00030: "", //准入考评小组审批意见
  f00031: "", //准入考评小组审批时间
  f00047: "", //护理部审批人工号
  f00048: "", //护理部审批人姓名
  f00049: "", //护理部审批结果
  f00050: "", //护理部审批意见
  f00051: "", //护理部审批时间
  f00052: "" //状态
};
// 人员执业字段
const defaultRYZY: any = {
  f00001: "", //姓名
  f00003_1: "", //性别
  f00007: "", //技术职称
  f00005: "", //所在科室名称
  f00006: "", //参加工作时间
  f00054: "", //专业技术资格及取得时间
  f00055: "", //最高学历及取得时间
  f00013: "", //
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
  f00067: "", //护理危重患者数量
  f00068: "", //例；一级护理患者数量
  f00069: "", //例；二级护理患者数量
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
// 高风险字段
const defaultGFXZL: any = {
  f00005: "", //所在科室
  f00079: "", //年度
  f00001: "", //姓名
  f00007: "", //专业技术职称
  f00080: "", //获得职称年限
  f00081: "", //从事本专业工作年限
  f00017: "", //相关技术培训和进修经历
  f00082: [
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
    },
    {
      f00083: "",
      f00084: "",
      f00085: ""
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
//人员资质字段
const defaultRYZZ: any = {
  f00005: "", //所在科室
  f00079: "", //年度
  f00001: "", //姓名
  f00007: "", //专业技术职称
  f00080: "", //获得职称年限
  f00081: "", //从事本专业工作年限
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
  ], //工作经历
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
// 层级晋升字段
const defaultCJJS: any = {
  f00001: "", //姓名
  f00003_1: "", //性别
  f00007: "", //技术职称
  f00005: "", //所在科室名称
  f00006: "", //参加工作时间
  f00054: "", //专业技术资格及取得时间
  f00055: "", //最高学历及取得时间
  f00013: "", //本院变更注册/首次注册时间
  f00014: "", //目前岗位层级资格
  f00065: "", //掌握护理岗位职责、护理常规、操作规程及工作标准
  f00066: "", //正确实施各项治疗护理措施，提供康复和健康指导
  f00067: "", //护理危重患者数量
  f00068: "", //例；一级护理患者数量
  f00069: "", //例；二级护理患者数量
  f00070: "", //危重患者护理质量
  f00071: "", //体现在本岗位解决实际问题的能力情况
  f00092: "", //带教实习生
  f00093: "", //带教轮科生
  f00094: "", //科室授课
  f00095: "", //院内授课
  f00096: "", //市内或省内授课
  f00097: "", //书写完整个案
  f00098: "", //组织病例讨论
  f00099: "", //组织三级查房
  f00100: "", //参与科室质控小组
  f00101: "", //参与质量改善项目
  f00102: "", //任护理组长
  f00103: "", //承担科室二级质控工作
  f00104: "", //新技术项目
  f00105: "", //发表论文
  f00106: "", //主持/参与课题项目
  f00107: "", //主持或参与循证项目
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
// 特殊岗位字段
const defaultTSGW: any = {
  f00005: "", //所在科室
  f00079: "", //年度
  f00001: "", //姓名
  f00007: "", //专业技术职称
  f00116: "", //拟申请准入专科名称
  f00117: "", //专科工作开始时间
  f00118: "", //专科准入培训起止时间
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
  ], //接受专科培训或专科进修经历
  f00119: "", //专科常见疾病护理常规
  f00120: "", //常见药物及专科药物使用
  f00121: "", //基础及专科常用护理技术
  f00122: "", //基础及专科护理评估
  f00123: "", //护理核心工作制度
  f00124: "", //一般护理问题的分析与处理能力
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
// 院内进修字段
const defaultYNJX: any = {
  f00003_1: "", //性别
  f00001: "", //姓名
  f00125: "", //年龄
  f00126: "", //工作年限
  f00006: "", //参加工作时间
  f00007: "", //技术职称
  f00005: "", //所在科室名称
  f00127: "", //入科时间
  f00138: undefined, //指导老师
  f00128: "", //拟进修科室编码
  f00129: "", //拟进修科室名称
  f00130: "", //拟进修开始时间
  f00131: "", //拟进修结束时间
  f00132: "", //进修目的、要求
  f00133: [
    {
      f00134: "",
      f00135: "",
      f00136: ""
    },
    {
      f00134: "",
      f00135: "",
      f00136: ""
    },
    {
      f00134: "",
      f00135: "",
      f00136: ""
    }
  ], //主要工作经历
  f00019: "", // //申请人工号
  f00020: "", //申请人姓名
  f00021: "", //申请时间
  f00022: "", //科室审批人工号
  f00023: "", //科室审批人姓名
  f00024: "", //科室审批结果
  f00025: "", //科室审批意见
  f00026: "", //科室审批时间
  f00037: "", //进修指导老师审批工号
  f00038: "", //进修指导老师审批姓名
  f00039: "", //进修指导老师审批结果
  f00040: "", //进修指导老师审批意见
  f00041: "", //进修指导老师审批时间
  f00042: "", //进修科室审批人工号
  f00043: "", //进修科室审批人姓名
  f00044: "", //进修科室审批结果
  f00045: "", //进修科室审批意见
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
type DefaultTSGW = typeof defaultTSGW;
type DefaultYNJX = typeof defaultYNJX;

class FormApplyModal {
  @observable public printRef: any = null;
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
  @observable public teacherName = ""; //导师
  @observable public teacherNameList = []; //导师选项
  @observable public selectLoading = false;
  @observable public LCDJFormContent: DefaultLCDJ = cloneJson(defaultLCDJ); //临床带教
  @observable public RYZYFormContent: DefaultRYZY = cloneJson(defaultRYZY); //人员执业
  @observable public GFXZLFormContent: DefaultGFXZL = cloneJson(defaultGFXZL); //高风险诊疗
  @observable public RYZZFormContent: DefaultRYZZ = cloneJson(defaultRYZZ); //人员资质
  @observable public CJJSFormContent: DefaultCJJS = cloneJson(defaultCJJS); //层级晋升
  @observable public TSGWFormContent: DefaultTSGW = cloneJson(defaultTSGW); //特殊岗位
  @observable public YNJXFormContent: DefaultYNJX = cloneJson(defaultYNJX); //院内进修

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

  //按需获取前100个导师
  initData() {
    this.selectLoading = true;
    trainingSettingApi.getAllEmpName(this.teacherName).then(res => {
      this.selectLoading = false;
      this.teacherNameList = res.data.list || [];
    });
  }

  // 清空数据
  public cleanAllStepData = () => {
    this.LCDJFormContent = cloneJson(defaultLCDJ);
    this.RYZYFormContent = cloneJson(defaultRYZY);
    this.CJJSFormContent = cloneJson(defaultCJJS);
    this.GFXZLFormContent = cloneJson(defaultGFXZL);
    this.RYZZFormContent = cloneJson(defaultRYZZ);
    this.TSGWFormContent = cloneJson(defaultTSGW);
    this.YNJXFormContent = cloneJson(defaultYNJX);
  };

  // 用于查看表单对应字段
  // getForm() {
  //   trainingSettingApi.field(this.getFormCode).then(res => {});
  // }

  // 判断回显哪张表单
  allData(data: any, formCode?: any) {
    switch (formCode) {
      case "FQA00001":
        return (this.LCDJFormContent = { ...this.LCDJFormContent, ...data });
      case "FQA00002":
        return (this.RYZYFormContent = { ...this.LCDJFormContent, ...data });
      case "FQA00003":
        return (this.GFXZLFormContent = { ...this.GFXZLFormContent, ...data });
      case "FQA00004":
        return (this.RYZZFormContent = { ...this.RYZZFormContent, ...data });
      case "FQA00005":
        return (this.CJJSFormContent = { ...this.CJJSFormContent, ...data });
      case "FQA00006":
        return (this.TSGWFormContent = { ...this.TSGWFormContent, ...data });
      default:
        return (this.YNJXFormContent = { ...this.YNJXFormContent, ...data });
    }
  }

  // 电子签名
  signUrl(empNo: any) {
    if (empNo) {
      let appToken = appStore.getAppToken();
      let authToken = authStore.getAuthToken();
      let token = `App-Token-Nursing=${appToken}&Auth-Token-Nursing=${authToken}`;
      return `/crNursing/api/file/signImage/${empNo}?${decodeURIComponent(
        token || ""
      )}`;
    } else {
      return "";
    }
  }

  init() {
    this.onload();
    this.initData();
    // this.getForm();
  }
}

export const formApplyModal = new FormApplyModal();
