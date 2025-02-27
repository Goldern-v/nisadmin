import { cloneJson } from "src/utils/json/clone";
import { appStore } from "src/stores";
import { observable, computed } from "mobx";
import moment from "moment";
import { mainPageModal } from "src/modules/continuingEdu/views/mainTablePage/MainPageModal";

const defaultStepData2: any = {
  /** 考试名称 **/
  title: "",
  /**  考试开始时间 */
  startTime: "",
  /**考试科室、江门妇幼 */
  deptCode:"",
  deptName:"",
  /**  开放时长 */
  openTime: "1",
  /**  开放时长单位（小时、天、周） */
  openTimeUnit: "小时",
  /**  结束XX天后归档 */
  daysToArchive: 2,
  /**  组织方式（1线上；2线下） */
  organizationWay: 1,
  /**  考试地址（如：护理app） */
  address: "护士app",
  /**  学院学分类型（1院级学分 2片区学分 3病区学分） */
  studentCreditType: 1,
  /**  学员学分 */
  studentCredit: 0,
  /**  学员学时 */
  studentClassHours: 0,
  /**  通知内容 */
  noticeContent: "",
  bxNurse: [],
  /** 签到负责人 */
  sicPersonList: [],
  /** 最大考试次数 */
  maxExamTimes: 0,
  /** 总成绩 */
  totalScores: 0,
  /** 及格分数线 */
  passScores: 0,
  /** 答题时长（分钟) */
  examDuration: 0,
  /** 是否随机显示题目顺序 （1是 0否） */
  randomOrderQue: 0,
  /** 是否随机显示题目选项顺序 （1是 0否） */
  randomOrderQItem: 0,
  /** 是否交卷后显示分数 （1是 0否）*/
  showScoreInstantly: 0,
  /** 是否需要评分负责人(1需要 0不需要)*/
  needScorePerson: 0,
  /** 评分负责人*/
  scorePersonList: [],
  /** 题目统计信息 */
  questionStatList: [],

  // 武汉中医类别
  /** 1中医类；2非中医类*/
  category: 2,
  /** 是否有学员学分 1有 0无 */
  hasStudentCredit: 0,
  /** 是否有学员学时 1有 0无*/
  hasStudentClassHours: 0,
  /** 是否有评分人学时 1有 0无*/
  hasScorePersonClassHours: 0,
  /** 评分人学时*/
  scorePersonClassHours: 0,

  //南医三单独
  /**  考试开始时间 */
  endTime: "",
  // 烟台玲珑增加 二维码功能
  /**  签到开始时间 */
  signInStartTime: "",
  /**  签到结束时间 */
  signInEndTime: "",
  /**二维码类型（1：静态码 2:动态码）*/
  qrCodeType: 1,
  /**刷新时间 单位：秒*/
  refreshTime: "",
};

type DefaultStepData2 = typeof defaultStepData2;

const defaultStepData5 = {
  /**  是否发送通知（1发通知  0不发通知） */
  ifSendMessage: null
};
class StepViewModal {
  @observable public stepData2: DefaultStepData2 = cloneJson(defaultStepData2);
  /** 厚街多套题目统计信息 */
  @observable public manyQuestionStatLists: any = [];

  /** 计算考试截止时间 */
  @computed
  public get getEndTime() {
    if (
      this.stepData2.startTime &&
      this.stepData2.openTime &&
      this.stepData2.openTimeUnit
    ) {
      let unitMap: any = {
        小时: "h",
        天: "d",
        周: "w"
      };
      return moment(this.stepData2.startTime)
        .add(this.stepData2.openTime, unitMap[this.stepData2.openTimeUnit])
        .format("YYYY-MM-DD HH:mm");
    }
    return "";
  }

