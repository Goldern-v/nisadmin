import service from "src/services/api";
import { ksStepViewModal } from "./考试/KSStepViewModal";
import { cloneJson } from "src/utils/json/clone";
import { xxStepViewModal } from "./学习/XXStepViewModal";
import { scStepViewModal } from "./实操/SCStepViewModal";
import { appStore } from "src/stores";
import { stepServices } from "./services/stepServices";
import { observable, computed, action } from "mobx";
import { getVarType } from "src/utils/object/object";
import moment from "moment";
import { pxStepViewModal } from "./培训/PXStepViewModal";
import { lxStepViewModal } from "./练习/LXStepViewModal";
import { ylStepViewModal } from "./演练/YLStepViewModal";
import { sjStepViewModal } from "./实践/SJStepViewModal";

export let selfStepViewModalMap: any = {
  1: xxStepViewModal,
  2: pxStepViewModal,
  3: ksStepViewModal,
  4: lxStepViewModal,
  5: scStepViewModal,
  6: ylStepViewModal,
  7: sjStepViewModal
};

export let teachingMethodMap: any = {
  1: "学习",
  2: "培训",
  3: "考试",
  4: "练习",
  5: "实操",
  6: "演练",
  7: "实践"
};
class StepViewModal {
  @observable public getParentsName: any = ""; //二级菜单名
  @observable public getThirdName: any = ""; //三级菜单名
  @observable public oldData: any = null;
  @observable public taskCode: any = null;
  @observable public stepData1: any = {
    teachingMethod: null,
    teachingMethodName: null,
    name: null,
    id: null,
    ceptId: null
  };

  @observable public stepData3 = {
    participantList: []
  };
  @observable public stepData4: any = {
    attachmentIds: [],
    videoList: []
  };
  @observable public stepData4XX = {
    studyLinkList: [] // 学习外网链接（吴敏）
  };
  @observable public stepData4PX = {
    questionStatList: [
      {
        questionCount: 0,
        questionnaireTitle: ""
      }
    ], // 学习外网链接（吴敏）
    isNeedQuestionnaire: 0
  };

  // @observable public stepData5: any = {
  //   /**  是否发送通知（1发通知  0不发通知） */
  //   ifSendMessage: null
  // };
  @observable public title = "";

  /** 步骤一完整 */
  public isOkStep = (step: number, type: string) => {
    /** step 必须完整 */
    if (step == 0) {
      if (!this.stepData1.teachingMethod) {
        return false;
      }
    } else if (step == 1) {
      const stepData2 = this.getCurrentStepViewModal
        ? this.getCurrentStepViewModal.stepData2
        : {};
      const sicPersonList =
        stepData2.sicPersonList && stepData2.sicPersonList.length; // 签到负责人
      const scorePersonList =
        stepData2.scorePersonList && stepData2.scorePersonList.length; // 评分负责人
      const address = stepData2.address && stepData2.address.length; // 实操考核地址
      console.log(sicPersonList, sicPersonList, scorePersonList, "333333");
      if (!stepData2.title || !stepData2.startTime) {
        return false;
      }
      if (type === "实操") {
        if (sicPersonList === 0 || address === 0 || scorePersonList === 0) {
          return false;
        }
      }
    } else if (step == 3) {
      if (type === "学习") {
        let isOk = this.stepData4XX.studyLinkList.filter(
          (item: any) => item.linkAddress === "" || item.linkTitle === ""
        );
        if (isOk && isOk.length > 0) {
          return false;
        }
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
      },
      studyLinkList: this.stepData4XX.studyLinkList, // 学习外网链接（吴敏）
      isNeedQuestionnaire: this.stepData4PX.isNeedQuestionnaire
    };

    if (this.stepData1.teachingMethod == 3) {
      /** 考试 */
      //  Object.assign(target, source)
    } else {
      Object.assign(result, {
        attachmentIds: this.stepData4.attachmentIds
          ? this.stepData4.attachmentIds.map((item: any) => item.id)
          : []
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
      4: "addTeachingPlanInfoExercise",
      5: "addTeachingPlanInfoPractise",
      6: "addTeachingPlanInfoWalkthrough",
      7: "addTeachingPlanInfoSocialpractise"
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
    this.stepData1.ceptId = data.id;
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
    this.stepData4XX.studyLinkList = data.studyLinkList || []; // 学习外网链接（吴敏）
    // this.stepData4PX.questionStatList = data.questionStatList || [];
    this.stepData4PX.isNeedQuestionnaire = data.isNeedQuestionnaire || 0;
  };

  /** 初始化taskCode */
  initTaskCode() {
    stepServices.generateTaskCode().then(res => {
      this.taskCode = res.data;
      return res.data;
    });
  }

  // 厚街多套试卷数据初始化
  initAllExamPapers(taskCode: any, cetpId: any) {
    stepServices
      .getStatInfoOfAllEditRunTimeExamPapers(taskCode, cetpId)
      .then((res: any) => {
        ksStepViewModal.manyQuestionStatLists = res.data || [];
      });
  }

  @observable public dictObj = {
    /** 学习地址 */
    studyAndTrainAddress: []
  };
  /** 初始化字典项 */
  initDict() {
    let dictList = Object.keys(this.dictObj);
    service.commonApiService.multiDictInfo(dictList).then(res => {
      Object.assign(this.dictObj, res.data);
    });
  }
}

export const stepViewModal = new StepViewModal();
(window as any).getStepViewModal = () =>
  JSON.parse(JSON.stringify(stepViewModal));
