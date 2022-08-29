
import BaseApiService from "src/services/api/BaseApiService";

export default class BadEventApi_gxjb extends BaseApiService {
	/**不良事件分类汇总表 分页查询 */
	public async getTableList(obj: object) {
		return this.post(`/badEvent/summary/pageClassificationSummary`, obj);
	}
	// 根据用户权限获取医院科室信息
	public async getnursingDeptRole() {
		return this.get(`/user/nursingUnit`);
	}
	/**类型字典 */
	public async getDictItemList() {
		return this.get(`/dict/common/getDictItemList?dictCode=badEvent_formCode`);
	}
	/**导出不良事件分类上报汇总 */
	public async exportClassificationSummary(params:any) {
		return this.post(`/badEvent/summary/exportClassificationSummary`,params, { responseType: 'blob' });
	}

	/**不良事件例数统计 */
	public async pageCountSummary(params:any) {
		return this.post(`/badEvent/summary/pageCountSummary`,params);
	}
	/**导出不良事件例数汇总 */
	public async exportCountSummary(params:any) {
		return this.post(`/badEvent/summary/exportCountSummary`,params, { responseType: 'blob' });
	}

	/**不良事件季度上报汇总表 */
	public async listReportSummary(params:any) {
		return this.post(`/badEvent/summary/listReportSummary`,params);
	}
	/**导出不良事件季度上报汇总表 */
	public async exportReportSummary(params:any) {
		return this.post(`/badEvent/summary/exportReportSummary`,params, { responseType: 'blob' });
	}
	
	
}
export const badEventApi_gxjb = new BadEventApi_gxjb();
