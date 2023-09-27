

import { observable, computed } from "mobx";
import moment from 'moment'
import { quarterTimes } from "src/enums/date";
import service from "src/services/api";
import { qcZzwyApi } from "../qcZzwyApi";
import { appStore } from "src/stores";
import {fileDownload} from "src/utils/file/file";
class IssueAnalysisData{

  @observable public qcLevel = appStore.queryObj?.qcLevel || '1'

  @observable public tableLoading = false; //表格loading
    @observable public tableList:any = []; //表格内容
    @observable public pageIndex: any = 1; //页码
    @observable public pageSize: any = 20; //每页大小
    @observable public total: any = 0; //总条数


  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public deptCode = "全院"; //科室
  @observable public deptName = "全院"; //科室名称

  @observable public selectQuarter = moment().quarter();//当前选择的季度

  @observable public monthRange = [moment(),moment()];//月份时间

  @observable public filterDate: any = [moment(moment()), moment()]//日期时间

  @observable public templeteList = [{qcCode:''}]//质控表列表
  @observable public qcCode='HJ_QCTP_021';//选择的质控表



  // 科室列表
	@observable public deptList:any = []
	@observable public defaultDept:string = '';
  // 类型列表
  @observable public typeList = [
    {title:'按月度',type:'1'},
    {title:'按季度',type:'2'},
    {title:'按年度',type:'3'},
    {title:'按日期',type:'4'},
  ]
  @observable public selectType = '1';//选中的类型



  @computed get postObj(){
    return{
      wardCode:this.deptCode,
      level:appStore.queryObj?.qcLevel || '1',
      qcCode:this.qcCode
      }
  }

  flattenArray(obj:any){
    let arr:any = [];
  for(let key in obj) {
    if(Array.isArray(obj[key])) {
      arr = arr.concat(obj[key]);
    } else if (typeof obj[key] === 'object') {
      arr = arr.concat(this.flattenArray(obj[key]));
    }
  }
  return arr;
  }
  getTableList(){
    // 默认按月份
    let times = {
      beginDate:moment(this.monthRange[0]).startOf('month').format('YYYY-MM-DD'),
      endDate:moment(this.monthRange[1]).endOf('month').format('YYYY-MM-DD'),
    }
    if(this.selectType=='2'){
      // 季度
      times = {
        beginDate:quarterTimes(this.year?.format('YYYY'),this.selectQuarter)[0],
        endDate:quarterTimes(this.year?.format('YYYY'),this.selectQuarter)[1]
      }
    }else if(this.selectType=='3'){
      // 年度
      times = {
        beginDate:moment(this.year).startOf('year').format('YYYY-MM-DD'),
        endDate:moment(this.year).endOf('year').format('YYYY-MM-DD')
      }
    }else if(this.selectType=='4'){
      // 日期
      times = {
        beginDate:moment(this.filterDate[0]).format('YYYY-MM-DD'),
        endDate:moment(this.filterDate[1]).format('YYYY-MM-DD')
      }
    }
    this.tableLoading = true
    qcZzwyApi.getRectificationdeptSummary({...this.postObj,...times}).then(res=>{
      this.tableLoading = false 
      this.tableList = res.data;
      
    }).catch(err=>{
      this.tableLoading = false

    })
    
  }


  /**获取模板列表 */
  getTemplateList(){
    // debugger
    // if(this.templeteList.length>0){
    //   this.qcCode = this.templeteList[0].qcCode
    //   this.getTableList()
    //   return false
    // }
    this.tableLoading = true
    qcZzwyApi.getTemplateList(appStore.queryObj?.qcLevel || '1').then(res=>{
      this.templeteList = res.data || []
      this.qcCode = res.data[0]?.qcCode
      this.getTableList()
    }).catch(err=>{
      this.tableLoading = false
    })
  }

  	/**科室列表 */
	getNursingAll(){
		// if(this.deptList.length>0){
		// 	return false
		// }
		// 查询有权限的科室
		service.commonApiService.getUintList().then(res=>{
			const { deptList } = res.data
			this.deptList = deptList || []
			this.defaultDept = res.data.defaultDept || ''
		}).catch(err=>{

		})
	}
  /**导出**/
  importXls(){
    qcZzwyApi.rectificationDeptSummary({
      wardCode:this.deptCode,
      qcCode:this.qcCode,
      beginDate:moment(this.filterDate[0]).format('YYYY-MM-DD'),
      endDate:moment(this.filterDate[1]).format('YYYY-MM-DD'),
      level:appStore.queryObj?.qcLevel || '1'
    }).then((res:any)=>{
      fileDownload(res)
    })
  }
}
export const issueAnalysisData = new IssueAnalysisData()