import { observable, computed } from "mobx";
import {trainingSettingApi} from "../api/TrainingSettingApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import moment from 'moment'

class BacisManagModel {
  @observable public id = ""; //菜单id
  @observable public keyWord = ""; //关键字
  @observable public selectedType = ""; //类型
  @observable public education =""; //学历
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public sex =""; //性别
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
      year:moment(this.year).format("YYYY"), //年份
      education: this.education, //学历
      sex:this.sex,//性别
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      total: this.total, //每页大小
      isOnJob:this.keyWord, //关键字
    };
  }

  async initData() {
    // await Promise.all([
    //   //类型
    //   trainingSettingApi.getTypeData(this.id).then(res => {
    //     const nameList = ["集中培训", "在线学习"];
    //     if (appStore.HOSPITAL_ID === "hj" && nameList.includes(trainingSettingApi.getParentsName)) {
    //       this.hjSelectedType = res.data[this.key]?.id || res.data[0]?.id || '';
    //     }
    //     this.selectTypeList = res.data;
    //   })
    // ]);
  }

  /** 获取表格数据 */
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

  /** 导出Excel */
  // export() {
  //   mainPageApi.exportMainData(this.postObj).then(res => {
  //     fileDownload(res);
  //   });
  // }

  //tabs变化函数
  tabsChanged(key: any) {
    this.hjSelectedType = this.selectTypeList[Number(key)].id;
  }

  /** 三级联 */
  // getTree() {
  //   mainPageApi.getTrainingItemsTree().then(res => {
  //     this.trainingKeyPointTree = res.data || [];
  //     this.knowledgePointDivisionTree = res.data[0]?.childList || [];
  //     this.learningFormTree =
  //       this.knowledgePointDivisionTree[0]?.childList || [];
  //   });
  // }

  init() {
    this.onload();
  }
}
export const bacisManagData = new BacisManagModel();