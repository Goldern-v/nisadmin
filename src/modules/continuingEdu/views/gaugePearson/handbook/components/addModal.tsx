import { Modal, Select, Tree, message } from 'antd'
import { ModalProps } from 'antd/es/modal'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import DeptSelect from 'src/components/DeptSelect'
import { PageHeader } from 'src/components/common'
import { HIERARCHY } from 'src/enums/global'
import styled from 'styled-components'
import { trainingSettingApi } from '../../api/TrainingSettingApi'
import cloneDeep from 'lodash/cloneDeep'
import { Obj } from 'src/libs/types'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import update from "immutability-helper";
import { handbookModel as model } from '../model'
import AddConfirmModal from './addConfirmModal'
const { Option } = Select
const { TreeNode } = Tree
/**
 * data: 规培生基本信息  
 */
export interface IProps extends ModalProps {
  onCancel?: () => void,
  onOk: (e: Obj) => void,
  data: Obj
}
const templateList = [
  {
    label: '手册模板',
    templateType: 1,
    children: [],
  },
  {
    label: '手册表单',
    templateType: 2,
    children: [],
  },
  {
    label: '手册附件',
    templateType: 3,
    children: [],
  },
  {
    label: '手册固定表',
    templateType: 4,
    children: [],
  },
]
const TreeNodeTitle = (item: Obj) => {
  return <>
    <div className='node-title single-line'>{item.tableName}</div>
    <div className='node-tip'>
      <span>{item.createName}</span>
      <span>{item.createTime}</span>
    </div>
  </>
}
const defParams = {
  deptCode: '全院',
  hierarchy: '全部',
}
export default observer(function AddModal(props: IProps) {
  const { visible, onOk, onCancel } = props
  /**可选表单 */
  const [treeData, setTreeData] = useState<Obj[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  /**已选表单 */
  const [tableData, setTableData] = useState<Obj[]>([])
  const [params, setParams] = useState(defParams)
  const columns = [
    {
      dataIndex: '',
      title: '选中表单',
      width: 150,
      render(text: any, record: any) {
        return TreeNodeTitle(record)
      }
    },
    {
      title: '操作',
      width: 40,
      render(text: any, record: any) {
        return <DoCon>
          <span onClick={() => onDel(record)}>删除</span>
        </DoCon>
      }
    }
  ]
  const onSave = () => {
    if (tableData.length <= 0) return message.warn('请至少选择一个表单')
    // 点击确认后弹出创建确认
    model.addConfirmVisible = true
  }
  const onRealSave = (data: any) => {
    model.addConfirmVisible = false
    onOk && onOk({
      ...data,
      templateIds: tableData.map(v => v.id)
    })
  }
  const onDel = (record: Obj) => {
    setTableData(tableData.filter(v => v.id !== record.id))
    const keys = checkedKeys.filter(v => v !== record.id + '' && v !== templateList[record.templateType - 1 || 1]?.label)
    setCheckedKeys(keys)
  }
  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = tableData[dragIndex];
    if (!dragRow) return;
    setTableData(update(
      tableData,
      {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
      }
    ))
  };
  const onSearch = () => {
    trainingSettingApi.getTemplateList(params).then((res) => {
      setCheckedKeys([])
      let formatData = (res?.data?.list || []).reduce((prev: any, cur: any) => {
        const { templateType, id, status } = cur
        if (status)
          prev[templateType - 1].children.push(cur)
        return prev
      }, cloneDeep(templateList))
      setTreeData(formatData)
    })
  }
  const onCheck = (data: any, option: any) => {
    setCheckedKeys(data)
    setTableData(option.checkedNodes.reduce((prev: any, cur: any) => {
      const item = cur.props['data-id']
      if (item) prev.push(JSON.parse(item))
      return prev
    }, []))
  }
  useEffect(() => {
    if (visible) {
      setParams(defParams)
      setCheckedKeys([])
      setTableData([])
    }
  }, [visible])
  useEffect(() => {
    onSearch()
  }, [params])

  return (
    <Modal
      title="创建手册"
      width={800}
      visible={visible}
      onOk={onSave}
      onCancel={onCancel}
    >
      <Wrapper>
        <PageHeader>
          <span className='label'>
            科室
          </span>
          <DeptSelect hasAllDept deptCode={params.deptCode} onChange={(e: any) => {
            setParams({ ...params, deptCode: e })
          }} />
          <span className='label'>层级</span>
          <Select value={params.hierarchy} onChange={(e:any)=>{
            setParams({ ...params, hierarchy: e })
          }}>
            {HIERARCHY.map((v) => <Option   value={v} key={v}>{v}</Option>)}
          </Select>
        </PageHeader>
        <div className='form-con'>
          <div>
            可选表单
            <Tree
              checkable
              checkedKeys={checkedKeys}
              onCheck={onCheck}
            >
              {
                treeData.map((v) =>
                  <TreeNode title={v.label} key={v.label}>
                    {v.children.map((v1: any) => <TreeNode title={TreeNodeTitle(v1)} data-id={JSON.stringify(v1)} key={v1.id} />)}
                  </TreeNode>
                )
              }
            </Tree>
          </div>
          <div>
            已选择表单
            <BaseTable
              surplusHeight={500}
              dataSource={tableData}
              columns={columns}
              type={["index", "diagRow"]}
              moveRow={moveRow}
            />
          </div>
        </div>
        <AddConfirmModal
          onOk={onRealSave}
          data={{
            deptCode: params.deptCode,
          }} />
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
.form-con {
  display: flex;
  height: 500px;
  > div {
    flex: 1;
  }
  .ant-tree-node-content-wrapper {
    height: auto;
  }
  .node-title {
    color: #000;
  }
  .node-tip {
    display: flex;
    font-size: 13px;
    color: #bbb;
  }
}
`
