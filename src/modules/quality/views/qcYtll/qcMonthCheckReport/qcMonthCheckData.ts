
import { observable, computed,action } from "mobx";
import moment from 'moment'
import service from "src/services/api";
import _ from 'lodash'
import  {qcYtllApi}  from "../qcYtllApi";
import { appStore, authStore } from "src/stores";
class QcMonthCheckData{

  @observable public tableLoading = false; //表格loading
    @observable public tableList:any = [{cz:''},{cz:''},{cz:''}]; //表格内容
    @observable public pageIndex: any = 1; //页码
    @observable public pageSize: any = 20; //每页大小
    @observable public total: any = 0; //总条数

  @observable public deptCode = ""; //科室
  @observable public deptName = "全院"; //科室名称

  @observable public monthRange = [moment(),moment()];//月份时间

  // 科室列表
	@observable public deptList:any = []
	@observable public defaultDept:string = '';

  // 创建/编辑的弹框
  @observable public addConfirmVisible:boolean = false;
  @observable public modalTitle:string = '创建';//创建/编辑
  @observable public createModalData:any = {};// 创建对话框的内容
  @observable public currentItemSource={
    month:moment(),//月份
    wardName:authStore.defaultDeptCodeName,
    wardCode:authStore.defaultDeptCode,
    startDate:moment(),
    // wardCode:{key:authStore.defaultDeptCode,label:authStore.defaultDeptCodeName},//科室
    reportName:null,//名称
    id:null,
    summaryFormName:null,
    summaryFormCode:null
  }
  @observable public currentItem={
    month:moment(),//月份
    wardName:authStore.defaultDeptCodeName,
    wardCode:authStore.defaultDeptCode,
    startDate:moment(),
    // wardCode:{key:authStore.defaultDeptCode,label:authStore.defaultDeptCodeName},//科室
    reportName:null,//名称
    id:null,
    summaryFormName:null,
    summaryFormCode:null
  }

  // 详情接口拿到的数据-创建接口
  @observable public reportMasterData:any = null
  @observable public qcReportItemDtoList:any = null
  @observable public sourceMap = (()=>{
    return {
      YTLL_YDHZFX_L3_001:{
        qcPersonName:""
      },
      YTLL_YDHZFX_L3_002:{
        qcTemplateName:''
      },
      YTLL_YDHZFX_L3_003:{
        qcItemDepartCount:0,
        qcItemWardCount:0,
        qcItemTotalCount:0,
        fullyCompliantItemCount:0,
        fullyCompliantRate:0,
        partiallyCompliantItemCount:0,
        partiallyCompliantRate:0,
        nonCompliantItemCount:0,
        nonCompliantRate:0,
        qcTreadData:{
          monthList:[],
          dataList:[]
        }
      },
      YTLL_YDHZFX_L3_004:{
        wardQcProblemMap:{}
      },
      YTLL_YDHZFX_L3_005:{
        qcProblemSummaryList:[]
      },
      YTLL_YDHZFX_L3_006:{
        reason:"",
        doSomething:""
      },
      YTLL_YDHZFX_L3_007:{
        pingjia:"",
      },
      YTLL_YDHZFX_L2_001:{
        qcPersonName:""
      },
      YTLL_YDHZFX_L2_002:{
        qcTemplateName:''
      },
      YTLL_YDHZFX_L2_003:{
        qcItemDepartCount:0,
        qcItemWardCount:0,
        qcItemTotalCount:0,
        fullyCompliantItemCount:0,
        fullyCompliantRate:0,
        partiallyCompliantItemCount:0,
        partiallyCompliantRate:0,
        nonCompliantItemCount:0,
        nonCompliantRate:0,
        qcTreadData:{
          monthList:[],
          dataList:[]
        }
      },
      YTLL_YDHZFX_L2_004:{
        wardQcProblemMap:{}
      },
      YTLL_YDHZFX_L2_005:{
        qcProblemSummaryList:[]
      },
      YTLL_YDHZFX_L2_006:{
        reason:"",
        doSomething:""
      },
      YTLL_YDHZFX_L2_007:{
        pingjia:"",
      },
      YTLL_YDHZFX_L1_001:{
        qcPersonName:""
      },
      YTLL_YDHZFX_L1_002:{
        qcTemplateName:''
      },
      YTLL_YDHZFX_L1_003:{
        // qcItemDepartCount:0,
        // qcItemWardCount:0,
        qcItemTotalCount:0,
        fullyCompliantItemCount:0,
        fullyCompliantRate:0,
        partiallyCompliantItemCount:0,
        partiallyCompliantRate:0,
        nonCompliantItemCount:0,
        nonCompliantRate:0,
        qcTreadData:{
          monthList:[],
          dataList:[]
        }
      },
      YTLL_YDHZFX_L1_004:{
        wardQcProblemMap:{}
      },
      YTLL_YDHZFX_L1_005:{
        reason:"",
        doSomething:""
      },
      YTLL_YDHZFX_L1_006:{
        pingjia:"",
      },

    }
  })()
    @observable public YTLL_YDHZFX_L3_001?:any
    @observable public YTLL_YDHZFX_L3_002?:any 
    @observable public YTLL_YDHZFX_L3_003?:any
    @observable public YTLL_YDHZFX_L3_004?:any
    @observable public YTLL_YDHZFX_L3_005?:any
    @observable public YTLL_YDHZFX_L3_006?:any
    @observable public YTLL_YDHZFX_L3_007?:any

