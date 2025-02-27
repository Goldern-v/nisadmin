import moment from 'moment'
import Right from 'src/modules/continuingEdu/views/trainingSetting/formCheck/components/Right'
import styled from 'styled-components'
import React, { useCallback, useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Button, DatePicker, Input, message, Modal, Select, Switch } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { appStore, authStore } from 'src/stores'
import { ColumnProps } from 'antd/lib/table'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'

import FollowUpPatientsManageServices from '../services/FollowUpPatientsManageServices'

const { Option } =  Select

export interface Props { 
  deptList: any, //科室列表
}
const api = new FollowUpPatientsManageServices();
export default function 已分配出院患者(props:Props) {
  const [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1,
  })
  //表格数据载入状态
  const [tableData, setTableData] = useState([])
  const [dataTotal, setDataTotal] = useState(0)
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [deptSwitch, setDeptSwitch] = useState(false)
  const [date, setDate]: any = useState([])
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [searchText, setSearchText] = useState('')
  const [templateList, setTemplateList]: any = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  // 诊断字段
  const [diagnosisList, setDiagnosisList] = useState<any[]>([])
  const [diagnosis, setDiagnosis] = useState('')

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
      width: 250
    },
    {
      title: '床号',
      dataIndex: 'bedNumber',
      align: 'center',
      width: 50
    },
    {
      title: '姓名',
      dataIndex: 'patientName',
      align: 'center',
      width: 70
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      width: 50,
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
      title: '病种',
      dataIndex: 'visitDiseaseTypeList[0].diseaseTypeName',
      width: 150,
      align: 'center',
      render:( text: string, record: any) => {
        return (
          <div>
            {record.visitDiseaseTypeList.map((item: any, index: number) => {
              if(index == record.visitDiseaseTypeList.length-1){
                return (
                  <span key={index}>{item.diseaseTypeName}</span>
                )
              }
              return (
                <span key={index}>{item.diseaseTypeName}、</span>
              )
            })}
          </div>
        )
      }
    },
    {
      title: '随访周期',
      dataIndex: 'visitPeriods',
      width: 120,
      align: 'center',
      render(visitPeriods: any) {
        return visitPeriods + "个月";
      }
    },
    {
      title: '随访开始时间',
      dataIndex: 'visitStartDate',
      width: 200,
      align: 'center'
    },
    {
      title: '随访结束时间',
      dataIndex: 'visitEndDate',
      width: 200,
      align: 'center'
    },
    {
      title: '随访小组',
      dataIndex: 'visitTeam.teamName',
      width: 120,
      align: 'center'
    },
    {
      title: '最近随访护士',
      dataIndex: 'newestVisitNurse',
      width: 120,
      align: 'center'
    },
    {
      title: '最新随访时间',
      dataIndex: 'newestVisitDate',
      width: 200,
      align: 'center'
    },
    {
      title: '随访方式',
      dataIndex: 'visitType',
      width: 120,
      align: 'center',
      render(visitType: any) {
        return visitType === 1 ? "" : "电话";
      }
    },
    {
      title: '是否失访',
      dataIndex: 'isLostVisit',
      width: 100,
      align: 'center',
      render(isLostVisit: any) {
        return isLostVisit === 0 ? "否" : isLostVisit === 1 ? "是" : "";
      }
    },
    {
      title: '是否死亡',
      dataIndex: 'isDead',
      width: 100,
      align: 'center',
      render(isDead: any) {
        return isDead === 0 ? "否" : isDead === 1 ? "是" : "";
      }
    },
    {
      title: '随访状态',
      dataIndex: 'visitStatus',
      width: 100,
      align: 'center',
      render( visitStatus: any,record: any, index: number) {
        return (
          <div>
            <span className={visitStatus == 1 ? "active" : ""}>{visitStatus == 0 ? "已结束" :  "进行中" }</span>
          </div>
        )
      }
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看</span>
            <span style={{display:record.visitStatus==0 ? "none" : ""}} onClick={() => onDetail(record)}>随访</span>
          </DoCon>
        )
      }
    }
  ]
  useEffect(() => {
    setDeptSelect(user.deptCode)
    getTemplateList(user.deptCode)
    getDiagnosisList()
  }, [])

  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }
  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }
  const handleDetailView = (bookId: string) => {}
  const getTemplateList = (val: any) => {
    api.visitTeam({wardCode:val}).then(res => {
      if (res.data instanceof Array) setTemplateList(res.data);
    })
  }
  const getData = () => {
    setPageLoading(true)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    let isEnd = deptSwitch ? 1 : 0 //0不隐藏 1隐藏
    api
      .visitPatientData({
        ...query,
        status: 1, //1已分配 2未分配
        wardCode: deptSelect,
        startDate,
        endDate,
        teamId: selectedTemplate,
        keyword: searchText,
        isEnd,
        diagnosis,
      })
      .then((res) => {
        setPageLoading(false)
        setDataTotal(res.data.totalCount)
        setTableData(res.data.list)
      }, err => setPageLoading(false))
  }
  const onDetail = (record: any) => {
    appStore.history.push(`/nursingFollowUpDetail?patientId=${record.patientId}`)
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
    getDiagnosisList()
  }, [deptSelect])
  
  useEffect(() => {
    getData()
  }, [
    query.pageIndex,
    query.pageSize,
    date,
    selectedTemplate,
    deptSelect,
    deptSwitch,
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
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(val: string) => {
          if (val == '') {
            setDiagnosis('')
          }
          setDeptSelect(val)
          getTemplateList(val)
        }}>
        <Select.Option value={''}>全部</Select.Option>
        {props.deptList.map((item: any, idx: any) =>
          <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
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
      <span className='label'>随访小组:</span>
        <Select style={{ width: 180 }} value={selectedTemplate} onChange={(value: any) => setSelectedTemplate(value)}>
          <Select.Option value=''>全部</Select.Option>
          {templateList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.teamId}>
              {item.teamName}
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
      <BaseTable 
        columns={columns}
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
  .active{
    color: #00A680;
  }
`