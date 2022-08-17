import { observable, computed } from "mobx";
import {trainingSettingApi} from "../api/TrainingSettingApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { Modal,message } from 'antd';
import moment from 'moment'

class evaluateData {
  @observable public id = ""; //菜单id
  @observable public deptCode:string[] = []; // 科室
  @observable public planTrainBeginTime = moment().subtract(1, 'day'); //规培时间开始时间
  @observable public planTrainEndTime = moment(); //规培时间终止时间
  @observable public deptCodeMultiple:string[] = ['全院']; //实习科室编码（多选）
  @observable public deptNameMultiple:string[] = ['全院']; //实习科室编码（多选）
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
    return {
      planTrainBeginTime:moment(this.planTrainBeginTime).format("YYYY-MM-DD"), //开始时间
      planTrainEndTime:moment(this.planTrainEndTime).format("YYYY-MM-DD"), //结束时间
      deptCodeMultiple:this.deptCodeMultiple, //科室编码
      keyWord:this.keyWord, //关键字
    };
  }

  // @computed
  // get excelObj(){
  //   return {
  //     deptCodeMultiple:this.deptCodeMultiple,
  //     keyWord:this.keyWord,
  //     planTrainBeginTime:this.planTrainBeginTime,
  //     planTrainEndTime:this.planTrainEndTime,

  //   }
  // }

  /** 获取表格数据 */
  onload() {
    this.tableLoading = true;
    trainingSettingApi.getQueryPageList(this.postObj).then(res => {
      this.tableLoading = false;
      if(res.data.list.length){
        this.tableList =res.data.list
      }else{
        this.tableList = []
      }
      
    });
  }

  /* *下载 */
  haneluploading(list:any){
    fileDownload(list)
  }

  // 获取科室
  getDeptList(){
    trainingSettingApi.getnursingDeptRole().then(res =>{
      if(res.data.deptList.length){
        this.deptCode = [{code:'全院',name:'全院'}, ...res.data.deptList]
      }
      
    })
  }

  // 导出
  export(){
    trainingSettingApi.countExcel({
      ...this.postObj
    }).then(res => {
      fileDownload(res);
    });
  }

  /* 保存 */
  save(){
    Modal.confirm({
      title: '是否确认保存?',
      onOk: () => {
        trainingSettingApi.saveQueryPageList(this.tableList).then((res) => {
          console.log(res);
         if(res.code == 200){
            message.success('保存成功');
            this.onload()
         }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    })
   
  }
  

  /* 初始化 */
  init() {
    this.onload();
    this.getDeptList()
  }
}
export const evaluateDatas = new evaluateData();