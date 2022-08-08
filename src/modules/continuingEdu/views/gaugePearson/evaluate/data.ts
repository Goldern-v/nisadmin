import { observable, computed } from "mobx";
import {trainingSettingApi} from "../api/TrainingSettingApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import moment from 'moment'

class evaluateData {
  @observable public id = ""; //菜单id
  @observable public courseName = ""; //关键字
  @observable public deptCode: any[] = []; // 科室
  @observable public selectedType = ""; //类型
  @observable public education =""; //学历
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public yearImport = moment() as undefined | moment.Moment; //年份
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
  @observable public uploadingStatus = false; //上传状态
  @observable public uploadingPath = ""; //上传路径
  @observable public uploadingName = ""; //上传名称
  @observable public uploadingId = ""; //上传id



  @computed
  get postObj() {
    return {
      year:moment(this.year).format("YYYY"), //年份
      // deptCode: this.deptCode,
      courseName:this.courseName, //关键字
      pageIndex:this.pageIndex,
      pageSize:this.pageSize,
      total:this.total,
    };
  }

  /** 获取表格数据 */
  onload() {
    this.tableLoading = true;
    trainingSettingApi.getQueryPageList(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.tableList.map((item:any)=>{
        item.uploadDate = moment(item.uploadDate).format("YYYY-MM-DD HH:mm:ss")
        item.modifyDate = moment(item.modifyDate).format("YYYY-MM-DD HH:mm:ss")
      })
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }
  // 保存
  save() {
    this.tableLoading = true;
    // trainingSettingApi.getQueryPageList(this.postObj).then(res => {
    //   this.tableLoading = false;
    //   this.tableList = res.data.list;
    //   this.tableList.map((item:any)=>{
    //     item.uploadDate = moment(item.uploadDate).format("YYYY-MM-DD HH:mm:ss")
    //     item.modifyDate = moment(item.modifyDate).format("YYYY-MM-DD HH:mm:ss")
    //   })
    //   this.total = res.data.totalCount;
    //   this.pageIndex = res.data.pageIndex;
    //   this.pageSize = res.data.pageSize;
    // });
  }
  /* *下载 */
  haneluploading(list:any){
    fileDownload(list)
  }

  init() {
    this.onload();
  }
}
export const evaluateDatas = new evaluateData();