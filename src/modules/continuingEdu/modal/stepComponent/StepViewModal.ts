import { appStore } from "src/stores";
import { stepServices } from "./services/stepServices";
import { observable, computed, action } from "mobx";
import { getVarType } from "src/utils/object/object";
import moment from "moment";
class StepViewModal {
  @observable public stepData1 = {
    teachingMethod: null,
    teachingMethodName: null,
    name: null,
    id: null
  };
  @observable public stepData2: any = {
    /** 学习名称 **/
    title: "",
    /**  学习开始时间 */
    startTime: "",
    /**  开放时长 */
    openTime: "",
    /**  开放时长单位（小时、天、周） */
    openTimeUnit: "",
    /**  结束XX天后归档 */
    daysToArchive: "",
    /**  组织方式（1线上；2线下） */
    organizationWay: "",
    /**  学习地址（如：护理app） */
    address: "",
    /**  学院学分类型（1院级学分 2片区学分 3病区学分） */
    studentCreditType: "",
    /**  学员学分 */
    studentCredit: "",
    /**  学员学时 */
    studentClassHours: "",
    /**  通知内容 */
    noticeContent: "",
    bxNurse: []
  };

  /** 计算学习截止时间 */
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

  @observable public stepData3 = {
    participantList: []
  };
  @observable public stepData4 = {
    attachmentIds: []
  };
  @observable public stepData5: any = {
    /**  是否发送通知（1发通知  0不发通知） */
    ifSendMessage: null
  };
  @observable public title = "";

  /** 步骤一完整 */
  public isOkStep = (step: number) => {
    let stepArr = [
      this.stepData1,
      this.stepData2,
      this.stepData3,
      this.stepData4
    ];
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
      return keys.every(item => obj[item]);
    }
  };

  /** 清空数据 */
  public cleanAllStepData = () => {
    let cleanObj = (obj: any) => {
      if (obj) {
        let keys = Object.keys(obj);
        keys.forEach(key => {
          if (getVarType(obj[key]) == "Array") {
            obj[key] = [];
          } else {
            obj[key] = null;
          }
        });
      }
    };
    cleanObj(this.stepData1);
    cleanObj(this.stepData2);
    cleanObj(this.stepData3);
    cleanObj(this.stepData4);
    cleanObj(this.stepData5);
  };

  /** 数据合并 */
  public decodeData = () => {
    let result = {
      taskCode: "tp1581419592543_47",
      secondLevelMenuId: appStore.queryObj.id,
      thirdLevelMenuId: this.stepData1.id,
      teachingMethod: this.stepData1.teachingMethod,
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
      // teacherList: this.stepData3.participantList.reduce(
      //   (total: any[], item: any) => {
      //     return [...total, ...item.userList];
      //   },
      //   []
      // ),
      attachmentIds: this.stepData4.attachmentIds.map((item: any) => item.id),
      detailInfo: {
        studentCreditType: this.stepData2.studentCreditType,
        studentCredit: this.stepData2.studentCredit,
        studentClassHours: this.stepData2.studentClassHours,
        noticeContent: this.stepData2.noticeContent,
        ifSendMessage: this.stepData5.ifSendMessage ? 1 : 0,
        participantList: this.stepData3.participantList.reduce(
          (total: any[], item: any) => {
            return [...total, ...item.userList];
          },
          []
        )
      }
    };
    return result;
  };

  /** 新建教学计划 */
  public addTeachingPlanInfoStudy = () => {
   return stepServices.generateTaskCode().then(res => {
     return stepServices.addTeachingPlanInfoStudy({
        ...this.decodeData(),
        taskCode: res.data
      })
    });
  };
}

export const stepViewModal = new StepViewModal();
(window as any).getStepViewModal = () =>
  JSON.parse(JSON.stringify(stepViewModal));
