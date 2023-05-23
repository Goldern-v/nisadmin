import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
export default class PreJobManageApi extends BaseApiService {

	//获取医院科室信息
	public async getnursingAll() {
		return this.get(`/user/nursingUnit`);
	}
	/**查询员工 */
	public async getNurses(obj?:any){
		return this.post('/newNurseMange/employee/selectForUser',obj)
	}
	/**查询批次 */
	public async getBatches(obj?:any){
		return this.post('/newNurseMange/employee/selectBatch',obj)
	}




// --------------------实施记录  strart--------------------
/**实施记录查询 */
public async implementSelect(obj?:any){
	return this.post('/newNurseMange/implementRecord/implementSelect',obj)
}
/**实施记录保存 */
public async implementSave(obj?:any){
	return this.post('/newNurseMange/implementRecord/implementSave',obj)
}
/**实施记录编辑更新 */
public async implementUpdate(obj?:any){
	return this.post('/newNurseMange/implementRecord/implementUpdate',obj)
}
// --------------------实施记录  end----------------------

// ---------------培训计划 start--------------
// 附件上传
public async trainingPlanUploadFile(obj: any) {
	const trancePostData = new FormData();
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			trancePostData.append(key, obj[key]);
		}
	}
	return this.post(`/newNurseMange/trainExamPlan/upload`, trancePostData);
}

/**培训计划-导入保存接口 */
public async fileSave(obj?:any){
	return this.post('/newNurseMange/trainExamPlan/save',obj)
}
/**培训计划-重新导入保存接口 */
public async fileUpdate(obj?:any){
	return this.post('/newNurseMange/trainExamPlan/update',obj)
}
/**查看列表 */
public async getPlaningListAll(obj?:any){
	return this.post('/newNurseMange/trainExamPlan/queryPage',obj)
}
/**查看列表 */
public async delPlaning(obj?:any){
	return this.post('/newNurseMange/trainExamPlan/delete',obj)
}
// ---------------培训计划 end----------------



// ----------------临床培训考核 start--------------
/**临床培训考核查看 */
public async getTrainExamList(obj?:any){
	return this.post('/newNurseMange/trainExam/select',obj)
}
/**岗前理论考核新增 */
public async trainSave(obj?:any){
	return this.post('/newNurseMange/trainExam/save',obj)
}
/**岗前理论考核修改 */
public async trainUpdate(obj?:any){
	return this.post('/newNurseMange/trainExam/update',obj)
}
/**保存成绩 */
public async updateTrainDetail(obj?:any){
	return this.post('/newNurseMange/trainExamDetail/update',obj)
}
/**查看列表 */
public async getTrainExamListAll(obj?:any){
	return this.post('/newNurseMange/trainExamDetail/select',obj)
}
/**删除 */
public async delTrainExam(obj?:any){
	return this.post('/newNurseMange/trainExam/delete',obj)
}
/**查看全部成绩列表 */
public async getTrainExamListAllScore(obj?:any){
	return this.post('/newNurseMange/trainExamDetail/selectAll',obj)
}
// ----------------临床培训考核 end----------------

}

export const preJobManageApi = new PreJobManageApi()