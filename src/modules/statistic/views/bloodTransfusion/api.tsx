import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";
export default class BloodTransfusionApi extends BaseApiService {
  public async getCountSummary(obj: any) {
		return this.post(`/transfuseEvalFormGsy/countSummary`,obj);
	}
  public async exportData(obj: any) {
	  // let formData =new FormData()
	  // formData.append('startTime',obj.startTime)
	  // formData.append('startTime',obj.startTime)
		return this.post(`/transfuseEvalFormGsy/exportExcel`,obj,{
			responseType: "blob"
		});
	}
}
export const BloodApi = new BloodTransfusionApi();
