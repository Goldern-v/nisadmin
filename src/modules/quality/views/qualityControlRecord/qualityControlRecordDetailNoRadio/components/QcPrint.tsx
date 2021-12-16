import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import printFunc from 'printing'
export interface Props {
  printing: Boolean,
  data?: any,
  afterPrinting: Function,
}

export default function QcPrint(props: Props) {
  const { printing, afterPrinting, data } = props
  const printElId = 'qualityControlRecordPrint'

  useEffect(() => {
    if (printing) printAll()
  }, [printing])

  const master = data.master || {}
  const itemCount = data.itemCount || {}
  const itemGroupList = data.itemGroupList || []
  const nodeDataList = data.nodeDataList || []
  const deptHandle = nodeDataList.find((item: any) => item.nodeCode === 'dept_handle') || {}
  let deptHandleNext: any = {}
  if (Object.keys(deptHandle).length > 0) {
    let idxNext = nodeDataList.indexOf(deptHandle) + 1
    if (nodeDataList[idxNext]) deptHandleNext = nodeDataList[idxNext]
  }

  const printAll = () => {
    let printEl = document.getElementById(printElId) as HTMLElement

    if (printEl)
      printFunc(
        printEl,
        {
          injectGlobalCss: true,
          scanStyles: false,
          css: `
          #${printElId}{
            display:block!important;
          }
          @page{
            size: A4 portrait;
            margin: 2cm;
          }
        `
        }
      )

    afterPrinting()
  }

  return <Wrapper id={printElId}>
    <table>
      <colgroup>
        <col width="120px" />
        <col />
        <col width="100px" />
        <col width="120px" />
      </colgroup>
      <tbody>
        <tr className="main-title header">
          <td colSpan={4}>{master.qcName}</td>
        </tr>
        <tr>
          <td className="label">质控时间</td>
          <td colSpan={3}>{master.evalDate}</td>
        </tr>
        <tr>
          <td className="label">质控人员</td>
          <td colSpan={3}>{master.creatorName}</td>
        </tr>
        <tr>
          <td className="label">质控病区</td>
          <td colSpan={3}>{master.wardName}</td>
        </tr>
        <tr>
          <td className="label">住院号/诊疗号</td>
          <td colSpan={3}>{master.inpNo}</td>
        </tr>
        <tr>
          <td className="label">状态</td>
          <td colSpan={3}>{master.nextNodePendingName}</td>
        </tr>
        <tr>
          <td className="label">通过率(%)</td>
          <td colSpan={3}>{Math.round((itemCount.evalRate || 0) * 100) / 100}</td>
        </tr>
        <tr className="header">
          <td>类型</td>
          <td>巡查内容</td>
          <td>检查结果</td>
          <td>存在问题</td>
        </tr>
        {itemGroupList.map((item0: any, idx0: number) => {
          let itemList = item0.itemList
          let remarkGroup = itemList.filter((item1: any) => item1.remark.trim()).map((item1: any) => item1.remark)
          return itemList.map((item1: any, idx1: number) => (
            <tr key={`${idx0}-${idx1}`}>
              {idx1 == 0 && <td
                rowSpan={itemList.length}>
                {item0.qcItemTypeName}
              </td>}
              <td>{item1.qcItemName}</td>
              <td>{item1.qcItemValue}</td>
              {idx1 == 0 && <td
                style={{ verticalAlign: 'top' }}
                rowSpan={itemList.length}>
                {remarkGroup.join(';')}
              </td>}
            </tr>
          ))
        })}
        <tr>
          <td>原因分析</td>
          <td colSpan={3}>{deptHandle.expand}</td>
        </tr>
        <tr>
          <td>整改措施</td>
          <td colSpan={3}>{deptHandle.handleContent}</td>
        </tr>
        <tr>
          <td>效果评价</td>
          <td colSpan={3}>{deptHandleNext.handleContent}</td>
        </tr>
      </tbody>
    </table>
  </Wrapper>
}
const Wrapper = styled.div`
  width: 720px;
  display:none;
  table{
    border-collapse: collapse;
    border-color: #000;
    width: 100%;
  }
  .header{
    font-weight: bold;
    line-height: 30px;
  }
  td,th{
    text-align: center;
    color: #000;
    word-break: break-all;
    padding: 2px;
    font-size: 13px;
    border: 1px #000 solid;
  }
`