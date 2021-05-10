import React from "react";
import { DoCon } from "src/components/BaseTable";
import { departType } from './model'
import { Input } from "antd";

const creatColumns = (calBack: Function): {}[] => {
  return [
    {
      title: "序号",
      dataIndex: "indexNo",
      width: 200,
      render(name: string, record: departType) {
        return (
          <Input value={record.indexNo} size='small' style={{ width: '100px' }}
                 onChange={(event => calBack('setData', { ...record, indexNo: event.target.value }))}/>
        )
      }
    },
    {
      title: "科室名称",
      dataIndex: "name",
      render(name: string, record: departType) {
        return (
          <Input value={record.name} size='small' style={{ width: '280px' }}
                 onChange={(event => calBack('setData', { ...record, name: event.target.value }))}/>
        )
      }
    },
    {
      title: "科室编码",
      dataIndex: "expand",
      width: 250,
      render(expand: string, record: departType) {
        return (
          <Input value={record.expand} size='small'
                 onChange={(event => calBack('setData', { ...record, expand: event.target.value }))}/>
        )
      }
    },
    {
      title: "操作",
      align: "center",
      dataIndex: "expand2",
      width: 250,
      render(text: '', record: departType) {
        const hasCreate = Boolean(+record.expand2 < 3)
        return (
          <DoCon>
            {hasCreate && <span onClick={() => calBack('creat', record)}>添加下一级</span>}
            <span onClick={() => calBack('delete', record)}>删除</span>
          </DoCon>
        )
      }
    }
  ]
}


export default {
  creatColumns
}