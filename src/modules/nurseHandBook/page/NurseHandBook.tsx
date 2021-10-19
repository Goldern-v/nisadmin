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
  const [year, setYear] = useState<Number>(+moment().format('YYYY'))
  const [month, setMonth]  = useState<String>('')
  const [templateList, setTemplateList]: any = useState([])
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
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

  const [isAdd, setIsAdd] = useState(false)
  const [record, setRecord] = useState({} as any)


  /** 类别 */
  const pathMap: any = {
    year: 'year',  
    month: 'month',
    conclusion: 'conclusion',
    innovation: 'innovation'
  }
  const path = window.location.hash.split('/').reverse()[0]
  
  const status = pathMap[path]

  let columns: ColumnProps<any>[] = []
  if(status == 'month') {
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
  }else{
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
  }
  const onChangeSearchText = (e: any) => {setSearchText(e.target.value)}

  const getData = () => {
    setPageLoading(true)
    nurseHandBookService
      .getPage(status,{
        ...pageOptions,
        deptCode: deptSelect,
        month: month,
        keyWord: searchText,
        year:year,
      })
      .then((res) => {
        setPageLoading(false)

        setSelectedRowKeys([])

        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
      }, err => setPageLoading(false))
  }

  const handleAddNew = (record: any) => {
    setIsAdd(true)
    setEditVisible(true)
  }

  //查看随访问卷
  const setDetailModal = (item: any) => {
    // window.open(item.path)
    setEditVisible2(true)
    let str:any = item.path;
    let index = str.lastIndexOf("\.");
    let type = str.substr(index+1,str.length);
    console.log(type);
    if(type=='jpg'||type=='png'||type=='pdf'){
      setPathChange(item.path)
    }else{
      setPathChange(item.pdfPath)
    }
    setIdChange(item.id)
  }

  const onEdit = (record: any) => {
    setIsAdd(false)
    setEditVisible(true)
    setRecord(record)
  }

  const onDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除该记录吗',
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
    nurseHandBookService.export(status,{
      ...pageOptions,
      deptCode: deptSelect,
      month: month,
      keyWord: searchText,
      year: year,
    })
    .then(res => {
      setPageLoading(false)
      setSelectedRowKeys([])
      fileDownload(res)
    }, err => setPageLoading(false))
  }

  useEffect(() => {
    getData()
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    year,
    month,
    selectedTemplate,
    deptSelect
  ])

  useEffect(() => {
    initData()
  }, [])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      getData()
    }
  })

  return (
    <Wrapper>
      <PageHeader>
      {status == 'year' &&  <PageTitle>护士长年计划</PageTitle>}
      {status == 'month' &&  <PageTitle>护士长月计划</PageTitle>}
      {status == 'conclusion' &&  <PageTitle>护士长年总结</PageTitle>}
      {status == 'innovation' &&  <PageTitle>护理创新项目记录</PageTitle>}
       
        <Place />
        <span className='label'>年份:</span>
        <Select
          value={year}
          style={{ width: 100 }}
          showSearch
          onChange={(val: any) => setYear(val)}>
          {yearList.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item}>{item}</Select.Option>)}
        </Select>
        {status == 'month' && <div>
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
        type={status}
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
`
