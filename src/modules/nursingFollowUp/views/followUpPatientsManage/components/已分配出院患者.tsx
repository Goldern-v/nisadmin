import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Input, DatePicker, message, Modal, Switch } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { appStore, authStore } from 'src/stores'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import FollowUpPatientsManageServices from '../services/FollowUpPatientsManageServices'
import moment from 'moment'

export interface Props { }
const api = new FollowUpPatientsManageServices();
export default function 已分配出院患者() {
  const [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1,
  })
  //表格数据载入状态
  const [tableData, setTableData] = useState([])
  const [dataTotal, setDataTotal] = useState(0)
  const [loadingTable, setLoadingTable] = useState(false)
  const [deptSelect, setDeptSelect] = useState('')
  const [deptSwitch, setDeptSwitch] = useState(false)
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [templateList, setTemplateList]: any = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  const [pageLoading, setPageLoading] = useState(false)
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'key',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: '护理单元',
      dataIndex: 'wardName',
      align: 'center',
      width: 120
    },
    {
      title: '床号',
      dataIndex: '',
      align: 'center',
      width: 50
    },
    {
      title: '姓名',
      dataIndex: 'remark',
      align: 'center',
      width: 70
    },
    {
      title: '性别',
      dataIndex: '',
      align: 'center',
      width: 50
    },
    {
      title: '联系电话',
      dataIndex: 'name',
      width: 120,
      align: 'center'
    },
    {
      title: '联系人',
      dataIndex: '',
      width: 150,
      align: 'center'
    },
    {
      title: '病种',
      dataIndex: '',
      width: 150,
      align: 'center'
    },
    {
      title: '随访周期',
      dataIndex: '',
      width: 120,
      align: 'center'
    },
    {
      title: '随访开始时间',
      dataIndex: 'createTime',
      width: 200,
      align: 'center'
    },
    {
      title: '随访结束时间',
      dataIndex: 'createTime',
      width: 200,
      align: 'center'
    },
    {
      title: '随访小组',
      dataIndex: '',
      width: 120,
      align: 'center'
    },
    {
      title: '最近随访护士',
      dataIndex: '',
      width: 120,
      align: 'center'
    },
    {
      title: '最新随访时间',
      dataIndex: 'createTime',
      width: 200,
      align: 'center'
    },
    {
      title: '随访方式',
      dataIndex: '',
      width: 120,
      align: 'center'
    },
    {
      title: '是否失访',
      dataIndex: '',
      width: 100,
      align: 'center'
    },
    {
      title: '是否死亡',
      dataIndex: '',
      width: 100,
      align: 'center'
    },
    {
      title: '随访状态',
      dataIndex: 'senderName',
      width: 100,
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: '',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      width: 150,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看</span>
            <span>随访</span>
          </DoCon>
        )
      }
    }
  ]
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }

  const onChangeSwitch = (e: any) => {
    console.log(`1`);
  }

  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }


  const handleDetailView = (bookId: string) => {
    
  }

  useEffect(() => {
    getDeptList();
    getTemplateList();
  }, []);

  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }

  const getTemplateList = () => {
    // api.getNursingUnitAll().then(res => {
    //   if (res.data.deptList instanceof Array) setTemplateList(res.data.deptList);
    // })
    const a : any = [
    {code: "1", name: "随访1组"},
    {code: "2", name: "随访2组"},
    {code: "3", name: "随访3组"},
    {code: "4", name: "随访4组"}]
    setTemplateList(a)
  }

  const getData = () => {
    setPageLoading(true)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    api
      .findLog({
        ...query,
        wardCode: deptSelect,
        isHidden: deptSwitch,
        startDate,
        endDate,
        templateId: selectedTemplate,
        searchText: searchText,
        status
      })
      .then((res) => {
        setPageLoading(false)

        setSelectedRowKeys([])

        setDataTotal(res.data.totalCount)
        setTableData(res.data.list)
      }, err => setPageLoading(false))
  }
  const getTableData = (newQuery: any) => {
    
  }
  useEffect(() => {
    getTableData(query)
  }, [query])

  const handleRowSelect = (rowKeys: string[] | number[]) => setSelectedRowKeys(rowKeys)

  const onDetail = (record: any) => {
    // appStore.history.push(`/wardLogDetail?id=${record.id}`)
  }
  useEffect(() => {
    getData()
  }, [
    query.pageIndex,
    query.pageSize,
    date,
    selectedTemplate,
    deptSelect,
    deptSwitch
  ])

  return <Wrapper>
    <PageHeader>
    <Place />
    <span className='label'>护理单元:</span>
      {/* <DeptSelect onChange={(val) => setDeptSelect(val)} /> */}
      <Select
        value={deptSelect}
        style={{ width: 180 }}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(val: string) => setDeptSelect(val)}>
        <Select.Option value={''}>全部</Select.Option>
        {deptList.map((item: any, idx: any) =>
          <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
      </Select>
      <span className='label'>出院时间:</span>
      <DatePicker.RangePicker
        allowClear={false}
        style={{ width: 220 }}
        value={date}
        onChange={(value: any) => setDate(value)}
      />
      <span className='label'>随访小组:</span>
        <Select style={{ width: 180 }} value={selectedTemplate} onChange={(value: any) => setSelectedTemplate(value)}>
          <Select.Option value=''>全部</Select.Option>
          {templateList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      <Input
        placeholder='请输入患者姓名/床号检索'
        style={{ width: 220 }}
        value={searchText}
        onChange={onChangeSearchText}
        className='ml-20'
      />
      <Button type='primary' onClick={() => getData()}>
        查询
      </Button>
      <span className='label'>隐藏已结束:</span>
      <Switch 
        defaultChecked 
        checked={deptSwitch}
        onChange={(check: any) => setDeptSwitch(check)}
        className='mr-20'
      />
    </PageHeader>
    <MainCon>
      <BaseTable columns={columns}
        dataSource={tableData}
        onRow={record => {
          return {
            onDoubleClick: () => handleDetailView(record.id)
          }
        }}
        pagination={{
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          onShowSizeChange: handlePageSizeChange,
          onChange: handlePageChange,
          total: dataTotal,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: query.pageSize,
          current: query.pageIndex
        }}
        loading={pageLoading}
        surplusHeight={260}
        surplusWidth={200} />
    </MainCon>
  </Wrapper>
}

const Wrapper = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  .ml-20 {
    margin-left: 20px
  }
  .mr-20 {
    margin-right: 20px
  }
  .file-item{
    cursor: pointer;
    color: #00A680;
    word-break: break-all;
    & *{
      vertical-align: middle;
    }
    .download{
      margin-left: 5px;
    }
    .file-icon{
      width: 12px; 
      margin-right: 5px;
    }
  }
`
const MainCon = styled.div`
  flex: 1;
  padding: 15px;
  padding-bottom: 0;
  padding-top: 0;
`