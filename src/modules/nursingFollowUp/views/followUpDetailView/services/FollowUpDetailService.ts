import BaseApiService from 'src/services/api/BaseApiService'

class FollowUpDetailService extends BaseApiService {
  /** 通过患者ID获取患者信息详细 */
  public getDetailById(patientId: string) {
    return this.post('/visit/visitPatientData/getById', { patientId })
  }

  /** 结束随访 */
  public setVisitEndStatus(patientId: string) {
    return this.post('/visit/visitMasterData/setVisitEndStatus', { patientId })
  }

  /** 随访表推送给患者 */
  public pushToPatient(masterId: string) {
    return this.post('/visit/visitMasterData/pushToPatient', { masterId })
  }

  /** 通过ID删除随访表记录 */
  public deleteFormItem(masterId: string) {
    return this.post('/visit/visitMasterData/delete', { masterId })
  }

  /** 获取患者病种和表单列表 */
  public getByDiseaseTypeListByPatientId(patientId: string) {
    return this.post('/visit/visitPatientData/getByDiseaseTypeListByPatientId', { patientId })
  }

  /** 保存或更新随访表记录 */
  public saveOrUpdateForm(payload: any) {
    return this.post('/visit/visitMasterData/saveOrUpdate', payload)
  }

  /** 通过ID获取随访表记录 */
  public getFormDetailById(masterId: string | number) {
    return this.post('/visit/visitMasterData/getById', { masterId })
  }
}

export const followUpDetailService = new FollowUpDetailService()