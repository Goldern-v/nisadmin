import BaseApiService from "src/services/api/BaseApiService";
import { appStore } from "src/stores";

export default class QcTempApi extends BaseApiService {
/**上传，导入模板 */
  public upLoadTempt(obj: any) {
    let newParams = { ...obj } as any
    let formData = new FormData()
    for (let x in newParams) {
      formData.append(x, newParams[x])
    }
    let hospital = appStore.HOSPITAL_ID === "whyx" ? "yx" : "zzwy"
    return this.post(`/qcTemplateManage/impForm/${hospital}`,formData);
  }

  /**列表查询 */
  public getDataList(obj: any) {
    return this.post(`/qcTemplateManage/getList`, obj);
  }
  //下载模板
  public downloadTemplate() {
    return this.get(`/qcTemplateManage/downloadTemplate`, {
      responseType: "blob"
    });
  }

  
  /**修改状态（0：未开启，1：已开启） */
  public changeStatus(obj: any) {
    return this.post(`/qcTemplateManage/updateStatus`, obj);
  }

  /**删除（ */
  public deleItem(obj: any) {
    return this.post(`/qcTemplateManage/delete`, obj);
  }

  /**导出单条模板 */
  public downloadItemTemplate(qcCode:any) {
    return this.get(`/qcTemplateManage/export/${qcCode}`, {
      responseType: "blob"
    });
  }

    //导出所有表单
    public downloadAllTemplate(obj: any) {
      return this.post(`/qcTemplateManage/exportAll`, obj, {
        responseType: "blob"
      });
    }

  // /api/qcTemplateManage/export



  //获取全部科室单元
  public async getDeptList() {
    return this.get(`/user/nursingUnit/all`);
  }

  //获取质控指标字典
  public getIndicatorDict() {
    return this.get("/qc/indicators/getIndicatorDict");
  }

  //获取质控指标
  public getRate(obj: any) {
    return this.post(`/qc/indicators/getRate`, obj);
  }

  //下载模板
  public exportRate(obj: any) {
    return this.post(`/qc/indicators/exportRate`, obj, {
      responseType: "blob"
    });
  }
}
export const qcTempApi = new QcTempApi();