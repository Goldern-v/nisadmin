import { observable, computed } from "mobx";
// import {internPostgraduateApi} from "../api/InternPostgraduate";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import moment from 'moment'

class BadEvent_gxjb {
  @observable public id = ""; //菜单id
  @observable public keyWord = ""; //关键字
  @observable public selectedType = ""; //类型
  @observable public education =""; //学历
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public sex =""; //性别
  @observable public deucValue ="全部"; //进修科室
  @observable public deptCodes=''; //进修科室 以数组的形式
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

  @observable public eventType='' //汇总类型
  @observable public currentQuarter = moment().quarter() //当前季度

  @computed
  get postObj() {
    return {
      year:moment(this.year).format("YYYY"), //年份
      studyDeptName01: this.deucValue == '全部'? '' :this.deucValue, //进修科室
      studyDeptCode01Multiple: this.deptCodes!=''?[this.deptCodes]:[],
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      total: this.total, //每页大小
      keyWord:this.keyWord, //关键字
    };
  }

  /** 获取表格数据 */
  onload() {
    alert('获取数据')
    // this.tableLoading = true;
    // internPostgraduateApi.getFormList(this.postObj).then(res => {
    //   this.tableLoading = false;
    //   this.tableList = res.data.list;
    //   this.total = res.data.totalCount;
    //   this.pageIndex = res.data.pageIndex;
    //   this.pageSize = res.data.pageSize;
    // });
  }

  /** 导出Excel */
  export() {
    alert('导出')
    // internPostgraduateApi.exportMainData(this.postObj).then(res => {
    //   fileDownload(res);
    // });
  }

  //tabs变化函数
  tabsChanged(key: any) {
    this.hjSelectedType = this.selectTypeList[Number(key)].id;
  }

  init() {
    this.onload();
  }
}
export const badEventData_gxjb = new BadEvent_gxjb();