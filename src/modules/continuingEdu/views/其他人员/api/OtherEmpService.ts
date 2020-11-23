import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import { fileDownload } from 'src/utils/file/file'

export default class OtherEmpService extends BaseApiService {
  /** 继续教育人员列表 */
  public async getEmpList(query: any) {
    return this.post('/studyAndTrain/personelManage/otherperson/queryPersonMainListByPage', query)
  }

  /**获取其他人员分组列表 */
  public async queryOtherPersonGroupList() {
    return this.get('/studyAndTrain/personelManage/otherperson/queryPersonGroupList')
  }

  /**其它人员-新增或修改人员 */
  public addOrUpdatePerson(params: any) {
    return this.post('/studyAndTrain/personelManage/otherperson/addOrUpdatePerson', params)
  }

  /**其它人员- 根据人员编号获取人员信息 */
  public async getPersonInfoByIdentifier(identifier: string) {
    return this.post('/studyAndTrain/personelManage/otherperson/getPersonInfoByIdentifier', { identifier })
  }

  /**人员基本信息 */
  public async getEmpDetail(query: any) {
    return this.post('/studyAndTrain/personelManage/getBasicInfo', qs.stringify(query))
  }

  /**公共接口-免登陆获取所有的护理单元信息 */
  public nursingUnitWithOutLogin() {
    return this.get('/dept/nursingUnitWithOutLogin')
  }

  /**职务列表 */
  public async getJob() {
    return this.post('/dept/dictInfo', qs.stringify({ code: 'user_new_job' }))
  }

  /**人员管理-其它人员-删除人员 */
  public async deleteInfoByIdentifier(identifier: any) {
    return this.post('/studyAndTrain/personelManage/otherperson/deleteInfoByIdentifier', {
      identifier
    })
  }

  /**其它人员-下载人员上传模板-实习生 */
  public getTemplate = (type: string) => {
    let url = '/studyAndTrain/personelManage/otherperson/downLoadPersonsUploadTemplate/graduateIntern'
    switch (type) {
      case '2':
        url = '/studyAndTrain/personelManage/otherperson/downLoadPersonsUploadTemplate/refresherStudent'
      case '3': '/studyAndTrain/personelManage/otherperson/downLoadPersonsUploadTemplate/other'
    }

    return this.get(url, { responseType: 'blob' })
      .then(res => fileDownload(res))
  }

  /**其它人员-导入人员（未真正导入，数据需要复核） */
  public async importPersonsTemporarily(formData: any) {
    return this.post('/studyAndTrain/personelManage/otherperson/importPersonsTemporarily', formData)
  }

  /**其它人员-导入人员到正式表 */
  public async importPersonsReally(params: any) {
    return this.post('/studyAndTrain/personelManage/otherperson/importPersonsReally', params)
  }
}

export const otherEmpService = new OtherEmpService()