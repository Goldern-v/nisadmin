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
    if (this.loading) return

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
          this.totalCount = res.data.itemDataPage.totalCount || 0
          //表格数据
          this.tableData = res.data.itemDataPage.
            list.map((item: any) => ({ ...item, modified: false })) || []
          //班次下拉列表
          this.rangeConfigList = res.data.rangeConfigList || []

          //重新组织表头
          this.itemConfigList = this.formatItemConfigList(res.data.itemConfigList || [])
        }
        this.loading = false
      }, () => this.loading = false)
  }

  private formatItemConfigList = (cfgList: any[]) => {
    let newCfgList = [] as any[]

    for (let i = 0; i < cfgList.length; i++) {
      let item = { ...cfgList[i] }
      let { itemCode } = item

      if (itemCode.includes("：")) {
        let titleMain = itemCode.split("：")[0]
        // let titleSub = itemCode.split("：")[1]

        let target = newCfgList.find(item => item.title == titleMain)

        if (target) {
          target.children.push(item)
        } else {
          newCfgList.push({
            title: titleMain,
            ...item
          })
        }
      } else {
        newCfgList.push(item)
      }
    }

    return newCfgList
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
    let newRow = { ...this.tableData[index], modified: true }
    newRow[key] = newVal
    this.tableData[index] = { ...newRow }
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
          })
      })
  }

  /**回车跳转下一个输入框 */
  public focusNextIpt(e?: any, target?: any) {
    if (target || (e.keyCode && e.keyCode == 13)) {
      let baseTableEl = document.getElementById('baseTable')
      if (baseTableEl) {
        let iptList = baseTableEl.querySelectorAll('input:enabled,textarea:enabled') as any

        for (let i = 0; i < iptList.length; i++) {
          let el = iptList[i]
          if (el == (target || e.target)) {
            if (iptList[i + 1]) {
              iptList[i + 1].focus && iptList[i + 1].focus()
              iptList[i + 1].click && iptList[i + 1].click()
            }
            break
          }
        }
      }
    }
  }

  /**通用编辑禁用规则 */
  public cellDisabled(record: any) {
    if (record.auditorNo) return true
    if (!record.signerNo) return false
    if (authStore.isNotANormalNurse) return false
    if (!authStore.user?.empNo) return true
    if (record.signerNo.toLowerCase() !== authStore.user?.empNo.toLowerCase())
      return true

    return false
  }
}

export const baseRegisterMode = new BaseRegisterModel()