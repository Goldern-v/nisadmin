import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig, Modal, message, Input } from 'src/vendors/antd'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { nurseHandBookService } from '../services/NurseHandBookService'
import NurseHandBookModal from '../components/NurseHandBookModal'
import { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { useKeepAliveEffect } from 'src/vendors/keep-alive'
import { fileDownload } from 'src/utils/file/file'
import service from 'src/services/api'
import FormPageBody from '../components/FormPageBody'

export interface Props { }

export default observer(function MyCreateList() {
  const [year, setYear] = useState<String>('')
  const [month, setMonth]  = useState<String>('')
  const [templateList, setTemplateList]: any = useState([])
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [filterDate, setFilterDate]:any = useState([])
  const [dataSource, setDataSource] = useState([])
  const [deptSelect, setDeptSelect] = useState('')
  const [yearList, setYearList] = useState([] as number[])
  const [monthList, setMonthList] = useState([] as string[])
  const [deptListAll, setDeptListAll] = useState([] as any[])
  const [pageLoading, setPageLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  const [editVisible, setEditVisible] = useState(false)
  const [editVisible2, setEditVisible2] = useState(false)
  const [pathChange, setPathChange] = useState("")
  const [idChange, setIdChange] = useState("")
  const [state, setState]  = useState<String>('')

  const [isAdd, setIsAdd] = useState(false)
  const [record, setRecord] = useState({} as any)
  //控制年份
  const controlYear : string =
  appStore.hisMatch({
    map: {
      jmfy: false,
      default: true,
    },
    vague: true,
  })
  //控制时间控件
  const controlDatePicker : string =
  appStore.hisMatch({
    map: {
      jmfy: true,
      default: false,
    },
    vague: true,
  })

  const titleArr:any = {
    year: '护士长年计划',  
    month: '护士长月计划',
    conclusion: '护士长年总结',
    innovation: '护理创新项目记录',
    businessStudy: '业务学习项目',
    meetingRecord: '管理小组会议记录',
    holidayRecord: '公休会记录',
    weekPlan: '护士长周计划',
    monthPlan: '护士长月度计划',
    quarterPlan: '护士长季度计划',
    yearPlan: '护士长年度计划',
    weekConclusion: '护士长周总结',
    monthConclusion: '护士长月度总结',
    quarterConclusion: '护士长季度总结',
    yearConclusion: '护士长年度总结',
  }

  const path = window.location.hash.split('/').reverse()[0]

  let columns: ColumnProps<any>[] = []
  if(path == 'month') {
    columns = 
  [
    {
      title: '标题',
      dataIndex: 'title',
      width: 150,
      align: 'center'
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 100,
      align: 'center'
    },
    {
      title: '时间',
      dataIndex: 'date',
      width: 50,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 50,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      width: 50,
      align: 'center'
    },
    {
      title: '上传附件',
      dataIndex: 'files',
      width: 200,
      align: 'center',
      render: (text: string, record: any) => {
        return (
          <div>
            {record.files.map((item: any, index: number) => (
               <div><a href='javascript:;'onClick={() => setDetailModal(item)} key={item.name}>{item.name}</a></div>
            ))}
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onEdit(record)}>编辑</span>
            <span onClick={() => onDelete(record)}>删除</span>
          </DoCon>
        )
      }
    }
  ]
  }else if(appStore.HOSPITAL_ID == "jmfy"){
    columns = 
  [
    {
      title: '标题',
      dataIndex: 'content',
      width: 150,
      align: 'center',
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 100,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 50,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      width: 50,
      align: 'center'
    },
    {
      title: '上传附件',
      dataIndex: 'files[0].name',
      width: 200,
      align: 'center',
      render: (text: string, record: any) => {
        return (
          <div>
            {record.files.map((item: any, index: number) => (
              <div><a href='javascript:;'onClick={() => setDetailModal(item)} key={item.name}>{item.name}</a></div>
            ))}
          </div>
        )
      }
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      width: 50,
      align: 'center',
      render(status: any) {
        return (
          <div>
            <span className={status == "0" ? "active1" : status == "1" ? "active" : status == "2" ? "active2" : ""}>{status == "0" ? "待审核" : status == "1" ? "审核通过" : status == "2" ? "驳回" : "草稿" }</span>
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            {record.status==1&&<span onClick={() => onEdit(record)}>查看</span>}
            {(record.status==2||record.status==3)&&<span onClick={() => onEdit(record)}>编辑</span>}
            {(record.status==0||record.status==2)&&<span onClick={() => onUndo(record)}>撤销</span>}
            {record.status!=1&&<span onClick={() => onDelete(record)}>删除</span>}
          </DoCon>
        )
      }
    }
  ]
  }else{
    columns = 
  [
    {
      title: '标题',
      dataIndex: 'title',
      width: 150,
      align: 'center',
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 100,
      align: 'center'
    },
    {
      title: '年份',
      dataIndex: 'year',
      width: 50,
      align: 'center',
      render(year: any) {
        return year + "年";
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 50,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      width: 50,
      align: 'center'
    },
    {
      title: '上传附件',
      dataIndex: 'files[0].name',
      width: 200,
      align: 'center',
      render: (text: string, record: any) => {
        return (
          <div>
            {record.files.map((item: any, index: number) => (
              <div><a href='javascript:;'onClick={() => setDetailModal(item)} key={item.name}>{item.name}</a></div>
            ))}
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onEdit(record)}>编辑</span>
            <span onClick={() => onDelete(record)}>删除</span>
          </DoCon>
        )
      }
    }
  ]
  }
  
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  const [total, setTotal]: any = useState(0)

  const initData = () => {
    nurseHandBookService.findTemplates().then((res) => {
      setTemplateList([...res.data.publicTemplates, ...res.data.deptTemplates].map((item: any) => item.template))
    })

    service.commonApiService
      .getNursingUnitAll().then(res => {
        setDeptListAll((res.data?.deptList || []).filter((item: any) => item.code !== '0001'))
    })
    
    let nowYear:number = +moment().format('YYYY')
    setYearList([nowYear-5,nowYear-4,nowYear-3,nowYear-2,nowYear-1,nowYear,nowYear+1,nowYear+2,nowYear+3,nowYear+4,nowYear+5])
    setMonthList(['1','2','3','4','5','6','7','8','9','10','11','12'])
    
    if(path == 'weekPlan' || path == 'weekConclusion'){
      setFilterDate([moment().startOf("week"), moment().endOf("week")])
    }else if(path == 'monthPlan' || path == 'monthConclusion'){
      setFilterDate([moment().startOf("month"), moment().endOf("month")])
    }else if(path == 'quarterPlan' || path == 'quarterConclusion'){
      setFilterDate([moment().startOf('quarter'), moment().endOf('quarter')])
    }else if(path == 'yearPlan' || path == 'yearConclusion'){
      setYear(moment().format('YYYY'))
    }
    getData()
  }
  const onChangeSearchText = (e: any) => {setSearchText(e.target.value)}

  const getData = () => {
    setPageLoading(true)
    let startTime = filterDate[0] ? moment(filterDate[0]).format('YYYY-MM-DD') : ''
    let endTime = filterDate[0] ? moment(filterDate[1]).format('YYYY-MM-DD') : ''
    nurseHandBookService
      .getPage(path,{
        ...pageOptions,
        deptCode: deptSelect,
        month: month,
        keyWord: searchText,
        year:year,
        status: state,
        startTime,
        endTime,
      })
      .then((res) => {
        setPageLoading(false)

        setSelectedRowKeys([])

        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
      }, err => setPageLoading(false))
  }

  const handleAddNew = (record: any) => {
    if(appStore.HOSPITAL_ID == "jmfy"){
      appStore.history.push(`/nurseHandBookDetailView/?type=${path}&&isAdd=true`)
    }else{
      setIsAdd(true)
      setEditVisible(true)
    }
  }

  //查看随访问卷
  const setDetailModal = (item: any) => {
    // window.open(item.path)
    setEditVisible2(true)
    let str:any = item.path;
    let pdfStr:any = item.pdfPath;
    let index = str.lastIndexOf("\.");
    let type = str.substr(index+1,str.length);
    let start = str.indexOf("/crNursing/")
    if(type=='jpg'||type=='png'||type=='pdf'){
      let path = str.substring(start,start+item.path.length)
      setPathChange(path)
    }else{
      let pdfPath = pdfStr.substring(start,start+pdfStr.length)
      setPathChange(pdfPath)
    }
    setIdChange(item.id)
  }

  const onEdit = (record: any) => {
    if(appStore.HOSPITAL_ID == "jmfy"){
      appStore.history.push(`/nurseHandBookDetailView/?type=${path}&&id=${record.id}&&isAdd=`)
    }else{
      setIsAdd(false)
      setEditVisible(true)
      setRecord(record)
    }
  }

  const onUndo = (record: any) => {
    let undoTitle = ""
    if(path == "weekConclusion" || path == "monthConclusion" || path == "quarterConclusion" || path == "yearConclusion"){
      undoTitle = '确认撤销该总结吗？'
    }else{
      undoTitle = '确认撤销该计划吗？'
    }
    Modal.confirm({
      title: undoTitle,
      centered: true,
      onOk: () => {
        setPageLoading(true)
        nurseHandBookService
          .undo({id:record.id,status:record.status})
          .then(res => {
            message.success('撤销成功', 1, () => getData())
          }, err => setPageLoading(false))
      }
    })
  }

  const onDelete = (record: any) => {
    let deleteTitle = ""
    if(path == "weekConclusion" || path == "monthConclusion" || path == "quarterConclusion" || path == "yearConclusion" || path == "conclusion"){
      deleteTitle = '确认删除该总结吗？'
    }else if(path == "weekPlan" || path == "monthPlan" || path == "quarterPlan" || path == "yearPlan" || path == "year" || path == "month"){
      deleteTitle = '确认删除该计划吗？'
    }else{
      deleteTitle = '确认删除该记录吗？'
    }

    Modal.confirm({
      title: deleteTitle,
      centered: true,
      onOk: () => {
        setPageLoading(true)
        nurseHandBookService
          .delete(record.id,{id:record.id})
          .then(res => {
            message.success('删除成功', 1, () => getData())
          }, err => setPageLoading(false))

      }
    })
  }

  const handleRowSelect = (rowKeys: string[] | number[]) => setSelectedRowKeys(rowKeys)

  const handleExport = () => {
    setPageLoading(true)
    let startTime = filterDate[0] ? moment(filterDate[0]).format('YYYY-MM-DD') : ''
    let endTime = filterDate[0] ? moment(filterDate[1]).format('YYYY-MM-DD') : ''
    nurseHandBookService.export(path,{
      ...pageOptions,
      deptCode: deptSelect,
      month: month,
      keyWord: searchText,
      year: year,
      startTime,
      endTime,
    })
    .then(res => {
      setPageLoading(false)
      setSelectedRowKeys([])
      fileDownload(res)
    }, err => setPageLoading(false))
  }

  useEffect(() => {
    if(filterDate[0]&&filterDate[1]){
      getData()
    }
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    state,
    filterDate,
    year,
    month,
    selectedTemplate,
    deptSelect
  ])

  useEffect(() => {
    initData()
  }, [])

  // useKeepAliveEffect(() => {
  //   if ((appStore.history && appStore.history.action) === 'POP') {
  //     if(filterDate[0]&&filterDate[1]){
  //       getData()
  //     }
  //   }
  // })

  return (
    <Wrapper>
      <PageHeader>
        {<PageTitle>{titleArr[path]}</PageTitle>}
        <Place />
        {controlYear && <div>
        <span className='label'>年份:</span>
        <Select
          value={year}
          style={{ width: 100 }}
          showSearch
          onChange={(val: any) => setYear(val)}>
          {yearList.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item}>{item}</Select.Option>)}
        </Select>
        </div>}
        {path == 'month' && <div>
        <span className='label ml-20'>月份:</span>
        <Select
          value={month}
          style={{ width: 100 }}
          showSearch
          onChange={(val: any) => setMonth(val)}>
          <Select.Option value={''}>全部</Select.Option>
          {monthList.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item}>{item}</Select.Option>)}
        </Select>
        </div>
        }
        {controlDatePicker && <div>
          {(path != 'yearPlan' && path != 'yearConclusion') && <span>
            <span className='label ml-20'>时间:</span>
            <DatePicker.RangePicker
              allowClear={false}
              value={[filterDate[0], filterDate[1]]}
              onChange={(value: any) => setFilterDate(value)}
              style={{ width: 220 }}
            />
          </span>}
          {(path == 'yearPlan' || path == 'yearConclusion') && <span>
          <span className='label'>年份:</span>
          <Select
            value={year}
            style={{ width: 100 }}
            showSearch
            onChange={(val: any) => setYear(val)}>
            {yearList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
          </span>}
          <span className='label ml-20'>状态:</span>
          <Select
            value={state}
            style={{ width: 100 }}
            showSearch
            onChange={(val: any) => setState(val)}>
            <Select.Option value={''}>全部</Select.Option>
            <Select.Option value={'3'}>草稿</Select.Option>
            <Select.Option value={'2'}>驳回</Select.Option>
            <Select.Option value={'0'}>待审核</Select.Option>
            <Select.Option value={'1'}>审核通过</Select.Option>
          </Select>
        </div>}
        <span className='label'>科室:</span>
        <Select
          value={deptSelect}
          style={{ width: 180 }}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val: string) => setDeptSelect(val)}>
          <Select.Option value={''}>全部</Select.Option>
          {deptListAll.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
        </Select>
        <Input
          placeholder='请输入姓名/标题等关键字'
          style={{ width: 220 }}
          value={searchText}
          onChange={onChangeSearchText}
          className='ml-20'
        />

        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        <Button onClick={handleExport}>导出</Button>
        {/* <Button onClick={handleExport}>打印</Button> */}
        <Button type='primary' onClick={handleAddNew}>新建</Button>
      
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
        rowKey='id'
        surplusHeight={220}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelect,
          getCheckboxProps: (record: any) => ({
            // disabled: !deptSelect || !selectedTemplate,
            // disabled: !selectedTemplate,
            name: record.name
          })
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          })
        }}
      />
      <NurseHandBookModal
        params={record}
        visible={editVisible}
        deptList={deptListAll}
        isAdd={isAdd}
        type={path}
        onOk={() => {
          getData()
          setEditVisible(false)
        }}
        onCancel={() => {
          getData()
          setEditVisible(false)
        }}/>  
      <FormPageBody
        visible={editVisible2}
        path={pathChange}
        id={idChange}
        onOk={() => {}}
        onCancel={() => setEditVisible2(false)} />
    </Wrapper>
  )
})
const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
.active{
  color: #09a9f0;
}
.active1{
  color: #f6ac4b;
}
.active2{
  color: red;
}
`