  /** 计算学习结束时间 */
  @computed
  public get overTime() {
    if (this.stepData2.startTime && this.stepData2.daysToArchive) {
      if (
        this.stepData2.startTime &&
        this.stepData2.openTime &&
        this.stepData2.openTimeUnit
      ) {
        let unitMap: any = {
          小时: "h",
          天: "d",
          周: "w"
        };
        return moment(this.stepData2.startTime)
          .add(this.stepData2.openTime, unitMap[this.stepData2.openTimeUnit])
          .add(this.stepData2.daysToArchive, "d")
          .format("YYYY-MM-DD HH:mm");
      }
      return moment(this.stepData2.startTime)
        .add(this.stepData2.daysToArchive, "d")
        .format("YYYY-MM-DD HH:mm");
    }
    return "";
  }

  @observable public stepData5: any = cloneJson(defaultStepData5);
  @observable public title = "";

  /** 步骤一完整 */
  public isOkStep = (step: number) => {
    let stepArr = [this.stepData2];
    if (step == 2) return true;
    if (step == 3) return true;
    return this.isOk(stepArr[step]);
  };

  public get getTitle() {
    return this.title;
  }

  public isOk = (obj: any) => {
    if (obj) {
      let keys = Object.keys(obj);
      return keys.every(item => obj[item] !== "");
    }
  };

  /** 清空数据 */
  public cleanAllStepData = () => {
    this.stepData2 = cloneJson(defaultStepData2);
    this.stepData5 = cloneJson(defaultStepData5);
    this.manyQuestionStatLists = [];
  };

  /** 数据合并 */
  public decodeData = () => {
    // let ytllQcObj:any ={
    //   signInStartTime: this.stepData2.signInStartTime,
    //   signInEndTime: this.stepData2.signInEndTime,
    //   qrCodeType: this.stepData2.qrCodeType,
    //   refreshTime: this.stepData2.refreshTime,
    // }
    let result = {
      title: this.stepData2.title,
      startTime: this.stepData2.startTime,
      endTime: this.stepData2.endTime,
      openTime: this.stepData2.openTime,
      openTimeUnit: this.stepData2.openTimeUnit,
      daysToArchive: this.stepData2.daysToArchive,
      organizationWay: this.stepData2.organizationWay,
      address: this.stepData2.address,
      ...appStore.hisMatch({
        map:{
          jmfy:{
            deptCode:this.stepData2.deptCode || "",
            deptName:this.stepData2.deptCode?(mainPageModal.deptList || []).filter(it=>it.code==this.stepData2.deptCode)[0].name:""
          },
          other:{},
        }
      }),
      ...appStore.hisMatch({
        map:{
          lcey:{
            nurse0: this.stepData2.bxNurse.includes("nurse0") ? 1 : 0,
            nurse1_1: this.stepData2.bxNurse.includes("nurse1_1") ? 1 : 0,
            nurse1_2: this.stepData2.bxNurse.includes("nurse1_2") ? 1 : 0,
            nurse2_1: this.stepData2.bxNurse.includes("nurse2_1") ? 1 : 0,
            nurse2_2: this.stepData2.bxNurse.includes("nurse2_2") ? 1 : 0,
            nurse3_1: this.stepData2.bxNurse.includes("nurse3_1") ? 1 : 0,
            nurse3_2: this.stepData2.bxNurse.includes("nurse3_2") ? 1 : 0,
            nurse3_3: this.stepData2.bxNurse.includes("nurse3_3") ? 1 : 0,
            nurse4_1: this.stepData2.bxNurse.includes("nurse4_1") ? 1 : 0,
            nurse4_2: this.stepData2.bxNurse.includes("nurse4_2") ? 1 : 0,
            nurseOther: this.stepData2.bxNurse.includes("nurseOther") ? 1 : 0,
          },
          other:{
            nurse0: this.stepData2.bxNurse.includes("nurse0") ? 1 : 0,
            nurse1: this.stepData2.bxNurse.includes("nurse1") ? 1 : 0,
            nurse2: this.stepData2.bxNurse.includes("nurse2") ? 1 : 0,
            nurse3: this.stepData2.bxNurse.includes("nurse3") ? 1 : 0,
            nurse4: this.stepData2.bxNurse.includes("nurse4") ? 1 : 0,
            nurse5: this.stepData2.bxNurse.includes("nurse5") ? 1 : 0,
            nurseOther: this.stepData2.bxNurse.includes("nurseOther") ? 1 : 0,
          }
        }
      }),
      ifSendMessage: this.stepData5.ifSendMessage ? 1 : 0,
      noticeContent: this.stepData2.noticeContent,
      category: this.stepData2.category,
      detailInfo: {
        hasStudentCredit: this.stepData2.hasStudentCredit,
        hasStudentClassHours: this.stepData2.hasStudentClassHours,
        hasScorePersonClassHours: this.stepData2.hasScorePersonClassHours,
        scorePersonClassHours: this.stepData2.scorePersonClassHours,
        studentCreditType: this.stepData2.studentCreditType,
        studentCredit: this.stepData2.studentCredit,
        studentClassHours: this.stepData2.studentClassHours,
        sicPersonList: this.stepData2.sicPersonList.reduce(
          (total: any[], item: any) => {
            return [
              ...total,
              {
                empNo: item.key
              }
            ];
          },
          []
        ),
        maxExamTimes: this.stepData2.maxExamTimes,
        totalScores: this.stepData2.totalScores,
        passScores: this.stepData2.passScores,
        examDuration: this.stepData2.examDuration,
        randomOrderQue: this.stepData2.randomOrderQue ? 1 : 0,
        randomOrderQItem: this.stepData2.randomOrderQItem ? 1 : 0,
        showScoreInstantly: this.stepData2.showScoreInstantly ? 1 : 0,
        needScorePerson: this.stepData2.needScorePerson ? 1 : 0,
        scorePersonList: this.stepData2.scorePersonList.reduce(
          (total: any[], item: any) => {
            return [
              ...total,
              {
                empNo: item.key
              }
            ];
          },
          []
        ),
        questionStatList:this.stepData2.questionStatList,
        ...appStore.hisMatch({
          map:{
            ytll:{
              signInStartTime: this.stepData2.signInStartTime,
              signInEndTime: this.stepData2.signInEndTime,
              qrCodeType: this.stepData2.qrCodeType,
              refreshTime: this.stepData2.refreshTime,
            },
            other:{}
          }
        })
          // appStore.HOSPITAL_ID == "hj"
          //   ? this.manyQuestionStatLists
          //   : this.stepData2.questionStatList
      }
    };
    return result;
  };

