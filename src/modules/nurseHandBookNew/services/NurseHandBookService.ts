import BaseApiService from 'src/services/api/BaseApiService'
import {PageOptions} from 'src/components/BaseTable'
import {appStore} from 'src/stores'
import {Obj} from 'src/libs/types'
import qs from 'qs'

const hospital: string =
    appStore.hisMatch({
        map: {
            jmfy: 'nurseManualJM',
            'lcey,lyrm,stmz': 'nurseManualLC',
            default: 'nurseManualJM',
        },
        vague: true,
    })
export default class NurseHandBookService extends BaseApiService {
    /*查询分页(通用)*/
    public getPage(type: string, obj: PageOptions | any) {
        return this.post(`/${hospital}/getPage/${type}`, obj)
    }

    /*删除(通用)*/
    public delete(id: string, obj: PageOptions | any) {
        return this.post(`/nurseManualJM/delete/${id}`, obj)
    }

    /*导出文件(通用)*/
    public export(type: string, obj: PageOptions | any) {
        return this.post(`/${hospital}/export/${type}`, obj, {responseType: 'blob'})
    }

    /*附件下载(通用)*/
    public download(id: string) {
        return this.get(`/nurseManualJM/download?id=${id}`, {responseType: 'blob'})
    }

    /*删除附件(通用)*/
    public deleteAttachmentJM(id: string) {
        return this.post(`/nurseManualJM/deleteAttachment/${id}`)
    }

    /*通过id获取pdfPath(通用)*/
    public getPdfPath(id: string) {
        return this.get(`nurseManualJM/getFile?id=${id}`)
    }

    /*获取手册类型(通用)*/
    public getChildCodeList(itemCode: string) {
        return this.get(`/${hospital}/getChildCodeList?itemCode=${itemCode}`)
    }

    //存在审核流程------------------------------------------------------------------------------------------
    /*保存草稿（审核流程）*/
    public saveDraft(type: string, obj: PageOptions | any) {
        return this.post(`/nurseManualJM/saveDraft/${type}`, obj)
    }

    /*江门提交审核（审核流程）*/
    public auditJM(type: string, obj: PageOptions | any) {
        return this.post(`/nurseManualJM/audit/${type}`, obj)
    }

    /*江门撤销（审核流程）*/
    public undo(obj: PageOptions | any) {
        return this.post(`/nurseManualJM/undo`, obj)
    }

    /*江门查看（审核流程）*/
    public getByIdAudited(id: string) {
        return this.get(`/nurseManualJM/getByIdAudited?id=${id}`)
    }

    //不存在审核流程------------------------------------------------------------------------------------------
    /*保存（无审核流程）*/
    public saveOrUpdate(type: string, obj: PageOptions | any) {
        return this.post(`/nurseManualLC/saveOrUpdate/${type}`, obj)
    }

    /*查看（无审核流程）*/
    public getById(id: string) {
        return this.get(`/nurseManualLC/getById?id=${id}`)
    }

    /*同步会诊的数据（护理会诊登记独有）*/
    public getListToManual(obj: PageOptions | any) {
        return this.post(`/nurseManualLC/getListToManual`, obj)
    }

    /**江门妇幼 同比环比接口 */
    public getCalculate(id: string) {
        return this.get(`/nurseManualJM/getCalculate?id=${id}`)
    }

    /**表单 by临邑 */
    /**获取两级 科室单元列表 */
    public getTreeDept() {
        return this.get(`/nurseHandbook/common/treeDept`)
    }

    /**获取菜单 */
    public getMenuList() {
        return this.get(`/nurseHandbook/common/menuList`)
    }

    /**获取table列表 */
    public getTableDataList(params: Obj) {
        return this.post(`/nurseHandbookRecord/list`, params)
    }

    /**创建/修改记录 */
    public createOrUpdate(params: Obj) {
        return this.post(`/nurseHandbookRecord/createOrUpdate`, params)
    }

    /**获取详情 */
    public getNHRById(params: Obj) {
        return this.post(`/nurseHandbookRecord/getById`, params)
    }

    /**保存提交
     * status 0暂存 1提交
     */
    public saveNHRDetail(params: Obj) {
        return this.post(`/nurseHandbookRecord/save`, params)
    }

    /**
     * 撤回
     * @param params
     * @returns
     */
    public cancelNHR(params: Obj) {
        return this.post(`/nurseHandbookRecord/cancel`, params)
    }

