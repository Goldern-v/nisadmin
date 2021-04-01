import { observable, computed } from "mobx";
import { mainPageApi } from "./api/MainPageApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { stepViewModal } from "../../modal/stepComponent/StepViewModal";

class MainPageModal {
  @observable public id = ""; //菜单id
  @observable public keyWord = ""; //菜单名
  @observable public selectedType = ""; //类型
  @observable public selectTypeList: any = []; //类型
  @observable public selectedState = ""; //状态
  @observable public key: string = "0"; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @observable public hjSelectedType = ""; //状态
  /** 三级联参数 */
  @observable public trainingKeyPointTreeId: any = ""; // 类型名称
  @observable public knowledgePointDivisionTreeId: any = ""; // 知识点划分
  @observable public learningFormTreeId: any = ""; // 教学方式
  @observable public trainingKeyPointTree: any = []; // 类型名称
  @observable public knowledgePointDivisionTree: any = []; // 知识点划分
  @observable public learningFormTree: any = []; // 教学方式

  @computed
  get postObj() {
    return {
      secondLevelMenuId: this.id, //二级菜单id
      thirdLevelMenuId:
        appStore.HOSPITAL_ID === "hj" &&
        stepViewModal.getParentsName == "在线学习"
          ? this.hjSelectedType
          : stepViewModal.getParentsName == "集中培训"
          ? ""
          : this.selectedType, //三级菜单id(类型)
      status: this.selectedState, //状态
      keyWord: this.keyWord, //菜单名
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      beginTime: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      endTime: this.selectedDate[1].format("YYYY-MM-DD") // 结束时间
    };
  }

  async initData() {
    await Promise.all([
      //类型
      mainPageApi.getTypeData(this.id).then(res => {
        const nameList = ["集中培训", "在线学习"];
        if (appStore.HOSPITAL_ID === "hj" && nameList.includes(stepViewModal.getParentsName)) {
          this.hjSelectedType = res.data[this.key]?.id || res.data[0].id;
        }
        this.selectTypeList = res.data;
      })
    ]);
  }

  /** 获取表格数据 */ 
  onload() {
    this.tableLoading = true;
    mainPageApi.getMainData(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }

  /** 导出Excel */
  export() {
    mainPageApi.exportMainData(this.postObj).then(res => {
      fileDownload(res);
    });
  }

  //tabs变化函数
  tabsChanged(key: any) {
    this.hjSelectedType = this.selectTypeList[Number(key)].id;
  }

  /** 三级联 */ 
  getTree() {
    mainPageApi.getTrainingItemsTree().then(res => {
      this.trainingKeyPointTree = res.data || [];
      this.knowledgePointDivisionTree = res.data[0]?.childList || [];
      this.learningFormTree =
        this.knowledgePointDivisionTree[0]?.childList || [];
    });
  }

  async init() {
    await this.initData();
    this.onload();
  }
}

export const mainPageModal = new MainPageModal();
