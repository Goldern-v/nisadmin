import BaseApiService from 'src/services/api/BaseApiService'
export default class NoticeService extends BaseApiService {
  /** 邮件箱（收件、发件、草稿数量） */
  public getBoxSize() {
    return this.get(`/mail/boxSize`)
  }
  /** 收件箱列表 */
  public getReceiveList(pageIndex: number, pageSize: number, keyword = '') {
    return this.post(`/mail/receive/list`, { pageIndex, pageSize, keyword })
  }
  /** 发件箱列表 */
  public getSendList(pageIndex: number, pageSize: number, keyword = '') {
    return this.post(`/mail/send/list`, { pageIndex, pageSize, keyword })
  }
  /** 草稿箱列表 */
  public getTempSaveList(pageIndex: number, pageSize: number, keyword = '') {
    return this.post(`/mail/tempSave/list`, { pageIndex, pageSize, keyword })
  }
  /** 我的收藏列表 */
  public getCollectedList(pageIndex: number, pageSize: number, keyword = '') {
    return this.post(`/mail/receive/collectedList`, { pageIndex, pageSize, keyword })
  }
  /** 我的收藏列表 */
  public getDetail(type: string, id: number) {
    if (type == '收件箱' || type == '我的收藏') {
      return this.get(`/mail/receive/detail/${id}`).then((res) => {
        res.data.showType = '收'
        return res
      })
    } else if (type == '发件箱' || type == '草稿箱') {
      return this.get(`/mail/send/detail/${id}`).then((res) => {
        res.data.showType = '发'
        return res
      })
    }
    return new Promise(() => {})
  }
}

export const noticeService = new NoticeService()
