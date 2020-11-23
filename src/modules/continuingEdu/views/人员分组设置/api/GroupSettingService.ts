import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export default class GroupSettingService extends BaseApiService {
  /**其它人员-获取人员分组列表 */
  public otherEmpGroupList = () => {
    return this.get('/studyAndTrain/personelManage/otherperson/queryPersonGroupList')
  }

  /**其它人员-添加或修改人员分组 */
  public addOrUpdateOtherPersonGroup = (query: any) => {
    return this.post('/studyAndTrain/personelManage/otherperson/addOrUpdatePersonGroup', query)
  }

  /**其它人员-删除分组 */
  public deleteOhterPersonGroup = (id: string) => {
    return this.post('/studyAndTrain/personelManage/otherperson/deletePersonGroup', qs.stringify({ id }))
  }

  /**其它人员-获取小组成员列表-分页 */
  public otherEmpGroupUserList = (query: any) => {
    return this.post('/studyAndTrain/personelManage/otherperson/queryPersonPageListOfGroup', query)
  }

  /**其它人员-获取小组成员列表-全部 */
  public otherEmpGroupUserListAll = (query: any) => {
    return this.post('/studyAndTrain/personelManage/otherperson/queryPersonListOfGroup', query)
  }

  /**其它人员-添加小组成员 */
  public addOtherPersonsForGroup = (query: any) => {
    return this.post('/studyAndTrain/personelManage/otherperson/addPersonsForGroup', query)
  }

  /**其它人员-删除小组成员*/
  public deleteOtherPersonsfromGroup = (groupId: any, query: any) => {
    return this.post(`/studyAndTrain/personelManage/otherperson/deletePersonsfromGroup/${groupId}`, query)
  }

  /**其它人员-查询类型为实习生的人员信息-按年份分组 */
  public graduateInternGroupByYear = () => {
    return this.post('/studyAndTrain/personelManage/otherperson/queryGraduateInternInfoListGroupByYear')
  }

  /**其它人员-查询类型为进修生的人员信息-按年份分组 */
  public fresherStudentGroupByYear = () => {
    return this.post('/studyAndTrain/personelManage/otherperson/queryefresherStudentInfoListGroupByYear')
  }

  /**其它人员-查询类型为试用人员的人员信息-按年份分组 */
  public probationaryPersonGroupByYear = () => {
    return this.post('/studyAndTrain/personelManage/otherperson/queryProbationaryPersonInfoListGroupByYear')
  }

  /**其它人员-查询类型为文员的人员信息-按年份分组 */
  public officeClerkGroupByYear = () => {
    return this.post('/studyAndTrain/personelManage/otherperson/queryOfficeClerkInfoListGroupByYear')
  }

  /**其它人员-其它人员的人员信息-按年份分组*/
  public otherPersonGroupByYear = () => {
    return this.post('/studyAndTrain/personelManage/otherperson/queryOtherPersonInfoListGroupByYear')
  }

  /**正式人员-获取人员分组列表(附带小组人员信息 */
  public async queryPersonGroupList() {
    return this.get('/studyAndTrain/personelManage/onPayRollPerson/queryPersonGroupList')
  }

  /**正式人员-添加或修改人员分组 */
  public async addOrUpdatePersonGroup(query: any) {
    return this.post('/studyAndTrain/personelManage/onPayRollPerson/addOrUpdatePersonGroup', query)
  }

  /**正式人员-删除分组 */
  public async deletePersonGroup(query: any) {
    return this.post('/studyAndTrain/personelManage/onPayRollPerson/deletePersonGroup', query)
  }

  /**正式人员-获取小组成员列表-分页 */
  public personPageListOfGroup = (query: any) => {
    return this.post('/studyAndTrain/personelManage/onPayRollPerson/queryPersonPageListOfGroup', query)
  }

  /**正式人员-获取小组成员列表-全部 */
  public empGroupUserListAll = (query: any) => {
    return this.post('/studyAndTrain/personelManage/onPayRollPerson/queryPersonListOfGroup', query)
  }

  /**正式人员-添加小组成员 */
  public addPersonsForGroup = (query: any) => {
    return this.post('/studyAndTrain/personelManage/onPayRollPerson/addPersonsForGroup', query)
  }

  /**正式人员-删除小组成员 */
  public deletePersonsfromGroup = (groupId: any, query: any) => {
    return this.post(`/studyAndTrain/personelManage/onPayRollPerson/deletePersonsfromGroup/${groupId}`, query)
  }
}

export const groupSettingService = new GroupSettingService()