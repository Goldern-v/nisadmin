// 护士白班统计（按月份)
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'

export default function BedSituation () {
  // const [count, setCount] = useState(0)
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    let startTime = statisticViewModel.startDate
    let endTime = statisticViewModel.endDate
    console.log()
    // console.log(222)
  })
  function trClickChange (e: any) {
    let parentNode = e.target.parentNode
    let allTr = parentNode.parentNode.querySelectorAll('tr')
    allTr.forEach((item: any) => {
      item.classList.remove('addRowClass')
    })
    parentNode.classList.add('addRowClass')
  }
  // th DOM
  // const getShiftClassDom = getShiftClass.map((item: any) => <th key={item.toString()}>{item}</th>)
  // const getCheckboxItemDom = getCheckboxItem.map((item: any) => <th key={item.toString()}>{item}</th>
  // cache th data
  const thData = [
    '序号',
    '姓名',
    '2019年1月',
    '2019年2月',
    '2019年3月',
    '2019年4月',
    '2019年5月',
    '2019年6月',
    '2019年7月',
    '2019年8月',
    '2019年9月',
    '合计'
  ]
  // cache td data
  const tdData = [
    {
      xh: 1,
      xm: '祝晓春',
      mounth1: '2903',
      mounth2: '3005',
      mounth3: '2302',
      mounth4: '3106',
      mounth5: '0',
      mounth6: '0',
      mounth7: '0',
      mounth8: '0',
      mounth9: '0',
      xj: '11316'
    },
    {
      xh: 2,
      xm: '杜丽娜',
      mounth1: '2903',
      mounth2: '3005',
      mounth3: '2302',
      mounth4: '3106',
      mounth5: '0',
      mounth6: '0',
      mounth7: '0',
      mounth8: '0',
      mounth9: '0',
      xj: '11316'
    },
    {
      xh: 3,
      xm: '王重光',
      mounth1: '2816',
      mounth2: '3103',
      mounth3: '2303',
      mounth4: '3124',
      mounth5: '0',
      mounth6: '0',
      mounth7: '0',
      mounth8: '0',
      mounth9: '0',
      xj: '11346'
    },
    {
      xh: 4,
      xm: '赵平志',
      mounth1: '2873',
      mounth2: '3103',
      mounth3: '2607',
      mounth4: '3109',
      mounth5: '0',
      mounth6: '0',
      mounth7: '0',
      mounth8: '0',
      mounth9: '0',
      xj: '11692'
    },
    {
      xh: 5,
      xm: '王春蓝',
      mounth1: '3009',
      mounth2: '2863',
      mounth3: '2532',
      mounth4: '2910',
      mounth5: '0',
      mounth6: '0',
      mounth7: '0',
      mounth8: '0',
      mounth9: '0',
      xj: '11314'
    },
    {
      xh: 6,
      xm: '王安水',
      mounth1: '2965',
      mounth2: '3231',
      mounth3: '2987',
      mounth4: '2993',
      mounth5: '0',
      mounth6: '0',
      mounth7: '0',
      mounth8: '0',
      mounth9: '0',
      xj: '12176'
    }
  ]
  // cache th DOM
  const thDom = thData.map((item: any) => <th key={item.toString()}>{item}</th>)
  // cache td DOM
  const tdDom = tdData.map((itemTr: any, index: any) => (
    <tr key={index} onClick={trClickChange}>
      <td>{itemTr.xh}</td>
      <td>{itemTr.xm}</td>
      <td>{itemTr.mounth1}</td>
      <td>{itemTr.mounth2}</td>
      <td>{itemTr.mounth3}</td>
      <td>{itemTr.mounth4}</td>
      <td>{itemTr.mounth5}</td>
      <td>{itemTr.mounth6}</td>
      <td>{itemTr.mounth7}</td>
      <td>{itemTr.mounth8}</td>
      <td>{itemTr.mounth9}</td>
      <td>{itemTr.xj}</td>
    </tr>
  ))
  return (
    <Con className='addClass'>
      <div className='tableCon'>
        <div className='tableHead'>
          <table>
            <tr>
              {thDom}
              {/* {getShiftClassDom} */}
              {/* {getCheckboxItemDom} */}
            </tr>
          </table>
        </div>
        <div className='tableMid'>
          <div className='tableMidCon'>
            <table>
              {tdDom}
              <tr>
                <td />
                <td>合 计</td>
                <td>17370</td>
                <td>18406</td>
                <td>18038</td>
                <td>18364</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>60961</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </Con>
  )
}

const Con = styled.div`
  .tableCon {
    table {
      width: 100%;
      border: 1px solid #d6d6d6;
      border-top: none;
      /* 整体字体设置下*/
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(103, 103, 103, 1);
      /* 整体字体设置 上*/
      border-collapse: collapse;
      text-align: center;
      /* 设置整体th */
      th {
        box-sizing: border-box;
        border: 1px solid #d6d6d6;
        height: 37px;
        background: rgba(242, 244, 245, 1);
        width: 6%;
      }
      /* 设置整体td */
      td {
        box-sizing: border-box;
        border: 1px solid #d6d6d6;
        border-top: none;
        height: 37px;
        width: 6%;
      }
    }
    .tableHead {
      th:nth-of-type(1) {
        box-sizing: border-box;
        width: 3%;
      }
      th:nth-of-type(2) {
        box-sizing: border-box;
        width: 8%;
      }
      th:nth-of-type(3) {
        box-sizing: border-box;
        width: 6%;
      }
      th:nth-of-type(9) {
        /* width: 60px; */
      }
    }
    .tableMid {
      overflow-x: hidden;
      overflow-y: auto;
      .tableMidCon {
        table {
          tr:nth-of-type(2n + 2) {
            background: rgba(242, 244, 245, 1);
          }
          td {
            box-sizing: border-box;
            width: 6%;
          }
          .addRowClass {
            background: rgba(228, 233, 235, 1) !important;
          }
          td:nth-of-type(1) {
            box-sizing: border-box;
            width: 3%;
          }
          td:nth-of-type(2) {
            box-sizing: border-box;
            width: 8%;
          }
          td:nth-of-type(3) {
            box-sizing: border-box;
            width: 6%;
          }
        }
      }
    }
    .tableMid::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .tableMid::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 6px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(194, 194, 194, 1);
    }
    .tableMid::-webkit-scrollbar-track {
      padding: 0 1px;
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      /* border-radius: 10px; */
      background: rgba(237, 237, 237, 1);
    }
  }
`
