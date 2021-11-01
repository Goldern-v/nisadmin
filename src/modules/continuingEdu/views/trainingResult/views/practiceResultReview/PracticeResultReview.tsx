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
import moment from 'moment'
import { trainingResultModel } from './../../models/TrainingResultModel'
import HjExerciseResultAnalyse from '../hjExerciseResultAnalyse/HjExerciseResultAnalyse'
import { stepViewModal } from '../../../../modal/stepComponent/StepViewModal'
import BaseTabs from "src/components/BaseTabs";
import HjQuestionAnalyse from '../hjQuestionAnalyse/HjQuestionAnalyse'
export interface Props { }


//查看培训结果
export default observer(function PracticeResultReview(props: Props) {
  const { history } = appStore
  const scorceConfirm = createModal(ScoreConfirmModal)
  const { query, tableData, tableDataTotal, loading, baseInfo, menuInfo } = trainingResultModel

  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])

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
    // {
    //   dataIndex: 'isValidResult',
    //   title: '成绩有效',
    //   align: 'center',
    //   width: 60,
    //   render: (isValidResult: number, record: any) => {
    //     const itemScoreConfirm = () => {
    //       scorceConfirm.show({
    //         onOkCallBack: () => {
    //           message.success(`${record.empName} 的成绩修改成功`)
    //           trainingResultModel.getTableData()
    //         },
    //         cetpId: appStore.queryObj.id,
    //         empNoList: [record.empNo],
    //         isValidResult: record.isValidResult.toString() || ''
    //       })
    //     }

    //     if (isValidResult == 1)
    //       return <span
    //         style={{ color: 'blue', cursor: 'pointer' }}
    //         onClick={itemScoreConfirm}>
    //         有效
    //         </span>
    //     else
    //       return <span
    //         style={{ color: 'red', cursor: 'pointer' }}
    //         onClick={itemScoreConfirm}>
    //         无效
    //       </span>
    //   }
    // },
    // {
    //   dataIndex: 'lastAnswerTime',
    //   title: '最近答题',
    //   align: 'center',
    //   width: 180,
    //   render: (text: string, record: any) => {
    //     if (!text) return '未答题'
    //     return text
    //   }
    // },
    {
      dataIndex: 'progressRate',
      title: '练习进度',
      align: 'center',
      width: 60,
      render: (text: any, record: any) => {
        if (text) return `${(Number(text) * 100).toFixed(2)}%`
        return '0%'
      }
    },
    {
      dataIndex: 'correctRate',
      title: '正确率',
      align: 'center',
      width: 60,
      render: (text: any, record: any) => {
        if (text) return `${(Number(text) * 100).toFixed(2)}%`
        return '0%'
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
      dataIndex: 'classHoursDescDesc',
      title: '学时',
      align: 'center',
      width: 100,
      render: (text: string) => {
        if (text) return text
        return '0'
      }
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

  useEffect(() => {
    if (loading) setSelectedRowKeys([])
  }, [loading])

  useEffect(() => {
    trainingResultModel.init()
  }, [])

  // 针对不同医院打开不同界面
  const getPage = () => {
    const HOSPITAL_ID: any = ['hj', 'nys'];
    let isOk: any = HOSPITAL_ID.find((item: any) => item == appStore.HOSPITAL_ID)
    if (isOk) {
      return (
        <BaseTabs
          config={
            [
              {
                title: '练习详情',
                index: "0",
                component: <HjExerciseDetails />
              },
              {
                title: '练习情况统计与分析',
                index: "1",
                component: <HjExerciseResultAnalyse />
              },
              {
                title: '试题分析',
                index: "2",
                component: <HjQuestionAnalyse />
              }
            ]
          }
        />
      )
    } else {
      return (
        <MainPannel>
          <QueryPannel />
          <ExerciseDetails />
        </MainPannel>
      )
    }
  }

  // 普通表格考试详情
  function ExerciseDetails() {
    return (
      <TableWrapper>
        <BaseTable
          loading={loading}
          rowKey='empNo'
          surplusWidth={200}
          surplusHeight={320}
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
      </TableWrapper>
    )
  }

  // 厚街表格考试详情
  function HjExerciseDetails() {
    const Page = styled.div`
        position: relative;
        .spcialNav {
          position: absolute;
          top: -35px;
          right: 0
        }
      `
    return (
      <Page>
        <QueryPannel className="spcialNav" />
        <ExerciseDetails />
      </Page>
    )
  }


  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> &gt; </span>
        <span>{menuInfo.firstLevelMenuName || '一级目录'}</span>
        <span> &gt; </span>
        {<a onClick={() => appStore.history.goBack()}>{menuInfo.secondLevelMenuName}</a> || <span>二级目录</span>}
        <span> &gt; 查看结果</span>
      </NavCon>
      <MainTitle>{baseInfo.title}</MainTitle>
      <SubContent>
        <span className="label">开始时间:</span>
        <span className="content">
          {baseInfo.startTime}
        </span>
        <span className="label">类型:</span>
        <span className="content">
          {baseInfo.teachingTypeName}（{baseInfo.teachingMethodName}）{(appStore.HOSPITAL_ID === 'wh' || appStore.HOSPITAL_ID == "gxjb") && baseInfo.categoryName}
        </span>
        <span className="label"> 参与人员:</span>
        <span className="content">{
          (baseInfo.participantList && baseInfo.participantList.length) || 0}人
        </span>
      </SubContent>
      <ButtonGroups>
        <Button onClick={() => trainingResultModel.handleExportResults()}>导出</Button>
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      {/* <QueryPannel /> */}
      <div style={{ padding: "0 10px", boxSizing: "border-box" }}>{getPage()}</div>
    </MainPannel>
    <scorceConfirm.Component />
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