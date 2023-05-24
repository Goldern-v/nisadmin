import { observable, computed } from "mobx";
import moment from "moment";
import { preJobApi } from "../PreJobApi";

class PreJobTrainingPlanData {
	@observable public tableLoading = false; //表格loading
	@observable public tableList: any = []; //表格内容
	@observable public pageIndex: any = 1; //页码
	@observable public pageSize: any = 20; //每页大小
	@observable public total: any = 0; //总条数


	@observable public batchList:any = [];//批次
	@observable public keyWord: string = '';//请输入姓名关键字信息
	@observable public selectBatch:string = '1';//选中的批次
	@observable public year = moment() as undefined | moment.Moment;//年份

	// CopyBatch start
	@observable public copyBatchModal: boolean = false
	@observable public copyBatch = {
		year: moment() as undefined | moment.Moment,
		batch: null
	};
	// CopyBatch end

// 	years	y
// quarters	Q
// months	M
// weeks	w
// days	d
// hours	h
// minutes	m
// seconds	s
// milliseconds	ms
// moment().add(1, 'h')   加一小时

	@computed get tableItem() {
		return {
			batch: this.selectBatch || '1',
			batchDate: moment().format('MM-DD'),
			time: moment().format('HH:mm')+'-'+moment().add(1, 'h').format('HH:mm'),
			content: '',
			teacher: '',
			way: '',
			remark: '',
			year:this.year?.format('YYYY')
		};
	}
	S4() {
		return 'save'+(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	getTableList(){
		
		this.tableLoading = true
		preJobApi.getPlanList({
			year:this.year?.format('YYYY'),
			batch:this.selectBatch
		}).then(res=>{
		this.tableLoading = false
			this.tableList = res.data || []
		}).catch(err=>{
			this.tableLoading = false

		})
	}

	/**查询批次 */
	getBatchList() {
		// 换了年份，就查询批次
		this.selectBatch = ''
		this.tableLoading = true
		preJobApi.getBatches({
			year: this.year?.format('YYYY')
		}).then(res => {
		this.tableLoading = false
			this.batchList = res.data || []
			if(this.batchList.length>0){
				this.selectBatch = this.batchList[0].batch
				this.getTableList()
			}else{
				this.tableList = []
			}
		}).catch(err => {
		this.tableLoading = false

		})
	}
	getBatchListCopy() {
		// 复制一份，获取最新的批次数据
		preJobApi.getBatches({
			year: this.year?.format('YYYY')
		}).then(res => {
			this.batchList = res.data || []
			
		}).catch(err => {

		})
	}

}
export const preJobTrainingPlanData = new PreJobTrainingPlanData()