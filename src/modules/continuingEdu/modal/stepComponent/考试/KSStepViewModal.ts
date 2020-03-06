import { cloneJson } from "src/utils/json/clone";
import { appStore } from "src/stores";
import { observable, computed, action } from "mobx";
import { getVarType } from "src/utils/object/object";
import moment from "moment";

const defaultStepData2 = {
  /** 考试名称 **/
  title: "",
  /**  考试开始时间 */
  startTime: "",
  /**  开放时长 */
  openTime: "",
  /**  开放时长单位（小时、天、周） */
  openTimeUnit: "小时",
  /**  结束XX天后归档 */
  daysToArchive: 2,
  /**  组织方式（1线上；2线下） */
  organizationWay: 1,
  /**  考试地址（如：护理app） */
  address: "",
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
  questionStatList: []
};

const defaultStepData5 = {
  /**  是否发送通知（1发通知  0不发通知） */
  ifSendMessage: null
};
class StepViewModal {
  @observable public stepData2: any = cloneJson(defaultStepData2);

  /** 计算考试截止时间 */
  @computed
  public get endTime() {
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
        .format("YYYY-MM-DD HH:mm:ss");
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
  };

  /** 数据合并 */
  public decodeData = () => {
    let result = {
      title: this.stepData2.title,
      startTime: this.stepData2.startTime,
      openTime: this.stepData2.openTime,
      openTimeUnit: this.stepData2.openTimeUnit,
      daysToArchive: this.stepData2.daysToArchive,
      organizationWay: this.stepData2.organizationWay,
      address: this.stepData2.address,
      nurse0: this.stepData2.bxNurse.includes("nurse0") ? 1 : 0,
      nurse1: this.stepData2.bxNurse.includes("nurse1") ? 1 : 0,
      nurse2: this.stepData2.bxNurse.includes("nurse2") ? 1 : 0,
      nurse3: this.stepData2.bxNurse.includes("nurse3") ? 1 : 0,
      nurse4: this.stepData2.bxNurse.includes("nurse4") ? 1 : 0,
      nurse5: this.stepData2.bxNurse.includes("nurse5") ? 1 : 0,
      nurseOther: this.stepData2.bxNurse.includes("nurseOther") ? 1 : 0,

      detailInfo: {
        studentCreditType: this.stepData2.studentCreditType,
        studentCredit: this.stepData2.studentCredit,
        studentClassHours: this.stepData2.studentClassHours,
        teacherCreditType: this.stepData2.teacherCreditType,
        teacherCredit: this.stepData2.teacherCredit,
        teacherClassHours: this.stepData2.teacherClassHours,
        noticeContent: this.stepData2.noticeContent,
        ifSendMessage: this.stepData5.ifSendMessage ? 1 : 0,
        sicPersonList: this.stepData2.sicPersonList.reduce(
          (total: any[], item: any) => {
            return [...total, ...item.userList];
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
            return [...total, ...item.userList];
          },
          []
        ),
        questionStatList: this.stepData2.questionStatList
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

    this.stepData5.ifSendMessage = !!data.detailInfo.ifSendMessage;

    this.stepData2.teacherList = data.teacherList.map((item: any) => {
      return {
        label: item.empName,
        key: item.empName,
        userList: [item]
      };
    });
    this.stepData2.sicPersonList = data.detailInfo.sicPersonList.map(
      (item: any) => {
        return {
          label: item.empName,
          key: item.empName,
          userList: [item]
        };
      }
    );
    this.stepData2.scorePersonList = data.detailInfo.scorePersonList.map(
      (item: any) => {
        return {
          label: item.empName,
          key: item.empName,
          userList: [item]
        };
      }
    );
  };
}

export const ksStepViewModal = new StepViewModal();
