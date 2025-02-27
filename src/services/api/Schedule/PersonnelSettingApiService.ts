import BaseApiService from '../BaseApiService'
import { appStore } from "src/stores";

export default class PersonnelSettingApiService extends BaseApiService {
  //1、按科室查找人员分组列表
  public async getByDeptCode(deptCode: any) {
    const getData = {
      deptCode: deptCode, // number
    }
    return this.get(`/schSettingNurseGroup/getByDeptCode/${getData.deptCode}`)
  }

  //2、新增人员分组
  public async updatePersonnelSetting(data: any) {
    const postData = {
      deptCode: data.deptCode,  //string
      groupName: data.groupName,  //string
      groupColor: data.groupColor,  //string
      // sortValue: data.sortValue  //string
    }
    return this.post(`/schSettingNurseGroup/saveSettingNurseGroup`, postData)
  }

  //3、删除分组
  public async deletePersonnelSetting(data: any) {
    const getData = {
      id: data.id, // number
    }
    return this.get(`/schSettingNurseGroup/delete/${getData.id}`)
  }

  // 4.查找排班人员
  public async getScheduler(deptCode: string) {
    return this.get(`/schShiftUser/getByDeptCode/${deptCode}`)
  }

  // 4.查找排班人员 横沥
  public async getSchedulerHl(params: any) {
    return this.post(`schShiftUser/getByDeptCodeAndId`, params)
  }

  //5、根据人员分组ID获取对应的人员
  public async getById(id: any) {
    const getData = {
      id: id, // number
    }
    return this.get(`/schSettingNurseGroup/getBySettingNurseGroupId/${getData.id}`)
  }

  //6、新增或修改分组中的人员
  public async updateSavePersonnelSetting(data: any) {
    const postData = {
      schSettingNurseGroupId: data.schSettingNurseGroupId,  // 分组ID
      schSettingNurseGroupDetails: data.schSettingNurseGroupDetail // 已选数据
    }
    return this.post(`/schSettingNurseGroup/saveSettingNurseGroupDetail`, postData)
  }

  public async getGroupColorList() {
    return this.post(`/dept/multiDictInfo`, ['sch_range_color'])
  }
  public async schSettingNurseGroup(data:any) {
    return this.post(`/schSettingNurseGroup/sort`,data)
  }

}
