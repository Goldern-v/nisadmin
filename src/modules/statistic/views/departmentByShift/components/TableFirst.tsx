import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
export default function BedSituation () {
  // 
  const [getShiftClass, setGetShiftClass] = useState(['A班', 'P班', 'N班', '休假', '进修学习', '其它'])
  const [getCheckboxItem, setGetCheckboxItem] = useState([])
  const [getTableList, setGetTableList] = useState([])
  const [changeClass, setChangeClass] = useState('')
  const [classItem, setClassItem] = useState('')
  const postDepartmentByShiftViewMethod = () =>
    StatisticsApi.postDepartmentByShiftView(changeClass, classItem).then((res: any) => {
      if (res.data) {
        let addLength = 8 - res.data.length
        if (addLength > 0) {
          for (let i = 0; i < addLength; i++) {
            res.data.push({ 序列: '' })
          }
        }
        setGetTableList(res.data)
      }
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
        StatisticsApi.postDepartmentByShiftView('按班次大类', cacheGetShiftClass).then((res: any) => {
          if (res.data) {
            let addLength = 8 - res.data.length
            if (addLength > 0) {
              for (let i = 0; i < addLength; i++) {
                res.data.push({ 序列: '' })
              }
            }
            setGetTableList(res.data)
          }
        })
      }
    })
    emitter.removeAllListeners('设置自定义班次')
    emitter.addListener('设置自定义班次', (checkboxItem: any) => {
      setGetCheckboxItem(checkboxItem)
      if (checkboxItem.length) {
        let cacheCheckboxItem = checkboxItem.join(',')
        statisticViewModel.classDiff = '自定义班次'
        statisticViewModel.classItem = cacheCheckboxItem
        setChangeClass('按班次大类')
        setClassItem(cacheCheckboxItem)
        StatisticsApi.postDepartmentByShiftView('自定义班次', cacheCheckboxItem).then((res: any) => {
          if (res.data) {
            let addLength = 8 - res.data.length
            if (addLength > 0) {
              for (let i = 0; i < addLength; i++) {
                res.data.push({ 序列: '' })
              }
            }
            setGetTableList(res.data)
          }
        })
      }
    })
  }, [])
  emitter.removeAllListeners('科室排班按班次')
  emitter.addListener('科室排班按班次', () => {
    postDepartmentByShiftViewMethod()
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
      <td>{itemTr.科室}</td>
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
      <td>{itemTr.科室}</td>

      {getShiftClass.map((itemTd: any, indexTd: number) => {
        if (itemTd === '序列') {
          return <td key={indexTd}>{index + 1}</td>
        } else {
          return <td key={indexTd}>{itemTr[itemTd]}</td>
        }
      })}
      {getCheckboxItem.map((itemTd: any, indexTd: number) => {
        if (itemTd === '序列') {
          return <td key={indexTd}>{index + 1}</td>
        } else {
          return <td key={indexTd}>{itemTr[itemTd]}</td>
        }
      })}
      <td>{itemTr.合计}</td>
    </tr>
  ))
  const SpaceShow = (
    <SpaceCon>
      <embed src={require('../../../img/spacePhoto.svg')} type='image/svg+xml' />
      <div className='spaceFont'>暂无数据</div>
    </SpaceCon>
  )
  if (getTableList.length < 8) {
    let addLength = 8 - getTableList.length
    if (addLength > 0) {
      let cacheTableList: any = [...getTableList]
      for (let i = 0; i < addLength; i++) {
        cacheTableList.push({ 序列: '' })
      }
      setGetTableList(cacheTableList)
    }
  }
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
            {getTdDom}
          </table>
        </div>
        {/* <div className='tableMid'>
          <div className='tableMidCon'>
            <table>{getTdDom ? getTdDom : SpaceShow}</table>
          </div>
        </div> */}
      </div>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  flex: 1;
  margin-right: 30px;
  overflow: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
  .tableCon {
    .tableHead {
      table {
        margin: 0 auto;
        overflow-x: auto;
        border: 1px solid #d6d6d6;
        border-top: none;
        /* 整体字体设置下*/
        /* 整体字体设置 上*/
        border-collapse: collapse;
        text-align: center;
        /* 设置整体th */
        th {
          box-sizing: border-box;
          padding: 0;
          border: 1px solid #d6d6d6;
          background: rgba(242, 244, 245, 1);
          min-width: 60px;
          font-weight: bold;
        }
        /* 设置整体td */
        td {
          box-sizing: border-box;
          padding: 0;
          border: 1px solid #d6d6d6;
          min-width: 60px;
          border-top: none;
          /* width: 6%; */
        }
        th:nth-of-type(1) {
          box-sizing: border-box;
          min-width: 60px;
        }
        th:nth-of-type(2) {
          box-sizing: border-box;
          min-width: 150px;
        }

        td:nth-of-type(1) {
          box-sizing: border-box;
          min-width: 60px;
        }
        td:nth-of-type(2) {
          box-sizing: border-box;
          min-width: 150px;
        }
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
const SpaceCon = styled.div``
