import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report } from '../../types'
import { badEventReportModel } from './../../BadEventReportModel'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  list: TypeCompare[]
  title: string
}

const BAR_COLOR = ['#00A680', '#EBA65B']

export default function Chart(props: Props) {
  let { list, title } = props
  let report: Report = badEventReportModel.getDataInAllData('report')
  let filterList = list.filter((item) => item.itemTypeName !== '总扣分')
  let colSpan = filterList.length
  let largeNum = Math.max(
    ...filterList.map((item) => Number(item.currentDeductScore)),
    ...filterList.map((item) => Number(item.lastDeductScore))
  )
  // let measureList = [1, 2, 3, 4, 5, 6]
  let measureList = [5, 10, 15, 20, 25, 30]
  let MaxNum = 30
  return (
    <Wrapper>
      <div className='title'>{title}</div>
      <table>
        <colgroup>
          <col width='20' />
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
            <td>
              <span className='block type-1' />
              {report.indexInType}月{' '}
            </td>
            {filterList.map((item, index) => (
              <td key={index}>{item.currentDeductScore}</td>
            ))}
          </tr>

          <tr className='score'>
            <td>
              {' '}
              <span className='block type-2' />
              {report.indexInType - 1}月{' '}
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
