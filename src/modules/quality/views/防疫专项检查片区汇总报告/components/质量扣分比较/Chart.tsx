import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report } from '../../types'
import { qualityAnalysisReportViewModal } from '../../ReportViewModal'
import { numberToArray } from 'src/utils/array/array'
import moment from 'moment'
export interface Props {
  list: TypeCompare[]
  title: string
}

const BAR_COLOR = ['#00A680', '#EBA65B']

export default function Chart(props: Props) {
  let { list, title } = props
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
  let filterList = list.filter((item) => item.itemTypeName !== '总扣分')
  let colSpan = filterList.length
  // console.log(colSpan)
  let largeNum = Math.max(
    ...filterList.map((item) => Number(item.currentDeductScore)),
    ...filterList.map((item) => Number(item.lastDeductScore))
  )
  let th1 = '...'
  if (report.beginDate && report.endDate) th1 = `${moment(report.beginDate).format('MM.DD')}-${moment(report.endDate).format('MM.DD')}`

  let th2 = '...'
  if (report.lastBeginDate && report.lastEndDate) th2 = `${moment(report.lastBeginDate).format('MM.DD')}-${moment(report.lastEndDate).format('MM.DD')}`
  // let measureList = [1, 2, 3, 4, 5, 6]
  let measureList = [5, 10, 15, 20, 25, 30]

  if (largeNum <= 1) {
    measureList = [0.2, 0.4, 0.6, 0.8, 1, 1.2]
  } else if (largeNum <= 1.5) {
    measureList = [0.3, 0.6, 0.9, 1.2, 1.5, 1.8]
  } else if (largeNum <= 2) {
    measureList = [0.4, 0.8, 1.2, 1.6, 2, 2.4]
  } else if (largeNum <= 2.5) {
    measureList = [0.5, 1, 1.5, 2, 2.5, 3]
  } else if (largeNum <= 5) {
    measureList = [1, 2, 3, 4, 5, 6]
  } else if (largeNum <= 10) {
    measureList = [2, 4, 6, 8, 10, 12]
  } else if (largeNum <= 15) {
    measureList = [3, 6, 9, 12, 15, 18]
  } else if (largeNum <= 20) {
    measureList = [4, 8, 12, 16, 20, 24]
  } else if (largeNum <= 25) {
    measureList = [5, 10, 15, 20, 25, 30]
  } else if (largeNum <= 50) {
    measureList = [10, 20, 30, 40, 50, 60]
  } else if (largeNum <= 75) {
    measureList = [15, 30, 45, 60, 75, 90]
  } else if (largeNum <= 120) {
    measureList = [20, 40, 60, 80, 120, 160]
  }

  let MaxNum = measureList[measureList.length - 1]
  return (
    <Wrapper>
      <div className='title'>{title}</div>
      <table>
        <colgroup>
          <col width='30' />
          {numberToArray(colSpan).map((item: any, index) => (
            <col width='20' key={index} />
          ))}
        </colgroup>
        <tbody>
          <tr className='chart'>
            <td rowSpan={7} className='noBorder' />
            <td colSpan={colSpan}>
              <span className='measure'>{measureList[5]}</span>
            </td>
          </tr>
          <tr className='chart'>
            <td colSpan={colSpan}>
              <span className='measure'>{measureList[4]}</span>
            </td>
          </tr>
          <tr className='chart'>
            <td colSpan={colSpan}>
              <span className='measure'>{measureList[3]}</span>
            </td>
          </tr>
          <tr className='chart'>
            <td colSpan={colSpan}>
              <span className='measure'>{measureList[2]}</span>
            </td>
          </tr>
          <tr className='chart'>
            <td colSpan={colSpan}>
              <span className='measure'>{measureList[1]}</span>
            </td>
          </tr>

          <tr className='chart chartBar'>
            {filterList.map((item, index, arr) => (
              <td
                key={index}
                style={{
                  borderLeft: index == 0 ? '1px solid #cccccc' : '',
                  borderRight: index == arr.length - 1 ? '1px solid #cccccc' : ''
                }}
              >
                {index == 0 && (
                  <React.Fragment>
                    <span className='measure'>{measureList[0]}</span>
                    <span className='measure type-0'>0</span>
                  </React.Fragment>
                )}

                <div className='bar-con'>
                  <Bar type={0} y={180 * (Number(item.currentDeductScore) / MaxNum)} />
                  <Bar type={1} y={180 * (Number(item.lastDeductScore) / MaxNum)} />
                </div>
              </td>
            ))}
          </tr>

          <tr className='text'>
            {filterList.map((item, index) => (
              <td key={index}>{item.itemTypeName}</td>
            ))}
          </tr>

          <tr className='score'>
            <td style={{ whiteSpace: 'nowrap' }}>
              <span className='block type-1' />
              {th1}
            </td>
            {filterList.map((item, index) => (
              <td key={index}>{item.currentDeductScore}</td>
            ))}
          </tr>

          <tr className='score'>
            <td style={{ whiteSpace: 'nowrap' }}>
              <span className='block type-2' />
              {th2}
            </td>
            {filterList.map((item, index) => (
              <td key={index}>{item.lastDeductScore}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 10px 50px;
  background: #f9faf0;
  overflow: hidden;
  padding: 15px;
  div.title {
    text-align: center;
    margin: 0 10px 10px;
    font-size: 20px;
    font-weight: bold;
  }
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    table-layout: fixed;
    tr {
      width: 100%;
      &.chart {
        td {
          height: 40px;
        }
      }
      &.chartBar {
        td {
          border: 0;
        }
      }
      &.footer {
        td: {
          height: 30px;
        }
      }
      td.noBorder {
        border: 0;
      }
    }
    td {
      height: 40px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
      position: relative;
    }
    .block {
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: sub;
      margin-right: 5px;
      &.type-1 {
        background: ${(p) => BAR_COLOR[0]};
      }
      &.type-2 {
        background: ${(p) => BAR_COLOR[1]};
      }
    }
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }

  .bar-con {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .measure {
    position: absolute;
    left: -50px;
    top: -10px;
    width: 40px;
    text-align: right;
    &.type-0 {
      top: auto;
      bottom: -10px;
    }
  }
`

const Bar = styled.div<{ type: number; y: number }>`
  width: 20%;
  height: ${(p) => p.y + 'px'};
  background: ${(p) => BAR_COLOR[p.type]};
  position: absolute;
  bottom: 0px;
  max-width: 50px;
  min-width: 10px;
  /* margin: 0 auto; */

  ${(p) =>
    p.type == 0 &&
    `
    left: 22%
    `}
  ${(p) =>
    p.type == 1 &&
    `
    right: 22%
    `}
`
