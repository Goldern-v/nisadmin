
import { observable, computed } from "mobx";
import moment from 'moment'
import { quarterTimes } from "src/enums/date";
import service from "src/services/api";
import { qcZzwyApi } from "../qcZzwyApi";
import { appStore, authStore } from "src/stores";
class QcMonthCheckData{

  @observable public tableLoading = false; //表格loading
    @observable public tableList:any = [{cz:''},{cz:''},{cz:''}]; //表格内容
    @observable public pageIndex: any = 1; //页码
    @observable public pageSize: any = 20; //每页大小
    @observable public total: any = 0; //总条数

  @observable public deptCode = "全院"; //科室
  @observable public deptName = "全院"; //科室名称

  @observable public monthRange = [moment(),moment()];//月份时间

  // 科室列表
	@observable public deptList:any = []
	@observable public defaultDept:string = '';

  // 创建/编辑的弹框
  @observable public addConfirmVisible:boolean = false;
  @observable public modalTitle:string = '创建';//创建/编辑
  @observable public currentItem={
    month:moment(),//月份
    deptCode:authStore.defaultDeptCode,//科室
    name:'',//名称
  }
  
  @computed get postObj(){
    return{
      wardCode:this.deptCode,
      pageIndex:this.pageIndex,
      pageSize:this.pageSize,
      level:appStore.queryObj?.qcLevel || '1'
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
    this.tableLoading = true
    qcZzwyApi.getInspectionSummary({...this.postObj,...times}).then(res=>{
      this.tableLoading = false
      this.tableList = this.flattenArray(res.data);
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
		service.commonApiService.getUintList().then(res=>{
			const { deptList } = res.data
			this.deptList = deptList || []
			this.defaultDept = res.data.defaultDept || ''
		}).catch(err=>{

		})
	}
}
export const qcMonthCheckData = new QcMonthCheckData()