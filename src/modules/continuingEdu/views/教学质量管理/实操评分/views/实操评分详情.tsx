import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import { Place } from 'src/components/common'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { practicalScoreEvalService } from '../services/PracticalScoreEvalService'
import { practicalTypeGroup } from '../data/practicalType'
import PracticalScoreEvalForm from '../components/PracticalScoreEvalForm'
import { fileDownload } from 'src/utils/file/file'
import { message } from 'src/vendors/antd'

export interface Props { }

export default function 实操评分详情() {
  const { title, id, startDate, endDate, practicalType } = appStore.queryObj

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [recordOpened, setRecordOpened] = useState({} as any)

  const [baseInfo, setBaseInfo] = useState({} as any)
  const [participantsList, setParticipantsList] = useState([] as any[])
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'id',
      width: 50,
      align: 'center',
      render: (text: string, record: any, idx: number) => idx + 1
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      align: 'center',
      width: 120,
    },
    {
      title: '层级',
      dataIndex: 'currentLevel',
      align: 'center',
      width: 60,
    },
    {
      title: '职称',
      dataIndex: 'title',
      align: 'center',
      width: 80,
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      align: 'center',
      width: 180,
    },
    {
      title: '提交时间',
      dataIndex: 'comitDate',
      align: 'center',
      width: 80,
    },
    {
      title: '得分',
      dataIndex: 'totalScores',
      align: 'center',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'isScore',
      align: 'center',
      width: 80,
      render: (isScore: number) => isScore === 0 ?
        (<span>未提交</span>) :
        (<span style={{ color: '#70B603' }}>已提交</span>)
    },
    {
      title: '操作',
      dataIndex: '操作',
      align: 'center',
      width: 80,
      render: (text: any, record: any) => {
        // if (record.isScore === 0)
        //   return <span>查看详情</span>
        // else
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看详情</span>
        </DoCon>
      }
    },
  ]

  const getDetailData = () => {
    setLoading(true)

    practicalScoreEvalService.
      getPracticalById(id)
      .then(res => {
        setLoading(false)

        if (res.data) {
          setParticipantsList(res.data.participantsList || [])
          delete res.data.participantsList

          setBaseInfo({ ...res.data })
        }
      }, () => setLoading(false))
  }

  const handleExport = () => {
    setLoading(true)

    practicalScoreEvalService
      .exportMemberListExcel(id)
      .then(res => {
        fileDownload(res)
        setLoading(false)
      }, () => setLoading(false))
  }

  const handleDetail = (record: any) => {
    setRecordOpened({
      ...record,
      id,
      practicalTableId: baseInfo.practicalTableId,
    })
    setFormModalVisible(true)
  }

  const handlePublish = () => {
    Modal.confirm({
      title: '提示',
      content: '确认公布成绩？',
      onOk: () => {
        setLoading(true)

        practicalScoreEvalService
          .setPracticalState(id)
          .then(res => {
            message.success('发布成功')
            getDetailData()
          }, () => setLoading(false))
      }
    })
  }

  useEffect(() => {
    getDetailData()
  }, [])

  return <Wrapper>
    <HeaderCon>
      <Title>{title}</Title>
      <Place />
      {baseInfo.isPublish === 0 && (
        <Button className="mr-10" onClick={() => handlePublish()}>公布成绩</Button>
      )}
      <Button
        className="mr-10"
        type="primary"
        onClick={() => getDetailData()}>
        查询
      </Button>
      <Button className="mr-10" onClick={() => handleExport()}>导出</Button>
      <Button onClick={() => appStore.history.goBack()}>返回</Button>
    </HeaderCon>
    <MainCon>
      <div style={{ padding: '10px 15px 0 15px', lineHeight: '24px' }}>
        <span>开始时间：{startDate}  </span>
        <span>类型：{practicalTypeGroup[`${practicalType}`]?.name || ''}  </span>
        <span>参与人员：{participantsList.length}人</span>
      </div>
      <BaseTable
        surplusHeight={260}
        surplusWidth={200}
        loading={loading}
        dataSource={participantsList}
        columns={columns} />
    </MainCon>
    <PracticalScoreEvalForm
      visible={formModalVisible}
      onCancel={() => setFormModalVisible(false)}
      params={recordOpened} />
  </Wrapper>
}
const Wrapper = styled.div`
`

const HeaderCon = styled.div`
  align-items: center;
  color: #333;
  height: 32px;
  display: flex;
  padding: 0 15px;
  margin: 10px 0;
  .mr-10{
    margin-right: 10px;
  }
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const MainCon = styled.div`
  height: calc( 100vh - 115px);
  margin: 0 15px;
  border-radius: 2px;
  background: #fff;
`