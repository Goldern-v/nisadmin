import { observable, computed } from "mobx";
import {PromotionManagementApi} from "./api/PromotionManagement";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import { message } from "antd";
import moment from 'moment'

class PromotionPost {
  @observable public id = ""; //菜单id
  @observable public deptCode = ""; //科室
  @observable public promotionLevel = ""; //晋升等级
  @observable public keyWord = ""; //关键字

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
      year:moment(this.year).format("YYYY"),
      deptCode:this.deptCode,//科室
      promotionLevel:this.promotionLevel,//科室
      keyWord:this.keyWord, //关键字
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      total: this.total, //每页大小
    };
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
      PromotionManagementApi.exportSheetTemplate(impObj)
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
  onload() {
    this.tableLoading = true;
    PromotionManagementApi.getQueryPageList(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }

  init() {
    this.onload();
  }
  // 导出
  handleExport() {
    PromotionManagementApi.export().then(res => {
      fileDownload(res)
    })

  }
}
export const PromotionUtils = new PromotionPost();