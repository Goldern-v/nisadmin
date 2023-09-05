
import { observable, computed,action } from "mobx";
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
    id:null
  }
  @observable public currentItem={
    month:moment(),//月份
    wardName:authStore.defaultDeptCodeName,
    wardCode:authStore.defaultDeptCode,
    startDate:moment(),
    // wardCode:{key:authStore.defaultDeptCode,label:authStore.defaultDeptCodeName},//科室
    reportName:null,//名称
    id:null
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
    ZZWY_YDZKJCZJ_L1_001:{
      tableList:[]
    },
    ZZWY_YDZKJCZJ_L1_002:{
      summary:''
    },
    ZZWY_YDZKJCZJ_L1_003:{
      date:undefined,//日期
      itemCodeObj:this.templateData.itemCodeObj || [],//二级项目对象，name，code，简称simpleName
      improveGoals:'',//改进目标
      steps:'',//整改措施：
      check:'',//检查情况
      fishValueObj:Array.from(Array(50)).reduce((prev, cur, i) => {
        prev[`v${i + 1}`] = '';
        return prev
    }, {}),//鱼骨图
    fishValueArr:[Array.from(Array(50)).reduce((prev, cur, i) => {
      prev[`v${i + 1}`] = '';
      return prev
  }, {id:Math.floor(1000 + Math.random() * 9000)})],
    },
    ZZWY_YDZKJCZJ_L1_004:{
      textArea:'',
      fields:[],
      devData:[],//有多个鱼骨图
      imgList:[],//附近图片的path
    }
  }
  // 检查情况
  @observable public ZZWY_YDZKJCZJ_L1_001:any = {
    tableList:[]
  }
  // 二、小结
  @observable public ZZWY_YDZKJCZJ_L1_002:any = {
    summary:''
  }
  // 三． 本月质量改进项目
  @observable public ZZWY_YDZKJCZJ_L1_003:any={
    date:undefined,//日期
    itemCodeObj:this.templateData.itemCodeObj || [],//二级项目对象，name，code，简称simpleName
    improveGoals:'',//改进目标
    steps:'',//整改措施：
    check:'',//检查情况
    fishValueObj:Array.from(Array(50)).reduce((prev, cur, i) => {
      prev[`v${i + 1}`] = '';
      return prev
  }, {}),//鱼骨图
  fishValueArr:[Array.from(Array(50)).reduce((prev, cur, i) => {
    prev[`v${i + 1}`] = '';
    return prev
}, {id:Math.floor(1000 + Math.random() * 9000)})]
  }
  // 四、效果评价及标准化结果
  @observable public ZZWY_YDZKJCZJ_L1_004:any = {
    textArea:'',
    fields:[],
    devData:[],
    imgList:[],//附近图片的path
  }

  /**鱼骨图数据**/
  @observable public updateFish:string = '';//拿到数据就更新鱼骨图
//   @observable public fishValueObj: any = Array.from(Array(40)).reduce((prev, cur, i) => {
//     prev[`v${i + 1}`] = '';
//     return prev
// }, {})

// @action
//     updateFishValueObj(value:any){
//       this.ZZWY_YDZKJCZJ_L1_003.fishValueObj = value
//     }
    @action
    updateFishValueArray(value:any,index:number){
      this.ZZWY_YDZKJCZJ_L1_003.fishValueArr[index] = value
    }

  // 柱状图
  // @observable public fields:any = []
  // @observable public devData:any = []
  
  
  @computed get postObj(){
    return{
        wardCode:this.deptCode,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
        // level:appStore.queryObj?.qcLevel || '1'
        templateName: '月度质控检查总结报告',
        hospitalCode: 'zzwy',
        reportLevel: appStore.queryObj?.qcLevel || '1',
      }
  }

  @computed get detailObj(){
    return{
        "hospitalCode": "zzwy",
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
    qcZzwyApi.qcReportGetPage({...this.postObj,...times}).then(res=>{
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

  /**获取模板列表 */
  getTemplateList(){
    if(this.templateList.length>1){
      return false
    }
    qcZzwyApi.getTemplateList(appStore.queryObj?.qcLevel).then(res=>{
      this.templateList = res.data || []
    }).catch(err=>{

    })
  }

  getReportTwoItem(qcCode:any){
    qcZzwyApi.getReportTwoItem(qcCode).then(res=>{
      this.reportTwoItem = res.data || []
    }).catch(err=>{

    })
  }


  /**获取第一个表格的数据 */
  getInspectionSummary(){
    qcZzwyApi.getInspectionSummary({
      wardCode:this.createModalData.deptCode?.key|| '236',
      beginDate:moment(this.createModalData.month).startOf('month').format('YYYY-MM-DD') || '2023-08-01',
      endDate:moment(this.createModalData.month).endOf('month').format('YYYY-MM-DD') || '2023-08-31',
      level:appStore.queryObj.qcLevel,
    }).then(res=>{
      // this.tableLoading = false
      this.ZZWY_YDZKJCZJ_L1_001.tableList = this.flattenArray(res.data);
      // console.log(this.ZZWY_YDZKJCZJ_L1_001.tableList)
    }).catch(err=>{
      // this.tableLoading = false
  
    })
  }

  getRatioByItemCode(){
    qcZzwyApi.getRatioByItemCode({
      wardCode:this.reportMasterData.wardCode,
      qcItemCodeList:this.templateData.itemCodeList,
      startDate:this.reportMasterData.startDate,
      endDate:this.reportMasterData.endDate,
      reportLevel:appStore.queryObj.qcLevel,
    }).then(res=>{
      let data = res.data|| []
      let newData:any = []
      let itemArry:any = []
      let smallObj:any = {}
      let fields:any = []//key值
      data.map((it:any)=>{
        itemArry = []
        smallObj = {}
        fields = it.reportRatioDto.months
        it.reportRatioDto.months.map((ii:any,index:number)=>{
          smallObj.name = it.qcItemName
            smallObj[ii] = Number(it.reportRatioDto.ratios[index])
            // 
        })
        itemArry.push(smallObj)
        newData.push(itemArry)
        
      })
      this.ZZWY_YDZKJCZJ_L1_004.fields = fields
      this.ZZWY_YDZKJCZJ_L1_004.devData = newData

    }).catch(err=>{
      
    })
  }

  
}
export const qcMonthCheckData = new QcMonthCheckData()