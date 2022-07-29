
import BaseApiService from "src/services/api/BaseApiService";

export default class BadEventApi_gxjb extends BaseApiService {
	public async getTableList(obj: object) {
		return this.post(`#`, obj);
	}
	// 根据用户权限获取医院科室信息
	public async getnursingDeptRole() {
		return this.get(`/user/nursingUnit`);
	}
}
export const badEventApi_gxjb = new BadEventApi_gxjb();
