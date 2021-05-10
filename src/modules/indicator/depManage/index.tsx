import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import BaseTable from "src/components/BaseTable"
import config from './config'
import api from './api'
import { departType } from './model'
import { Button } from "src/vendors/antd"
import { Prompt } from 'react-router-dom'

interface Props {

}

export default observer((props: Props) => {
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<departType[]>([])
  const [tempId, setTempId] = useState(-1)  // 新增临时数据的id 用来作为key使用 值都小于0
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([])
  // 展开或关闭表格项
  const setExpandedItem = (expanded: boolean, item: departType) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, item.id])
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(i => i !== item.id))
    }
  }
  const [hasChange, setHasChange] = useState(false)

  const columns = config.creatColumns((type: string, item: departType) => {
    setHasChange(true)
    switch (type) {
      case 'setData':
        setData(item)
        break
      case 'creat':
        handleCreat(item)
        break
      case 'delete':
        handleDelete(item)
        break
    }
  })

  // 获取数据
  const getData = async () => {
    setLoading(true)
    const { data } = await api.getList()
    setLoading(false)
    setHasChange(false)
    setTempId(-1)
    setExpandedRowKeys([])
    setTableData(data)
  }

  // 新增
  const handleCreat = (item?: departType) => {
    setHasChange(true)
    setTempId(tempId - 1)
    if (!item) {  // 新增一级科室
      setTableData([...tableData, { expand2: 1, id: tempId }])
    } else {  // 添加下一级
      setData({ parentId: item.id, id: tempId, expand2: +item.expand2 + 1 })
      setExpandedItem(true, item)
    }
  }

  // 删除
  const handleDelete = (item: departType) => {
    setTableData(deepDelete(item.id))
  }
  const deepDelete = (id: number, data = tableData) => {
    const newData = data.filter(i => i.id !== id) // 删除本级
    return newData.map(i => {
      if (i.children) {
        const arr = deepDelete(id, i.children)
        i.children = arr.length === 0 ? undefined : arr
      }
      return i
    })
  }

  // 保存
  const handleSaveAll = async () => {
    const list = editTableItem((item: departType) => {
      const resItem = { ...item }
      resItem.id < 0 && delete resItem.id
      return resItem
    })
    await api.saveAll({ list })
    setHasChange(false)
    await getData()
  }

  // 给tableData设置值
  const setData = (nItem: departType) => {
    const nData = editTableItem((item: departType) => {
      if (!nItem.parentId) {
        return nItem.id === item.id ? nItem : item
      } else if (item.id === nItem.parentId) {
        let nChildren = undefined
        let includes = false
        if (item.children) {
          nChildren = item.children.map((child: departType) => {
            if (child.id === nItem.id) { // 替换子元素
              child.indexNo = nItem.indexNo
              child.name = nItem.name
              child.expand = nItem.expand
              includes = true
            }
            return child
          })
          !includes && nChildren.push(nItem) // 增加子元素
        } else {
          nChildren = [nItem]
        }
        item.children = nChildren
      }
      return item
    })
    setTableData(nData)
  }
  // 编辑数据中的其中一项
  const editTableItem = (calBack?: Function, data = tableData) => {
    return data.map(item => {
      item = calBack ? calBack(item) : item
      if (item.children) {
        item.children = editTableItem(calBack, item.children)
      }
      return item
    })
  }

  useEffect(() => {
    const promise = getData()
  }, [])

  return (
    <Wrapper>
      {/* 路由离开前拦截 */}
      <Prompt when={hasChange} message={() => '数据还未保存，是否要离开？'}/>
      <TableHeard>
        <Button style={{ marginRight: '10px' }} onClick={() => getData()}>刷新</Button>
        <Button style={{ marginRight: '10px' }} onClick={() => handleSaveAll()}>保存</Button>
        <Button type="primary" onClick={() => handleCreat()}>增加一级科室</Button>
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