    @observable public YTLL_YDHZFX_L2_001?:any
    @observable public YTLL_YDHZFX_L2_002?:any 
    @observable public YTLL_YDHZFX_L2_003?:any
    @observable public YTLL_YDHZFX_L2_004?:any
    @observable public YTLL_YDHZFX_L2_005?:any
    @observable public YTLL_YDHZFX_L2_006?:any
    @observable public YTLL_YDHZFX_L2_007?:any

    @observable public YTLL_YDHZFX_L1_001?:any
    @observable public YTLL_YDHZFX_L1_002?:any 
    @observable public YTLL_YDHZFX_L1_003?:any
    @observable public YTLL_YDHZFX_L1_004?:any
    @observable public YTLL_YDHZFX_L1_005?:any
    @observable public YTLL_YDHZFX_L1_006?:any
    
    constructor(){
      // if(appStore?.queryObj?.qcLevel == 3) {
        this.YTLL_YDHZFX_L3_001 = { qcPersonName:""}
        this.YTLL_YDHZFX_L3_002 = { qcTemplateName:''}
        this.YTLL_YDHZFX_L3_003 = {
          qcItemDepartCount:0,
          qcItemWardCount:0,
          qcItemTotalCount:0,
          fullyCompliantItemCount:0,
          fullyCompliantRate:0,
          partiallyCompliantItemCount:0,
          partiallyCompliantRate:0,
          nonCompliantItemCount:0,
          nonCompliantRate:0,
          qcTreadData:{
            monthList:[],
            dataList:[]
          }
        }
        this.YTLL_YDHZFX_L3_004 = { wardQcProblemMap:{} }
        this.YTLL_YDHZFX_L3_005 = { qcProblemSummaryList:[] }
        this.YTLL_YDHZFX_L3_006 = { reason:"",doSomething:"" }
        this.YTLL_YDHZFX_L3_007 = { pingjia:"" }
      // }else if(appStore?.queryObj?.qcLevel == 2){
        this.YTLL_YDHZFX_L2_001 = { qcPersonName:""}
        this.YTLL_YDHZFX_L2_002 = { qcTemplateName:''}
        this.YTLL_YDHZFX_L2_003 = {
          qcItemDepartCount:0,
          qcItemWardCount:0,
          qcItemTotalCount:0,
          fullyCompliantItemCount:0,
          fullyCompliantRate:0,
          partiallyCompliantItemCount:0,
          partiallyCompliantRate:0,
          nonCompliantItemCount:0,
          nonCompliantRate:0,
          qcTreadData:{
            monthList:[],
            dataList:[]
          }
        }
        this.YTLL_YDHZFX_L2_004 = { wardQcProblemMap:{} }
        this.YTLL_YDHZFX_L2_005 = { qcProblemSummaryList:[] }
        this.YTLL_YDHZFX_L2_006 = { reason:"",doSomething:"" }
        this.YTLL_YDHZFX_L2_007 = { pingjia:"" }

        this.YTLL_YDHZFX_L1_001 = { qcPersonName:""}
        this.YTLL_YDHZFX_L1_002 = { qcTemplateName:''}
        this.YTLL_YDHZFX_L1_003 = {
          // qcItemDepartCount:0,
          // qcItemWardCount:0,
          qcItemTotalCount:0,
          fullyCompliantItemCount:0,
          fullyCompliantRate:0,
          partiallyCompliantItemCount:0,
          partiallyCompliantRate:0,
          nonCompliantItemCount:0,
          nonCompliantRate:0,
          qcTreadData:{
            monthList:[],
            dataList:[]
          }
        }
        this.YTLL_YDHZFX_L1_004 = { wardQcProblemMap:{} }
        this.YTLL_YDHZFX_L1_005 = { reason:"",doSomething:"" }
        this.YTLL_YDHZFX_L1_006 = { pingjia:"" }
      // }
    }
  
