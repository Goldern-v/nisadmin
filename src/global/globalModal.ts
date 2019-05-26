class GlobalModal {
  public constructor () {}
  public auditModal: any = null
  public groupsAduitModal: any = null
}

export const globalModal = new GlobalModal()
;(window as any).globalModal = globalModal
