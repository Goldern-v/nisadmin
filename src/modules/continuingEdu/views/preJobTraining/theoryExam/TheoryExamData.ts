

import { observable, computed } from "mobx";
import moment from "moment";
import { preJobApi } from "../PreJobApi";

class TheoryExamData {
	@observable public tableLoading = false; //表格loading
    @observable public tableList:any = []; //表格内容
    @observable public pageIndex: any = 1; //页码
    @observable public pageSize: any = 20; //每页大小
    @observable public total: any = 0; //总条数



	
	@observable public pageBatch:string = '';//批次
	@observable public year=moment() as undefined | moment.Moment;//年份

	// AddBatchExamModal start
	@observable public batchList:any = [];//批次
	// 科室列表
	@observable public deptList:any = []
	@observable public defaultDept:string = '';

	@observable public batchExamModal:boolean = false
	@observable public modalTitle:string = '新增';
	@observable public remarkList=['上半年','下半年','第1个月','第2个月','第3个月','第4个月','第5个月','第6个月','第7个月','第8个月','第9个月','第10个月','第11个月','第12个月'];
	
	// 切换组件  类型 1：理论-trainingExamManage；2：实操-practiceExamManage
	@observable public module:string = 'trainingExamManage';
	@observable public componentTitle:string = '';
	@observable public preType:string='1';
	
	@observable public addExam = {} as any;
	@computed get addItem(){
		return {
			year:moment() as undefined | moment.Moment,
			batch:null,
			examDate:moment() as undefined | moment.Moment,
			examContent:'',
			examDept:'',
			examDeptCode:'',
			passScore:null,
			batchRemark:'',
			deptItem:{}
		}
	}

	@computed get tableItem() {
    return {
		batch:'3',
		date:moment(),
		time:'',
		content:'',
		trainTeacher:'',
		trainType:'',
		remark:'',
    };
  }

	// detail start
	@observable public tableDetailLoading = false; //表格loading
	@observable public tableDetailList:any = []; //表格内容
	@observable public pageDetailIndex: any = 1; //页码
	@observable public pageDetailSize: any = 20; //每页大小
	@observable public totalDetail: any = 0; //总条数
	@observable public passScore:any = 70;//及格成绩
	@observable public currerntDetail: any = {}; //哪条消息的详情
	// detail end

	// detail start
	@observable public tableScoreLoading = false; //表格loading
	@observable public tableScoreList:any = []; //表格内容
	@observable public tableTitleList:any = [];//表头
	@observable public pageScoreIndex: any = 1; //页码
	@observable public pageScoreSize: any = 20; //每页大小
	@observable public totalScore: any = 0; //总条数
	// detail end


/**查看查询列表 */
	getTableListAll(id:any){
		this.tableDetailLoading = true
		preJobApi.getTheoryExamListAll({
			id:id
		}).then(res=>{
		this.tableDetailLoading = false
			this.tableDetailList = res.data || []
		}).catch(err=>{
			this.tableDetailLoading = false

		})
	}
	/**查看全部成绩查询列表 */
	getTableListAllScore(){
		this.tableScoreLoading = true
		preJobApi.getTheoryExamListAllScore({
			year:this.year?.format('YYYY'),
			batch:this.pageBatch,
			type:this.preType,
		}).then(res=>{
			this.tableScoreLoading = false
			this.tableScoreList = res.data.dataList || []
			this.tableTitleList = res.data.titleList || []

		}).catch(err=>{
			this.tableScoreLoading = false
		})
	}
	/**列表 */
	getTableList(){
		this.tableLoading = true
		preJobApi.getTheoryExamList({
			year:this.year?.format('YYYY'),
			batch:this.pageBatch,
			type:this.preType,
		}).then(res=>{
		this.tableLoading = false
			this.tableList = res.data || []
		}).catch(err=>{
			this.tableLoading = false
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
		preJobApi.getnursingAll().then(res=>{
			this.deptList = res.data.deptList || []
			this.defaultDept = res.data.defaultDept || ''
		}).catch(err=>{

		})
	}

}
export const theoryExamData = new TheoryExamData()