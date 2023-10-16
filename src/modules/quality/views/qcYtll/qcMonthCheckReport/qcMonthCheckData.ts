
import { observable, computed,action } from "mobx";
import moment from 'moment'
import { quarterTimes } from "src/enums/date";
import service from "src/services/api";
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


  // 详情的数据modal
  @observable public reportTwoItemModal:boolean = false;
  @observable public templateList:any = []//模板列表
  @observable public reportTwoItem:any = []//根据报告表Code找到报告表下的二级项目
  @observable public templateData:any = {
    qcCode:'',
    itemCodeObj:[],//二级项目对象，name，code，简称simpleName
    itemCodeList:[]//二级项目的codelist，用于获取柱状图传参
  }

  // 详情接口拿到的数据-创建接口
  @observable public reportMasterData:any = null
  @observable public qcReportItemDtoList:any = null
  @observable public sourceMap = {
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
    }
  }
  // 检查情况
  @observable public YTLL_YDHZFX_L3_001:any = {
    qcPersonName:""
  }
  // 二、小结
  @observable public YTLL_YDHZFX_L3_002:any = {
    qcTemplateName:''
  }
  // 三． 本月质量改进项目
  @observable public YTLL_YDHZFX_L3_003:any={
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
  // 四、效果评价及标准化结果
  @observable public YTLL_YDHZFX_L3_004:any = {
    wardQcProblemMap:{}
  }

  /**鱼骨图数据**/
  @observable public updateFish:string = '';//拿到数据就更新鱼骨图
//   @observable public fishValueObj: any = Array.from(Array(40)).reduce((prev, cur, i) => {
//     prev[`v${i + 1}`] = '';
//     return prev
// }, {})

  // 柱状图
  // @observable public fields:any = []
  // @observable public devData:any = []
  
  
  @computed get postObj(){
    return{
        wardCode:this.deptCode,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
        // level:appStore.queryObj?.qcLevel || '1'
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
        // "reportQuarter": "第一季度",
        "startDate": moment(this.createModalData.month).startOf('month').format('YYYY-MM-DD'),
        "endDate": moment(this.createModalData.month).endOf('month').format('YYYY-MM-DD'),
        "wardCode": this.createModalData.deptCode.key,
        "wardName": this.createModalData.deptCode.label,
        "summaryFormName": this.createModalData.summaryFormName,
        "summaryFormCode": this.createModalData.summaryFormCode,
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
      let res2 = JSON.parse(JSON.stringify({
        "code": "200",
        "desc": "操作成功",
        "data": {
            "qcPersonName": "管理员",
            "qcTemplateName": "护士素质检查表",
            "qcTreadData": {
                "monthList": [
                    "8月份"
                ],
                "dataList": [
                    15.29
                ]
            },
            "qcItemTotalCount": 85,
            "fullyCompliantItemCount": 13,
            "fullyCompliantRate": 15.29,
            "partiallyCompliantItemCount": 4,
            "partiallyCompliantRate": 4.71,
            "nonCompliantItemCount": 0,
            "nonCompliantRate": 0,
            "wardQcProblemMap": {
                "骨一科护理单元": [
                    {
                        "qcMasterId": 89006,
                        "qcItemCode": "HJ_QCI_00001",
                        "evalDate": 1692343920000,
                        "qcItemName": "患者是否需要上呼吸机",
                        "qcItemValue": "部分达标",
                        "qcItemIndexNo": 1,
                        "qcItemType": "HJ_QCIT_001",
                        "qcItemTypeName": "上机前",
                        "qcItemTypeIndexNo": 1,
                        "itemShowCode": "1-1",
                        "qcItemDeductDesc": "",
                        "createTime": 1692344467000,
                        "updateTime": 1692344784000,
                        "attachIds": "",
                        "attachUrls": "",
                        "remark": "",
                        "fixedScore": 3,
                        "deductScore": 1.5,
                        "remarkDeductScore": 1.5,
                        "liableNo": "",
                        "liable": "",
                        "wardName": "骨一科护理单元"
                    },
                    {
                        "qcMasterId": 89006,
                        "qcItemCode": "HJ_QCI_00002",
                        "evalDate": 1692343920000,
                        "qcItemName": "是否按照要求严格执行手卫生",
                        "qcItemValue": "部分达标",
                        "qcItemIndexNo": 2,
                        "qcItemType": "HJ_QCIT_001",
                        "qcItemTypeName": "上机前",
                        "qcItemTypeIndexNo": 1,
                        "itemShowCode": "1-2",
                        "qcItemDeductDesc": "",
                        "createTime": 1692344467000,
                        "updateTime": 1692344784000,
                        "attachIds": "",
                        "attachUrls": "",
                        "remark": "",
                        "fixedScore": 1,
                        "deductScore": 0.5,
                        "remarkDeductScore": 0.5,
                        "liableNo": "",
                        "liable": "",
                        "wardName": "骨一科护理单元"
                    },
                    {
                        "qcMasterId": 89006,
                        "qcItemCode": "HJ_QCI_00003",
                        "evalDate": 1692343920000,
                        "qcItemName": "是否根据患者具体情况选择合适的人工气道型号",
                        "qcItemValue": "部分达标",
                        "qcItemIndexNo": 3,
                        "qcItemType": "HJ_QCIT_001",
                        "qcItemTypeName": "上机前",
                        "qcItemTypeIndexNo": 1,
                        "itemShowCode": "1-3",
                        "qcItemDeductDesc": "",
                        "createTime": 1692344467000,
                        "updateTime": 1692344784000,
                        "attachIds": "",
                        "attachUrls": "",
                        "remark": "",
                        "fixedScore": 2,
                        "deductScore": 1,
                        "remarkDeductScore": 1,
                        "liableNo": "",
                        "liable": "",
                        "wardName": "骨一科护理单元"
                    },
                    {
                        "qcMasterId": 89006,
                        "qcItemCode": "HJ_QCI_00004",
                        "evalDate": 1692343920000,
                        "qcItemName": "采集前医嘱有没有进行双人核对",
                        "qcItemValue": "部分达标",
                        "qcItemIndexNo": 4,
                        "qcItemType": "HJ_QCIT_001",
                        "qcItemTypeName": "上机前",
                        "qcItemTypeIndexNo": 1,
                        "itemShowCode": "1-4",
                        "qcItemDeductDesc": "",
                        "createTime": 1692344467000,
                        "updateTime": 1692344784000,
                        "attachIds": "",
                        "attachUrls": "",
                        "remark": "",
                        "fixedScore": 4,
                        "deductScore": 2,
                        "remarkDeductScore": 2,
                        "liableNo": "",
                        "liable": "",
                        "wardName": "骨一科护理单元"
                    }
                ]
            },
            "qcProblemSummaryList": [
                {
                    "itemName": "患者是否需要上呼吸机",
                    "count": 1
                },
                {
                    "itemName": "是否按照要求严格执行手卫生",
                    "count": 1
                },
                {
                    "itemName": "是否根据患者具体情况选择合适的人工气道型号",
                    "count": 1
                },
                {
                    "itemName": "采集前医嘱有没有进行双人核对",
                    "count": 1
                }
            ]
        },
        "errorCode": ""
    }))
      let {data} = res2
      console.log(data,'getQcReportDetail');
      
      this.YTLL_YDHZFX_L3_001.qcPersonName = data.qcPersonName
      // this.tableLoading = false
    }).catch(err=>{
      // this.tableLoading = false
  
    })
  }
  
}
export const qcMonthCheckData = new QcMonthCheckData()