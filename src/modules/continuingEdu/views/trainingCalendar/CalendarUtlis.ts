import { observable, computed } from "mobx";
import { fileDownload } from "src/utils/file/file";
import {TrainingCalendarApi} from './api/TrainingCalendar'
import moment from 'moment'

import { appStore,authStore } from "src/stores/index";


class CalendarUtils {
  @observable public id = ""; //菜单id
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public deptName:any = authStore.user?.deptName; //科室名称
  @observable public deptCode:any = []; //科室code
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public month = moment().format('MM'); //月份
  @observable public loading = false; //月份
  @observable public tebleData = {} //表数据

  @computed
  get postObj() {
    return {
      dateStr:moment(this.year).format("YYYY") + '-' + this.month, //日期
      deptCodes:this.deptCode, //科室
    };
  }
  
  //导出Excel
  export() {
    let months = moment(this.year).format("YYYY") + '-' +this.month
    TrainingCalendarApi.exportPageList({
      dateStr:months,
      fileName: appStore.queryObj.fileName || undefined
    }).then(res => {
      fileDownload(res);
    });
  }
  onload (){
    this.loading = true;
    TrainingCalendarApi.getListTrainingCalendar(this.postObj).then((res)=>{
      this.tebleData = res.data.resultMap
      this.loading = false;
    }).catch((err)=>{
      console.log(err);
      this.loading = false;
    })
  };

}

export const  CalendarUtilsData = new CalendarUtils() 