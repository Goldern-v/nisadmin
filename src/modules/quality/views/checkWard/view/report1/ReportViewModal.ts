import { observable, computed } from 'mobx'
import { checkWardService } from '../../services/CheckWardService'
import { crrentMonth } from 'src/utils/moment/crrentMonth'
import service from 'src/services/api'

class ReportViewModal {
  @observable public selectedDate: any = crrentMonth() // 查房日期
  @observable public dataList = [] // 表格内容
  @observable public tableLoading = false 

  @computed
  get postObj() {
    return {
      startDate: this.selectedDate[0].format('YYYY-MM-DD'),
      endDate: this.selectedDate[1].format('YYYY-MM-DD'),
    }
  }

  onload() {
    this.tableLoading = true
    checkWardService.searchRoomTotal(this.postObj).then((res) => {
      this.dataList = res.data.srRecordList
      this.tableLoading = false
    })
  }

  async init() {
    await this.onload()
  }
}

export const reportViewModal = new ReportViewModal()
