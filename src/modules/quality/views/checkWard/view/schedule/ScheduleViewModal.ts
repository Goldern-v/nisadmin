import { fileDownload } from 'src/utils/file/file'
import { format } from 'date-fns'
import { observable, computed, action } from 'mobx'
import { checkWardService } from '../../services/CheckWardService'
import moment from 'moment'

class ScheduleViewModal {
  @observable public selectedWardRound = '' //类型
  @observable public WardRoundList = []
  @observable public selectedYear =  moment() //日期
  @observable public tableList = []
  @observable public tableName = '' //表格名称
  @observable public tableTime = '' //表格时间
  @observable public tableLoading = false

  //导出Excel
  export() {
    checkWardService.excelNurseLeave(this.postObj).then((res) => {
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

  @computed
  get postObj() {
    return {
      
      
    }
  }

  onload() {
    this.tableLoading = true
    checkWardService.listSearchRoom().then((res) => {
      this.tableName = res.data.searchRoomType
      this.tableTime = res.data.time
      this.tableList = res.data.searchRooms
      this.tableLoading = false
    })
  }

  async init() {
    await this.initData()
    await this.onload()
  }
}

export const scheduleViewModal = new ScheduleViewModal()
