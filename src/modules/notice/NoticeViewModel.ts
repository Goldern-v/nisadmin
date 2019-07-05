import { observable, computed, action } from 'mobx'
import { noticeService } from './serveices/NoticeService'
import { InfoListObj, DetailObj } from './type'
class NoticeViewModel {
  /** 基础数据 */
  /** 发件箱个数 */
  @observable public sendSize: number = 0
  /** 草稿箱个数 */
  @observable public tempSaveSize: number = 0
  /** 收件箱数量 */
  @observable public receiveSize: number = 0
  /** 是否有未读邮件 */
  @observable public hadUnread: boolean = false

  /** 收件箱列表对象 */
  @observable public receiveListObj: InfoListObj = {
    pageIndex: 0,
    totalCount: 0,
    pageSize: 10,
    list: []
  }
  /** 发件箱列表对象 */
  @observable public sendListObj: InfoListObj = {
    pageIndex: 0,
    totalCount: 0,
    pageSize: 10,
    list: []
  }
  /** 草稿列表对象 */
  @observable public tempSaveListObj: InfoListObj = {
    pageIndex: 0,
    totalCount: 0,
    pageSize: 10,
    list: []
  }
  /** 我的收藏列表对象 */
  @observable public collectedListObj: InfoListObj = {
    pageIndex: 0,
    totalCount: 0,
    pageSize: 10,
    list: []
  }

  /** 状态数据 */
  @observable public selectedMenu: string = ''

  /** 选中的邮箱详情 */
  @observable public detailObj: DetailObj = {}

  /** 当前列表数据 */
  @computed
  public get currentListObj(): InfoListObj {
    switch (this.selectedMenu) {
      case '收件箱':
        return this.receiveListObj
      case '发件箱':
        return this.sendListObj
      case '草稿箱':
        return this.tempSaveListObj
      case '我的收藏':
        return this.collectedListObj
      default:
        return {
          pageIndex: 0,
          totalCount: 0,
          pageSize: 10,
          list: []
        }
    }
  }

  /** 设置选择的菜单并初始化数据 */
  setSelectedMenu(value: string) {
    this.selectedMenu = value
    switch (value) {
      case '收件箱': {
        noticeService.getReceiveList(this.receiveListObj.pageIndex, this.receiveListObj.pageSize).then((res) => {
          this.receiveListObj = res.data
        })
      }
      case '发件箱': {
        noticeService.getSendList(this.sendListObj.pageIndex, this.sendListObj.pageSize).then((res) => {
          this.sendListObj = res.data
        })
      }
      case '草稿箱': {
        noticeService.getTempSaveList(this.tempSaveListObj.pageIndex, this.tempSaveListObj.pageSize).then((res) => {
          this.tempSaveListObj = res.data
        })
      }
      case '我的收藏': {
        noticeService.getCollectedList(this.collectedListObj.pageIndex, this.collectedListObj.pageSize).then((res) => {
          this.collectedListObj = res.data
        })
      }
    }
  }

  /** 获取详情 */
  setDetailObj(menu: string, id: number) {
    noticeService.getDetail(menu, id).then((res) => {
      this.detailObj = res.data
    })
  }

  async init() {
    let {
      data: { hadUnread, receiveSize, sendSize, tempSaveSize }
    } = await noticeService.getBoxSize()
    this.hadUnread = hadUnread
    this.receiveSize = receiveSize
    this.sendSize = sendSize
    this.tempSaveSize = tempSaveSize
    this.setSelectedMenu('收件箱')
  }
}

export const noticeViewModel = new NoticeViewModel()
