// import { router } from '@/router/index';
// import { api } from 'src/services/api/index';
import { observable, computed } from "mobx";
import moment from 'moment'
import { quarterTimes } from "src/enums/date";
import service from "src/services/api";
import { api } from "./api";
import { message } from "antd";
import { appStore } from 'src/stores'

let quarter = {
  0: '全年',
  1: '第一季度',
  2: '第二季度',
  3: '第三季度',
  4: '第四季度',
}

class QqualityMWSummaryData{

  @observable public tableLoading = false; //表格loading
  @observable public tableList:any = []; //表格内容
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数

  @observable public year:any = null; //年份
  @observable public deptCode = "全院"; //科室
  @observable public deptName = "全院"; //科室名称

  @observable public selectQuarter: any = '全部';//当前选择的季度

  // @observable public filterDate: any = [moment(moment()), moment()]

  // 科室列表
	@observable public deptList:any = []
	@observable public defaultDept:string = '';

  // tableAdd
  @observable public tableAddVisible: boolean = false;
  @observable public reportYear = moment() as undefined | moment.Moment; //年份;
  @observable public add_deptCode: String = '全院';
  @observable public add_deptName: String = '全院';
  @observable public add_Quarter = moment().quarter(); //当前选择的季度
  @observable public reportName: any = `${this.reportYear?.format('YYYY')}${quarter[this.add_Quarter]}${this.add_deptName}护理质量检查总结` // 2023年第一季度全院护理质量检查总结

  @computed get postObj(){
    return{
      wardCode: this.deptCode,
      pageIndex:this.pageIndex + '',
      pageSize:this.pageSize + '',
      hospitalCode: 'zzwy',
      templateName: '季度质量管理工作总结',
      reportYear: this.year ? this.year.format('YYYY') : '',
      reportLevel: '1',
      
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
    // 季度
    let times = {}
    console.log(this.selectQuarter, 666666666, this.selectQuarter !== '全部')
    if (this.selectQuarter !== '全部') {
      times = {
        startDate: quarterTimes(this.year?.format('YYYY'),this.selectQuarter)[0],
        endDate: quarterTimes(this.year?.format('YYYY'),this.selectQuarter)[1],
        reportQuarter: quarter[this.selectQuarter] //季度
      }
    } else {
      times = {
        startDate: '',
        endDate: '',
        reportQuarter: '', //季度
      }
    }
    
    this.tableLoading = true
    api.getPage({...this.postObj, ...times}).then(res=>{
      this.tableLoading = false
      this.tableList = res.data.list
    }).catch(err=>{
      this.tableLoading = false

    })
    
  }
  	/**科室列表 */
	getNursingAll(){
		if(this.deptList.length>0){
			return false
		}
		// 查询有权限的科室
		service.commonApiService.getNursingUnitSelf().then(res=>{
			const { deptList } = res.data
			if (deptList[0] && deptList[0].name === '全部') {
				deptList.shift()
			}
			this.deptList = deptList || []
			this.defaultDept = res.data.defaultDept || ''
		}).catch(err=>{

		})
	}

  cahngeReportName() {
    let name = `${this.reportYear?.format('YYYY')}${quarter[this.add_Quarter]}${this.add_deptName}护理质量检查总结`
    this.reportName = name
  }

  tableAddOk(value: any) {
    const { reportName, reportQuarter, reportYear, wardCode } = value
    
    let times = {
      startDate: quarterTimes(reportYear?.format('YYYY'), reportQuarter)[0],
      endDate: quarterTimes(reportYear?.format('YYYY'), reportQuarter)[1]
    }
    
    api.createQcReport({
      reportName, 
      reportQuarter: quarter[reportQuarter],
      reportYear: reportYear?.format('YYYY'),
      wardCode,
      wardName: this.add_deptName,
      hospitalCode: 'zzwy',
      templateName: '季度质量管理工作总结',
      reportLevel: '1',
      ...times
    }).then((res:any)=>{
      if (res.code === '200') {
        message.success('创建成功')
        localStorage.setItem('qqualityMWSummaryDetail', JSON.stringify(res.data))
        appStore.history.push('/qqualityMWSummaryDetail')
      }  
      this.tableAddonCancel()
    })

  }
  tableAddonCancel() {
    this.tableAddVisible = false
  }
}
export const tableListData = new QqualityMWSummaryData()