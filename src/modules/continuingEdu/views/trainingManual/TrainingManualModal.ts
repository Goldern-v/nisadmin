import { observable, computed, action } from "mobx";
import { appStore, authStore } from "src/stores/index";
import { trainingManualApi } from "./api/TrainingManualApi";
import { fileDownload } from "src/utils/file/file";
import printing from "printing";
class TrainingManualModal {
  @observable public tabKey = 0; //tab对应key值
  @observable public tabKeyName = "N0"; //tab对应名称
  //我的培训清单
  @observable public myTableList: any = [];
  @observable public myTableLoading: any = false;
  //弹窗级联
  @observable public trainingKeyPointTree: any = []; // 类型名称
  @observable public knowledgePointDivisionTree: any = []; // 知识点划分
  @observable public learningFormTree: any = []; // 教学方式
  //各层级培训清单
  @observable public allTableList: any = [];
  @observable public allTableLoading: any = false;
  @observable public modalBtn = false; //弹窗开关

  @observable public tableRef : any; //表单DOM
  

  async initData() {
    await Promise.all([
      // 获取弹窗的级联
      trainingManualApi.getTrainingItemsTree().then(res => {
        this.trainingKeyPointTree = res.data || [];
        this.knowledgePointDivisionTree = (res.data && res.data[0]) || [];
        this.learningFormTree =
          this.knowledgePointDivisionTree.childList[0] || [];
      })
    ]);
  }

  // 获取我的培训清单
  myOnload() {
    this.myTableLoading = true;
    trainingManualApi.queryMyTrainingListByList(this.tabKeyName, authStore.user?.empNo).then(res => {
      this.myTableLoading = false;
      this.myTableList = res.data || [];
    });
  }

  // 获取各层级培训清单
  allOnload() {
    this.allTableLoading = true;
    trainingManualApi.queryTrainingListByList(this.tabKeyName).then(res => {
      this.allTableLoading = false;
      this.allTableList = res.data || [];
    });
  }

  // 导出培训清单
  export() {
    const data = {
      empNo: authStore.user?.empNo,
      nurseHierarchy:this.tabKeyName
    }
    trainingManualApi.exportTrainingList(data).then(res => {
      fileDownload(res)
    })
  }

  //打印培训清单
  print() {
    printing(this.tableRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
      @page {
        margin: 0;
      }
      `,
    });
  }

  async init() {
    await this.initData();
    await this.allOnload();
  }
}

export const trainingManualModal = new TrainingManualModal();
