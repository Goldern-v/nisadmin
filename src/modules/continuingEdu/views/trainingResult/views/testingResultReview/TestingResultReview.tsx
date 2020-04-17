import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, message, Modal } from 'antd'
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

import AnswerSheetModal from './components/AnswerSheetModal'
import ScoreConfirmModal from './../../components/ScoreConfirmModal'
import QueryPannel from './../../components/QueryPannel'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'

import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
// import moment from 'moment'
import { trainingResultModel } from './../../models/TrainingResultModel'
import { trainingResultService } from './../../api/TrainingResultService'
export interface Props { }

//查看考试结果
export default observer(function TestingResultReview() {
  const { history } = appStore
  const scorceConfirm = createModal(ScoreConfirmModal)
  const answerSheet = createModal(AnswerSheetModal)
  const { query, tableData, tableDataTotal, loading, baseInfo, menuInfo } = trainingResultModel

  const editScoreAuth = baseInfo.scorePersonList?.find((item: any) => {
    return item.empNo.toLowerCase() == authStore.user?.empNo.toLowerCase()
  })

  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])

  //发布功能的loading状态
  const [publishLoading, setPublishLoading] = useState(false)

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
    {
      dataIndex: 'isValidResult',
      title: '成绩有效',
      align: 'center',
      width: 70,
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
      dataIndex: 'totalScores',
      title: '最终成绩',
      align: 'center',
      width: 70,
    },
    {
      dataIndex: 'passedDesc',
      title: '及格',
      align: 'center',
      width: 70,
      render: (text: string) => {
        if (text == '不及格')
          return <span style={{ color: 'red' }}>{text}</span>
        else
          return <span>{text}</span>
      }
    },
    {
      dataIndex: 'finishTime',
      title: '答题时间',
      align: 'center',
      width: 180,
      render: (finishTime: string) => {
        if (finishTime) return finishTime
        return '未答题'
      }
    },
    {
      dataIndex: 'resultPublishDesc',
      title: '发布成绩',
      align: 'center',
      width: 60
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
    },
    {
      dataIndex: 'scoreEmpName',
      title: '评分人',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'oparate',
      title: '操作',
      width: 100,
      render: (status: string, record: any) => {
        return <DoCon>
          <span onClick={() => handleAnwserSheetReview(record)}>查看答卷</span>
        </DoCon>
      }
    }
  ]

  const handlePageChange = (pageIndex: number, pageSize: number | undefined) => {
    trainingResultModel.setQuery({ ...query, pageIndex }, true)
  }
  const handleSizeChange = (pageIndex: number, pageSize: number) => {
    trainingResultModel.setQuery({ ...query, pageSize, pageIndex: 1 }, true)
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
        message.success(`选中人员（共${selectedRowKeys.length}人）的成绩修改成功`)
        trainingResultModel.getTableData()
      },
      cetpId: appStore.queryObj.id,
      empNoList: selectedRowKeys
    })
  }

  const handleAnwserSheetReview = (record: any) => {
    if (!record.finishTime) {
      Modal.warning({
        title: <span style={{ fontWeight: 'bold' }}>{`《${baseInfo.title}》`}</span>,
        okText: '我知道了',
        content: '该考生未答题，得分为0。'
      })
      return
      // return message.warning('该学员未答题')

    }

    let isScoreEdit = false

    if (editScoreAuth) isScoreEdit = true

    answerSheet.show({
      title: `${baseInfo.title}考卷`,
      empNo: record.empNo,
      type: appStore.queryObj.editable ? 'edit' : 'view',
      cetpId: appStore.queryObj.id,
      onOkCallBack: () => {
        trainingResultModel.getTableData()
      }
    })
  }

  // const setLoading = (loading: boolean) => trainingResultModel.setLoading(loading)

  const handlePublish = () => {

    Modal.confirm({
      title: '发布成绩',
      centered: true,
      content: '确定给所有考生发布成绩？',
      onOk: () => {
        setPublishLoading(true)
        trainingResultService
          .publishGrades(appStore.queryObj.id || '')
          .then(res => {
            message.success('发布成功', 1, () => {
              appStore.history.goBack()
            })
            setPublishLoading(false)
            // trainingResultModel.
            //   setBaseInfo({
            //     ...baseInfo,
            //     isResultPublished: 1
            //   })
          }, () => setPublishLoading(false))
      }
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
        <span className="label">总成绩:</span>
        <span className="content">{baseInfo.totalScores}</span>
        <span className="label">及格分数线:</span>
        <span className="content">{baseInfo.passScores}</span>
        <span className="label"> 参与人员:</span>
        <span className="content">
          {(baseInfo.participantList && baseInfo.participantList.length) || 0}人
        </span>
        <span>评分负责人:</span>
        <span className="content">
          {(baseInfo.scorePersonList && baseInfo.scorePersonList.map((item: any) => item.empName).join(','))}
        </span>
      </SubContent>
      <ButtonGroups>
        {(baseInfo.isResultPublished === 0 &&
          baseInfo.showScoreInstantly === 0 &&
          (baseInfo.tpStatusDesc === '归档' || baseInfo.tpStatusDesc === '已结束')) &&
          <Button
            type="primary"
            onClick={handlePublish}
            disabled={publishLoading}>
            发布成绩
          </Button>}
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
          surplusHeight={315}
          dataSource={tableData}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => handleAnwserSheetReview(record)
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
    <answerSheet.Component />
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