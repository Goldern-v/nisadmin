import { observable, computed } from "mobx";
// import {internPostgraduateApi} from "../api/InternPostgraduate";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import moment from 'moment';
import { badEventApi_gxjb } from "./api";

class BadEvent_gxjb {
  @observable public id = ""; //菜单id
  @observable public keyWord = ""; //关键字
  @observable public selectedType = ""; //类型
  @observable public education =""; //学历
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public sex =""; //性别

  @observable public selectTypeList: any = []; //类型
  @observable public selectedState = ""; //状态
  @observable public key: string = "0"; //状态

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


  // 不良事件分类汇总表
  @observable public eventTypeList = []//类型列表
  @observable public eventType={key: 'B0032', label: '跌倒/坠床'} //选中的汇总类型
  @observable public currentQuarter = moment().quarter() //当前季度
  @observable public deptList = []//科室列表
  @observable public selectDept=''
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public deucValue ="全部"; //科室
  @observable public deptCode=''; //

  @computed get searchByTypeParams(){
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      formCode: this.eventType.key,
      badEventType: this.eventType.label=='全部'?'':this.eventType.label,
      deptCode: this.deptCode,
      startDateStr: moment().quarter(this.currentQuarter).startOf('quarter').format('YYYY-MM-DD'),
      endDateStr: moment().quarter(this.currentQuarter).endOf('quarter').format('YYYY-MM-DD')
  }
}




  get formContent(){
    return{
      eventType:this.eventType,
      currentQuarter:this.currentQuarter,
      selectDept:this.selectDept
    }
  }

  /** 获取表格数据 */
  onload() {
    console.log('获取数据')
    console.log(this.searchByTypeParams)
    // alert('获取数据')
    this.tableLoading = true;
    badEventApi_gxjb.getTableList(this.searchByTypeParams).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
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

  // 获取科室
  getnursingDept(){
    if(this.deptList.length>1) return 
    
    badEventApi_gxjb.getnursingDeptRole().then(res => {
			console.log(res.data)
			let deptListall = [];
			deptListall = res.data.deptList || []
			deptListall.unshift({code:'',name:'全部'})
			// setDeptList(deptListall)
      this.deptList = deptListall
		}).catch(err => {

		})
  }
  /**类型字典 */
  getDictList(){
    if(this.eventTypeList.length>0){
      return false
    }
    badEventApi_gxjb.getDictItemList().then(res =>{
      this.eventType = {key:res.data[0].code,label:res.data[0].name}
      this.eventTypeList = res.data
    }).catch(err =>{

    })
  }

  init() {
    // 初始化数据
    this.eventType = {key: 'B0032', label: '全部'}
    this.currentQuarter = moment().quarter()
    this.selectDept=''
    this.getnursingDept()
    this.getDictList()
    this.onload();
  }
}
export const badEventData_gxjb = new BadEvent_gxjb();