  /** 数据初始化 */
  public initData = (data: any) => {
    for (let key in data) {
      if (this.stepData2[key] !== undefined) {
        this.stepData2[key] = data[key];
      }
    }
    for (let key in data.detailInfo) {
      if (this.stepData2[key] !== undefined) {
        this.stepData2[key] = data.detailInfo[key];
      }
    }
    data.nurse0 && this.stepData2.bxNurse.push("nurse0");
    data.nurse1 && this.stepData2.bxNurse.push("nurse1");
    data.nurse2 && this.stepData2.bxNurse.push("nurse2");
    data.nurse3 && this.stepData2.bxNurse.push("nurse3");
    data.nurse4 && this.stepData2.bxNurse.push("nurse4");
    data.nurse5 && this.stepData2.bxNurse.push("nurse5");
    data.nurseOther && this.stepData2.bxNurse.push("nurseOther");

    this.stepData5.ifSendMessage = !!data.ifSendMessage;

    this.stepData2.sicPersonList = data.detailInfo.sicPersonList.map(
      (item: any) => {
        return {
          label: item.empName,
          key: item.empNo
        };
      }
    );
    this.stepData2.scorePersonList = data.detailInfo.scorePersonList.map(
      (item: any) => {
        return {
          label: item.empName,
          key: item.empNo
        };
      }
    );
  };
}

export const ksStepViewModal = new StepViewModal();
