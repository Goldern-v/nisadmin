import BaseApiService from "src/services/api/BaseApiService";
// import { formApplyModal } from "../formApply/FormApplyModal";
import qs from "qs";


export default class ClinicalApi extends BaseApiService {

	// 搬运
	/** 保存 block 数据 */
	public saveAndSignAll(
		registerCode: string,
		blockId: any,
		itemDataList: any[],
		sign: boolean = false,
		dataMap?: any
	) {
		return this.post(`/qcRegisterData/${registerCode}/saveAndSignAll`, {
			blockId,
			itemDataList,
			sign,
			dataMap
		});
	}
	/** 审核签名 */
	public auditAll(registerCode: string, list: { id: any }[]) {
		return this.post(`/qcRegisterData/${registerCode}/auditAll`, {
			list
		});
	}
	/** 取消审核签名 */
	public cancelAudit(registerCode: string, list: { id: any }[]) {
		return this.post(`/qcRegisterData/${registerCode}/cancelAudit`, {
			list
		});
	}
	/** 核对者签名 */
	public checkAll(registerCode: string, list: { id: any }[]) {
		return this.post(`/qcRegisterData/${registerCode}/checkAll`, {
			list
		});
	}
	/** 取消交班 */
	public cancelSign(registerCode: string, list: { id: any }[]) {
		return this.post(`/qcRegisterData/${registerCode}/cancelSign`, {
			list
		});
	}
	/** 取消核对签名 */
	public cancelCheck(registerCode: string, list: { id: any }[]) {
		return this.post(`/qcRegisterData/${registerCode}/cancelCheck`, {
			list
		});
	}
	// 搬运 end

	// 检查用户名和密码
	public async checkUser(query: any) {
		return this.post(`/form/checkUser`, query);
	}

	//获取医院科室信息
	public async getnursingAll() {
		return this.get(`/user/nursingUnit`);
	}
	// 获取月度汇总表
	public async getMonthTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/getMonthlyForDeptCode?${qs.stringify(obj)}`);
	}
	// 保存月度汇总表
	public async saveMonthTable(obj: any) {
		return this.post(`/goodEvent/clinicalIndicators/saveMonthlyDto`,obj);
	}

	// 月度汇总表导出
	public async exportMonthTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/exportMonthlyForDeptCode?${qs.stringify(obj)}`, {
			responseType: "blob"
		});
	}

	// 获取年度汇总表
	public async getYearTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/getYearlyForDeptCode?${qs.stringify(obj)}`);
	}
	// 导出年度汇总表
	public async exportYearTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/exportYearlyForDeptCode?${qs.stringify(obj)}`, {
			responseType: "blob"
		});
	}

	// 全院季度
	// 获取全院季度汇总表
	public async getQuarterTable(obj: any) {
		return this.post(`/goodEvent/clinicalIndicators/getQuarterForAll`,obj);
	}
	// 导出年度汇总表
	public async exportQuarterTable(obj: any) {
		return this.post(`/goodEvent/clinicalIndicators/exportQuarterForAll`,obj, {
			responseType: "blob"
		});
	}

	

	






	//获取进修生
	public async getFormList(obj: any) {
		return this.post(`/nursefile/otherPersonInfo/refresherStudent/queryPageListYaXin`, obj);
	}
	//添加进修生
	public async getSaveFormData(obj: any) {
		return this.post(`/nursefile/otherPersonInfo/refresherStudent/saveOrUpDateByGroupYaXin`, obj);
	}
	//删除选中进修生
	public async deleteFormData(id: any) {
		return this.post(`/nursefile/otherPersonInfo/refresherStudent/deleteInfoByIdYaXin`, { id });
	}
	//导出进修生
	public async exportMainData(obj: any) {
		return this.post(`/nursefile/otherPersonInfo/refresherStudent/exportPageYaXinList`, obj, {
			responseType: "blob"
		});

	}
	//-导入教学计划课件
	public async exportSheetTemplate(obj: any) {
		return this.post(`/studyAndTrain/teachPlanAdvancedStu/saveOrUpdateYaXin`, obj);
	}
	//晋升表单数据获取
	public async getQueryPageList(obj: any) {
		return this.post(`/nurse/promotion/listPromotion`, obj);
	}
	// 实习生教学计划-删除表单列表
	public async deleteQueryPageList(id: any) {
		return this.post(`/studyAndTrain/teachPlanAdvancedStu/delete`, { id });
	}
	// 导入教学计划课件-提交按钮
	public async saveOrUpdate(obj: any) {
		return this.post(`/studyAndTrain/teachPlanAdvancedStu/saveOrUpdateYaXin`, obj);
	}
	// 实习生教学计划-上传附件接口
	public async uploadPictures(filename: any) {
		let newFormData = new FormData()
		newFormData.set('file', filename)
		return this.post(`/studyAndTrain/teachPlanAdvancedStu//uploadPictures`, newFormData);
	}
}
export const clinicalApi = new ClinicalApi();