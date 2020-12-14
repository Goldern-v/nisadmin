import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable from "src/components/BaseTable";
import { observer } from 'mobx-react-lite'
import { hjExerciseModal } from '../hjExerciseResultAnalyse/HjExerciseModal'
import { hjExerciseApi } from "../hjExerciseResultAnalyse/api/HjExerciseApi";
import { appStore } from "src/stores";

export interface Props { }

export default observer(function HjQuestionAnalyse() {
  const [tableLoading, setTableloading] = useState(false)
  const [tableList, setTableList] = useState([])
  const [query, setQuery] = useState({
    pageIndex: 1,
    pageSize: 20
  })

  // 初始化表格数据
  useEffect(() => {
    queryExercisePaperAnalyse()
  }, [hjExerciseModal.keyIdx])

  const queryExercisePaperAnalyse = () => {
    setTableloading(true)
    hjExerciseApi.queryExercisePaperAnalyse(appStore.queryObj.id).then(res => {
      setTableloading(false)
      setTableList(res.data || []);
    });
  }

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 40
    },
    {
      title: "标题",
      dataIndex: "questionContent",
      width: 350,
      align: "left"
    },
    {
      title: "类型",
      dataIndex: "questionTypeName",
      width: 90,
      align: "center"
    },
    {
      title: "答题次数",
      dataIndex: "totalAnswerTimes",
      width: 90,
      align: "center"
    },
    {
      title: "答错次数",
      dataIndex: "totalAnswerWrongTimes",
      width: 90,
      align: "center"
    },
    {
      title: "正确率",
      dataIndex: "correctRate",
      width: 90,
      align: "center",
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    }
  ]


  return (
    <Wrapper>
      <BaseTable
        loading={tableLoading}
        dataSource={tableList}
        columns={columns}
        surplusWidth={300}
        surplusHeight={350}
        pagination={{
          current: query.pageIndex,
          total: tableList.length,
          pageSize: query.pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onShowSizeChange: (pageIndex, pageSize) =>
            setQuery({ ...query, pageSize }),
          onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex })
        }}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div``


