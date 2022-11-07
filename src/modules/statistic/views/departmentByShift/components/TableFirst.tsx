import styled from 'styled-components'
import React from 'react'
// import emitter from 'src/libs/ev'
// import service from 'src/services/api'
// import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'
// import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import { appStore } from 'src/stores'
export interface Props {
  tableData: any[],
  filterObj: any,
  hourMap?: {},
  morningMap?: {},
  nightMap?: {},
  statusRadio?: String,
  byHours?: any
}

export default function BedSituation(props: Props) {
  const { tableData, filterObj, hourMap, morningMap, nightMap, statusRadio, byHours } = props
  hourMap && Object.assign(hourMap, {科室: '工时合计'})
  morningMap && Object.assign(morningMap, {科室: '白班合计'})
  nightMap && Object.assign(nightMap, {科室: '夜班合计'})
  const byHourNightMap = {...nightMap, 科室: '合计'}
  const byHourMorningMap = {...morningMap, 科室: '合计'}
  
  const vertialTable = [{}, {}, {}, {}, {}, {}, {}, {}]
  const visibleType = Object.keys(filterObj).find((key: string) => filterObj[key].checked)
  console.log(visibleType,filterObj, 8888888888)
  
  const {morningHourTableData, nightHourTableData} = byHours

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
            sumupRow[key] = (Number(sumupRow[key] + item[key])).toFixed(2)
          } else {
            sumupRow[key] = Number(item[key]).toFixed(2) || 0
          }
        }
      })
    })
    if(['lcey', 'lyyz'].includes(appStore.HOSPITAL_ID)) {
      if (statusRadio === '1') {
        visibleData.push(sumupRow, nightMap, morningMap, hourMap)
      } else {
        visibleData.push(hourMap)
      }
    }
    else visibleData.push(sumupRow, hourMap)

    return visibleData
  }

  const visibleTable_byHour = () => {
    let visibleData_byHour = [...nightHourTableData.length > 0 ? nightHourTableData : vertialTable]
    return visibleData_byHour
  }

  // th DOM
  const getShiftClassDom = getShiftClass.map((item: any) => {
    return <th key={item.toString()}>{item}</th>
  })

  const getShiftClassDom_byHour1 = getShiftClass.map((item: any) => {
    return <th colSpan={2} key={item.toString()}>{item}</th>
    
  })
  const getShiftClassDom_byHour2 = getShiftClass.map((item: any) => {
    let y = ['白小时', '夜小时']
    return y.map((it: any) => <th key={it.toString()}>{it}</th>)
  })

  // td DOM
  const getTdDom = visibleTable()
    .map((itemTr: any, index: number) => {
      return (
        <tr key={index}>
          {!(itemTr.科室 || '').match('合计') ? (
            <React.Fragment>
              <td>{itemTr.序列 || index + 1}</td>
              <td className="administrative">{itemTr.科室}</td>
            </React.Fragment>
          ) : (
            <td colSpan={2}>{Number(itemTr.科室).toFixed(2)}</td>
          )}
          {getShiftClass.map((itemTd: any, indexTd: number) => {
            if (itemTd === '序列') {
              return <td key={indexTd}>{index + 1}</td>
            } else {
              // return <td key={indexTd}>{itemTr[itemTd]}</td>
              return <td key={indexTd}>{itemTr[itemTd] ? Number(itemTr[itemTd]).toFixed(2) : '0.00'}</td>
            }
          })}
          {visibleType ? (
            <td>{itemTr.合计 ? Number(itemTr.合计).toFixed(2) : '0.00'}</td>
          ) : (
            <React.Fragment>
              <td>{itemTr.合计}</td>
              <td>{itemTr.合计1}</td>
            </React.Fragment>
          )}
        </tr>
      )
    })
    
    // td DOM
    const getTdDom2 = visibleTable()
    .map((itemTr: any, index: number) => (
      <tr key={index} >
        {!(itemTr.科室 || '').match('合计') ? (
          <React.Fragment>
            <td>{itemTr.序列 || index + 1}</td>
            <td className="administrative">{itemTr.科室}</td>
          </React.Fragment>
        ) : (
          <td className="administrative" colSpan={2}>{itemTr.科室}</td>
        )}
        {/* {getShiftClass.map((itemTd: any, indexTd: number) => {
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
        )} */}
      </tr>
    ))

  const getTdDom_byHour = visibleTable_byHour()
  .map((itemTr: any, index: number) => {
    return (
      <tr key={index}>
        {!(itemTr.科室 || '').match('合计') ? (
          <React.Fragment>
            <td>{itemTr.序列 || index + 1}</td>
            <td className="administrative">{itemTr.科室}</td>
          </React.Fragment>
        ) : (
          <td className="administrative" colSpan={2}>{itemTr.科室}</td>
        )}
        {getShiftClass.map((itemTd: any, indexTd: number) => {
          let arr = ['白小时', '夜小时']
          return arr.map((item, i) => {
            if (itemTd === '序列') {
              return <td key={indexTd}>{index + 1}</td>
            } else {
              return (i%2) !== 0  ? <td key={indexTd}>{itemTr[itemTd]}</td> : <td key={indexTd + 1}>{morningHourTableData[index] && morningHourTableData[index][itemTd]}</td>
            }
          })
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
    )
    
  })

  const getTdDom_byHour2 = visibleTable_byHour()
  .map((itemTr: any, index: number) => {
    return (
      <tr key={index}>
        {!(itemTr.科室 || '').match('合计') ? (
          <React.Fragment>
            <td>{itemTr.序列 || index + 1}</td>
            <td className='administrative'>{itemTr.科室}</td>
          </React.Fragment>
        ) : (
          <td className='administrative' colSpan={2}>{itemTr.科室}</td>
        )}
        {/* {getShiftClass.map((itemTd: any, indexTd: number) => {
          let arr = ['白小时', '夜小时']
          return arr.map((item, i) => {
            if (itemTd === '序列') {
              return <td key={indexTd}>{index + 1}</td>
            } else {
              return (i%2) !== 0  ? <td key={indexTd}>{itemTr[itemTd]}</td> : <td key={indexTd + 1}>{morningHourTableData[index] && morningHourTableData[index][itemTd]}</td>
            }
          })
        })} */}
        {/* {visibleType ? (
          <td>{itemTr.合计}</td>
        ) : (
          <React.Fragment>
            <td>{itemTr.合计}</td>
            <td>{itemTr.合计1}</td>
          </React.Fragment>
        )} */}
      </tr>
    )
    
  })


  
  getTdDom_byHour.push(
    <tr>
      {/* <td>{visibleTable_byHour().length + 1}</td> */}
      <td colSpan={2}>合计</td>
      {getShiftClass.map((itemTd: any, indexTd: number) => {
        let arr = ['白小时', '夜小时']
        return arr.map((item, i) => (i%2) !== 0  ? <td key={indexTd}>{byHourNightMap[itemTd]}</td> : <td key={indexTd + 1}>{byHourMorningMap[itemTd]}</td>)
      })}
      {visibleType ? (
        <td>{byHourNightMap['合计'] + byHourMorningMap['合计']}</td>
      ) : (
        <React.Fragment>
          <td>{byHourNightMap['合计'] + byHourMorningMap['合计']}</td>
          <td>{byHourNightMap['合计1'] + byHourMorningMap['合计1']}</td>
        </React.Fragment>
      )}
    </tr>
  )
  // getTdDom_byHour2.push(
  //   <tr>
  //     {/* <td>{visibleTable_byHour().length + 1}</td> */}
  //     <td colSpan={2}>合计</td>
  //     {getShiftClass.map((itemTd: any, indexTd: number) => {
  //       let arr = ['白小时', '夜小时']
  //       return arr.map((item, i) => (i%2) !== 0  ? <td key={indexTd}>{byHourNightMap[itemTd]}</td> : <td key={indexTd + 1}>{byHourMorningMap[itemTd]}</td>)
  //     })}
  //     {visibleType ? (
  //       <td>{byHourNightMap['合计'] + byHourMorningMap['合计']}</td>
  //     ) : (
  //       <React.Fragment>
  //         <td>{byHourNightMap['合计'] + byHourMorningMap['合计']}</td>
  //         <td>{byHourNightMap['合计1'] + byHourMorningMap['合计1']}</td>
  //       </React.Fragment>
  //     )}
  //   </tr>
  // )

  const onScroll = () => {
    const exerciseContainerRoot = (document.getElementsByClassName('tableTrCon') as HTMLCollectionOf<HTMLElement>)[0];
    const tableFixedFlet =  (document.getElementsByClassName('table-fixed_flet') as HTMLCollectionOf<HTMLElement>)[0];
    tableFixedFlet.scrollTop = exerciseContainerRoot?.scrollTop
  }

  return (
      <Con className='table' onScroll={onScroll}>
        <div className='tableCon'>
          <div className='tableHead'>
            <table style={{margin: (tableData.length === 0 || nightHourTableData.length === 0) ? '0 auto' : ''}}>
              <tbody>
              {statusRadio ==='1' ? 
                <div style={{display: 'flex'}}>
                  <tr className='fixed_flet_title' style={{display: (tableData.length === 0) ? 'none' : 'block'}}>
                    <th>序号</th>
                    <th className='administrative'>科室</th>
                  </tr>
                  <div className='table-fixed_flet' style={{display: (tableData.length === 0) ? 'none' : 'block'}}>
                    {getTdDom2}
                  </div>
                  <div>
                    <tr>
                      <th>序号</th>
                      <th className='administrative'>科室</th>
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
                    <div className='tableTrCon'>
                      {getTdDom}
                    </div>
                  </div>
                </div> 
                :
                <div style={{display: 'flex'}}>
                  <tr className='fixed_flet_title' style={{display: (nightHourTableData.length === 0) ? 'none' : 'block'}}>
                    <th style={{'verticalAlign': 'middle', height: '41px'}} rowSpan={2}>序号</th>
                    <th style={{'verticalAlign': 'middle'}} className='administrative' rowSpan={2}>科室</th>
                  </tr>
                  <div className='table-fixed_flet byHour2' style={{display: (nightHourTableData.length === 0) ? 'none' : 'block'}}>
                    {getTdDom_byHour2}
                    {visibleType ? (
                      <td style={{'verticalAlign': 'middle'}} colSpan={2}>合计</td>
                    ) : (
                      <React.Fragment>
                        <td>班次大类合计</td>
                        <td>自定义班次合计</td>
                      </React.Fragment>
                    )}
                  </div>
                  <div>
                    <tr>
                      <th style={{'verticalAlign': 'middle', height: '41px'}} rowSpan={2}>序号</th>
                      <th style={{'verticalAlign': 'middle'}} className='administrative' rowSpan={2}>科室</th>
                      {getShiftClassDom_byHour1}
                      {visibleType ? (
                        <th style={{'verticalAlign': 'middle', borderTop: '1px solid #d6d6d6'}} rowSpan={2}>合计</th>
                      ) : (
                        <React.Fragment>
                          <th>班次大类合计</th>
                          <th>自定义班次合计</th>
                        </React.Fragment>
                      )}
                    </tr>
                    <tr>
                      {getShiftClassDom_byHour2}
                    </tr>
                    <div className='tableTrCon'>
                      {getTdDom_byHour} 
                    </div>
                  </div>
                </div>}
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
  /* overflow-x: auto; */
  /* position: relative; */
  .tableCon {
    position: relative;
    .tableHead {
      margin: 0 auto;
      width: calc(100vw - 530px);
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
      table {
        /* width: 100%; */
        /* border: 1px solid #d6d6d6; */
        border-top: none;
        /* overflow-x: auto; */
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
          min-width: 85px;
          font-weight: bold;
        }
        /* 设置整体td */
        td {
          box-sizing: border-box;
          padding: 0;
          border: 1px solid #d6d6d6;
          min-width: 85px;
          height: 20px;
          border-top: none;
          /* width: 6%; */
        }
        /* th:nth-of-type(2) {
          box-sizing: border-box;
          min-width: 200px;
        } */
        .administrative {
          box-sizing: border-box;
          min-width: 200px;
        }
        /* td:nth-of-type(10) {
          box-sizing: border-box;
          min-width: 85px;
        } */
        
      }
      .table-fixed_flet{
        position: absolute;
        top: 21px;
        left: 1px;
        z-index: 2;
        overflow-y: auto;
        background: #fff;
        height: calc(100vh - 300px);
        ::-webkit-scrollbar{
          width: 0px;
        }
      }
      .byHour2{
        top: 42px;

      }
      .tableTrCon{
        /* height: 480px; */
        height: calc(100vh - 300px);
        overflow-y: auto;
        ::-webkit-scrollbar{
          width: 0px;
        }
      }
      .fixed_flet_title{
        position: absolute;
        z-index: 11;
        top: 0px;
        left: 1px;
      }
    }
    
  }
`
