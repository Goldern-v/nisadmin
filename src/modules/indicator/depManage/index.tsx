import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import BaseTable from "src/components/BaseTable"
import config from './config'
import api from './api'
import { departType } from './model'
import { Button } from "src/vendors/antd";
import { globalModal } from "src/global/globalModal";
import { message } from "antd";

interface Props {

}

export default observer((props: Props) => {
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState<number | undefined>()
  const [tableData, setTableData] = useState<departType[]>([])
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([])
  // 展开或关闭表格项
  const setExpandedItem = (expanded: boolean, item: departType) => {
    if (expanded && item.id) {
      setExpandedRowKeys([...expandedRowKeys, item.id])
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(i => i !== item.id))
    }
  }

  const columns = config.creatColumns((type: string, item: departType) => {
    switch (type) {
      case 'setData':
        setData(item)
        break
      case 'save':
        handleSave(item).then()
        break
      case 'creat':
        handleCreat(item)
        break
      case 'edit':
        handleEdit(item)
        break
      case 'delete':
        handleDelete(item).then()
        break
    }
  }, editId)

  // 获取数据
  const getData = async () => {
    setLoading(true)
    const { data } = await api.getList()
    setLoading(false)
    setEditId(undefined)
    setTableData(addLevel(data))
  }

  // 新增
  const handleCreat = (item?: departType) => {
    if (editId !== undefined) {
      return message.warning('请先保存')
    }
    if (!item) {  // 新增一级科室
      setTableData([...tableData, { id: 0 }])
      setEditId(0)
    } else if (item.id) {  // 添加下一级
      setTableData(editTableData(tableData, { parentId: item.id, id: 0 }))
      setEditId(0)
      setExpandedItem(true, item)
    }
  }

  // 删除
  const handleDelete = async (item: departType) => {
    if (item.id && !editId) {
      await globalModal.confirm("确认删除", "确认删除该条记录？")
      await api.deleteItem(item.id)
    }
    await getData()
  }

  // 编辑
  const handleEdit = (item: departType) => {
    if (editId !== undefined) {
      return message.warning('请先保存')
    }
    item.id && setEditId(item.id)
  }

  // 保存
  const handleSave = async (item: departType) => {
    await api.saveItem(item)
    await getData()
  }

  // 给tableData设置值
  const setData = (item: departType) => {
    if (!item.parentId) {
      setTableData(tableData.map(i => i.id ? i : item))
      return
    }
    setTableData(editTableData(tableData, item))
  }

  // 给树结构偶数据添加或替换值
  const editTableData = (dataArr: departType[], nItem: departType) => {
    return dataArr.map((item: departType) => {
      if (item.id === nItem.parentId) {
        let nChildren = undefined
        let includes = false
        if (item.children) {
          nChildren = item.children.map((child: departType) => {
            if (child.id === nItem.id) {
              child.name = nItem.name
              child.expand = nItem.expand
              includes = true
            }
            return child
          })
          !includes && nChildren.push(nItem)
        } else {
          nChildren = [nItem]
        }
        item.children = nChildren
      }
      if (item.children) {
        item.children = editTableData(item.children, nItem)
      }
      return item
    })
  }

  // 给数据加上level
  const addLevel = (data: departType[], level = 0): departType[] => {
    return data.map(item => {
      item.level = level
      if (item.children) {
        item.children = addLevel(item.children, level + 1)
      }
      return item
    })
  }

  useEffect(() => {
    const promise = getData()
  }, [])

  return (
    <Wrapper>
      <TableHeard>
        <Button style={{ marginRight: '10px' }} className="con-item" onClick={() => getData()}>刷新</Button>
        <Button type="primary" className="con-item" onClick={() => handleCreat()}>增加一级科室</Button>
      </TableHeard>
      <BaseTable
        rowKey={'id'}
        loading={loading}
        surplusHeight={190}
        wrapperStyle={{ borderRadius: '5px' }}
        columns={columns}
        dataSource={tableData}
        expandedRowKeys={expandedRowKeys}
        onExpand={setExpandedItem}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  input{
    width: 200px;
  }
`
const TableHeard = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`