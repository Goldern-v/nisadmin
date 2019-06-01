import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'

export default function BedSituation () {
  // const [count, setCount] = useState(0)
  const [getShiftClass, setGetShiftClass] = useState(['A班', 'P班', 'N班', '休假', '进修学习', '其它'])
  const [getCheckboxItem, setGetCheckboxItem] = useState([])
  const [getTableList, setGetTableList] = useState([])
  const [changeClass, setChangeClass] = useState('')
  const [classItem, setClassItem] = useState('')
  const postNurseByShiftViewMethod = () =>
    StatisticsApi.postNurseByShiftView(changeClass, classItem).then((res: any) => {
      setGetTableList(res.data)
    })
  useEffect(() => {
    // console.log(222)
    emitter.removeAllListeners('设置班次大类')
    emitter.addListener('设置班次大类', (shiftClass: any) => {
      setGetShiftClass(shiftClass)
      let tableData = getShiftClass.concat(getCheckboxItem).join(',')
      if (shiftClass.length) {
        let cacheGetShiftClass = shiftClass.join(',')
        statisticViewModel.classDiff = '按班次大类'
        statisticViewModel.classItem = cacheGetShiftClass
        setChangeClass('按班次大类')
        setClassItem(cacheGetShiftClass)
        let postNurseByShiftView = () => {
          StatisticsApi.postNurseByShiftView('按班次大类', cacheGetShiftClass).then((res: any) => {
            setGetTableList(res.data)
            console.log(getTableList)
          })
        }
        postNurseByShiftView()
      }
    })
    emitter.removeAllListeners('设置自定义班次')
    emitter.addListener('设置自定义班次', (checkboxItem: any) => {
      setGetCheckboxItem(checkboxItem)
      if (checkboxItem.length) {
        let cacheCheckboxItem = checkboxItem.join(',')
        statisticViewModel.classDiff = '自定义班次'
        statisticViewModel.classItem = cacheCheckboxItem
        setChangeClass('自定义班次')
        setClassItem(cacheCheckboxItem)
        let postNurseByShiftView = () => {
          StatisticsApi.postNurseByShiftView('自定义班次', cacheCheckboxItem).then((res: any) => {
            setGetTableList(res.data)
            console.log(getTableList)
          })
        }
        postNurseByShiftView()
      }
    })
  }, [])
  emitter.removeAllListeners('护士排班按班次')
  emitter.addListener('护士排班按班次', () => {
    console.log(555555)
    postNurseByShiftViewMethod()
  })
  function trClickChange (e: any) {
    let parentNode = e.target.parentNode
    let allTr = parentNode.parentNode.querySelectorAll('tr')
    allTr.forEach((item: any) => {
      item.classList.remove('addRowClass')
    })
    parentNode.classList.add('addRowClass')
  }
  // Cache Td date
  const tdCacheDate = [
    { 序列: 1, 姓名: '杨好', A班: 2, P班: 5, N班: 2, 休假: 3, 进修学习: 2, 其它: 5 },
    { 序列: 2, 姓名: '王佩', A班: 2, P班: 5, N班: 2, 休假: 3, 进修学习: 2, 其它: 5 },
    { 序列: 3, 姓名: '李楚清', A班: 2, P班: 5, N班: 2, 休假: 3, 进修学习: 2, 其它: 5 },
    { 序列: 4, 姓名: '祝晓春', A班: 2, P班: 5, N班: 2, 休假: 3, 进修学习: 2, 其它: 5 },
    { 序列: 5, 姓名: '卞晓丽', A班: 2, P班: 5, N班: 2, 休假: 3, 进修学习: 2, 其它: 5 }
  ]
  // Cache Td DOM
  const cacheGetDom = tdCacheDate.map((itemTr: any, index: number) => (
    <tr key={index} onClick={trClickChange}>
      <td>{itemTr.序列}</td>
      <td>{itemTr.姓名}</td>
      {getShiftClass.map((itemTd: any, indexTd: number) => (
        <td key={indexTd}>{itemTr[itemTd]}</td>
      ))}
      <td />
    </tr>
  ))
  // th DOM
  const getShiftClassDom = getShiftClass.map((item: any) => <th key={item.toString()}>{item}</th>)
  const getCheckboxItemDom = getCheckboxItem.map((item: any) => <th key={item.toString()}>{item}</th>)
  // td DOM
  const getTdDom = getTableList.map((itemTr: any, index: number) => (
    <tr key={index} onClick={trClickChange}>
      <td>{itemTr.序列}</td>
      <td>{itemTr.姓名}</td>
      {getShiftClass.map((itemTd: any, indexTd: number) => {
        if (itemTd === '序号') {
          return <td key={indexTd}>{index + 1}</td>
        } else {
          return <td key={indexTd}>{itemTr[itemTd]}</td>
        }
      })}
      {getCheckboxItem.map((itemTd: any, indexTd: number) => {
        if (itemTd === '序号') {
          return <td key={indexTd}>{index + 1}</td>
        } else {
          return <td key={indexTd}>{itemTr[itemTd]}</td>
        }
      })}
      <td>{itemTr.合计}</td>
    </tr>
  ))
  return (
    <Con>
      <div className='tableCon'>
        <div className='tableHead'>
          <table>
            <tr>
              <th>序号</th>
              <th>姓名</th>
              {getShiftClassDom}
              {getCheckboxItemDom}
              <th>小计</th>
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
  flex: 1;
  padding-right: 5%;
  .tableCon {
    width: 98%;
    table {
      width: 100%;
      border: 1px solid #d6d6d6;
      border-top: none;
      /* 整体字体设置下*/
      font-size: 14px;
      color: rgba(103, 103, 103, 1);
      /* 整体字体设置 上*/
      border-collapse: collapse;
      text-align: center;
      /* 设置整体th */
      th {
        box-sizing: border-box;
        padding: 0;
        border: 1px solid #d6d6d6;
        height: 30px;
        background: rgba(242, 244, 245, 1);
        width: 6%;
        font-weight: bold;
      }
      /* 设置整体td */
      td {
        box-sizing: border-box;
        padding: 0;
        height: 26px;
        font-size: 13px;
        border: 1px solid #d6d6d6;
        border-top: none;
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
      width: 100%;
      overflow: hidden;
      /* overflow-y: auto; */
      /* height: 380px; */
      .tableMidCon {
        width: calc(100%+20px);
        table {
          /* width: 100%; */
          /* tr:nth-of-type(2n + 2) {
            background: rgba(242, 244, 245, 1);
          } */
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
            min-width: 6%;
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
