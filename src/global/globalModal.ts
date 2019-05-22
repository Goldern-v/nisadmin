class GlobalModal {
  public constructor () {}
  public auditModal: any = null
}

export const globalModal = new GlobalModal()
;(window as any).globalModal = globalModal
