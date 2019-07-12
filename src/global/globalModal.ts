import { Modal } from 'antd'

class GlobalModal {
  public constructor() {}
  public auditModal: any = null
  public groupsAduitModal: any = null
  /** 对话弹窗 */
  public confirm = (title: string, content: string) => {
    let resolveFun: any = null
    const onOk = new Promise((resolve, reject) => {
      resolveFun = resolve
    })
    Modal.confirm({
      title: title || '删除确认',
      content: content || '确定要删除此排班人员吗？',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      maskClosable: true,
      onOk: () => resolveFun()
    })
    return onOk
  }
}

export const globalModal = new GlobalModal()
;(window as any).globalModal = globalModal
