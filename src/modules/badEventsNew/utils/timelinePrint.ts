import printing from "printing"
import { appStore } from "src/stores"

/**不良事件时间轴流程打印 */
export const timelinePrint = (options: {
  hideName?: boolean,
  title: string,
  timeline: any[]
}) => {
  const { title, timeline, hideName } = options
  const printId = `timelinePrint${new Date().getTime()}`
  let defaultPrintCss = `
    @page{
      size: A4 portrait;
      margin: 0mm;
    } 
    div#${printId}{
      padding: 30px;
    }
    table{
      border-collapse: collapse;
      border-color: #000;
      width: 100%;
    }
    td,th{
      text-align: center;
      font-size: 13px;
      color: #000;
      border: 1px #000 solid;
    }
    table td.main-title{
      font-size: 24px!important;
    }
  `

  let cols = [
    {
      title: "流程",
      dataIndex: "operateName",
    },
    {
      title: "人员",
      dataIndex: "operatorName",
      render: (text: any, record: any, index: number) => {
        if (hideName && record.operatorStatus === 'nurse_submit')
          return '***'

        return text
      }
    },
    {
      title: "科室",
      dataIndex: "operatorWardName",
    },
    {
      title: "时间",
      dataIndex: "operateDate",
    },
    {
      title: "审核意见",
      dataIndex: "auditMind",
    },
  ]

  let colgroup = `<colgroup>
    ${cols.map((col: any) => `<col width=${col.width || ''} />`).join('')}
  </colgroup>`

  let headerRow = `<tr>
    ${cols.map((col: any) => `<td>${col.title}</td>`).join('')}
  </tr>`

  let titleRow = `<tr><td class="main-title" colspan=${cols.length}>${title}</td></tr>`

  let contentList = timeline
    .filter((item) => item.id)
    .map((item: any, idx: number) => {
      return `<tr>
    ${cols.map((col: any) => `<td>${(() => {
        let val = item[col.dataIndex || '']
        if (Object.keys(col).indexOf('render') >= 0)
          return col.render(val, item, idx)

        return val
      })()}</td>`).join('')}
    </tr>`
    })

  let renderTable = `<table>
    ${colgroup}
    <tbody>
      ${titleRow}
      ${headerRow}
      ${contentList.join('')}
    </tbody>
  </table>`

  let div = document.createElement('div')
  div.id = printId
  div.innerHTML = renderTable

  document.body.appendChild(div)
  let prtintFn = printing as any
  if (appStore.isDev) prtintFn = printing.preview
  prtintFn(document.getElementById(printId) as HTMLElement, {
    injectGlobalCss: true,
    scanStyles: false,
    css: defaultPrintCss
  });
  //删除打印容器
  document.body.removeChild(div)
}