    /**
     * 审核
     * @param params
     * @returns
     */
    public handleNodeNHR(params: Obj) {
        return this.post(`/nurseHandbookRecord/handNode`, params)
    }

    /**
     * 批量审核
     * @param params
     * @returns
     */
    public multiHandleNodeNHR(params: Obj) {
        return this.post(`/nurseHandbookRecord/multipleHandNode`, params)
    }

    /**
     * 删除
     * @param params
     * @returns
     */
    public delNHR(params: Obj) {
        return this.post(`/nurseHandbookRecord/delete`, params)
    }

    /**
     * 获取对应表单
     * @param params
     * @returns
     */
    public getFormListNHR(params: Obj) {
        return this.post(`/nurseHandbook/common/formList?${qs.stringify(params)}`)
    }

    /**
     *
     * 护士长手册年度病人
     * "wardCode": "030602",
     *     "year": 2023,
     *     "type": 1
     *     1为住院病人，2为出院病人，3为特级病人，4为一级病人，5为二级病人，6为病危病人
     * **/
    public getYearData(params: Obj) {
        return this.post(`/nurseHandbookPatient/getData`, params)
    }

    /**获取护士长手册内容  **/
    public getNotice() {
        return this.get('/nurseHandbook/linyi/getNotice')
    }

    /**保存护士长手册  **/
    public saveNotice(params: Obj) {
        return this.post(`/nurseHandbook/linyi/saveNotice`, params)
    }

    /**
     * 护士长基本情况登记获取列表
     * **/
    public getNurseList(params: Obj) {
        return this.post('/nurseHandbook/linyi/getNurseList', params)
    }

    /**
     * 护理质量与安全监测指标(查看详情)
     * **/
    public getNurseById(params: Obj) {
        return this.post('/nurseHandbook/linyi/getById', params)
    }

    /**
     护理质量与安全监测指标(保存详情)
     *
     * **/
    public linYiSave(params: Obj) {
        return this.post('/nurseHandbook/linyi/save', params)
    }

    /**
     * 获取监测指标维护（模板数据
     * **/
    public getIndicatorsItem(params: Obj) {
        return this.post('/nurseHandbook/linyi/getIndicatorsItem', params)
    }

    /**保存或者修改检测指标**/
    public saveIndicatorsTItem(params: Obj) {
        return this.post('/nurseHandbook/linyi/saveIndicatorsTItem', params)
    }

    /**删除监测指标**/
    public deleteIndicatorsItem(params: Obj) {
        return this.post('/nurseHandbook/linyi/deleteIndicatorsItem', params)
    }
    /**
     * 获取护理人员资质备案表列表
     * **/
    public getNurseFilingForm(params: Obj) {
        return this.post('/nurseHandbook/linyi/getNurseFilingForm', params)
    }
    public nurseRecordExport(params: Obj) {
        return this.post('/nurseHandbookRecord/export', params,{ responseType: 'blob' })
    }
    /** jmfy  获取人力指标数据 **/
    public getManpowerData(params: Obj) {
        return this.post('/nurseHandbook/jmfy/getManpowerData', params)
    }
    /**护理人员一栏表：获取列表 **/
    public getStaffList(params:Obj){
        return this.post('/nurseHandbookStaff/getStaffList', params)
    }
    /**质量监测指标汇总:查询**/
    public getIndicatorsSummary(params:Obj){
        return this.post('/nurseHandbook/jmfy/getIndicatorsSummary', params)
    }
    /**获取分类**/
    public getFormList(){
        let formData =new  FormData()
        formData.append('menuCode','JMFYZLJCZBLR')
        return this.post('/nurseHandbook/common/formList', formData)
    }
    /**分类维护：新增或修改分类**/
    public saveCategoryMenu(params:Obj){
        return this.post('/nurseHandbook/jmfy/saveCategoryMenu', params)
    }
    /**删除分类**/
    public deleteCategoryMenu(params:Obj){
        return this.post('/nurseHandbook/jmfy/deleteCategoryMenu', params)
    }
    /**获取通用指标**/
    public getPublicIndicatorsItem(params:Obj){
        return this.post('/nurseHandbookItem/getIndicatorsItem', params)
    }

}

export const nurseHandBookService = new NurseHandBookService()
