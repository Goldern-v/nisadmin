import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import schedulingStatisticsApi from 'src/modules/statistic/views/api/schedulingStatisticsApi'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
export default function BedSituation () {
  // const [count, setCount] = useState(0)
  const [getShiftClass, setGetShiftClass] = useState(['A班', 'P班', 'N班', '休假', '进修学习', '其它'])
  const [getCheckboxItem, setGetCheckboxItem] = useState([])
  const [getTableList, setGetTableList] = useState([])
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
    schedulingStatisticsApi.postNurseByShiftView(tableData).then((res: any) => {
      setGetTableList(res.data)
      console.log(getTableList)
    })
  }, [])
  function trClickChange (e: any) {
    let parentNode = e.target.parentNode
    let allTr = parentNode.parentNode.querySelectorAll('tr')
    allTr.forEach((item: any) => {
      item.classList.remove('addRowClass')
    })
    parentNode.classList.add('addRowClass')
  }
  // th DOM
  const getShiftClassDom = getShiftClass.map((item: any) => <th key={item.toString()}>{item}</th>)
  const getCheckboxItemDom = getCheckboxItem.map((item: any) => <th key={item.toString()}>{item}</th>)
  // td DOM
  const getTdDom = getTableList.map((itemTr: any, index: number) => (
    <tr key={index} onClick={trClickChange}>
      <td>{itemTr.序列}</td>
      <td>{itemTr.姓名}</td>
      {getShiftClass.map((itemTd: any, indexTd: number) => (
        <td key={indexTd}>{itemTr[itemTd]}</td>
      ))}
      <td>66</td>
    </tr>
  ))
  return (
    <Con>
      <div className='tableCon'>
        <div className='tableHead'>
          <table>
            <tr>
              <th>序号</th>
              <th>科室</th>
              {getShiftClassDom}
              {getCheckboxItemDom}
              <th>合计</th>
            </tr>
          </table>
        </div>
        <div className='tableMid'>
          <div className='tableMidCon'>
            <table>{getTdDom}</table>
          </div>
        </div>
      </div>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  display: flex;
  .tableCon {
    /* width: 540px; */
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
        width: 60px;
      }
      /* 设置整体td */
      td {
        box-sizing: border-box;
        border: 1px solid #d6d6d6;
        border-top: none;
        height: 37px;
        width: 60px;
      }
    }
    .tableHead {
      th:nth-of-type(1) {
        box-sizing: border-box;
        width: 30px;
      }
      th:nth-of-type(2) {
        box-sizing: border-box;
        width: 80px;
      }
      th:nth-of-type(3) {
        box-sizing: border-box;
        width: 60px;
      }
      th:nth-of-type(9) {
        /* width: 60px; */
      }
    }
    .tableMid {
      width: 640px;
      overflow-x: hidden;
      overflow-y: auto;
      height: 180px;
      .tableMidCon {
        width: 640px;
        table {
          tr:nth-of-type(2n + 2) {
            background: rgba(242, 244, 245, 1);
          }
          td {
            box-sizing: border-box;
            width: 60px;
          }
          .addRowClass {
            background: rgba(228, 233, 235, 1) !important;
          }
          td:nth-of-type(1) {
            box-sizing: border-box;
            width: 30px;
          }
          td:nth-of-type(2) {
            box-sizing: border-box;
            width: 80px;
          }
          td:nth-of-type(3) {
            box-sizing: border-box;
            width: 60px;
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
