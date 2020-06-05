import { action, observable, computed } from 'mobx'
import { wardRegisterService } from './../../services/WardRegisterService'
import { appStore, authStore } from 'src/stores'
import { message } from 'antd'
import moment from 'moment'
import { globalModal } from "src/global/globalModal"

const defaultQuery = function () {
  return {
    /**当前登记本修订版本ID */
    blockId: '',
    startDate: '',
    endDate: '',
    pageIndex: 1,
    pageSize: 20,
  } as any
}

export default class BaseRegisterModel {
  /**登记本code */
  @observable registerCode = ''
  /**登记本名称 */
  @observable registerName = ''
  /**全局loading状态 */
  @observable loading = false
  /**当前登记本基本请求参数 */
  @observable baseQuery = defaultQuery()
  /**当前登记本筛选请求参数 */
  @observable filterQuery = {} as any
  /**登记本修订版本列表 */
  @observable blockList = [] as any[]
  /**当前登记本数据 */
  @observable tableData = [] as any[]
  /**当前登记本条目总数 */
  @observable totalCount = 0
  /**要显示的字段配置列表 */
  @observable itemConfigList = [] as any[]
  /**可选择的班次列表 */
  @observable rangeConfigList = [] as any[]
  /**勾选的行key值 */
  @observable selectedRowKeys = [] as string[]

  /**初始化 */
  @action init(registerCode?: string, registerName?: string) {
    registerCode && (this.registerCode = registerCode)
    registerName && (this.registerName = registerName)
    this.baseQuery = defaultQuery()
    this.selectedRowKeys = []
    this.itemConfigList = []
    this.rangeConfigList = []
    this.tableData = []

    this.getBlockList()
  }

  /**根据科室获取登记本blockList并显示最新修订的登记本 */
  @action getBlockList() {
    this.loading = true

    wardRegisterService
      .qcRegisterBlockGetList(this.registerCode, authStore.selectedDeptCode)
      .then(res => {
        let currentBlock = res.data[res.data.length - 1]
        if (currentBlock && currentBlock.id) {
          this.blockList = res.data

          this.baseQuery.blockId = currentBlock.id

          this.getTableData()
        } else {
          this.blockList = []
          this.setQuery({ ...this.baseQuery, blockId: '' })
        }
        this.loading = false
      }, () => this.loading = false)
  }

  /**获取登记本数据 */
  @action getTableData() {
    this.selectedRowKeys = []
    this.loading = true
    let paramMap = { ...this.filterQuery }
    delete paramMap['班次']

    let _query = {
      ...this.baseQuery,
      paramMap,
      range: this.filterQuery['班次'] || ''
    }

    wardRegisterService
      .getPage(this.registerCode, _query)
      .then(res => {
        if (res.data) {
          this.totalCount = res.data.itemDataPage.totalCount
          this.tableData = res.data.itemDataPage.list
        }
        this.loading = false
      }, () => this.loading = false)
  }

  /**更新baseQuery */
  @action setQuery(newQuery: any, reload?: boolean) {
    this.baseQuery = { ...newQuery }
    reload && this.getTableData()
  }

  /**更新filterQuery */
  @action setFilter(newFilter: any, reload?: boolean) {
    this.filterQuery = { ...newFilter }
    reload && this.getTableData()
  }

  /**手动设置loading */
  @action setLoading(newLoading: boolean) {
    this.loading = newLoading
  }

  /**更新tableData列表 */
  @action setTableData(newTableData: any[]) {
    this.tableData = newTableData.concat()
  }

  /**更新tableData整行 */
  @action setTableDataRow(newRow: any, index: number) {
    this.tableData[index] = { ...newRow }
  }

  /**更新tableData某行的某个字段 */
  @action setTableDataRowItem(newVal: any, key: any, index: number) {
    this.tableData[index][key] = newVal
  }

  /**新增修订 */
  @action addBlock() {
    globalModal
      .confirm(
        `是否新建${this.registerName}`,
        `新建${this.registerName}开始日期为${moment().format(
          "YYYY-MM-DD"
        )}，历史${this.registerName}请切换修订版本查看`
      )
      .then(res => {
        wardRegisterService
          .qcRegisterBlockCreate(this.registerCode, authStore.selectedDeptCode)
          .then(res => {
            message.success("创建成功")
            this.init()
          });
      })
  }

  // private formatItemConfigList(itemConfigList:any[]){
  //   let newItemConfig = []
  //   for(let i=0;i<itemConfigList.length;i++){
  //     let itemCfg = {...itemConfigList[i]}
  //     let title = itemCfg
  //   }
  // }
}

export const baseRegisterMode = new BaseRegisterModel()