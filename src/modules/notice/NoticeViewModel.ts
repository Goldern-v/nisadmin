import { observable, computed, action } from 'mobx'
import { noticeService } from './serveices/NoticeService'
import { InfoListObj, DetailObj, InfoListItem } from './type'
import { FileItem } from './page/SentNoticeView'
import { isThursday } from 'date-fns'
class NoticeViewModel {
  /** 基础数据 */
  /** 发件箱个数 */
  @observable public sendSize: number = 0
  /** 草稿箱个数 */
  @observable public tempSaveSize: number = 0
  /** 收件箱数量 */
  @observable public receiveSize: number = 0
  /** 是否有未读消息 */
  @observable public hadUnread: boolean = false

  /** 编辑状态下选择的列表 */
  @observable public selectedMenuEditList: InfoListItem[] = []

  /** 状态数据 */
  @observable public selectedMenu: string = ''
  @observable public isMenuEdit: boolean = false
  @observable public listLoading: boolean = false
  @observable public detailLoading: boolean = false

  /** 选中的邮箱详情 */
  @observable public detailObj: DetailObj = {}

  /** 当前列表数据 */
  @observable public currentListObj: InfoListObj = {
    pageIndex: 0,
    totalCount: 0,
    pageSize: 10,
    lastPage: false,
    list: []
  }

  /** 设置选择的菜单并初始化数据 */
  setSelectedMenu(value: string) {
    this.selectedMenu = value
    this.initMenuEditList()
    this.initCurrentListObj()
    this.loadData()
  }

  loadData(value: string = this.selectedMenu) {
    if (!value) return
    if (this.listLoading) return
    this.listLoading = true
    switch (value) {
      case '收件箱':
        {
          noticeService.getReceiveList(this.currentListObj.pageIndex + 1, this.currentListObj.pageSize).then((res) => {
            res.data.list = [...this.currentListObj.list, ...res.data.list]
            this.currentListObj = res.data
            this.listLoading = false
          })
        }
        break
      case '发件箱':
        {
          noticeService.getSendList(this.currentListObj.pageIndex + 1, this.currentListObj.pageSize).then((res) => {
            res.data.list = [...this.currentListObj.list, ...res.data.list]
            this.currentListObj = res.data
            this.listLoading = false
          })
        }
        break
      case '草稿箱':
        {
          noticeService.getTempSaveList(this.currentListObj.pageIndex + 1, this.currentListObj.pageSize).then((res) => {
            res.data.list = [...this.currentListObj.list, ...res.data.list]
            this.currentListObj = res.data
            this.listLoading = false
          })
        }
        break
      case '我的收藏': {
        noticeService.getCollectedList(this.currentListObj.pageIndex + 1, this.currentListObj.pageSize).then((res) => {
          res.data.list = [...this.currentListObj.list, ...res.data.list]
          this.currentListObj = res.data
          this.listLoading = false
        })
      }
    }
  }

  /** 刷新列表数据 */
  refreshCurrentListObj() {
    this.initBoxSize()
    this.setSelectedMenu(this.selectedMenu)
  }
  /** 取详情 */
  setDetailObj(menu: string, id: number) {
    this.detailObj.id = id
    this.detailLoading = true
    noticeService.getDetail(menu, id).then((res) => {
      this.detailLoading = false
      this.detailObj = {}
      this.detailObj = res.data
    })
  }
  /** 切换列表编辑状态 */
  toggleMenuEdit() {
    if (this.isMenuEdit) {
      this.initMenuEditList()
    } else {
      this.isMenuEdit = true
    }
  }

  pushMenuEditList(obj: InfoListItem) {
    if (!this.selectedMenuEditList.find((item) => item.id == obj.id)) {
      this.selectedMenuEditList.push(obj)
    }
  }
  popMenuEditList(obj: InfoListItem) {
    let index = this.selectedMenuEditList.findIndex((item) => item.id == obj.id)
    if (index > -1) {
      this.selectedMenuEditList.splice(index, 1)
    }
  }

  toggleMenuEditList(obj: InfoListItem) {
    if (!this.selectedMenuEditList.find((item) => item.id == obj.id)) {
      this.pushMenuEditList(obj)
    } else {
      this.popMenuEditList(obj)
    }
  }

  inMenuEdit(obj: InfoListItem) {
    if (this.selectedMenuEditList.find((item) => item.id == obj.id)) {
      return true
    } else {
      return false
    }
  }
  /** 初始化编辑列表 */
  initMenuEditList() {
    this.selectedMenuEditList = []
    this.isMenuEdit = false
  }
  /** 初始化消息列表 */
  initCurrentListObj() {
    this.currentListObj = {
      pageIndex: 0,
      totalCount: 0,
      pageSize: 10,
      lastPage: false,
      list: []
    }
  }
  async initBoxSize() {
    let {
      data: { hadUnread, receiveSize, sendSize, tempSaveSize }
    } = await noticeService.getBoxSize()
    this.hadUnread = hadUnread
    this.receiveSize = receiveSize
    this.sendSize = sendSize
    this.tempSaveSize = tempSaveSize
  }
  init() {
    this.initBoxSize()
    this.initCurrentListObj()
    this.setSelectedMenu('收件箱')
  }
}

export const noticeViewModel = new NoticeViewModel()
