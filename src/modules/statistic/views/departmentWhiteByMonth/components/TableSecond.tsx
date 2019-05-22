// 科室白班统计（按月份)
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'
import { observer } from 'mobx-react-lite'
import spacePhoto from '../../../img/spacePhoto.svg'
export interface Props {
  showType: string
}
export default observer(function BedSituation (props: Props) {
  // const [count, setCount] = useState(0)
  const [bodyTable, setBodyTable] = useState([{}])
  const postDepartmentByMonthMethod = () =>
    StatisticsApi.postDepartmentByMonth(statisticViewModel.whiteBlack, statisticViewModel.hourTime).then((res) => {
      if (res && res.data) {
        setBodyTable(res.data)
      }
    })
  useEffect(() => {
    statisticViewModel.whiteBlack = '白班'
    statisticViewModel.hourTime = props.showType
    postDepartmentByMonthMethod()
  }, [])
  emitter.removeAllListeners('科室白班统计')
  emitter.addListener('科室白班统计', () => {
    if (statisticViewModel.hourTime === '按次数') {
      postDepartmentByMonthMethod()
    }
  })
  function trClickChange (e: any) {
    let parentNode = e.target.parentNode
    let allTr = parentNode.parentNode.querySelectorAll('tr')
    allTr.forEach((item: any) => {
      item.classList.remove('addRowClass')
    })
    parentNode.classList.add('addRowClass')
  }
  let interfaceThDom
  let interfaceTdDom
  let TableShow
  if (bodyTable[0]) {
    let interfaceThData = Object.keys(bodyTable[0])

    interfaceThDom = Object.keys(bodyTable[0]).map((item: any, index: number) => <th>{item}</th>)

    // interface td DOM
    interfaceTdDom = bodyTable.map((itemTr: any, index: number) => (
      <tr key={index} onClick={trClickChange}>
        {interfaceThData.map((itemTd: any, indexTd: number) => {
          if (itemTd === '序号') {
            return <td key={indexTd}>{index + 1}</td>
          } else {
            return <td key={indexTd}>{itemTr[itemTd]}</td>
          }
        })}
      </tr>
    ))

    TableShow = (
      <table>
        <thead>
          <tr>{interfaceThDom}</tr>
        </thead>
        <tbody>{interfaceTdDom}</tbody>
      </table>
    )
  }
  let SpaceShow
  if (!interfaceThDom && !interfaceTdDom) {
    SpaceShow = (
      <SpaceCon>
        <embed src={require('../../../img/spacePhoto.svg')} type='image/svg+xml' />
        <div className='spaceFont'>暂无数据</div>
      </SpaceCon>
    )
  }

  return (
    <Con>
      <div className='tableCon'>
        <div className='tableHead'>
          {TableShow}
          {SpaceShow}
        </div>
      </div>
    </Con>
  )
})

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
      }
      /* 设置整体td */
      td {
        box-sizing: border-box;
        border: 1px solid #d6d6d6;
        border-top: none;
        height: 37px;
      }
    }
    .tableHead {
      th:nth-of-type(1) {
        box-sizing: border-box;
        width: 3%;
      }
    }
    tbody {
      tr:nth-of-type(2n + 2) {
        background: rgba(242, 244, 245, 1);
      }
      .addRowClass {
        background: rgba(228, 233, 235, 1) !important;
      }
      td:nth-of-type(1) {
        box-sizing: border-box;
        width: 3%;
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
`
const SpaceCon = styled.div`
  margin: 20px auto;
  /* width: 200px; */
  text-align: center;
  .spaceFont {
    margin-top: 8px;
    font-size: 16px;
  }
`
