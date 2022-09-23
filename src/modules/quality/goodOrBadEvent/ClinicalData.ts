import { observable, computed } from "mobx";
// import {PromotionManagementApi} from "./api/PromotionManagement";
import { clinicalApi } from "./ClinicalApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import { message } from "antd";
import moment from 'moment'

class ClinicalData {
  @observable public id = ""; //菜单id
  @observable public deptCode = ""; //科室
  @observable public deptName = ""; //科室名称
  @observable public promotionLevel = ""; //晋升等级
  @observable public keyWord = ""; //关键字

  @observable public selectedType = ""; //类型
  @observable public education =""; //学历

  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public yearImport = moment() as undefined | moment.Moment; //年份
  @observable public month = moment().month()+1; //yue份
  @observable public quarter = moment().quarter() as unknown; //季度
  @observable public tableLoading = false; //表格loading
  @observable public currentMonthDays = moment().daysInMonth();//这个月有几天，用于按键跳到下一个输入框

  // 年份汇总数据
  @observable public deptCodeYear = ""; //科室
  @observable public yearYear = moment() as undefined | moment.Moment; //年份
  // 年份汇总数据 end

  // 季度汇总
  @observable public yearQuarter = moment() as undefined | moment.Moment; //年份
  
  // 护理工作质量/管理指标年度汇总
  @observable public yearSum = moment() as undefined | moment.Moment; //年份

  @observable public sex =""; //性别
  @observable public selectTypeList: any = []; //类型
  @observable public selectedState = ""; //状态
  @observable public key: string = "0"; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public tableList = [] as any; //表格内容

  
  @observable public uploadingStatus = false; //上传状态
  @observable public uploadingPath = ""; //上传路径
  @observable public uploadingName = ""; //上传名称
  @observable public uploadingId = ""; //上传id

  // 月度汇总
  @computed
  get postObj() {
    return {
      deptCode:this.deptCode,//科室
      month:this.month>9?this.month : '0'+this.month.toString(),
      year:this.year?.year(),
      // promotionLevel:this.promotionLevel,//科室
      // courseName:this.keyWord, //关键字
      // pageIndex: this.pageIndex, //页码
      // pageSize: this.pageSize, //每页大小
      // total: this.total, //每页大小
    };
  }

  // 监听年变化，护理工作质量/管理指标年度汇总
  @computed get yearSumChange(){
    return this.yearSum?.year()
  }
  // 监听年变化，修改表头
  @computed get yearChange(){
    return this.yearYear?.year()
  }
  // 科室年度汇总
  @computed get postObjYear(){
    return {
      year:this.yearYear?.year(),
      deptCode:this.deptCodeYear
    }
  }

 
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
      let impObj = {year:moment(this.yearImport).format("YYYY"),file}
      clinicalApi.exportSheetTemplate(impObj)
        .then(res => {
          message.success('导入成功')
          // this.onload()
        }, err => this.tableLoading = false)

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  }

  focusNextIpt(e?:any){
    if ((e.keyCode && e.keyCode == 13)) {
      let baseTableEl = document.getElementById('baseTable')
      if (baseTableEl) {
        let iptList = baseTableEl.querySelectorAll('input:enabled,textarea:enabled') as any

        for (let i = 0; i < iptList.length; i++) {
          let el = iptList[i]
          if (el == (e.target)) {
            if (iptList[i + this.currentMonthDays]) {
              iptList[i + this.currentMonthDays].focus && iptList[i + this.currentMonthDays].focus()
              iptList[i + this.currentMonthDays].click && iptList[i + this.currentMonthDays].click()
            }
            break
          }
        }
      }
    }
  }

  /** 获取表格数据 */
  // onload() {
  //   console.log(this.postObj)
  //   clinicalApi.getMonthTable(this.postObj).then(res => {
  //     console.log(res.data)
  //     this.tableList = res.data.list;
  //     this.total = res.data.totalCount;
  //     this.pageIndex = res.data.pageIndex;
  //     this.pageSize = res.data.pageSize;
  //   });
  // }

  // init() {
  //   this.onload();
  // }
}
export const clinicalData = new ClinicalData();