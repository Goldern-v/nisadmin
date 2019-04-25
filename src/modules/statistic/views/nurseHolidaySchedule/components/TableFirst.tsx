// 护士节假日排班表
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
export default function BedSituation () {
  // const [count, setCount] = useState(0)
  const [getShiftClass, setGetShiftClass] = useState(['A班', 'P班', 'N班', '休假', '进修学习', '其它'])
  const [getCheckboxItem, setGetCheckboxItem] = useState([])
  useEffect(() => {
    // console.log(222)
    emitter.removeAllListeners('设置班次大类')
    emitter.addListener('设置班次大类', (shiftClass: any) => {
      setGetShiftClass(shiftClass)
    })
    emitter.removeAllListeners('设置自定义班次')
    emitter.addListener('设置自定义班次', (checkboxItem: any) => {
      setGetCheckboxItem(checkboxItem)
    })
    let tableData = getShiftClass.concat(getCheckboxItem).join(',')
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

  // cache td data
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
      xm: '杜丽娜',
      month1: '2903',
      month2: '3005',
      month3: '2302',
      month4: '3106',
      month5: '0',
      month6: '0',
      month7: '0',
      month8: '0',
      month9: '0',
      xj: '11316'
    },
    {
      xh: 2,
      xm: '王重光',
      month1: '2810',
      month2: '3102',
      month3: '2305',
      month4: '3123',
      month5: '0',
      month6: '0',
      month7: '0',
      month8: '0',
      month9: '0',
      xj: '11340'
    },
    {
      xh: 3,
      xm: '王伟',
      month1: '2873',
      month2: '3103',
      month3: '2607',
      month4: '3109',
      month5: '0',
      month6: '0',
      month7: '0',
      month8: '0',
      month9: '0',
      xj: '11692'
    },
    {
      xh: 4,
      xm: '周倩',
      month1: '3009',
      month2: '2863',
      month3: '2532',
      month4: '2910',
      month5: '0',
      month6: '0',
      month7: '0',
      month8: '0',
      month9: '0',
      xj: '11314'
    },
    {
      xh: 5,
      xm: '王春蓝',
      month1: '2965',
      month2: '3231',
      month3: '2987',
      month4: '2993',
      month5: '0',
      month6: '0',
      month7: '0',
      month8: '0',
      month9: '0',
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
      <td>{itemTr.month1}</td>
      <td>{itemTr.month2}</td>
      <td>{itemTr.month3}</td>
      <td>{itemTr.month4}</td>
      <td>{itemTr.month5}</td>
      <td>{itemTr.month6}</td>
      <td>{itemTr.month7}</td>
      <td>{itemTr.month8}</td>
      <td>{itemTr.month9}</td>

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
                <td>14560</td>
                <td>15304</td>
                <td>12733</td>
                <td>15241</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>57838</td>
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
