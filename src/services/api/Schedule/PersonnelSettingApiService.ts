import BaseApiService from '../BaseApiService'
export default class PersonnelSettingApiService extends BaseApiService {
  //1、删除分组
  public async detelePersonnelSetting (data: any) {
    const getData = {
      id: data.id, // number 
    }
    return this.get(`/schSettingNurseGroup/delete/${getData.id}`)
  }

  //2、新增人员分组
  public async upatePersonnelSetting (data: any) {
    const postData = {
      deptCode: data.deptCode,  //string
      groupName: data.groupName,  //string
      sortValue: data.sortValue  //string
    }
    return this.post(`/schSettingNurseGroup/saveSettingNurseGroup`, postData)
  }

  //3、新增或修改分组中的人员
  public async upateSavePersonnelSetting (data: any) {
    const postData = {
      schSettingNurseGroupId:data.schSettingNurseGroupId,  //number
      schSettingNurseGroupDetails:[{
        schSettingNurseGroupId:data.schSettingNurseGroupId,  //number
        empName:data.empName,  //string
        empNo:data.empNo,  //string
      }]
    }
    return this.post(`/schSettingNurseGroup/saveSettingNurseGroupDetail`, postData)
  }
  
  //4、按科室查找人员分组列表
  public async getByDeptCode (data: any) {
    const getData = {
      deptCode: data.deptCode, // number 
    }
    return this.get(`/schSettingNurseGroup/getByDeptCode/${getData.deptCode}`)
  }

  //5、根据人员分组ID获取对应的人员
  public async getById (data: any) {
    const getData = {
      Id: data.Id, // number 
    }
    return this.get(`/schSettingNurseGroup/getBySettingNurseGroupId/${getData.Id}`)
  }
}