import BaseApiService from 'src/services/api/BaseApiService'

interface Mail {
  mail: {
    id?: number | undefined
    title: string
    content: string
  }
  empNos: string[]
  fileIds: string[]
  tempSave?: boolean /** true-存为草稿。 false-发送 */
}

export default class NoticeService extends BaseApiService {
  /** 消息箱（收件、发件、草稿数量） */
  public getBoxSize() {
    return this.get(`/mail/boxSize`)
  }
  /** 收件箱列表 */
  public getReceiveList(pageIndex: number, pageSize: number, keyword = '') {
    return this.post(`/mail/receive/list`, { pageIndex, pageSize, keyword }).then((res) => {
      res.data.list.map((item: any) => {
        item.showType = '收'
      })
      return res
    })
  }
  /** 发件箱列表 */
  public getSendList(pageIndex: number, pageSize: number, keyword = '') {
    return this.post(`/mail/send/list`, { pageIndex, pageSize, keyword }).then((res) => {
      res.data.list.map((item: any) => {
        item.showType = '发'
      })
      return res
    })
  }

  /** 草稿箱列表 */
  public getTempSaveList(pageIndex: number, pageSize: number, keyword = '') {
    return this.post(`/mail/tempSave/list`, { pageIndex, pageSize, keyword })
  }
  /** 我的收藏列表 */
  public getCollectedList(pageIndex: number, pageSize: number, keyword = '') {
    return this.post(`/mail/receive/collectedList`, { pageIndex, pageSize, keyword })
  }
  /** 获取详情 */
  public getDetail(type: string, id: number) {
    if (type == '收件箱' || type == '我的收藏') {
      return this.get(`/mail/receive/detail/${id}`).then((res) => {
        res.data.showType = type == '收件箱' ? '收' : '藏'
        return res
      })
    } else if (type == '发件箱' || type == '草稿箱') {
      return this.get(`/mail/send/detail/${id}`).then((res) => {
        res.data.showType = type == '发件箱' ? '发' : '草'
        return res
      })
    }
    return new Promise(() => {})
  }

  /** 发消息 */
  public sendMail(mail: Mail) {
    return this.post(`/mail/send/save`, mail)
  }
  /** 收藏消息 */
  public collectMail(id: number) {
    return this.get(`/mail/receive/collect/${id}`)
  }
  /** 取消收藏消息 */
  public revokeCollect(id: number) {
    return this.get(`/mail/receive/revokeCollect/${id}`)
  }
  /** 删除消息 */
  public removeMail(id: number) {
    return this.get(`/mail/receive/remove/${id}`)
  }
  /** 读取消息 */
  public readMail(id: number) {
    return this.get(`/mail/receive/read/${id}`)
  }

  /** 批量收藏 */
  public collectAll(ids: number[]) {
    return this.post(`/mail/receive/collect/all`, { ids })
  }
  /** 批量删除 */
  public removeAll(ids: number[]) {
    return this.post(`/mail/receive/remove/all`, { ids })
  }
  /** 批量已读 */
  public readAll(ids: number[]) {
    return this.post(`/mail/receive/read/all`, { ids })
  }
  /** 批量未读 */
  public unreadAll(ids: number[]) {
    return this.post(`/mail/receive/unread/all`, { ids })
  }
}

export const noticeService = new NoticeService()
