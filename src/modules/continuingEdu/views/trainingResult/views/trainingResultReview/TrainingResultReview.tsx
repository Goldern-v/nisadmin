import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, message } from 'antd'
import { Link } from 'react-router-dom'
import {
  Wrapper,
  TopPannel,
  NavCon,
  MainTitle,
  SubContent,
  ButtonGroups,
  MainPannel,
  ActiveText,
} from './../../components/common'
import createModal from "src/libs/createModal";
import ScoreConfirmModal from './../../components/ScoreConfirmModal'
import QueryPannel from './../../components/QueryPannel'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
// import moment from 'moment'
import AnswerSheetModal from './../../components/AnswerSheetModal/AnswerSheetModal'

import { trainingResultModel } from './../../models/TrainingResultModel'
export interface Props { }

//查看培训结果
export default observer(function TrainingResultReview() {
  const { history } = appStore
  const scorceConfirm = createModal(ScoreConfirmModal)
  const { query, tableData, tableDataTotal, loading, baseInfo, menuInfo } = trainingResultModel

  const answerSheetModal = createModal(AnswerSheetModal)

  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])

  const statusColumns = (() => {
    if ((baseInfo.organizationWay || baseInfo.organizationWayName) == '线下')
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
          if (status == 0)
            return <span style={{ color: 'red' }}>未完成</span>
          else
            return <span>已完成</span>
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

  let columns: ColumnProps<any>[] = [
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
      title: '职位',
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
      dataIndex: 'isValidResult',
      title: '成绩有效',
      align: 'center',
      width: 60,
      render: (isValidResult: number, record: any) => {
        const itemScoreConfirm = () => {
          scorceConfirm.show({
            onOkCallBack: () => {
              message.success(`${record.empName} 的成绩修改成功`)
              trainingResultModel.getTableData()
            },
            cetpId: appStore.queryObj.id,
            empNoList: [record.empNo],
            isValidResult: record.isValidResult.toString() || ''
          })
        }

        if (isValidResult == 1)
          return <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={itemScoreConfirm}>
            有效
            </span>
        else
          return <span
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={itemScoreConfirm}>
            无效
          </span>
      }
    },
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
      dataIndex: 'classHours',
      title: '学时',
      align: 'center',
      width: 100,
    }
  ]

  if (baseInfo.questionStat) {
    columns = columns.concat([
      {
        title: '培训后满意度调查问卷',
        align: 'center',
        width: 100,
        children: [
          {
            dataIndex: 'scoresDesc',
            title: '得分',
            align: 'center',
            width: 60,
          },
          {
            dataIndex: 'fillTime',
            title: '时间',
            align: 'center',
            width: 120,
            render: (text: string) => {
              return text || '未完成'
            }
          },
          {
            title: '操作',
            dataIndex: 'indnex',
            align: 'center',
            width: 80,
            render: (text: string, record: any) => {
              return <DoCon>
                <span onClick={() => viewAnwserPage(record)}>查看问卷</span>
              </DoCon>
            }
          },
        ]
      }
    ])
  }

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

  const handleRowSelect = (rowKeys: string[] | number[]) => {
    setSelectedRowKeys(rowKeys)
  }

  const handleScoreAvailable = () => {
    if (loading) return

    if (selectedRowKeys.length <= 0) {
      message.warning('未勾选条目')
      return
    }

    scorceConfirm.show({
      onOkCallBack: () => {
        message
          .success(`选中人员（共${selectedRowKeys.length}人）的成绩修改成功`)
        trainingResultModel.getTableData()
      },
      cetpId: appStore.queryObj.id,
      empNoList: selectedRowKeys
    })
  }

  const viewAnwserPage = (record: any) => {
    if (!record.fillTime) {
      message.warning('学员未填写问卷')
      return
    }
    answerSheetModal.show({
      title: baseInfo.title,
      empNo: record.empNo,
      type: 'view',
      dataType: '问卷',
      cetpId: appStore.queryObj.id,
      hideRightSide: true,
      onOkCallBack: () => { }
    })
  }

  useEffect(() => {
    if (loading) setSelectedRowKeys([])
  }, [loading])

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
          {baseInfo.teachingTypeName}（{baseInfo.teachingMethodName}）
        </span>
        <span className="label"> 参与人员:</span>
        <span className="content">{
          (baseInfo.participantList && baseInfo.participantList.length) || 0}人
        </span>
      </SubContent>
      <ButtonGroups>
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <QueryPannel />
      <TableWrapper>
        <BaseTable
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: handleRowSelect
          }}
          rowKey='empNo'
          surplusWidth={200}
          surplusHeight={355}
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
          columns={columns}
        />
        <SelectionOperate>
          <Checkbox
            indeterminate={(() => {
              if (selectedRowKeys.length <= 0)
                return false
              if (selectedRowKeys.length >= tableData.length)
                return false
              return true
            })()}
            disabled={loading}
            onChange={(e: any) => {
              let checked = e.target.checked
              if (checked)
                setSelectedRowKeys(tableData.map((item: any) => item.empNo))
              else
                setSelectedRowKeys([])
            }}
            checked={(selectedRowKeys.length >= tableData.length) && tableData.length > 0}>
            全选
          </Checkbox>
          <span>共选择对象（{selectedRowKeys.length}）人，执行操作：</span>
          <ActiveText onClick={handleScoreAvailable}>成绩有效？</ActiveText>
        </SelectionOperate>
      </TableWrapper>
    </MainPannel>
    <scorceConfirm.Component />
    <answerSheetModal.Component />
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
  position: relative;
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
    .ant-table-column-title{
      .ant-table-selection{
        display: none;
      }
    }
  }
`

const SelectionOperate = styled.div`
  position: absolute;
  bottom: 15px;
  left: 38px;
  /* font-size: 12px; */
  span{
    vertical-align: middle;
  }
`