import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import {
  Wrapper,
  TopPannel,
  NavCon,
  MainTitle,
  SubContent,
  ButtonGroups,
  MainPannel,
} from './../../components/common'
import QueryPannel from './../../components/QueryPannel'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
// import moment from 'moment'
import { trainingResultModel } from './../../models/TrainingResultModel'
export interface Props { }

//查看学习结果
export default observer(function SimulateResultReview() {
  const { history } = appStore
  const { query, tableData, tableDataTotal, loading, baseInfo, menuInfo, isSignType } = trainingResultModel

  const statusColumns = (() => {
    //根据线上还是线下判断展示学习情况还是签到情况
    if (isSignType)
      return [{
        dataIndex: 'signInTime',
        title: '签到',
        align: 'center',
        width: 180,
        render: (signInTime: string, record: any) => {
          if (signInTime) return signInTime
          return <span style={{ color: 'red' }}>未签到</span>
        }
      }] as ColumnProps<any>[]
    else return [
      {
        dataIndex: 'taskStatus',
        title: '学习情况',
        align: 'center',
        width: 60,
        render: (status: number, record: any) => {
          let percentStr = '(0%)'
          if (record.taskFinishRate)
            percentStr = `(${record.taskFinishRate}%)`

          if (status == 0)
            return <span style={{ color: 'red' }}>未完成</span>
          else
            return <span>已完成{percentStr}</span>
        }
      },
      {
        dataIndex: 'finishTime',
        title: '完成时间',
        align: 'center',
        width: 100
      },
    ] as ColumnProps<any>[]
  })()

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'empName',
      title: '姓名',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'empNo',
      title: '工号',
      align: 'center',
      width: 60,
    },
    {
      dataIndex: 'empTitle',
      title: '职称',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'bigDeptName',
      title: '片区',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'deptName',
      title: '病区',
      align: 'center',
      width: 120,
    },
    ...statusColumns,
    {
      dataIndex: 'creditDesc',
      title: '学分',
      align: 'center',
      width: 120,
      render: (text: string) => {
        if (text) return text
        return '0'
      }
    },
    {
      dataIndex: 'classHoursDesc',
      title: '学时',
      align: 'center',
      width: 50,
    },
  ]

  const handleDetail = (record: any) => {
    //查看详情
  }
  const handlePageChange = (pageIndex: number, pageSize: number | undefined) => {
    trainingResultModel
      .setQuery({ ...query, pageIndex }, true)
  }
  const handleSizeChange = (pageIndex: number, pageSize: number) => {
    trainingResultModel
      .setQuery({ ...query, pageSize, pageIndex: 1 }, true)
  }

  useEffect(() => {
    trainingResultModel.init()
  }, [])

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> > </span>
        <span>{menuInfo.firstLevelMenuName || '一级目录'}</span>
        <span> > </span>
        {<a onClick={() => appStore.history.goBack()}>{menuInfo.secondLevelMenuName}</a> || <span>二级目录</span>}
        <span> > 查看结果</span>
      </NavCon>
      <MainTitle>{baseInfo.title}</MainTitle>
      <SubContent>
        <span className="label">开始时间:</span>
        <span className="content">
          {baseInfo.startTime}
        </span>
        <span className="label">类型:</span>
        <span className="content">
          {baseInfo.teachingTypeName}（{baseInfo.teachingMethodName}）{['wh', 'gxjb', 'ytll'].includes(appStore.HOSPITAL_ID) && baseInfo.categoryName}
        </span>
        <span className="label"> 参与人员:</span>
        <span className="content">
          {(baseInfo.participantList && baseInfo.participantList.length) || 0}人
        </span>
      </SubContent>
      <ButtonGroups>
        <Button onClick={() => trainingResultModel.handleExportResults()}>导出</Button>
        {appStore.hisMatch({
          map: {
            wh: <span></span>,
            // gxjb: <span></span>,
            other: <React.Fragment>
              {isSignType &&
                <Button onClick={() => trainingResultModel.handleSignExport()}>导出签到信息</Button>}
              <Button onClick={() => trainingResultModel.handleAttendanceExport()}>导出出勤率统计</Button>
            </React.Fragment>
          }
        })}
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <QueryPannel />
      <TableWrapper>
        <BaseTable
          loading={loading}
          type={['index']}
          surplusWidth={200}
          surplusHeight={315}
          dataSource={tableData}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => handleDetail(record)
            }
          }}
          pagination={{
            pageSizeOptions: ['10', '15', '20', '30', '50'],
            current: query.pageIndex,
            pageSize: query.pageSize,
            total: tableDataTotal,
            onChange: handlePageChange,
            onShowSizeChange: handleSizeChange
          }}
          columns={columns} />
      </TableWrapper>
    </MainPannel>
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
  td{
    word-break: break-all;
  }
  .ellips{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height: 19px;
  }
  #baseTable{
    padding: 10px 15px;
  }
`