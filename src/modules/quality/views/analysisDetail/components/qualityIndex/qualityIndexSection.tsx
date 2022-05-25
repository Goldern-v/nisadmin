import styled from 'styled-components'
import React, { useState, useEffect, useRef, Children } from 'react'
import { Button } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { ColumnProps } from 'antd/lib/table'
import BaseTable from 'src/components/BaseTable'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}

export default observer(function qualityIndexSection(props: Props) {
  let { sectionId, sectionTitle} = props
  const analysisDetailModal = useRef(getModal())
  let data:any = analysisDetailModal.current.getSectionData(sectionId)
  const bottom:any=data&&data.list&&data.list.bottom
  let report: Report = (data ? data.report : {}) || {}
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      align: 'center',
      width: 60,
    render(text: any, record: any, index: number) {
      return index + 1
    },
    },
    {
      title: '类型',
      dataIndex: 'lx',
      width: 100,
      align: 'center'
    },
    {
      title: '项目',
      dataIndex: 'xm',
      align: 'center',
      width: 60
    },
    {
      title: '达标值',
      dataIndex: 'dbz',
      width: 100,
      align: 'center',
      children:[
        {
        title: '质量合格分',
        dataIndex: 'zlhgf',
        align: 'center',
        width: 60
      },
      {
        title: '合格率',
        dataIndex: 'hgl',
        align: 'center',
        width: 60
      }
    ]
    },
    {
      title: '检查结果',
      dataIndex: 'jcjg',
      width: 100,
      align: 'center',
      children:[
        {
        title: '合格数/抽查数',
        dataIndex: 'hgsccs',
        align: 'center',
        width: 60
      },
      {
        title: '平均分',
        dataIndex: 'pjf',
        align: 'center',
        width: 60
      },
        {
        title: '合格率%',
        dataIndex: 'hgl2',
        align: 'center',
        width: 60
      },
      {
        title: '未达标',
        dataIndex: 'wdb',
        align: 'center',
        width: 60
      }
    ]
    },
  ]
  const footer=(
    <div className='table_Bottom'>
   <div>1、上报不良事件：{bottom &&bottom.blsj}</div>
    <div>2、事件类型及级别：{bottom &&bottom.lxjb}</div>
    </div>)
  return (
    <Wrapper>
      <TwoLevelTitle  text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)} >编辑</EditButton>
      <BaseTable  columns={columns}  dataSource={ data.list &&data.list.tableData}
       footer={()=>footer}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 60px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .table_Bottom div{
    /* display: inline-block; */

  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
  input {
    border: none;
  }
`
const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
