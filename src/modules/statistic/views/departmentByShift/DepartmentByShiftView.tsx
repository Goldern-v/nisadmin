// 护士排班（按班次）
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

// import StatisticLeftList from '../../components/StatisticLeftList'
import StatisticHeader from './components/StatisticHeader'
import StatisticMIdHeaderDepartment from '../../common/StatisticMIdHeaderDepartment'
// import NurseSchedule from './components/NurseSchedule'
import NurseByShiftChoose from './components/NurseByShiftChoose'
import TableFirst from './components/TableFirst'
import { statisticsApi } from '../../api/StatisticsApi'
import moment from 'src/vendors/moment'
import { fileDownload } from 'src/utils/file/file'
import { message } from 'antd'

export default function StatisticView() {
  const [inited, setInited] = useState(false)
  // const [shiftClass, setShiftClass] = useState(new Array())
  const [filterObj, setFilterObj] = useState({
    ['shift_type']: {
      checked: true,
      list: [],
    },
    ['range_name']: {
      checked: false,
      list: [],
    },
  } as any)

  const [query, setQuery] = useState({
    type: 'shift_type',
    startTime: moment(new Date().setDate(1)).format('YYYY-MM-DD'),
    endTime: moment(new Date().setDate(7)).format('YYYY-MM-DD'),
  })

  const [tableData, setTableData] = useState([] as any[])
  const [hourMap, setHourMap] = useState({})

  const handleFilterObjChange = (newFilterObj: any) => {
    setFilterObj(newFilterObj)

    let newType = Object.keys(newFilterObj).find((type) => newFilterObj[type].checked)

    setQuery({ ...query, type: newType || '' })
  }

  const getShiftAndRange = (callback?: Function) => {
    Promise.all([
      statisticsApi.dictInfo(),
      statisticsApi.postName(),
    ])
      .then(res => {
        let shiftTypeList = res[0].data.map((item: any) => item.name)
        let rangeNameList = res[1].data.map((item: any) => item.name)

        let newFilterObj = { ...filterObj }

        let shiftTypeSelected = newFilterObj['shift_type'].checked
        newFilterObj['shift_type'].list = shiftTypeList.map((name: string) => ({ name, checked: shiftTypeSelected }))


        let rangeNameSelected = newFilterObj['range_name'].checked
        newFilterObj['range_name'].list = rangeNameList.map((name: string) => ({ name, checked: rangeNameSelected }))

        setFilterObj(newFilterObj)

        callback && callback(newFilterObj)
      })
  }

  const getTableData = (_query?: any, _filterObj?: any) => {
    let reqQuery = { ..._query || query }
    let currentFilterObj = _filterObj || filterObj
    let filterTypes = Object.keys(filterObj)

    if (reqQuery.type) {
      let filterList = currentFilterObj[reqQuery.type].list
        .filter((item: any) => item.checked)
        .map((item: any) => item.name)

      statisticsApi.postDepartmentByShiftView({
        ...reqQuery,
        ls: filterList.join(',')
      })
        .then(res => {
          setTableData(res.data.list || [])
          setHourMap(res.data.hourMap || {})
        })
    } else {
      Promise.all(filterTypes.map((type: string) => {
        let filterList = currentFilterObj[type].list
          .filter((item: any) => item.checked)
          .map((item: any) => item.name)

        return statisticsApi.postDepartmentByShiftView({
          ...reqQuery,
          type,
          ls: filterList.join(',')
        })
      }))
        .then((resArr) => {
          let newTableDataObj = {} as any

          resArr.forEach((res: any, resIdx: number) => {
            if (res.data)
              res.data.forEach((item: any, itemIdx: number) => {
                let deptName = item['科室']

                let rowData = {
                  ...item,
                  [`合计${resIdx ? resIdx : ''}`]: item['合计'] || 0
                }

                if (newTableDataObj[deptName]) {
                  newTableDataObj[deptName] = { ...rowData, ...newTableDataObj[deptName], }
                } else {
                  newTableDataObj[deptName] = rowData
                }
              })
          })

          let newTableData = Object.keys(newTableDataObj)
            .map((deptName: string) =>
              newTableDataObj[deptName])

          setTableData(newTableData)
        })
    }
  }

  const handleExport = () => {
    if (tableData.length <= 0) {
      message.warn("暂无记录")
      return
    }

    let reqQuery = { ...query }

    if (reqQuery.type) {
      let filterList = filterObj[reqQuery.type].list
        .filter((item: any) => item.checked)
        .map((item: any) => item.name)

      statisticsApi.postDepartmentByShiftView({
        ...reqQuery,
        ls: filterList.join(','),
      }, true)
        .then(res => fileDownload(res))
    }
  }

  useEffect(() => {
    setInited(true)
    getShiftAndRange((_filterObj: any) => getTableData(query, _filterObj))
  }, [])

  useEffect(() => {
    if (inited) getTableData()
  }, [query])

  return (
    <Con>
      <StatisticHeader
        query={query}
        onChange={(payload: any) => {
          let newQuery = { ...query, ...payload }

          setQuery(newQuery)
        }}
        onExport={handleExport} />
      <MidMidCon>
        <LeftCon>
          <StatisticMIdHeaderDepartment />
          {/* 对应表 */}
          <TableCon>
            <TableFirst tableData={tableData} hourMap={hourMap} filterObj={filterObj} />
          </TableCon>
        </LeftCon>
        <RigthCon>
          <div className='NurseByShiftChooseCon'>
            <NurseByShiftChoose
              filterObj={filterObj}
              onFilterObjChange={handleFilterObjChange} />
          </div>
        </RigthCon>
      </MidMidCon>
    </Con>
  )
}

const Con = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
`
const MidMidCon = styled.div`
  flex: 1;
  height: 0;
  display: flex;
  margin: ${(p) => p.theme.$margin};
  padding: ${(p) => p.theme.$margin};
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
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
`
const LeftCon = styled.div`
  flex: 1;
  width: 0;
  display: flex;
  flex-direction: column;
`
const RigthCon = styled.div`
  width: 222px;
`
const TableCon = styled.div`
  display: flex;
  /* position: relative; */
  .NurseByShiftChooseCon {
    height: 300px;
    /* width: 222px; */
    /* position: relative;
    top: -50px;
    right: -15px; */
  }
`
