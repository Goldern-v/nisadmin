import moment from 'moment'
import styled from 'styled-components'
import React, { useCallback, useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Button, DatePicker, Input, message, Modal, Select, Switch } from 'antd'
import { PaginationConfig } from 'src/vendors/antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { ColumnProps } from 'antd/lib/table'

import BatchDistribution from '../../components/BatchDistribution'
import FollowUpPatientsManageServices from '../services/FollowUpPatientsManageServices'

const { Option } =  Select
export interface Props { 
  deptList: any,
  diseaseList: any,
}
const api = new FollowUpPatientsManageServices();
export default function 待分配出院患者(props: Props) {
  const [query, setQuery]: any = useState({
    pageSize: 20,
    pageIndex: 1,
  })
  //表格数据载入状态
  const [pageLoading, setPageLoading] = useState(false)
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  //科室列表
  const [date, setDate]: any = useState([])
  const [recordSelected, setRecordSelected] = useState({} as any)
  const [isAdd, setIsAdd] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [dataSource, setDataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
  const [total, setTotal]: any = useState(0)
  const [templateList, setTemplateList]: any = useState([])
  // 诊断字段
  const [diagnosisList, setDiagnosisList] = useState<any[]>([])
  const [diagnosis, setDiagnosis] = useState('')

  const columns: ColumnProps<any>[] = [
    {
      title: '护理单元',
      dataIndex: 'wardName',
      align: 'center',
      width: 250
    },
    {
      title: '床号',
      dataIndex: 'bedNumber',
      align: 'center',
      width: 60
    },
    {
      title: '姓名',
      dataIndex: 'patientName',
      align: 'center',
      width: 80
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      width: 60,
      render(sex: any) {
        return sex === 0 ? "男" : sex === 1 ? "女" : "";
      }
    },
    {
      title: '联系电话',
      dataIndex: 'contactsPhone',
      width: 120,
      align: 'center'
    },
    {
      title: '联系人',
      dataIndex: 'contactsName',
      width: 150,
      align: 'center'
    },
    {
      title: '病人ID',
      dataIndex: 'patientId',
      width: 100,
      align: 'center'
    },
    {
      title: '住院号',
      dataIndex: 'hospitalNumber',
      width: 100,
      align: 'center'
    },
    {
      title: '住院次数',
      dataIndex: 'visitId',
      width: 100,
      align: 'center'
    },
    {
      title: '管床医生',
      dataIndex: 'doctorName',
      width: 100,
      align: 'center'
    },
    {
      title: '出院日期',
      dataIndex: 'dischargeDate',
      width: 200,
      align: 'center'
    },
    {
      title: '诊断',
      dataIndex: 'diagnosis',
      width: 180,
      align: 'center'
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDistribution(record)}>分配随访小组</span>
          </DoCon>
        )
      }
    }
  ]
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  const getTemplateList = (val: any) => {
    api.visitTeam({wardCode:val}).then(res => {
      if (res.data instanceof Array) setTemplateList(res.data);
    })
  }
  const getData = () => {
    setPageLoading(true)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    api
      .visitPatientData({
        ...query,
        status: 2, //1已分配 2未分配
        wardCode: deptSelect,
        startDate,
        endDate,
        keyword: searchText,
        diagnosis,
      })
      .then((res) => {
        setPageLoading(false)
        setSelectedRowKeys([])
        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
      }, err => setPageLoading(false))
  }
  const handleRowSelect = (rowKeys: string[] | number[]) => setSelectedRowKeys(rowKeys)
  const onBatchDistribution = (record:any) => {
    if(selectedRowKeys.length == 0) {
      message.warning('请先选择出院患者');
    }else{
      onDistribution(record)
    }
  }
  const onDistribution = (record:any) => {
    setRecordSelected(record)
    setIsAdd(false)
    setEditVisible(true)
  }
  const filterFn = useCallback(
    (input: any, option: any) => {
      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    []
  )
  /**诊断列表 */
  const getDiagnosisList = useCallback(() => {
    if (!deptSelect) {
      setDiagnosisList([])
      return
    }
    api.getDictItemValueList({
        dictCode: 'ward_nursing',
        itemCode: deptSelect
      }).then((res: any) => {
      if (res.code == 200) {
        const list = res.data || []
        setDiagnosisList(list)
        setDiagnosis('')
      }
    }).catch(e => {})
  }, [deptSelect])
  
  useEffect(() => {
    setDeptSelect(user.deptCode)
    getTemplateList(user.deptCode)
    getDiagnosisList()
  }, [])

  useEffect(() => {
    getDiagnosisList()
  }, [deptSelect])
  
  useEffect(() => {
    getData()
  }, [
    query.pageIndex,
    query.pageSize,
    date,
    deptSelect,
    diagnosis,
  ])
  return <Wrapper>
    <PageHeader>
    <Place />
    <span className='label'>护理单元:</span>
      <Select
        value={deptSelect}
        style={{ width: 180 }}
        showSearch
        filterOption={(input: any, option: any) => filterFn(input, option)}
        onChange={(val: string) => {
          if (val == '') {
            setDiagnosis('')
          }
          setDeptSelect(val)
          getTemplateList(val)
        }}>
        <Option value={''}>全部</Option>
        {props.deptList.map((item: any, idx: any) =>
          <Option key={idx} value={item.code}>{item.name}</Option>)}
      </Select>
      <span className="label">诊断:</span>
      <Select
        value={diagnosis}
        style={{width: 120}}
        showSearch
        filterOption={(input: any, option: any) => filterFn(input, option)}
        onChange={(val: string) => {
          setDiagnosis(val)
        }}>
        <Option value={''}>全部</Option>
        {diagnosisList.map((v:string, i: number) => 
          <Option key={i} value={v}>{v}</Option>
        )}
      </Select>
      <span className='label'>出院时间:</span>
      <DatePicker.RangePicker
        allowClear
        style={{ width: 220 }}
        value={date}
        onChange={(value: any) => setDate(value)}
      />
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
      <Button  onClick={onBatchDistribution} className='mr-20'>
        批量分配
      </Button>
    </PageHeader>
    <MainCon>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
        rowKey='patientId'
        surplusHeight={260}
        surplusWidth={200}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          total: total
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelect,
          getCheckboxProps: (record: any) => ({
            name: record.name
          })
        }}
        onChange={(pagination: PaginationConfig) => {
          setQuery({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          })
        }}
      />
    </MainCon>
    <BatchDistribution
      params={recordSelected}
      templateList={templateList}
      diseaseList={props.diseaseList}
      patientId={selectedRowKeys}
      isAdd={isAdd}
      visible={editVisible}
      onOk={() => {
        setEditVisible(false)
        getData()
      }}
      onCancel={() => setEditVisible(false)} />
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
  padding: 0px;
  padding-bottom: 0;
  padding-top: 0;
`