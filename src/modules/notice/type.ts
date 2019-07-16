export interface InfoListObj {
  totalCount: number
  pageSize: number
  pageIndex: number
  lastPage: boolean
  list: InfoListItem[]
}

export interface InfoListItem {
  id: number
  /** 名称 */
  title: string
  /** 内容 */
  content: ''
  /** 发件人工号 */
  senderNo: string
  /** 发件人姓名 */
  senderName: string
  /** 发送时间 */
  sendTime: string
  type: string
  deleted: boolean
  status: string
  /** 收藏 */
  hadAttachment: boolean
  /** 是否已读 */
  read: boolean
  collected: boolean
  /** 头像 */
  nearImageUrl: string
  readTime: boolean
  showType?: '收' | '发'
}

export interface DetailObj {
  id?: number
  title?: string
  content?: string
  senderNo?: string
  senderName?: string
  sendTime?: string
  type?: string
  deleted?: boolean
  status?: string
  attachmentList?: any[]
  read?: boolean
  collected?: boolean
  nearImageUrl?: string
  showType?: '收' | '发' | '草' | '藏'
  receiverList?: { empName: string }[]
  readReceiverSize?: number
  unreadReceiverSize?: number
}
