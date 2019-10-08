import { fileDownload } from 'src/utils/file/file'
import { format } from 'date-fns'
import { observable, computed, action } from 'mobx'
import { checkWardService } from '../../services/CheckWardService'
import moment from 'moment'

class ScheduleViewModal {
  @observable public selectedWardRound = '特殊时段查房' //类型
  @observable public WardRoundList = []
  @observable public selectedYear =  moment() //日期
  @observable public tableList = []
  @observable public tableData = [] // 暂存的数据
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

  onload() {
    this.tableLoading = true
    checkWardService.listSearchRoom().then((res) => {
      this.tableName = res.data.searchRoomType
      this.tableData = res.data
      this.tableTime = res.data.time
      this.tableRemark = res.data.allRemark
      let array:any = []
      res.data.searchRooms.map((item:any) => {
        item.searchRooms.map((o:any, i:any) => {
          let time:any = o.searchRoomDateRemark ? (Number(o.searchRoomDateRemark.substring(5, 10)) ? o.searchRoomDateRemark.substring(5, 10) : o.searchRoomDateRemark.substring(5, 9)) : ''
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
