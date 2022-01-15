import { appStore } from "src/stores"
import printing from 'printing'

export const printAll = (id: string) => {
  let printEl = document.getElementById(id)

  let print = appStore.isDev ? printing.preview : printing

  if (printEl) {
    renderPrintingEl(printEl)
  }
}

const renderPrintingEl = (el: HTMLElement) => {
  let pageList = el.querySelectorAll('.print-page-item')
  // console.log(pageList)

  for (let i = 0; i < pageList.length; i++) {
    if (i > 0) el.removeChild(pageList[i])
  }
}