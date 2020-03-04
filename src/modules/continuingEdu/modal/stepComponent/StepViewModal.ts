import { xxStepViewModal } from "./学习/XXStepViewModal";
import { appStore } from "src/stores";
import { stepServices } from "./services/stepServices";
import { observable, computed, action } from "mobx";
import { getVarType } from "src/utils/object/object";
import moment from "moment";
import { pxStepViewModal } from "./培训/PXStepViewModal";
class StepViewModal {
  @observable public stepData1 = {
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
  @observable public stepData5: any = {
    /**  是否发送通知（1发通知  0不发通知） */
    ifSendMessage: null
  };
  @observable public title = "";

  /** 步骤一完整 */
  public isOkStep = (step: number) => {
    const stepData2 = this.getCurrentStepViewModal
      ? this.getCurrentStepViewModal.stepData2
      : {};

    let stepArr = [this.stepData1, stepData2, this.stepData3, this.stepData4];
    if (step == 2) return true;
    if (step == 3) return true;

    return this.isOk(stepArr[step]);
  };

  /** 获取当前选择模式下的私有viewModal */
  public get getCurrentStepViewModal() {
    let map: any = {
      1: xxStepViewModal,
      2: pxStepViewModal
    };
    if (this.stepData1.teachingMethod) {
      return map[this.stepData1.teachingMethod as any];
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
    this.getCurrentStepViewModal.cleanAllStepData &&
      this.getCurrentStepViewModal.cleanAllStepData();
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

      attachmentIds: this.stepData4.attachmentIds.map((item: any) => item.id),
      detailInfo: {
        ifSendMessage: this.stepData5.ifSendMessage ? 1 : 0,
        participantList: this.stepData3.participantList.reduce(
          (total: any[], item: any) => {
            return [...total, ...item.userList];
          },
          []
        ),
        ...(this.getCurrentStepViewModal.decodeData().detailInfo || {})
      }
    };
    return result;
  };

  /** 新建教学计划 */
  public addTeachingPlanInfoStudy = () => {
    let ajaxMap: any = {
      1: "addTeachingPlanInfoStudy",
      2: "addTeachingPlanInfoTrain"
    };

    return stepServices.generateTaskCode().then(res => {
      return (stepServices as any)[
        ajaxMap[this.stepData1.teachingMethod as any] as any
      ]({
        ...this.decodeData(),
        taskCode: res.data
      });
    });
  };
}

export const stepViewModal = new StepViewModal();
(window as any).getStepViewModal = () =>
  JSON.parse(JSON.stringify(stepViewModal));
