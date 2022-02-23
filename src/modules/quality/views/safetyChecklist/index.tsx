import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, DatePicker, message, Modal, } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { appStore, authStore } from "src/stores";
import api from './api';
import DeptSelect from "src/components/DeptSelect";
import moment from 'moment'
// import AuthStore from "src/stores/AuthStore";
// import AddModal from './wardsView/components/addModal'

interface Props {

}

export default observer((props: Props) => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  let path = appStore.location.pathname

  const defaultForm = {
    deptCode: authStore.selectedDeptCode === '全院' ? '' : authStore.selectedDeptCode,
    startDate: undefined,
    endDate: undefined,
    pageIndex: 1,
    pageSize: 20,
  }
  // 登录者
  const _user = JSON.parse(sessionStorage.getItem('user') || '[]')

  const [form, setForm]: any = useState(defaultForm)
  const setFormItem = (item = {}) => {
    setForm({ ...form, ...item })
  }
  const [total, setTotal] = useState(1)
  // 删除
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [rowId, setRowId] = useState('')

  const columns: any[] = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 80
    },
    {
      title: "科室",
      dataIndex: `deptName`,
      // minWidth: 180,
      align: "center",
    },
    {
      title: "片区",
      dataIndex: `areaName`,
      // minWidth: 180,
      align: "center",
    },
    {
      title: "检查时间",
      dataIndex: `checkDate`,
      // width: 120,
      align: "center",
      render: (text: string) => {
        return (
          moment(text).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: "操作",
      width: 120,
      align: "center",
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            <span onClick={() => handleViewOnly(row)}>
              查看
            </span>
            <span onClick={() => handleView(row)}>
              编辑
            </span>
            <span onClick={() => deleteView(row)}>
              删除
            </span>
          </DoCon>
        );
      }
    }
  ]

  const deleteView = (row: any) => {{
    // 二级质控-只有本人创建和和护士长或者以上有操作权限
    if (authStore.isRoleManage || row.creator === _user.empNo) {
      setDeleteVisible(true)
      setRowId(row.id)
    } else {
      message.warning('没有权限删除')
    }
  }}
  const okModal = () => {
    api.deleteitem({id: rowId}).then(res => {
      if (res.code === '200') {
        getList()
        setDeleteVisible(false)
        message.success('删除成功')
      } else {
        message.warning(res.desc)
      }
    })
  }

  const getList = async () => {
    setTableLoading(true)
    const { data } = await api.getList(form)
    setTableLoading(false)
    setTotal(data.totalCount)
    setTableData(data.list || [])
  }
  const addTable = () => {
    appStore.history.push(`/safetyChecklist/qcTwo/checkView`)
  }

  const handleView = (row: any) => {
    // 二级质控-只有本人创建和和护士长或者以上有操作权限
    if (authStore.isRoleManage || row.creator === _user.empNo) {
      appStore.history.push(`/safetyChecklist/qcTwo/checkView?id=${row.id}`)
    } else {
      message.warning('没有权限编辑')
    }
  }

  //仅查看
  const handleViewOnly = (row:any) =>{
    const pathname = `/safetyChecklist/qcTwo/checkView/viewOnly?id=${row.id}`;
    appStore.history.push(pathname)
  }

  useEffect(() => {
    getList().then()
  }, [form])

  // useEffect(() => {
  //   getList().then()
  // }, [])

  return (
    <Wrapper>
      <SearchBar>
        <div className='page-title'>行政查房记录</div>
        <div className='button-group'>
          <span className='label'>科室：</span>
          <DeptSelect hasAllDept onChange={(deptCode) => setFormItem({ deptCode: deptCode === '全院' ? '' : deptCode })} />
          <span className='label'>日期：</span>
          <DatePicker.RangePicker
            style={{ width: 220 }}
            value={[form.startDate, form.endDate]}
            onChange={(val) => setFormItem({ startDate: val[0], endDate: val[1] })} />
          <Button onClick={() => getList()}> 查询</Button>
          <Button onClick={() => addTable()}> 新增</Button>
        </div>
      </SearchBar>
      <MainWrapper>
        <BaseTable
          type={'index'}
          loading={tableLoading}
          columns={columns}
          dataSource={tableData}
          surplusHeight={200}
          wrapperStyle={{ borderRadius: '5px' }}
          pagination={{
            current: form.pageIndex,
            pageSize: form.pageSize,
            total: total
          }}
          onChange={(pagination: any) => {
            setFormItem({
              pageIndex: pagination.current,
              pageSize: pagination.pageSize,
            })
          }}
        />
      </MainWrapper>
      {/* { isModalVisible && <AddModal isModalVisible={isModalVisible} />} */}
      {/* 删除提示框 */}
      <Modal
        title="提示"
        visible={deleteVisible}
        onOk={okModal}
        onCancel={() => setDeleteVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <p style={{ fontSize: '16px' }}>确定要删除吗？</p>
      </Modal>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px 20px;
`

const SearchBar = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .page-title{
    font-weight: bold;
    font-size: 18px;
  }
  .button-group{
    display: flex;
    align-items: center;
    .label{
      margin-left: 15px;
    }
    button{
      margin-left:10px;
    }
  }
`


const MainWrapper = styled.div`
  background: #fff;
  height: calc(100% - 50px);
  padding: 0 20px;
  .itemHide{
    display: none
  }
`