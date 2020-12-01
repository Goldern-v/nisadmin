import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../ReportViewModal'
export interface Props {
  list: TypeCompare[]
}

export default function Table(props: Props) {
  let { list } = props
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td />
            <td>{report.indexInType}月(分)</td>
            <td>{report.indexInType - 1 || 12}月(分)</td>
            <td>扣分增减(分)</td>
            <td>增减百分比(分)</td>
          </tr>

          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.itemTypeName}</td>
              <td>{item.currentDeductScore}</td>
              <td>{item.lastDeductScore}</td>

              <td>
                {item.compareScore == 0 ? (
                  '持平'
                ) : (
                    <React.Fragment>
                      {item.compareScore > 0 ? (
                        <img src={require('./images/more.png')} alt='' className='lm-arrow' />
                      ) : (
                          <img src={require('./images/less.png')} alt='' className='lm-arrow' />
                        )}
                      {Math.abs(Number(item.compareScore))}
                    </React.Fragment>
                  )}
              </td>
              <td>
                {item.compareScore == 0 ? (
                  '持平'
                ) : (
                    <React.Fragment>
                      {item.compareScorePercent > 0 ? (
                        <img src={require('./images/more.png')} alt='' className='lm-arrow' />
                      ) : (
                          <img src={require('./images/less.png')} alt='' className='lm-arrow' />
                        )}
                      {Math.abs(Number(item.compareScorePercent))}%
                    </React.Fragment>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 5px 50px;
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    tr {
      width: 100%;
    }
    .header,
    .footer {
      td {
        background: #f0f0f0;
      }
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
    }
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
`
