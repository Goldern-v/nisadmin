import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, DatePicker, Select } from "antd";
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
  const defaultForm = {
    wardCode: undefined,
    status: undefined,
    beginDate: undefined,
    endDate: undefined,
    formCodes: [],
    pageIndex: 1,
    pageSize: 20
  }
  const [form, setForm]: any = useState(defaultForm)
  const setFormItem = (item = {}) => {
    setForm({ ...form, ...item })
  }
  const [total, setTotal] = useState(1)
  const statusMap = ['提交', '保存', '待病区审核', '待护理部初审核', '待护理部复审核']
  const statusMap_gzsrm = ['待病区审核', '待片区填写意见', '审核完成']
  // 新建-modal
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const columns: any[] = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 30
    },
    {
      title: "日期",
      dataIndex: "createTime",
      width: 120,
      align: "center",
      render: (text: string) => {
        return (
          moment(text).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: "检查病区",
      dataIndex: appStore.HOSPITAL_ID === 'gzsrm' ? 'SR0004004' : "SR0001002",
      width: 120,
      align: "center"
    },
    {
      title: "得分",
      dataIndex: appStore.HOSPITAL_ID === 'gzsrm' ? 'SR0004022' : "SR0001019",
      width: 80,
      align: "center"
    },
    {
      title: "检查人员",
      dataIndex: "creatorName",
      width: 80,
      align: "center"
    },
    {
      title: "值班护士",
      dataIndex: appStore.HOSPITAL_ID === 'gzsrm' ? 'SR0004007' : "SR0001005",
      width: 80,
      align: "center"
    },
    {
      title: "值班护长",
      dataIndex: appStore.HOSPITAL_ID === 'gzsrm' ? 'SR0004001' : "SR0001001",
      width: 80,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: (text: string, row: any, c: any) => {
        console.log(isNaN(row.status))
        return (
          appStore.HOSPITAL_ID !== 'gzsrm' ? (isNaN(row.status) ? '' : statusMap[+row.status]) : (
            isNaN(row.status) ? '待提交' : statusMap_gzsrm[row.status - 1]
          )
        )
      }

    },
    {
      title: "操作",
      width: 100,
      align: "center",
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            <span onClick={() => handleView(row)}>
              查看
            </span>
          </DoCon>
        );
      }
    }
  ]

  const getList = async () => {
    const { data } = await api.getList(form)
    setTotal(data.totalPage)
    setTableData(data.list.map((item: any) => {
      return {
        ...item,
        ...item.itemDataMap
      }
    }))
  }
  const addTable = () => {
    // appStore.history.push(`/checkWard/wardsView`)
    // setIsModalVisible(true)
    appStore.history.push(`/checkWard/recordViewGZ`)
  }

  const handleView = (row: any) => {
    if (appStore.HOSPITAL_ID === 'gzsrm') {
      appStore.history.push(`/checkWard/recordViewGZ?id=${row.id}`)
    } else {
      appStore.history.push(`/checkWard/recordView?id=${row.id}`)
    }
  }

  useEffect(() => {
    getList().then()
  }, [form])

  return (
    <Wrapper>
      <SearchBar>
        <div className='page-title'>护长夜查房评分记录</div>
        <div className='button-group'>
          <span className='label'>科室：</span>
          <DeptSelect hasAllDept onChange={(deptCode) => setFormItem({ wardCode: deptCode === '全院' ? '' : deptCode })} />
          <span className='label'>日期：</span>
          <DatePicker.RangePicker
            style={{ width: 220 }}
            value={[form.beginDate, form.endDate]}
            onChange={(val) => setFormItem({ beginDate: val[0], endDate: val[1] })} />
          <span className='label'>状态：</span>
          <Select
            value={form.status}
            style={{ width: '140px' }}
            onChange={(val: string) => setFormItem({ status: val })}>
            {
              statusMap.map((item, index) => {
                return <Select.Option key={index} value={'' + index}>{item}</Select.Option>
              })
            }
          </Select>
          <Button onClick={() => getList()}> 查询</Button>
          {(appStore.HOSPITAL_ID === 'gzsrm' && authStore.isRoleManage) && <Button onClick={() => addTable()}> 新增</Button>}
          <Button type='primary' onClick={() => {
          }}>导出</Button>
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
    font-size: 22px;
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
`