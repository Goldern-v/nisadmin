import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
export default class PreJobApi extends BaseApiService {

	//获取医院科室信息
	public async getnursingAll() {
		return this.get(`/user/nursingUnit`);
	}
	/**查询员工 */
	public async getNurses(obj?:any){
		return this.post('/newNurseMange/employee/selectForUser',obj)
	}
	/**保存员工，批次 */
	public async saveEmployee(obj?:any){
		return this.post('/newNurseMange/employee/add',obj)
	}
	/**岗前培训人员名单 */
	public async employeeList(obj?:any){
		return this.post('/newNurseMange/employee/select',obj)
	}
	/**修改（保存、分配科室） */
	public async employeeModify(obj?:any){
		return this.post('/newNurseMange/employee/update',obj)
	}
	/**移除 */
	public async employeeDel(obj?:any){
		return this.post('/newNurseMange/employee/delete',obj)
	}
	/**查询批次 */
	public async getBatches(obj?:any){
		return this.post('/newNurseMange/employee/selectBatch',obj)
	}
	/**添新员工-导出 */
	public async export(obj?:any){
		return this.post('/newNurseMange/employee/export',obj,
		{
			responseType: "blob"
		})
	}

	// ----------培训计划 start-----
	/**新增保存 */
	public async addPlan(obj?:any){
		return this.post('/newNurseMange/trainPlan/Add',obj)
	}
	/**查询 */
	public async getPlanList(obj?:any){
		return this.post('/newNurseMange/trainPlan/select',obj)
	}
	/**培训计划-删除 */
	public async delPlan(obj?:any){
		return this.post('/newNurseMange/trainPlan/delete',obj)
	}
	/**培训计划-复制计划 */
	public async copyPlan(obj?:any){
		return this.post('/newNurseMange/trainPlan/copy',obj)
	}

// --------培训计划 end----------

// ----------------岗前理论考核 start--------------
/**岗前理论考核查看——查询 */
public async getTheoryExamList(obj?:any){
	return this.post('/newNurseMange/theoryExam/select',obj)
}
/**岗前理论考核新增 */
public async theorySave(obj?:any){
	return this.post('/newNurseMange/theoryExam/save',obj)
}
/**岗前理论考核新增 */
public async theoryUpdate(obj?:any){
	return this.post('/newNurseMange/theoryExam/update',obj)
}

/**保存成绩 */
public async updateExamDetail(obj?:any){
	return this.post('/newNurseMange/theoryExamDetail/update',obj)
}
/**查看列表 */
public async getTheoryExamListAll(obj?:any){
	return this.post('/newNurseMange/theoryExamDetail/select',obj)
}
/**删除 */
public async delTheoryExam(obj?:any){
	return this.post('/newNurseMange/theoryExam/delete',obj)
}
/**查看全部成绩列表 */
public async getTheoryExamListAllScore(obj?:any){
	return this.post('/newNurseMange/theoryExamDetail/selectAll',obj)
}
// ----------------岗前理论考核 end----------------


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

/**培训计划-保存或提交接口 */
public async saveOrUpdate(obj?:any){
	return this.post('/newNurseMange/trainExamPlan/saveOrUpdate',obj)
}
/**查看列表 */
public async getPlaningListAll(obj?:any){
	return this.post('/newNurseMange/trainExamPlan/queryPage',obj)
}
// ---------------培训计划 end----------------



// ----------------临床培训考核 start--------------
/**临床培训考核查看 */
public async getTrainExamList(obj?:any){
	return this.post('/newNurseMange/trainExam/select',obj)
}
/**岗前理论考核新增、修改 */
public async trainSaveOrUpdate(obj?:any){
	return this.post('/newNurseMange/trainExam/saveOrUpdate',obj)
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




	
	/** 获取晋升申请表数据 */
	public getDetailList(obj?: any) {
		let newFormData = new FormData()
		newFormData.set('id', obj.id)
		return this.post(`/nurse/promotion/getById`, newFormData)
	}
}

export const preJobApi = new PreJobApi()