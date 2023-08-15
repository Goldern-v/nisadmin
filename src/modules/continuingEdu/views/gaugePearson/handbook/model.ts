import { action, observable } from "mobx";
import * as types from "src/libs/types";
import { trainingSettingApi } from "../api/TrainingSettingApi";
import { Modal, message } from "antd";
import moment from 'moment'
import { getConfig } from "./detailConfig";

export interface ICurCatalogue extends types.Obj {
  templateType: 1 | 2 | 3 | 4,
  tableName: string
}
class HandbookModel {
  /**手册列表 */
  @observable
  public handbookList: types.Obj[] = [];
  /**当前手册 */
  @observable
  public curHb: types.Obj = {};
  /**目录 */
  @observable
  public catalogue: ICurCatalogue[] = [];
  /**选中的目录 */
  @observable
  public curCatalogue: any = null
  @observable
  public addConfirmVisible: boolean = false
  /**规培生信息 */
  @observable
  public info: types.Obj = {}
  /**选中目录的详情 */
  @observable
  public catalogueData: types.Obj = {}
  /**目录详情配置 */
  @observable
  public detailConfig: types.Obj | null = null
  @observable
  public detail: types.Obj = {}
  /**表单数据config配置项**/
  @observable
  public  formItems: any = []
  get age() {
    if (!this.info?.birthday) return 0
    return moment().diff(moment(this.info.birthday), 'years')
  }

  @action
  getHandbookList() {
    trainingSettingApi.getHandbookMaster(this.info.id).then(res => {
      this.handbookList = res.data || []
      if (!this.curHb?.id && res.data.length) {
        this.getCurHb(res.data[0])
      }
    })
  }

  @action
  getCurHb(e: types.Obj) {
    if (e.props) {
      const { value: id, children: handbookName } = e.props
      this.curHb = {
        id,
        handbookName
      }
      return
    }
    this.curHb = e;
  }
  @action
  delHandbook() {
    const _self = this
    Modal.confirm({
      title: '删除手册',
      content: `是否确认删除${_self.curHb?.handbookName}，数据将无法恢复`,
      onOk() {

        trainingSettingApi.deleteHandbook({
          id: _self.curHb?.id
        }).then(res => {
          message.success(res.desc)
          _self.reset()
        })
      }
    })
  }
  /**初始化 */
  @action
  reset() {
    this.curHb = {}
    this.catalogue = []
    this.curCatalogue = null
    this.getHandbookList()
  }
  /**
   * 获取目录
  */
  @action
  getCatalogue() {
    trainingSettingApi.getHandbookCatalog(this.curHb.id).then((res) => {
      this.catalogue = res.data || [];
      if (this.catalogue.length) {
        this.curCatalogue = this.catalogue[0]
        this.getCatalogueData()
      }
    });
  }
  @action
  selectMenu(e: types.Obj) {
    this.curCatalogue = JSON.parse(e?.item?.props['data-id'])
    this.getCatalogueData()
  }
  /**
   * 获取当前目录详情
   * @returns 
   */
  @action
  getCatalogueData() {
    if (!this.curCatalogue) return
    this.detailConfig = getConfig(this.curCatalogue)
    if (!this.detailConfig?.isSearch) return
    const {
      id: catalogId,
      masterId,
      templateId,
      templateType } = this.curCatalogue
    trainingSettingApi.queryTemplateItemAndData({
      catalogId,
      masterId,
      templateId,
      templateType,
    }).then(res => {
      this.detail = res.data || {}
      if(templateType == 2){
        /**处理表单返回的数据 **/
        this.formItems =res.data?.formItems||[]
      }

    })
  }
}
export const handbookModel = new HandbookModel();
