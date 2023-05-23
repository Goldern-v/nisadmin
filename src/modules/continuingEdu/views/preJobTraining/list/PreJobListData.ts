import { observable, computed } from "mobx";
import moment from "moment";
import { preJobApi } from "../PreJobApi";
import { fileDownload } from "src/utils/file/file";
class PreJobListData {
    @observable public tableLoading = false; //表格loading
    @observable public tableList:any = []; //表格内容
    @observable public pageIndex: any = 1; //页码
    @observable public pageSize: any = 20; //每页大小
    @observable public total: any = 0; //总条数

		// 科室列表
		@observable public deptList:any = []
		@observable public defaultDept:string = '';

	@observable public year=moment() as undefined | moment.Moment;	
	@observable public keyWord:string = '';//请输入姓名关键字信息
	@observable public batchList:any = [];//批次
	@observable public selectBatch:string = '';//选中的批次

	// modal start
	@observable public addModal:boolean = false
	@observable public modalDept:string = '';
	@observable public startDate=moment().startOf("month") as undefined | moment.Moment;
	@observable public endDate=moment().endOf('month') as undefined | moment.Moment;
	@observable public nurseInfo:string = '';//护士信息
	@observable public workNameList=[    //职称列表
		'见习期护士','护士','护师','主管护师','副主任护师','主任护师'
	];
	@observable public workName:string = '';//职称
	@observable public tableModalLoading = false; //表格loading
    @observable public tableModalList:any = []; //表格内容
	@observable public selectedKey:string[]=[];//选中的员工工号
	
	// modal end

	// 录入批次确认 start
	@observable public batchModal:boolean = false;
	@observable public confirmBatch = {
		year:moment() as undefined | moment.Moment,
		batch:null
	};
	// 录入批次确认 end

	// 分配科室 start
	@observable public deptModal:boolean = false
	@observable public deptCurrentObj:any = {}
	@observable public deptCurrentIndex:number = 0
	@observable public selectDeptObj:any = {key:'',label:''}
	// 分配科室end

	/**table列表 */
	getTableList(){
		this.tableLoading = true
		preJobApi.employeeList({
			year:this.year?.format('YYYY'),
			keyWord:this.keyWord || '',
			batch:this.selectBatch
		}).then(res=>{
			this.tableList = res.data.list || []
			this.total = res.data.totalCount
			this.tableLoading = false

		}).catch(err=>{
			this.tableLoading = false
		})
	}

	initParamter(){
		this.selectedKey = []
	}


	/**获取护士 */
	getNurseList(){
		this.tableModalLoading = true
		let paramter = {
			deptCode:this.modalDept || '',
			name:this.nurseInfo || '',
			title:this.workName || '',
			entryDateBegin:this.startDate?.format('YYYY-MM-DD'),
			entryDateEnd:this.endDate?.format('YYYY-MM-DD')
		}
		preJobApi.getNurses(paramter).then(res=>{
			// console.log()
			this.tableModalList = res.data || []
			this.tableModalLoading = false
		}).catch(err=>{
			this.tableModalLoading = false

		})
	}
	// 导出
	exportExcel(){
		preJobApi.export({
			year:this.year?.format('YYYY'),
			keyWord:this.keyWord || '',
			batch:this.selectBatch+''
		}).then(res=>{
			fileDownload(res);
		}).catch(err=>{

		})
	}
	/**查询批次 */
	getBatchList(){
		preJobApi.getBatches({
			year:this.year?.format('YYYY')
		}).then(res=>{
			this.batchList = res.data || []
		}).catch(err=>{

		})
	}
	/**科室列表 */
	getNursingAll(){
		if(this.deptList.length>0){
			return false
		}
		// return 
		preJobApi.getnursingAll().then(res=>{
			this.deptList = res.data.deptList || []
			this.defaultDept = res.data.defaultDept || ''
		}).catch(err=>{

		})
	}

}
export const preJobListData = new PreJobListData();