  @computed get postObj(){
    return{
        wardCode:this.deptCode,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
        templateName: '月度汇总分析报告',
        hospitalCode: 'ytll',
        reportLevel: appStore.queryObj?.qcLevel || '1',
      }
  }

  @computed get detailObj(){
    return{
        "hospitalCode": "ytll",
        "templateName": "月度质控检查总结报告",
        "reportName": this.createModalData.name,
        "reportLevel": appStore.queryObj.qcLevel,
        "reportYear": moment(this.createModalData.month).year(),
        "reportMonth": moment(this.createModalData.month).month()+1,
        "startDate": moment(this.createModalData.month).startOf('month').format('YYYY-MM-DD'),
        "endDate": moment(this.createModalData.month).endOf('month').format('YYYY-MM-DD'),
        "wardCode": this.createModalData.deptCode.key,
        "wardName": this.createModalData.deptCode.label,
        "summaryFormName": this.createModalData.summaryFormName,
        "summaryFormCode": this.createModalData.summaryFormCode,
    }
  }

  getTableList(){
    // 默认按月份
    let times = {
      startDate:moment(this.monthRange[0]).startOf('month').format('YYYY-MM-DD'),
      endDate:moment(this.monthRange[1]).endOf('month').format('YYYY-MM-DD'),
    }
    this.tableLoading = true
    qcYtllApi.qcReportGetPage({...this.postObj,...times}).then(res=>{
      this.tableLoading = false
      this.tableList = res.data.list || [];
      this.total = res.data.totalCount || 0
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

  /**获取第一个表格的数据 */
  getQcReportDetail(){
    let params = {
      "hospitalCode": "ytll",
      "templateName": "月度汇总分析报告",
      "reportLevel": appStore.queryObj.qcLevel,
      "startDate": moment(this.createModalData.month).startOf('month').format('YYYY-MM-DD'),
      "endDate": moment(this.createModalData.month).endOf('month').format('YYYY-MM-DD'),
      "reportName" : this.createModalData.name,
      "summaryFormName": this.createModalData.summaryFormName,
      "summaryFormCode": this.createModalData.summaryFormCode,
    }
    qcYtllApi.getQcReportDetail(params).then(res=>{
      let {data} = res
      if(appStore?.queryObj?.qcLevel == 3){
        this.YTLL_YDHZFX_L3_001.qcPersonName = data.qcPersonName
        this.YTLL_YDHZFX_L3_002.qcTemplateName = data.qcTemplateName
        this.YTLL_YDHZFX_L3_003 = _.pick(data, Object.keys(this.YTLL_YDHZFX_L3_003));
        this.YTLL_YDHZFX_L3_004.wardQcProblemMap = data.wardQcProblemMap
        this.YTLL_YDHZFX_L3_005.qcProblemSummaryList = data.qcProblemSummaryList
      }else if(appStore?.queryObj?.qcLevel == 2){
        this.YTLL_YDHZFX_L2_001.qcPersonName = data.qcPersonName
        this.YTLL_YDHZFX_L2_002.qcTemplateName = data.qcTemplateName
        this.YTLL_YDHZFX_L2_003 = _.pick(data, Object.keys(this.YTLL_YDHZFX_L2_003));
        this.YTLL_YDHZFX_L2_004.wardQcProblemMap = data.wardQcProblemMap
        this.YTLL_YDHZFX_L2_005.qcProblemSummaryList = data.qcProblemSummaryList
      }else {
        this.YTLL_YDHZFX_L1_001.qcPersonName = data.qcPersonName
        this.YTLL_YDHZFX_L1_002.qcTemplateName = data.qcTemplateName
        this.YTLL_YDHZFX_L1_003 = _.pick(data, Object.keys(this.YTLL_YDHZFX_L1_003));
        this.YTLL_YDHZFX_L1_004.qcProblemSummaryList = data.qcProblemSummaryList
      }
    }).catch(err=>{
  
    })
  }
  
}
export const qcMonthCheckData = new QcMonthCheckData()