import styled from 'styled-components'
import React, { useEffect } from 'react'
import BaseTable from "src/components/BaseTable";
import { observer } from 'mobx-react-lite'
import { hjExamModal } from '../HjExamModal'
export interface Props { }

export default observer(function ExamAnalyse() {

  // 初始化表格数据
  useEffect(() => {
    hjExamModal.statisticsOnload()
  }, [hjExamModal.keyIdx])

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
      title: "科室",
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
      title: "答题次数",
      dataIndex: "totalHandInTimes",
      width: 50,
      align: "center"
    },
    {
      title: "成绩",
      dataIndex: "totalScoresDesc",
      width: 60,
      align: "center"
    },
    {
      title: "补考成绩",
      dataIndex: "resitTotalScoresDesc",
      width: 60,
      align: "center"
    },
    {
      title: "答题时间",
      dataIndex: "startTime",
      width: 200,
      align: "center",
      render: (text: any, record: any) => {
        return <span>{text ? `${text} — ${record.endTime}` : '--'}</span>
      }
    }
  ]


  return (
    <Wrapper>
      <BaseTable
        loading={hjExamModal.statisticsTableLoading}
        dataSource={hjExamModal.statisticsTableList}
        columns={columns}
        surplusWidth={300}
        surplusHeight={360}
        pagination={{
          current: hjExamModal.statisticsPageIndex,
          total: hjExamModal.statisticsTotal,
          pageSize: hjExamModal.statisticsPageSize
        }}
        onChange={pagination => {
          hjExamModal.statisticsPageIndex = pagination.current;
          hjExamModal.statisticsTotal = pagination.total;
          hjExamModal.statisticsPageSize = pagination.pageSize;
          hjExamModal.statisticsOnload();
        }}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div``


