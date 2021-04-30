import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Header from "./components/header/index"
import TableDialog from "./components/tableDialog/index"
import BaseTable from "src/components/BaseTable"
import config from "./config"
import api from './api'
import { globalModal } from "src/global/globalModal";
import { message } from "antd";
import { appStore } from "src/stores";

interface Props {

}

export default observer((props: Props) => {
  const [tableLoading, setTableLoading] = useState(false)
  const [search, setSearch] = useState(true)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState([])
  const [modalId, setModalId] = useState('')
  const [tableModalVisible, setTableModalVisible] = useState(false)

  const columns = config.creatColumns((type: string, item: any) => {
    switch (type) {
      case 'edit':
        appStore.history.push(`/eventReportFormEdit?formId=${item.formCode}&name=${item.formName}&id=${item.id}`)
        break
      case 'delete':
        globalModal.confirm("确认删除", "确认删除该条记录？").then(async res => {
          await api.deleteItem(item.id || '')
          message.success(`删除成功`)
          setSearch(!search)
        });
        break
    }
  })

  const getList = async (search = {}) => {
    const params = {
      ...search,
      pageIndex,
      pageSize
    }
    setTableLoading(true)
    const { data } = await api.getList(params)
    setTableLoading(false)
    setTableData(data.list)
    setTotal(data.totalCount)
  }

  const handleSelect = async (search: {}) => {
    await getList(search)
  }

  const handleCreate = () => {
    setModalId('')
    setTableModalVisible(true)
  }

  const handleTableSelected = (item: { code: '', name: '' }) => {
    setTableModalVisible(false)
    appStore.history.push(`/eventReportFormEdit?formId=${item.code}&name=${item.name}`)
  }

  return (
    <Wrapper>
      {/* 头部新增查询按钮 */}
      <Header search={search} handleSelect={handleSelect} handleCreate={handleCreate}/>
      {/* 表格数据 */}
      <TableWrapper>
        <BaseTable
          type={'index'}
          loading={tableLoading}
          columns={columns}
          dataSource={tableData}
          surplusHeight={200}
          wrapperStyle={{ 'border-radius': '5px' }}
          pagination={{
            current: pageIndex,
            pageSize: pageSize,
            total: total
          }}
          onChange={(pagination: any) => {
            setPageIndex(pagination.current)
            setPageSize(pagination.pageSize)
            getList().then()
          }}
        />
      </TableWrapper>
      {/* 选择表格弹窗 */}
      {tableModalVisible && <TableDialog
        visible={tableModalVisible}
        onOk={handleTableSelected}
        onCancel={() => setTableModalVisible(false)}
      />}
    </Wrapper>
  )
})

const Wrapper = styled.div`
`
const TableWrapper = styled.div`
  box-sizing: border-box;
  flex: 1;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px;
  background-color: #fff;
  border-radius: 5px;
`