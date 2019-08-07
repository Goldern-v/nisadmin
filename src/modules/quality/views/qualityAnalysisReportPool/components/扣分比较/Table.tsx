import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import moment from 'moment'
export interface Props {
  list: DeptItem[]
}

export default function Table(props: Props) {
  let { list } = props
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report') || {}

  let lastSum = list
    .reduce((total: any, current: any) => {
      return total + current.lastDeductScore
    }, 0)
    .toFixed(2)
  let currentSum = list
    .reduce((total: any, current: any) => {
      return total + current.currentDeductScore
    }, 0)
    .toFixed(2)
  let compareSum = Number(currentSum) - Number(lastSum)
  let comparePercent =
    lastSum == 0 && currentSum != 0 ? 100 : lastSum == 0 && currentSum == 0 ? 0 : (currentSum - lastSum) / lastSum * 100

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='16%' />
          <col width='9%' />
          <col width='7%' />
          <col width='10%' />
          <col width='9%' />
          <col width='7%' />
          <col width='10%' />
          <col width='11%' />
          <col width='9%' />
          <col width='12%' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td rowSpan={2}>项目</td>
            <td colSpan={3}>2019年{report.indexInType == 1 ? 12 : report.indexInType - 1}月</td>
            <td colSpan={3}>
              {moment(report.endDate).format('YYYY年')}
              {report.indexInType}月
            </td>
            <td colSpan={3}>
              {moment(report.endDate).format('YYYY年')}
              {report.indexInType}月与
              {report.indexInType == 1
                ? moment(report.beginDate)
                  .subtract(1, 'year')
                  .format('YYYY年')
                : moment(report.beginDate).format('YYYY年')}
              {report.indexInType == 1 ? 12 : report.indexInType - 1}
              比较
            </td>
          </tr>
          <tr className='header'>
            <td>扣分</td>
            <td>扣分科室</td>
            <td>占总分%</td>
            <td>扣分</td>
            <td>扣分科室</td>
            <td>占总分%</td>
            <td>扣分</td>
            <td>扣分科室</td>
            <td>扣分%</td>
          </tr>

          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.qcGroupName}</td>
              <td>{item.lastDeductScore}</td>
              <td>{item.lastDeptSize}</td>
              <td>{item.lastScorePercent + '%'}</td>
              <td>{item.currentDeductScore}</td>
              <td>{item.currentDeptSize}</td>
              <td>{item.currentScorePercent + '%'}</td>

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
                {item.compareDeptSize == 0 ? (
                  '持平'
                ) : (
                    <React.Fragment>
                      {item.compareDeptSize > 0 ? (
                        <img src={require('./images/more.png')} alt='' className='lm-arrow' />
                      ) : (
                          <img src={require('./images/less.png')} alt='' className='lm-arrow' />
                        )}
                      {Math.abs(Number(item.compareDeptSize))}
                    </React.Fragment>
                  )}
              </td>
              <td>
                {item.compareScorePercent == 0 ? (
                  '持平'
                ) : (
                    <React.Fragment>
                      {item.compareScorePercent > 0 ? (
                        <img src={require('./images/more.png')} alt='' className='lm-arrow' />
                      ) : (
                          <img src={require('./images/less.png')} alt='' className='lm-arrow' />
                        )}
                      {Math.abs(Number(item.compareScorePercent)) + '%'}
                    </React.Fragment>
                  )}
              </td>
            </tr>
          ))}
          <tr>
            <td>总扣分</td>
            <td colSpan={3}>{lastSum}</td>
            <td colSpan={3}>{currentSum}</td>
            <td colSpan={3}>
              {compareSum == 0 ? (
                '持平'
              ) : (
                  <React.Fragment>
                    {compareSum > 0 ? (
                      <img src={require('./images/more.png')} alt='' className='lm-arrow' />
                    ) : (
                        <img src={require('./images/less.png')} alt='' className='lm-arrow' />
                      )}
                    {Math.abs(Number(compareSum))}
                  </React.Fragment>
                )}
              <div style={{ display: 'inline-block', width: 4 }} />
              {comparePercent == 0 ? (
                '(持平)'
              ) : (
                  <React.Fragment>
                    (
                  <div style={{ display: 'inline-block', width: 2 }} />
                    {comparePercent > 0 ? (
                      <img src={require('./images/more.png')} alt='' className='lm-arrow' />
                    ) : (
                        <img src={require('./images/less.png')} alt='' className='lm-arrow' />
                      )}
                    {Math.abs(Number(comparePercent.toFixed(2))) + '%'})
                </React.Fragment>
                )}
            </td>
          </tr>
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
    table-layout: fixed;
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
