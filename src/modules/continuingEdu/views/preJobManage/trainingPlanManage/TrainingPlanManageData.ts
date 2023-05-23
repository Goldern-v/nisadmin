import { observable, computed } from "mobx";
import moment from "moment";
import {preJobManageApi} from "../PreJobManageApi";
class TrainingPlanManageData {
	@observable public tableLoading = false; //表格loading
	@observable public tableList: any = [{},{},{}]; //表格内容
	@observable public pageIndex: any = 1; //页码
	@observable public pageSize: any = 20; //每页大小
	@observable public total: any = 0; //总条数

	// 导入
	@observable public importModal: boolean = false
	@observable public currentItem={
		year:moment() as undefined | moment.Moment,
	} as any;
    @observable public uploadFileItem = {} as any




	@observable public batchList:any = [];//批次
	@observable public keyWord: string = '';//请输入姓名关键字信息
	@observable public selectBatch:string = '1';//选中的批次
	@observable public year = moment() as undefined | moment.Moment;//年份

	// CopyBatch start
	@observable public copyBatchModal: boolean = false
	@observable public copyBatch = {
		year: moment() as undefined | moment.Moment,
	};
	// CopyBatch end

	S4() {
		return 'save'+(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	getTableList(){
		
		this.tableLoading = true
		preJobManageApi.getPlaningListAll({
			year:this.year?.format('YYYY'),
			pageIndex:this.pageIndex,
			pageSize:this.pageSize,
		}).then(res=>{
		this.tableLoading = false
			this.tableList = res.data.list || []
			this.total = res.data.totalCount
		}).catch(err=>{
			this.tableLoading = false

		})
	}

	// 下载
	exportExcel(record:any){
		// preJobManageApi.export({
		// 	year:this.year?.format('YYYY'),
		// 	keyWord:this.keyWord || '',
		// 	batch:this.selectBatch+''
		// }).then(res=>{
		// 	fileDownload(res);
		// }).catch(err=>{

		// })
	}

}
export const trainingPlanManageData = new TrainingPlanManageData()