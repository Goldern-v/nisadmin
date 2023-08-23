import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";
export default class QcZzwyApi extends BaseApiService{

  // 护理部质量检查汇总表
	public async getInspectionSummary(obj: any) {
		return this.post(`/qcItem/getInspectionSummary`,obj);
	}
	// 质控表项目问题分析汇总-获取模板列表
	public async getTemplateList(qcLevel: any) {
		return this.get(`/qcTemplateManage/templateList/${qcLevel}`);
	}
	// 质控表项目问题分析汇总
	public async getRectificationdeptSummary(obj: any) {
		return this.get(`/qcItem/getRectificationdeptSummary?${qs.stringify(obj)}`);
	}

}
export const qcZzwyApi = new QcZzwyApi();