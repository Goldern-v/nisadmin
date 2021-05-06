import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import { appStore, authStore } from 'src/stores'

export default class HealthProagandaService extends BaseApiService {
  //字典类型列表
  public async getTypeList() {
    return this.get('/briefMissionType/getBriefMissionType')
  }
  //字典列表
  public async getTableList(query: any) {
    return this.post('/briefMission/getBriefMissionForDict', query)
  }
  //将word文件转化为字符串
  public async uploadWord(data: any) {
    return this.post('/briefMission/loadWord', data)
  }

  //获取科室单元
  public async getDeptList() {
    return this.post(`/briefMission/getBriefMissionDept`);
  }
  //新建和保存
  public async save(data: any) {
    return this.post(`/briefMission/saveOrUpdateBriefMission`, data)
  }

  //删除字典
  public async delete(missionId: string) {
    return this.get(`/briefMission/delete/${missionId}`)
  }
  //获取字典content
  public async getContent(id: string) {
    return this.post(`/briefMission/getContentByMissionIds`, qs.stringify({ ids: id }))
  }
  /**
   * 编辑器上传文件
   * @param file 文件
   * @param onUploadProgress 上传进度回调
   */
  public async editorUploadFile(file: any, onUploadProgress?: Function) {
    const newFormData = new FormData()
    newFormData.set('upload', file)
    return this.post(`/briefMission/uploadPicture?App-Token-Nursing=${appStore.getAppToken()}&Auth-Token-Nursing=${authStore.authToken}`, newFormData, {
      onUploadProgress: (payload: any) => onUploadProgress && onUploadProgress(payload)
    })
  }
}

export const healthProagandaService = new HealthProagandaService()