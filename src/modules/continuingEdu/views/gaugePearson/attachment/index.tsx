import { Button, Input, Modal, Switch, message } from 'antd'
import { Select } from 'antd/es'
import { ColumnProps } from 'antd/es/table'
import { observer } from 'mobx-react'
import React, { useCallback, useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import DeptSelect from 'src/components/DeptSelect'
import { PageContainer, PageHeader, PageTitle, Place } from 'src/components/common'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import AddModal from './components/addModal'
import { trainingSettingApi } from '../api/TrainingSettingApi'
import { HIERARCHY } from 'src/enums/global'

export interface IProps {
}
const templateType = 3
/**附件表列表 */
export default observer(function Attachment(props: IProps) {
  const [visible, setVisible] = useState(false)
  const [params, setParams] = useState({
    attachmentName: '',
    deptCode: '全院',
    hierarchy: '全部',
    templateType
  })
  const [tableData, setTableData] = useState([])
  const [curData, setCurData] = useState<Obj | undefined>(undefined)

  const onSwitch = (e: boolean, record: any) => {
    const { id, deptCode, hierarchy, tableName } = record
    trainingSettingApi.saveOrUpdate({ id, deptCode, hierarchy, tableName, status: Number(e) }).then(res => {
      message.success(res.desc)
      onSearch()
    })
  }

  const columns: ColumnProps<any>[] = [
    {
      key: 'idx',
      dataIndex: 'idx',
      title: '序号',
      width: 30,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return idx + 1
      }
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: 50,
      align: 'center',
      render(text: number, record: any, idx: number) {
        return <Switch size='small' checked={!!text} onChange={(e) => onSwitch(e, record)} />
      }
    },
    {
      key: 'tableName',
      dataIndex: 'tableName',
      title: '附件名称',
      width: 100,
      align: 'center',
    },
    {
      key: 'deptName',
      dataIndex: 'deptName',
      title: '科室',
      width: 70,
      align: 'center',
    },
    {
      key: 'hierarchy',
      dataIndex: 'hierarchy',
      title: '层级',
      width: 70,
      align: 'center',
    },
    {
      key: 'createName',
      dataIndex: 'createName',
      title: '创建人',
      width: 70,
      align: 'center',
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: 70,
      align: 'center',
    },
    {
      key: 'operate',
      dataIndex: 'operate',
      title: '操作',
      width: 70,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return <DoCon>
          <span className={record.isUse ? 'disabled' : ''} onClick={() => onDel(record)}>删除</span>
          <span className={record.isUse ? 'disabled' : ''} onClick={() => onUpdate(record)}>更新</span>
        </DoCon>
      }
    },
  ]

  const onDel = (item: Obj) => {
    Modal.confirm({
      title: '删除',
      content: '是否删除？',
      onOk() {
        trainingSettingApi.deleteTemplate({ id: item.id }).then(res => {
          message.success(res.desc)
          onSearch()
        })
      }
    })
  }
  const onUpdate = (item?: Obj) => {
    setCurData(item)
    setVisible(true)
  }
  const onSearch = () => {
    trainingSettingApi.getTemplateList(params).then(res => {
      setTableData(res.data || [])
    })
  }
  const onCreate = (data: Obj) => {
    trainingSettingApi.saveOrUpdate({ ...data, templateType }).then(res => {
      message.success('添加成功')
      setVisible(false)
      onSearch()
    })
  }
  useEffect(() => {
    onSearch()
  }, [params])

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>表单配置</PageTitle>
        <Place />
        <span className='label'>科室</span>
        <DeptSelect hasAllDept deptCode={params.deptCode} onChange={(e: any) => setParams({ ...params, deptCode: e })} />
        <span className='label'>层级</span>
        <Select value={params.hierarchy} onChange={(e: any) => setParams({ ...params, hierarchy: e })}>
          {HIERARCHY.map((v) => <Select.Option value={v} key={v}>{v}</Select.Option>)}
        </Select>
        <span className='label'>附件名称</span>
        <Input placeholder='请输入文件名称' value={params.attachmentName} onChange={(e: any) => setParams({ ...params, attachmentName: e.target.value })} />
        <Button type='primary' onClick={onSearch}>查询</Button>
        <Button type='primary' onClick={() => onUpdate()}>新增</Button>
      </PageHeader>
      <PageContainer>
        <BaseTable
          surplusHeight={400}
          columns={columns}
          dataSource={tableData} />
      </PageContainer>
      <AddModal
        visible={visible}
        data={curData}
        onOkCb={onCreate}
        onCancel={() => setVisible(false)}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`

`