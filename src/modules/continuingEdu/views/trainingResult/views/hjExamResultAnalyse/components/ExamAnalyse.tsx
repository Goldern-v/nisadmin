import styled from 'styled-components'
import React, { useEffect } from 'react'
import BaseTable from "src/components/BaseTable";
import { observer } from 'mobx-react-lite'
import { hjExamModal } from '../HjExamModal'
export interface Props { }

export default observer(function HjExamResultAnalyse() {
  // 初始化表格数据
  useEffect(() => {
    hjExamModal.analyseOnload()
  }, [])

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
      title: "及格人数",
      dataIndex: "passPersonCount",
      width: 100,
      align: "center"
    },
    {
      title: "及格率",
      dataIndex: "passRate",
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
        loading={hjExamModal.analyseTableLoading}
        dataSource={hjExamModal.analyseTableList}
        columns={columns}
        surplusWidth={300}
        surplusHeight={360}
        pagination={{
          current: hjExamModal.analysePageIndex,
          total: hjExamModal.analyseTotal,
          pageSize: hjExamModal.analysePageSize
        }}
        onChange={pagination => {
          hjExamModal.analysePageIndex = pagination.current;
          hjExamModal.analyseTotal = pagination.total;
          hjExamModal.analysePageSize = pagination.pageSize;
          hjExamModal.analyseOnload();
        }}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div``


