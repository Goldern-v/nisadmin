import { observable, computed } from "mobx";
import moment from "moment";
import { preJobApi } from "../PreJobApi";
import { authStore } from 'src/stores'
import { message } from "antd";
import { numToChinese } from 'src/utils/number/numToChinese';
class ImplementRecordData {
	@observable public batchList:any = [];//批次
	@observable public selectBatch:string = '';//选中的批次
	@observable public year = moment() as undefined | moment.Moment;//年份

	@observable public isEdit: boolean = false;//是编辑状态吗？true=是，默认否

	@observable public master={} as any

	@observable public loading:boolean=false;

	
	@computed get masterItem() {
		return {
			id:this.S4(),
			title:this.year?.format('YYYY')+'年亚心第'+numToChinese(this.selectBatch)+'批新上岗护士培训实施小结',
			batch: this.selectBatch,
			year:this.year?.format('YYYY'),
			createName:authStore.user ? authStore.user.empName : '',
			implementStatus:'',//培训计划落实情况
			evaluation:'',//效果评估
			unqualOpinion:'',//不合格处理意见
		};
	}

	S4() {
		return 'save'+(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	/**创建实施小结 */
	createTips(){
		if(this.batchList.length<1){
			message.warning('暂无批次')
			return false
		}
		this.master=this.masterItem;
		this.isEdit=true;
	}

	/**保存 */
	saveImplement(){
		if((this.master.id+'').indexOf('save')>-1){
			delete this.master.id
		}
		if(this.master.id){
			// 修改
			preJobApi.implementUpdate(this.master).then(res=>{
				message.success('保存成功')
				this.isEdit = false
			}).catch(err=>{
	
			})
		}else{
			preJobApi.implementSave(this.master).then(res=>{
				message.success('保存成功')
				this.isEdit = false
			}).catch(err=>{
	
			})
		}

		
	}

	getImplement() {
		this.loading = true
		preJobApi.implementSelect({
			year: this.year?.format('YYYY'),
			batch: this.selectBatch
		}).then(res => {
			this.loading = false
			this.master = res.data || {}
		}).catch(err => {
			this.loading = false

		})
	}


	/**查询批次 */
	getBatchList() {
		this.loading = true
		this.selectBatch = ''
		preJobApi.getBatches({
			year: this.year?.format('YYYY')
		}).then(res => {
		this.loading = false

			this.batchList = res.data || []
			if(this.batchList.length>0){
				this.selectBatch = this.batchList[0].batch
				this.getImplement()
			}else{
				this.master.batch = ''
			}
			
		}).catch(err => {
			this.loading = false
		})
	}



}
export const implementRecordData = new ImplementRecordData();