import BaseApiService from 'src/services/api/BaseApiService'
import { scheduleViewModal } from '../view/schedule/ScheduleViewModal';
import moment from 'moment'
import qs from 'qs';


export default class CheckWardService extends BaseApiService {

  //查房计划表模版下载
  public searchRoomDownload() {
    return this.post(`/searchRoom/download`, { responseType: 'blob' })
  }

  //获取查房类型
  public dictInfo(code?: any) {
    code = 'search_room_type'
    return this.post(`/dept/dictInfo`,qs.stringify({ code }))
  }

  //获取查房状态
  public dictStatus(code?: any) {
    code = 'sr_record_status'
    return this.post(`/dept/dictInfo`,qs.stringify({ code }))
  }
  
  //查询查房计划表
  public listSearchRoom(obj?: any) {
    obj = {
      time: scheduleViewModal.selectedYear.format('YYYY'),
      searchRoomType:scheduleViewModal.selectedWardRound
    }
    return this.post(`/searchRoom/listSearchRoom`,obj)
  }

  //根据参数获取查房记录列表（PC）
  public getPage(obj: any){
    return this.post(`/srRecord/getPage`,obj)
  }

  //获取查房记录详情
  public getDetail(id: any){
    return this.get(`/srRecord/detail/${id}`)
  }
  
  //推送查房计划
  public pushSearchRoom(obj: any){
    return this.post(`/searchRoom/pushSearchRoom`,obj)
  }

  //导入查房统计模块
  public importSearchRoom(formData: any){
    return this.post(`/searchRoom/import`,formData)
  }

  //导出查房统计模块
  public exportSearchRoom(obj?: any){
    obj = {
      time: scheduleViewModal.selectedYear.format('YYYY'),
      searchRoomType:scheduleViewModal.selectedWardRound
    }
    return this.post(`/searchRoom/export`, obj, { responseType: 'blob' })
  }
  
  //查询查房计划上传资料记录
  public listSearchRoomImport(){
    return this.post(`/searchRoom/listSearchRoomImport`)
  }
}

export const checkWardService = new CheckWardService()
