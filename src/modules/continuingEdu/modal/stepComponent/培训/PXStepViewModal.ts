import { cloneJson } from "src/utils/json/clone";
import { observable, computed } from "mobx";
import moment from "moment";
import { stepViewModal } from "../StepViewModal";

const defaultStepData2 = {
  /** 培训名称 **/
  title: "",
  /**  培训开始时间 */
  startTime: "",
  /**  开放时长 */
  openTime: "1",
  /**  开放时长单位（小时、天、周） */
  openTimeUnit: "小时",
  /**  结束XX天后归档 */
  daysToArchive: 2,
  /**  组织方式（1线上；2线下） */
  organizationWay: 2,
  /**  培训地址（如：护理app） */
  address: "护士app",
  /**  学院学分类型（1院级学分 2片区学分 3病区学分） */
  studentCreditType: null,
  /**  学员学分 */
  studentCredit: 0,
  /**  学员学时 */
  studentClassHours: 0,
  /**  通知内容 */
  noticeContent: "",
  bxNurse: [],
  /** 讲师 */
  teacherList: [],
  /** 讲师学分类型 1院级学分 2片区学分 3病区学分 */
  teacherCreditType: null,
  /** 讲师学分 */
  teacherCredit: 0,
  /** 讲师学时 */
  teacherClassHours: 0,
  /** 签到负责人 */
  sicPersonList: [],

  // 武汉中医类别
  /** 1中医类；2非中医类*/
  category: 2,
  /** 是否有学员学分 1有 0无 */
  hasStudentCredit: 0,
  /** 是否有学员学时 1有 0无*/
  hasStudentClassHours: 0,
  /** 是否有讲师学分 1有 0无*/
  hasTeacherCredit: 0,
  /** 是否有讲师学时 1有 0无*/
  hasTeacherClassHours: 0,

  // 厚街集中培训
  /** 添加注意事项*/
  pointsForAttention:
    "1、严格执行《东莞市厚街医院会议纪律管理办法（试行）》制度，并按照该制度提前十分钟进行签到。2、进出会场时保持有序，避免喧哗嘈杂等不良行为。3、听课期间将手机调至震动状态，保持会场安静。4、请参加听课人员携带学分卡，不得代刷卡行为。5、听课结束时将产生的纸屑、外包装等垃圾带离会场。",
  /** 院外讲师 */
  ywTeacherList: [], 

  //南医三单独
  /**  考试结束时间 */
  endTime: "",
  /** 培训内容 */
  trainContent: '', 
  /** 描述 */
  trainDescribe: '', 
};

const defaultStepData5 = {
  /**  是否发送通知（1发通知  0不发通知） */
  ifSendMessage: null
};
class StepViewModal {
  @observable public stepData2: any = cloneJson(defaultStepData2);

  /** 计算培训截止时间 */
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
        .format("YYYY-MM-DD HH:mm:ss");
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
  };

  /** 数据合并 */
  public decodeData = () => {
    let result = {
      title: this.stepData2.title,
      startTime: this.stepData2.startTime,
      endTime: this.stepData2.endTime,
      trainContent: this.stepData2.trainContent,
      trainDescribe: this.stepData2.trainDescribe,
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
      teacherList: this.stepData2.teacherList.reduce(
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
      ywTeacherList: this.stepData2.ywTeacherList
        ? this.stepData2.ywTeacherList.reduce((total: any[], item: any) => {
            return [
              ...total,
              {
                name: item.key
              }
            ];
          }, [])
        : [],
      ifSendMessage: this.stepData5.ifSendMessage ? 1 : 0,
      noticeContent: this.stepData2.noticeContent,
      category: this.stepData2.category,
      pointsForAttention: this.stepData2.pointsForAttention,
      detailInfo: {
        hasStudentCredit: this.stepData2.hasStudentCredit,
        hasStudentClassHours: this.stepData2.hasStudentClassHours,
        hasTeacherCredit: this.stepData2.hasTeacherCredit,
        hasTeacherClassHours: this.stepData2.hasTeacherClassHours,
        studentCreditType: this.stepData2.studentCreditType,
        studentCredit: this.stepData2.studentCredit,
        studentClassHours: this.stepData2.studentClassHours,
        teacherCreditType: this.stepData2.teacherCreditType,
        teacherCredit: this.stepData2.teacherCredit,
        teacherClassHours: this.stepData2.teacherClassHours,
        questionStatList: stepViewModal.stepData4PX.questionStatList,
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
        )
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

    this.stepData2.teacherList = data.teacherList.map((item: any) => {
      return {
        label: item.empName,
        key: item.empNo
      };
    });
    this.stepData2.ywTeacherList = data.ywTeacherList
      ? data.ywTeacherList.map((item: any) => {
          return {
            label: item.name,
            key: item.name
          };
        })
      : [];

    this.stepData2.sicPersonList = data.detailInfo.sicPersonList.map(
      (item: any) => {
        return {
          label: item.empName,
          key: item.empNo
        };
      }
    );
    stepViewModal.stepData4PX.questionStatList =
      data.detailInfo.questionStatList || [];
  };
}

export const pxStepViewModal = new StepViewModal();
