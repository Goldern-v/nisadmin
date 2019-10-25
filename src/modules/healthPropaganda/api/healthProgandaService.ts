import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

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
}

export const healthProagandaService = new HealthProagandaService()