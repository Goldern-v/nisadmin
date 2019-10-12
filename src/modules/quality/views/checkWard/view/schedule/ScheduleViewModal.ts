import { fileDownload } from 'src/utils/file/file'
import { format } from 'date-fns'
import { observable, computed, action } from 'mobx'
import { checkWardService } from '../../services/CheckWardService'
import moment from 'moment'

class ScheduleViewModal {
  @observable public selectedWardRound = '中夜班查房' //类型
  @observable public WardRoundList = []
  @observable public selectedYear =  moment() //日期
  @observable public tableList = []
  @observable public tableData = [] // 暂存的数据
  @observable public statusAll = [] // 暂存的数据推送状态
  @observable public tableName = '' //表格名称
  @observable public tableTime = '' //表格时间
  @observable public tableRemark = '' //表格说明
  @observable public tableLoading = false

  //导出Excel
  export() {
    checkWardService.exportSearchRoom().then((res) => {
      fileDownload(res)
    })
  }

  async initData() {
    await Promise.all([
      // 查房类型
      checkWardService.dictInfo().then((res) => {
        this.WardRoundList = res.data
      }),
    ])
  }

  // 过滤日期数据
  setTime(val: any) {
    if (Number(val.substring(5, 10))) return val.substring(5, 10)
    if (Number(val.substring(5, 9))) return val.substring(5, 9)
    if (Number(val.substring(5, 8))) return val.substring(5, 8)
    return ''
  }

  onload() {
    this.tableLoading = true
    checkWardService.listSearchRoom().then((res) => {
      this.tableName = res.data.searchRoomType
      this.tableData = res.data
      this.tableTime = res.data.time
      this.tableRemark = res.data.allRemark
      this.statusAll = res.data.searchRooms
      let array:any = []
      res.data.searchRooms && res.data.searchRooms.map((item:any) => {
        item.searchRooms.map((o:any, i:any) => {
          let time: any = o.searchRoomDateRemark ? this.setTime(o.searchRoomDateRemark) : ''
          let year:any = o.searchRoomDateRemark ? o.searchRoomDateRemark.substring(0, 5) : ''
          item[`time${i}`] = year + time
        })
        array.push(item)
      })
      this.tableList = array
      this.tableLoading = false
    })
  }

  async init() {
    await this.initData()
    await this.onload()
  }
}

export const scheduleViewModal = new ScheduleViewModal()
