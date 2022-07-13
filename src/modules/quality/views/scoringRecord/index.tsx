import moment from 'moment'
import DeptSelect from 'src/components/DeptSelect'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { Button, Checkbox, DatePicker, Select } from 'antd'
import { appStore, authStore } from 'src/stores'

import api from './api'

// import AuthStore from "src/stores/AuthStore";
// import AddModal from './wardsView/components/addModal'

interface Props {

}

export default observer((props: Props) => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const defaultForm = {
    wardCode: authStore.selectedDeptCode,
    status: undefined,
    beginDate: undefined,
    endDate: undefined,
    formCodes: [],
    pageIndex: 1,
    pageSize: 20
  }
  const [form, setForm]: any = useState(defaultForm)
  const setFormItem = (item = {}) => {
    //(['gzsrm'].includes(appStore.HOSPITAL_ID)) && (item?.status===0) && (item.status='')
    setForm({ ...form, ...item })
  }
  const [total, setTotal] = useState(1)
  const statusMap = ['提交', '保存', '待病区审核', '待护理部初审核', '待护理部复审核']
  // const statusMap_gzsrm = ['待提交', '待病区审核', '待片区填写意见', '审核完成']
  const statusMap_gzsrm = ['待提交', '待病区整改', '待科护士长审核', '完成']
  // const statusMapSelect_gzsrm = ['全部', '待病区审核', '待片区审核', '审核完成']
  const statusMapSelect_gzsrm = ['全部', '待病区整改', '待科护士长审核', '完成']

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
      dataIndex: `createTime`,
      width: 120,
      align: "center",
      render: (text: string) => {
        return (
          moment(text).format('YYYY-MM-DD HH:mm')
        )
      }
    },
    {
      title: "检查病区",
      dataIndex: "SR0001002",
      width: 120,
      align: "center"
    },
    {
      title: "得分",
      dataIndex: "SR0001019",
      width: 80,
      align: "center"
    },
    {
      title: `检查人员`,
      dataIndex: `creatorName`,
      width: 80,
      align: "center",
    },
    {
      title: "值班护士",
      dataIndex: "SR0001005",
      width: 80,
      align: "center"
    },
    {
      title: `值班护长`,
      dataIndex: "SR0001001",
      width: 80,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: (text: string, row: any, c: any) => {
        return (
          isNaN(row.status) ? '' : statusMap[+row.status]
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
  const columns_gzsrm: any[] = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 30
    },
    {
      title: "日期",
      dataIndex: `itemDataMap.SR0004003`,
      width: 120,
      align: "center",
      render: (text: string) => {
        return (
          moment(text).format('YYYY-MM-DD HH:mm')
        )
      }
    },
    {
      title: "检查病区",
      dataIndex: 'SR0004004',
      width: 120,
      align: "center"
    },
    {
      title: "得分",
      dataIndex: 'SR0004022',
      width: 80,
      align: "center"
    },
    // {
    //   title: `检查人员`,
    //   dataIndex: `creatorName`,
    //   width: 80,
    //   align: "center",
    //   className: appStore.HOSPITAL_ID === 'gzsrm' ? 'itemHide' : ""
    // },
    {
      title: "值班护士",
      dataIndex: 'SR0004007',
      width: 80,
      align: "center"
    },
    {
      title: `查房护士长`,
      dataIndex: 'SR0004001',
      width: 80,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: (text: string, row: any, c: any) => {
        return (
          isNaN(row.status) ? '待提交' : statusMap_gzsrm[row.status]
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
    setTableLoading(true)
    const { data } = await api.getList(form)
    setTableLoading(false)
    //setTotal(data.totalPage)
    setTotal(data.totalCount)
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
  const onCheckboxChange = (e: { target: { checked: any; }; }) => {
    setTableLoading(true)
    if (e.target.checked) {
      const data = {
        pageIndex: form.pageIndex,
        pageSize: form.pageSize
      }
      api.getPageByCreatorNo(data).then(res => {
        setTableLoading(false)
        if (res.code === '200') {
          setTotal(res.data?.totalCount)
          setTableData(res.data?.list?.map((item: any) => {
            return {
              ...item,
              ...item.itemDataMap
            }
          }))
        }
      })
    } else {
      getList().then()
    }
  }

  useEffect(() => {
    getList().then()
  }, [form])

  return (
    <Wrapper>
      <SearchBar>
        <div className='page-title'>护{['gzsrm'].includes(appStore.HOSPITAL_ID) ? '士' : ''}长夜查房评分记录</div>
        {appStore.HOSPITAL_ID === 'gzsrm' && <Checkbox style={{ marginLeft: '14px' }} onChange={onCheckboxChange}>我的创建</Checkbox>}
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
              ['gzsrm'].includes(appStore.HOSPITAL_ID) ?
                statusMapSelect_gzsrm.map((item, index) => {
                  return <Select.Option key={index} value={'' + (index === 0 ? '' : index)}>{item}</Select.Option>
                })
                :
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
          columns={appStore.HOSPITAL_ID === 'gzsrm' ? columns_gzsrm : columns}
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