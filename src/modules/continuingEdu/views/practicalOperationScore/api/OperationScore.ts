import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class OperationScoreApi extends BaseApiService {
  // 获取所有的已选科室
  public async praticalGradeManage(pamars:any) {
    return this.post(
      `/studyAndTrain/praticalGradeManage/getPage`,
        pamars
    );
  }

  // 下载摸板
  public async downloadTemplate() {
    return this.get(
      `/studyAndTrain/praticalGradeManage/downloadTemplate`,
      {
        responseType: "blob"
      }
    )
  }
  // 导入模板
  public async importPraticalGrade(filename:any,) {
    let newFormData = new FormData()
    newFormData.set('filename', filename)
    return this.post(
      `/studyAndTrain/praticalGradeManage/importPraticalGrade`
      ,newFormData
    );
  }
  // 下载当前模板
  public async severalDownloadTemplate(filename:any,) {
    return this.get(
      `/studyAndTrain/praticalGradeManage/downloadTemplate`,
      {
        responseType: "blob"
      }
    )
  }
  // 编辑接口
  public async getDetailByPaperId(paperId:any,) {
    return this.post(
      `/studyAndTrain/praticalGradeManage/getDetailByPaperId`,qs.stringify({ paperId })
    )
  }
  // 删除
  public async getDeleteByPaperId(paperId:any) {
    return this.post(
      `/studyAndTrain/praticalGradeManage/deleteByPaperId`,
      qs.stringify({ paperId })
    )
  }

  /* 保存修改接口 */
  public async getsaveOrUpdate(data:any){
    return this.post(
      `/studyAndTrain/praticalGradeManage/saveOrUpdate`,
      data
    )
  }
}

export const operationScoreApi = new OperationScoreApi();