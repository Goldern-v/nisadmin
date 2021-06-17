import { action, observable, computed } from 'mobx'
import { wardRegisterDefaultService } from '../services/WardRegisterDefaultService'
import { appStore, authStore } from 'src/stores'
import { message, Modal } from 'antd'
import { fileDownload } from "src/utils/file/file"
import moment from 'moment'
import { codeAdapter } from "../utils/codeAdapter"
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
    this.filterQuery = this.initFilterQuery()

    this.getBlockList()
  }

  /**根据科室获取登记本blockList并显示最新修订的登记本 */
  @action getBlockList() {
    this.loading = true

    wardRegisterDefaultService
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

  /**格式化合并列表请求参数 */
  private getQuery() {
    let paramMap = { ...this.filterQuery }
    delete paramMap['班次']

    let _query = {
      ...this.baseQuery,
      paramMap,
      range: this.filterQuery['班次'] || ''
    }

    return _query
  }

  /**获取登记本数据 */
  @action getTableData() {
    this.selectedRowKeys = []
    this.loading = true

    wardRegisterDefaultService
      .getPage(this.registerCode, this.getQuery())
      .then(res => {
        if (res.data) {
          this.totalCount = res.data.itemDataPage.totalCount || 0
          //表格数据
          let newTableData = res.data.itemDataPage.
            list.map((item: any) => ({ ...item, modified: false })) || []
          //班次下拉列表
          this.rangeConfigList = res.data.rangeConfigList || []

          //重新组织表头
          this.itemConfigList = this.formatItemConfigList(res.data.itemConfigList || [])

          this.tableData = []
          if (newTableData.length > 0) {
            this.tableData = newTableData
          } else {
            this.createRow()
          }
        }
        this.loading = false
      }, () => this.loading = false)
  }

  /**添加行 */
  @action createRow = () => {
    this.tableData.unshift({
      recordDate: moment().format('YYYY-MM-DD'),
      range: this.rangeConfigList[0] ? this.rangeConfigList[0].itemCode : '',
    })

    setTimeout(() => {
      let target = document.querySelector('#baseTable .ant-table-row')
      target && target.scrollIntoView()
    }, 100)
  }

  /**格式化和合并表头配置 */
  private formatItemConfigList = (cfgList: any[]) => {
    let newCfgList = [] as any[]

    for (let i = 0; i < cfgList.length; i++) {
      let item = JSON.parse(JSON.stringify(cfgList[i]))
      let { itemCode } = item

      if (itemCode.includes("：")) {
        let titleMain = itemCode.split("：")[0]
        let titleSub = itemCode.split("：")[1]

        // let target = newCfgList.find(abc => abc.title == titleMain)
        let target
        let preParent = newCfgList[i - 1]
        if (preParent && preParent.title == titleMain)
          target = preParent

        if (target) {
          target.children.push({
            ...item,
            title: titleSub,
          })

        } else {
          newCfgList.push({
            title: titleMain,
            ...item,
            children: [
              {
                ...item,
                title: titleSub,
              }
            ]
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

  /**保存 */
  @action save() {
    let modifiedGroup = this.tableData.filter((item: any) => item.modified || !item.id)
    this.loading = true

    wardRegisterDefaultService
      .saveAndSignAll(
        this.registerCode,
        this.baseQuery.blockId,
        modifiedGroup,
        false
      )
      .then(res => {
        message.success("保存成功")
        this.getTableData()
      }, () => this.loading = false)
  }

  /**导出 */
  public exportExcel() {
    wardRegisterDefaultService
      .exportExcel(this.registerCode, this.getQuery())
      .then(res => fileDownload(res))
  }

  /**删除行 */
  @action deleteRow(record: any, idx: number) {
    let deleteRecord = () => {
      let newTableData = this.tableData.concat()
      newTableData.splice(idx, 1)
      this.setTableData(newTableData)
    }

    if (!record.id) {
      deleteRecord()
    } else {
      //对于有id的条目，先调用删除接口
      globalModal
        .confirm("删除确认", "确定要删除该条目吗？")
        .then((res) => {
          this.loading = true
          wardRegisterDefaultService
            .deleteAll(this.registerCode, [{ id: record.id }])
            .then(res => {
              this.loading = false
              message.success('删除成功')
              deleteRecord()
            }, () => this.loading = false)
        })
    }
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
        wardRegisterDefaultService
          .qcRegisterBlockCreate(this.registerCode, authStore.selectedDeptCode)
          .then(res => {
            message.success("创建成功")
            this.init()
          })
      })
  }

  /**删除登记本或修订 */
  @action deleteBlock = () => {
    globalModal.confirm("删除确认", "确定要删除此修订版本吗？")
      .then(res => {
        wardRegisterDefaultService
          .qcRegisterBlockDelete(this.registerCode, this.baseQuery.blockId)
          .then(res => {
            message.success("保存成功");
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

  /**初始化筛选条件 */
  private initFilterQuery = () => {
    return codeAdapter({
      QCRG_01: { '班次': '' },
      QCRG_08: { '转归': '' },
      other: {}
    }, this.registerCode)
  }

  /**设置选中的条目keys */
  @action setSelectedRowKeys(newArr: string[]) {
    this.selectedRowKeys = newArr.concat()
  }

  /**获取选中的条目 */
  public getSelectedRows() {
    return this.tableData.filter((item: any) =>
      this.selectedRowKeys.indexOf(item.key) >= 0)
  }

  /**复制选中的条目新增 */
  @action copyCreateSelectedRow() {
    if (this.selectedRowKeys.length <= 0) {
      message.warn('未勾选项目')
      return
    }

    globalModal
      .confirm('复制新增', '是否复制新增选择的行?')
      .then((res) => {
        let selectedRows = this.getSelectedRows()

        let newRows = selectedRows.map((item: any) => {
          let newItem = JSON.parse(JSON.stringify(item))
          delete newItem.id
          return {
            ...newItem,
            recordDate: moment().format('YYYY-MM-DD'),
            signerName: '',
            signerNo: '',
            auditorName: '',
            auditorNo: ''
          }
        })

        let newTableData = [...newRows, ...this.tableData,]
        this.setTableData(newTableData)
        this.setSelectedRowKeys([])
      })
  }

  /**选中的条目 audit批量签名 */
  @action auditAll = (aside?: string,) => {
    aside = aside || '护士长'
    if (this.selectedRowKeys.length <= 0) {
      message.warn('未勾选项目')
      return
    }

    //判断是否有已签名的条目
    let selectedRows = this.getSelectedRows()
    let auditItems = selectedRows.filter((item: any) => item.auditorName)
    let noSignItems = selectedRows.filter((item: any) => !item.signerName)
    if (auditItems || noSignItems) {
      let textArr = [] as string[]
      if (noSignItems.length > 0) {
        let idxArr = noSignItems.map((item: any) => this.tableData.indexOf(item) + 1)
        textArr.push(`第${idxArr.join('、')}条未签名`)
      }
      if (auditItems.length > 0) {
        let idxArr = auditItems.map((item: any) => this.tableData.indexOf(item) + 1)
        textArr.push(`第${idxArr.join('、')}条${aside}已签名`)

        Modal.warn({
          centered: true,
          title: '提示',
          content: textArr.join(',')
        })
        return
      }
    }

    let ids = selectedRows
      .map((item: any) => ({ id: item.id || '' }))

    globalModal
      .confirm(`${aside}批量签名确认`, `你确定${aside}签名吗？`)
      .then((res) => {
        this.setLoading(true)
        wardRegisterDefaultService.auditAll(this.registerCode, ids)
          .then((res) => {
            message.success('签名成功')
            if (res.data && res.data.list) {
              let newTableData = [...this.tableData]
              for (let i = 0; i < res.data.list.length; i++) {
                let resRecord = res.data.list[i]
                let record = newTableData
                  .find((item: any) => item.id == resRecord.id)

                if (record) Object.assign(record, resRecord)
              }

              this.setTableData(newTableData)
              this.setSelectedRowKeys([])
              this.setLoading(false)
            }
          },
            () => this.setLoading(false))
      })
  }
}

export const baseRegisterMode = new BaseRegisterModel()