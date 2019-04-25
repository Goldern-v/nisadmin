// 护士排班表
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
  // cache th data
  const thData = [
    '序号',
    '姓名',
    '职称',
    '层级',
    '3月04(周一)',
    '3月05(周二)',
    '3月06(周三)',
    '3月07(周四)',
    '3月08(周五)',
    '3月09(周六)',
    '3月10(周日)'
  ]
  // cache td data
  const tdData = [
    {
      xh: 1,
      xm: '赵芳',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A2',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A4'
    },
    {
      xh: 2,
      xm: '李楚清',
      zc: '护士',
      cj: 'N1',
      d1: 'P1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A3',
      d5: 'A1',
      d6: 'A1',
      d7: 'A4'
    },
    {
      xh: 3,
      xm: '王丽',
      zc: '护士长',
      cj: 'N6',
      d1: 'N1',
      d2: 'A3',
      d3: 'A1',
      d4: 'A2',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 4,
      xm: '周倩',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'N1',
      d3: 'A5',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A1'
    },
    {
      xh: 5,
      xm: '王春蓝',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A5',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A2'
    },
    {
      xh: 6,
      xm: '吴起飞',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A5',
      d3: 'A2',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A5'
    },
    {
      xh: 7,
      xm: '卞晓丽',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A2',
      d3: 'A1',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 9,
      xm: '李想',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A1',
      d4: 'A3',
      d5: 'A1',
      d6: 'A1',
      d7: 'A6'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    },
    {
      xh: 8,
      xm: '祝晓春',
      zc: '护士',
      cj: 'N1',
      d1: 'A1',
      d2: 'A1',
      d3: 'A3',
      d4: 'A1',
      d5: 'A1',
      d6: 'A1',
      d7: 'A3'
    }
  ]
  // cache th DOM
  const thDom = thData.map((item: any) => <th key={item.toString()}>{item}</th>)
  // cache td DOM
  const tdDom = tdData.map((itemTr: any, index: any) => (
    <tr key={index} onClick={trClickChange}>
      <td>{itemTr.xh}</td>
      <td>{itemTr.xm}</td>
      <td>{itemTr.zc}</td>
      <td>{itemTr.cj}</td>
      <td>{itemTr.d1}</td>
      <td>{itemTr.d2}</td>
      <td>{itemTr.d3}</td>
      <td>{itemTr.d4}</td>
      <td>{itemTr.d5}</td>
      <td>{itemTr.d6}</td>
      <td>{itemTr.d7}</td>
    </tr>
  ))
  return (
    <Con>
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
            <table>{tdDom}</table>
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
