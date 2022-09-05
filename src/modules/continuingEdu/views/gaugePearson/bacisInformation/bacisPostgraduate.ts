import { observable, computed } from "mobx";
import {trainingSettingApi} from "../api/TrainingSettingApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { message } from "antd";
import moment from 'moment'
import { readFile } from "fs";

interface Teaching{
  value:string,
  code:string,
}
class BacisManagModel {
  @observable public id = ""; //菜单id
  @observable public keyWord = ""; //关键字
  @observable public selectedType = ""; //类型
  @observable public education =""; //学历
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public yearImport = moment() as undefined | moment.Moment; //年份
  @observable public sex =""; //性别
  @observable public region =""; //片区
  @observable public name =""; //姓名
  @observable public selectTypeList: any = []; //类型
  @observable public selectedState = ""; //状态
  @observable public key: string = "0"; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 10; //每页大小
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
  @observable public teachingList: Teaching[] = []; // 带教护士

  @computed
  get postObj() {
    return {
      year:moment(this.year).format("YYYY"), //年份
      education: this.education, //学历
      sex:this.sex,//性别
      region:this.region, //片区关键字
      name:this.name, //姓名关键字
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      total: this.total, //每页大小
    };
  }
  get getObj() {
    return {
      year:moment(this.year).format("YYYY"), //年份
      education: this.education, //学历
      sex:this.sex,//性别
      region:this.region, //片区关键字
      name:this.name, //姓名关键字
    };
  }

   //导出Excel
   export() {
    trainingSettingApi.exportPageList({
      ...this.getObj,
      // fileName: appStore.queryObj.fileName || undefined
    }).then(res => {
      fileDownload(res);
    });
  }
  
  /** 获取导入模板 */
  // getImportTemplate(obj:any) {
  //   trainingSettingApi.exportSheetTemplate(obj)
  //     .then(res => fileDownload(res))
  // }

  import() {
    let importElId = 'sxslrb_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      this.tableLoading = true;
      trainingSettingApi.importSheetTemplate(file)
        .then(res => {
          message.success('导入成功')
          this.onload()
        }, err => this.tableLoading = false)

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  }


  /** 获取表格数据 */
  onload():void {
    this.tableLoading = true;
    trainingSettingApi.getFormList(this.postObj).then(res => {
      this.tableLoading = false;
      res.data.list.map((item:any)=>{
        item.sex =  item.sex == '0' ? '男' : '女';
        let edouct = {"9":"博士",  "8":"研究生", "7":"本科" , "6":"大专",  "5":"中专"};
        item.education = edouct[item.education]
      })
      this.tableList = res.data.list;
      // console.log(this.tableList);
      
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    }).catch(err=>{this.tableLoading = false;});
  }

   /** 获取下载摸板 */
   getImportTemplate() {
    trainingSettingApi.downloadTemplate()
      .then(res => fileDownload(res))
  }
  
  getTeachingData() {
    let reloSting:string = 'WHYX_QCR5001'
    trainingSettingApi.getUserByRoleCode(reloSting).then((res)=>{
      // let teachingList: Teaching[] = []
      this.teachingList = []
      if(res.data.length){
        res.data.forEach((item:any) => {
          this.teachingList.push({value: `${item.empName},${item.empNo}` , code: `${item.empName},${item.empNo}` })
        });
      }
    })
  }


  init() {
    this.onload();
    this.getTeachingData()
  }
}
export const bacisManagData = new BacisManagModel();