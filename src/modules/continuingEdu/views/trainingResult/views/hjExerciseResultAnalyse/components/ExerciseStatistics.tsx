import styled from 'styled-components'
import React, { useEffect } from 'react'
import BaseTable from "src/components/BaseTable";
import { observer } from 'mobx-react-lite'
import { hjExerciseModal } from '../HjExerciseModal'
export interface Props { }

export default observer(function ExerciseStatistics() {

  // 初始化表格数据
  useEffect(() => {
    hjExerciseModal.statisticsOnload()
  }, [hjExerciseModal.keyIdx])

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 40
    },
    {
      title: "姓名",
      dataIndex: "empName",
      width: 80,
      align: "center"
    },
    {
      title: "工号",
      dataIndex: "empNo",
      width: 90,
      align: "center"
    },
    {
      title: "所在护理单元",
      dataIndex: "deptName",
      width: 160,
      align: "center"
    },
    {
      title: "职称",
      dataIndex: "empTitle",
      width: 80,
      align: "center"
    },
    {
      title: "护士层级",
      dataIndex: "nurseHierarchy",
      width: 60,
      align: "center"
    },
    {
      title: "最高分",
      dataIndex: "maxTotalScores",
      width: 60,
      align: "center"
    },
    {
      title: "最低分",
      dataIndex: "minTotalScores",
      width: 60,
      align: "center"
    },
    {
      title: "练习时长",
      dataIndex: "cumulativeTimeDesc",
      width: 60,
      align: "center"
    },
    {
      title: "练习次数",
      dataIndex: "totalAnswerTimes",
      width: 60,
      align: "center"
    }
  ]


  return (
    <Wrapper>
      <BaseTable
        loading={hjExerciseModal.statisticsTableLoading}
        dataSource={hjExerciseModal.statisticsTableList}
        columns={columns}
        surplusWidth={300}
        surplusHeight={370}
        pagination={{
          current: hjExerciseModal.statisticsPageIndex,
          total: hjExerciseModal.statisticsTotal,
          pageSize: hjExerciseModal.statisticsPageSize
        }}
        onChange={pagination => {
          hjExerciseModal.statisticsPageIndex = pagination.current;
          hjExerciseModal.statisticsTotal = pagination.total;
          hjExerciseModal.statisticsPageSize = pagination.pageSize;
          hjExerciseModal.statisticsOnload();
        }}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div``


