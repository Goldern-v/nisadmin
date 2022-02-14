import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import { appStore } from 'src/stores'
export interface Props {
  tableData: any[],
  filterObj: any,
  hourMap?: {},
  morningMap?: {},
  nightMap?: {}
}

export default function BedSituation(props: Props) {
  const { tableData, filterObj, hourMap,morningMap,nightMap } = props
  Object.assign(hourMap, {科室: '工时合计'})
  Object.assign(morningMap, {科室: '白班合计'})
  Object.assign(nightMap, {科室: '夜班合计'})
  const vertialTable = [{}, {}, {}, {}, {}, {}, {}, {}]
  const visibleType = Object.keys(filterObj).find((key: string) => filterObj[key].checked)

  const getShiftClass = (() => {
    let colNameList = [] as any[]

    Object.keys(filterObj).forEach((key: string) => {
      let filterList = filterObj[key].list || []
      filterList.filter((item: any) => item.checked).forEach((item: any) => {
        colNameList.push(item.name)
      })
    })

    return colNameList
  })()

  const visibleTable = () => {
    let visibleData = [...tableData.length > 0 ? tableData : vertialTable]

    let sumupRow = { '序列': visibleData.length + 1, '科室': '班次合计' } as any

    visibleData.forEach((item: any) => {
      let keys = Object.keys(item)

      keys.forEach((key: string) => {
        if (!['序列', '科室'].includes(key)) {
          if (sumupRow[key]) {
            sumupRow[key] = sumupRow[key] + item[key]
          } else {
            sumupRow[key] = item[key] || 0
          }
        }
      })
    })
    if(appStore.HOSPITAL_ID === 'lcey') visibleData.push(sumupRow, nightMap, morningMap, hourMap)
    else visibleData.push(sumupRow, hourMap)
    return visibleData
  }
  // useEffect(() => {
  // }, [])

  // th DOM
  const getShiftClassDom = getShiftClass.map((item: any) => <th key={item.toString()}>{item}</th>)

  // td DOM
  const getTdDom = visibleTable()
    .map((itemTr: any, index: number) => (
      <tr key={index}>
        {!(itemTr.科室 || '').match('合计') ? (
          <React.Fragment>
            <td>{itemTr.序列 || index + 1}</td>
            <td>{itemTr.科室}</td>
          </React.Fragment>
        ) : (
          <td colSpan={2}>{itemTr.科室}</td>
        )}
        {getShiftClass.map((itemTd: any, indexTd: number) => {
          if (itemTd === '序列') {
            return <td key={indexTd}>{index + 1}</td>
          } else {
            return <td key={indexTd}>{itemTr[itemTd]}</td>
          }
        })}
        {visibleType ? (
          <td>{itemTr.合计}</td>
        ) : (
          <React.Fragment>
            <td>{itemTr.合计}</td>
            <td>{itemTr.合计1}</td>
          </React.Fragment>
        )}
      </tr>
    ))

  return (
    <Con>
      <div className='tableCon'>
        <div className='tableHead'>
          <table>
            <tbody>
              <tr>
                <th>序号</th>
                <th>科室</th>
                {getShiftClassDom}
                {visibleType ? (
                  <th>合计</th>
                ) : (
                  <React.Fragment>
                    <th>班次大类合计</th>
                    <th>自定义班次合计</th>
                  </React.Fragment>
                )}
              </tr>
              {getTdDom}
            </tbody>
          </table>
        </div>
      </div>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  flex: 1;
  margin-right: 30px;
  margin-bottom: 20px;
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
          height: 20px;
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
