import React from "react";
import { DoCon } from "src/components/BaseTable";
import { departType } from './model'
import { Input } from "antd";

const creatColumns = (calBack: Function, editId?: number): {}[] => {
  return [
    {
      title: "科室名称",
      dataIndex: "name",
      render(name: string, record: departType) {
        const isEditMode = !record.id || editId === record.id
        return (
          isEditMode ?
            <Input value={record.name} size='small' style={{ width: '280px' }}
                   onChange={(event => calBack('setData', { ...record, name: event.target.value }))}/> :
            <span>{record.name}</span>
        )
      }
    },
    {
      title: "科室编码",
      dataIndex: "expand",
      width: 250,
      render(expand: string, record: departType) {
        const isEditMode = !record.id || editId === record.id
        return (
          isEditMode ?
            <Input value={record.expand} size='small'
                   onChange={(event => calBack('setData', { ...record, expand: event.target.value }))}/> :
            <span>{record.expand}</span>
        )
      }
    },
    {
      title: "操作",
      align: "center",
      dataIndex: "level",
      width: 300,
      render(level: number, record: departType) {
        const hasCreate = Boolean(level !== 2 && record.id && record.id !== editId)
        const hasSave = Boolean(!record.id || record.id === editId)
        const hasEdit = Boolean(record.id && record.id !== editId)
        const isCancel = Boolean(!record.id || record.id === editId)
        return (
          <DoCon>
            {hasCreate && <span onClick={() => calBack('creat', record)}>添加下一级</span>}
            {hasSave && <span onClick={() => calBack('save', record)}>保存</span>}
            {hasEdit && <span onClick={() => calBack('edit', record)}>编辑</span>}
            <span onClick={() => calBack('delete', record)}>{isCancel ? '取消' : '删除'}</span>
          </DoCon>
        )
      }
    }
  ]
}


export default {
  creatColumns
}