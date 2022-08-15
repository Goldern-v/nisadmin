import { observable, computed } from "mobx";
import {trainingSettingApi} from "../api/TrainingSettingApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import moment from 'moment'

class evaluateData {
  @observable public id = ""; //菜单id
  @observable public deptCode:string[] = []; // 科室
  @observable public planTrainBeginTime = moment(); //规培时间开始时间
  @observable public planTrainEndTime = moment(); //规培时间终止时间
  @observable public deptCodeMultiple:string[] = []; //实习科室编码（多选）
  @observable public keyWord:string = ''; //查询关键字
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @observable public uploadingStatus = false; //上传状态
  @observable public uploadingPath = ""; //上传路径
  @observable public uploadingName = ""; //上传名称
  @observable public uploadingId = ""; //上传id



  @computed
  get postObj() {
    console.log(this.planTrainBeginTime,this.planTrainEndTime);
    
    return {
      planTrainBeginTime:moment(this.planTrainBeginTime).format("YYYY-MM-DD"), //开始时间
      planTrainEndTime:moment(this.planTrainEndTime).format("YYYY-MM-DD"), //结束时间
      deptCodeMultiple:this.deptCodeMultiple, //科室编码
      keyWord:this.keyWord, //关键字
    };
  }

  /** 获取表格数据 */
  onload() {
    this.tableLoading = true;
    trainingSettingApi.getQueryPageList(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      // this.tableList.map((item:any)=>{
      //   item.uploadDate = moment(item.uploadDate).format("YYYY-MM-DD HH:mm:ss")
      //   item.modifyDate = moment(item.modifyDate).format("YYYY-MM-DD HH:mm:ss")
      // })
    });
  }
  /* *下载 */
  haneluploading(list:any){
    fileDownload(list)
  }

  getDeptList(){
    trainingSettingApi.getnursingDeptRole().then(res =>{
      if(res.data.deptList.length){
        this.deptCode = [{code:'',name:'全院'}, ...res.data.deptList]
      }
      
    })
  }

  init() {
    this.onload();
    this.getDeptList()
  }
}
export const evaluateDatas = new evaluateData();