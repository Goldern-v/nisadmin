import { ksStepViewModal } from "./考试/KSStepViewModal";
import { cloneJson } from "src/utils/json/clone";
import { xxStepViewModal } from "./学习/XXStepViewModal";
import { appStore } from "src/stores";
import { stepServices } from "./services/stepServices";
import { observable, computed, action } from "mobx";
import { getVarType } from "src/utils/object/object";
import moment from "moment";
import { pxStepViewModal } from "./培训/PXStepViewModal";
import { lxStepViewModal } from "./练习/LXStepViewModal";

export let selfStepViewModalMap: any = {
  1: xxStepViewModal,
  2: pxStepViewModal,
  3: ksStepViewModal,
  4: lxStepViewModal
};

export let teachingMethodMap: any = {
  1: "学习",
  2: "培训",
  3: "考试",
  4: "练习",
  5: "实操",
  6: "演练"
};
class StepViewModal {
  @observable public oldData: any = null;
  @observable public taskCode: any = null;
  @observable public stepData1: any = {
    teachingMethod: null,
    teachingMethodName: null,
    name: null,
    id: null
  };

  @observable public stepData3 = {
    participantList: []
  };
  @observable public stepData4 = {
    attachmentIds: []
  };
  // @observable public stepData5: any = {
  //   /**  是否发送通知（1发通知  0不发通知） */
  //   ifSendMessage: null
  // };
  @observable public title = "";

  /** 步骤一完整 */
  public isOkStep = (step: number) => {
    /** step 必须完整 */

    if (step == 0) {
      if (!this.stepData1.teachingMethod) {
        return false;
      }
    } else if (step == 1) {
      const stepData2 = this.getCurrentStepViewModal
        ? this.getCurrentStepViewModal.stepData2
        : {};
      if (!stepData2.title || !stepData2.startTime) {
        return false;
      }
    }
    return true;
    // const stepData2 = this.getCurrentStepViewModal
    //   ? this.getCurrentStepViewModal.stepData2
    //   : {};

    // let stepArr = [this.stepData1, stepData2, this.stepData3, this.stepData4];
    // if (step == 2) return true;
    // if (step == 3) return true;

    // return this.isOk(stepArr[step]);
  };

  /** 获取当前选择模式下的私有viewModal */
  public get getCurrentStepViewModal() {
    if (this.stepData1.teachingMethod) {
      return selfStepViewModalMap[this.stepData1.teachingMethod as any];
    }
    return {};
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
    // this.getCurrentStepViewModal.cleanAllStepData &&
    //   this.getCurrentStepViewModal.cleanAllStepData();
    for (let key in selfStepViewModalMap) {
      selfStepViewModalMap[key].cleanAllStepData();
    }
    stepViewModal.oldData = null;
    cleanObj(this.stepData1);
    cleanObj(this.stepData3);
    cleanObj(this.stepData4);
  };

  /** 数据合并 */
  public decodeData = () => {
    let result = {
      ...(this.getCurrentStepViewModal.decodeData &&
        this.getCurrentStepViewModal.decodeData()),
      taskCode: "tp1581419592543_47",
      secondLevelMenuId: appStore.queryObj.id,
      thirdLevelMenuId: this.stepData1.id,
      teachingMethod: this.stepData1.teachingMethod,
      participantList: this.stepData3.participantList.reduce(
        (total: any[], item: any) => {
          return [...total, ...item.userList];
        },
        []
      ),
      detailInfo: {
        // ifSendMessage: this.stepData5.ifSendMessage ? 1 : 0,

        ...(this.getCurrentStepViewModal.decodeData().detailInfo || {})
      }
    };

    if (this.stepData1.teachingMethod == 3) {
      /** 考试 */
      //  Object.assign(target, source)
    } else {
      Object.assign(result, {
        attachmentIds: this.stepData4.attachmentIds.map((item: any) => item.id)
      });
    }

    return result;
  };

  /** 新建教学计划 */
  public addTeachingPlanInfoStudy = (status: any) => {
    let ajaxMap: any = {
      1: "addTeachingPlanInfoStudy",
      2: "addTeachingPlanInfoTrain",
      3: "addTeachingPlanInfoExam",
      4: "addTeachingPlanInfoExercise"
    };

    return (stepServices as any)[
      ajaxMap[this.stepData1.teachingMethod as any] as any
    ]({
      ...this.decodeData(),
      status,
      taskCode: this.taskCode,
      id: this.oldData ? this.oldData.id : undefined
    });
  };

  /** 数据初始化 */
  public initData = (data: any) => {
    this.oldData = data;

    this.stepData1.id = data.thirdLevelMenuId;
    this.stepData1.name = "  ";
    this.stepData1.teachingMethod = data.teachingMethod;
    this.stepData1.teachingMethodName = "  ";

    this.stepData3.participantList = data.participantList.map((item: any) => {
      return {
        label: item.empName,
        key: item.empName,
        userList: [item]
      };
    });
    this.stepData4.attachmentIds = data.attachmentList;
  };

  /** 初始化taskCode */
  initTaskCode() {
    stepServices.generateTaskCode().then(res => {
      this.taskCode = res.data;
    });
  }
}

export const stepViewModal = new StepViewModal();
(window as any).getStepViewModal = () =>
  JSON.parse(JSON.stringify(stepViewModal));
