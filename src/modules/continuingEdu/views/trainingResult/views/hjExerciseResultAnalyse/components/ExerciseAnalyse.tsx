import styled from 'styled-components'
import React, { useEffect } from 'react'
import BaseTable from "src/components/BaseTable";
import { observer } from 'mobx-react-lite'
import { hjExerciseModal } from '../HjExerciseModal'
export interface Props { }

export default observer(function HjExerciseResultAnalyse() {
  // 初始化表格数据
  useEffect(() => {
    hjExerciseModal.analyseOnload()
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
      title: "病区",
      dataIndex: "deptName",
      width: 150,
      align: "center"
    },
    {
      title: "平均分",
      dataIndex: "avgScores",
      width: 100,
      align: "center"
    },
    {
      title: "最高分",
      dataIndex: "maxScores",
      width: 100,
      align: "center"
    },
    {
      title: "最低分",
      dataIndex: "minScores",
      width: 100,
      align: "center"
    },
    {
      title: "正确率",
      dataIndex: "correctRate",
      width: 100,
      align: "center",
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    },
    {
      title: "应参加人数",
      dataIndex: "totalPersonCount",
      width: 100,
      align: "center"
    },
    {
      title: "实际参加人数",
      dataIndex: "finishedPersonCount",
      width: 100,
      align: "center"
    },
    {
      title: "参与率",
      dataIndex: "participateRate",
      width: 100,
      align: "center",
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    }
  ]


  return (
    <Wrapper>
      <BaseTable
        loading={hjExerciseModal.analyseTableLoading}
        dataSource={hjExerciseModal.analyseTableList}
        columns={columns}
        surplusWidth={300}
        surplusHeight={370}
        pagination={{
          current: hjExerciseModal.analysePageIndex,
          total: hjExerciseModal.analyseTotal,
          pageSize: hjExerciseModal.analysePageSize
        }}
        onChange={pagination => {
          hjExerciseModal.analysePageIndex = pagination.current;
          hjExerciseModal.analyseTotal = pagination.total;
          hjExerciseModal.analysePageSize = pagination.pageSize;
          hjExerciseModal.analyseOnload();
        }}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div``


