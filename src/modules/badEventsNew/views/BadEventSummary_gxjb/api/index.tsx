
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
	
}
export const badEventApi_gxjb = new BadEventApi_gxjb();
