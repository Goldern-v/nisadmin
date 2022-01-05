import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig, Modal, message, Input } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { nurseHandBookService } from '../services/NurseHandBookService'
import NurseHandBookModal from '../components/NurseHandBookModal'
import { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { fileDownload } from 'src/utils/file/file'
import service from 'src/services/api'
import FormPageBody from '../components/FormPageBody'

export interface Props { }

export default observer(function NurseHandBook_lcey() {
  const [weekDate, setWeekDate]: any = useState([moment().startOf("week"), moment().endOf("week")])
  const [dataSource, setDataSource] = useState([])
  const [deptSelect, setDeptSelect] = useState('')
  const [deptListAll, setDeptListAll] = useState([] as any[])
  const [pageLoading, setPageLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  const [editVisible, setEditVisible] = useState(false)
  const [pathChange, setPathChange] = useState("")
  const [idChange, setIdChange] = useState("")
  const [state, setState] = useState<String>('')
  const [manualType, setManualType] = useState<String>('')


  const titleArr: any = {
    planJM: '护士长工作计划',
    conclusionJM: '护士长工作总结',
  }

  const manualTypeArr: any = {
    planJM: [
      { value: "护理部年度工作计划", name: "护理部年度工作计划" },
      { value: "护理部月工作计划", name: "护理部月工作计划" },
      { value: "病区年度工作计划", name: "病区年度工作计划" },
      { value: "病区月工作计划", name: "病区月工作计划" },
    ],
    conclusionJM: [
      { value: "jm_monthConclusion", name: "月工作总结" },
      // { value: "jm_halfConclusion", name: "上半年的工作总结及下半年的工作计划" }, 
      // { value: "jm_yearConclusion", name: "年度工作总结及下年度工作计划" },
    ],
  }

  const path = window.location.hash.split('/').reverse()[0]

  let columns: any = [
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
      title: '创建时间',
      dataIndex: 'createTime',
      width: 70,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      width: 60,
      align: 'center'
    },
    {
      title: '类型',
      dataIndex: 'manualType',
      width: 100,
      align: 'center',
      render(manualType: any) {
        return (
          <div>
            <span>{findManualTypeName(manualType)}</span>
          </div>
        )
      }
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
              <div className="showFilesList" key={item.name} onClick={() => setDetailModal(item)}>{item.name}</div>
            ))}
          </div>
        )
      }
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      width: 70,
      align: 'center',
      render(status: any) {
        return (
          <div>
            <span className={status == "0" ? "active1" : status == "1" ? "active" : status == "2" ? "active2" : ""}>{status == "0" ? "待审核" : status == "1" ? "审核通过" : status == "2" ? "驳回" : "草稿"}</span>
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            {(record.status == 0 || record.status == 1) && <span onClick={() => onCheck(record)}>查看</span>}
            {(record.status == 2 || record.status == 3) && <span onClick={() => onEdit(record)}>编辑</span>}
            {(record.status == 0 || record.status == 2) && <span onClick={() => onUndo(record)}>撤销</span>}
            {record.status != 1 && <span onClick={() => onDelete(record)}>删除</span>}
          </DoCon>
        )
      }
    }
  ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  const [total, setTotal]: any = useState(0)

  const findManualTypeName = (manualType:any) => {
    let obj = manualTypeArr[path].find((item:any) => item.value == manualType)
    return obj.name
  }

  const initData = () => {
    service.commonApiService
      .getUintList().then(res => {
        setDeptListAll((res.data?.deptList || []).filter((item: any) => item.code !== '0001'))
      })
  }
  const onChangeSearchText = (e: any) => { setSearchText(e.target.value) }

  const getData = () => {
    setPageLoading(true)
    let startTime = weekDate[0] ? moment(weekDate[0]).format('YYYY-MM-DD') : ''
    let endTime = weekDate[1] ? moment(weekDate[1]).format('YYYY-MM-DD') : ''
    nurseHandBookService
      .getPage(path, {
        ...pageOptions,
        deptCode: deptSelect,
        keyWord: searchText,
        status: state,
        manualType: manualType,
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
    let manualTypeAddNew = ""
    Modal.confirm({
      title: "请选择类型",
      centered: true,
      content: <div style={{ marginTop: 30 }}>
        <Select
          defaultValue={manualTypeAddNew}
          style={{ width: 280 }}
          onChange={(val: any) => manualTypeAddNew = val}>
          {manualTypeArr[path].map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.value}>{item.name}</Select.Option>)}
        </Select>
      </div>,
      onOk: () => {
        if (manualTypeAddNew == "") {
          message.error('类型不能为空')
          return
        } else {
          appStore.history.push(`/NurseHandBookFormPage/?type=${path}&&manualType=${manualTypeAddNew}&&isAdd=true`) //3.0版本
        }
      }
    })
  }

  //查看随访问卷
  const setDetailModal = (item: any) => {
    console.log(1);
    
    // window.open(item.path)
    setEditVisible(true)
    let str: any = item.path;
    let pdfStr: any = item.pdfPath;
    let index = str.lastIndexOf("\.");
    let type = str.substr(index + 1, str.length);
    let start = str.indexOf("/crNursing/")
    if (type == 'jpg' || type == 'png' || type == 'pdf') {
      let path = str.substring(start, start + item.path.length)
      setPathChange(path)
    } else {
      let pdfPath = pdfStr.substring(start, start + pdfStr.length)
      setPathChange(pdfPath)
    }
    setIdChange(item.id)
  }
  
  const onCheck = (record: any) => {
    appStore.history.push(`/NurseHandBookFormPage/?type=${path}&&id=${record.id}&&audit=2&&manualType=${record.manualType}&&isAdd=`)
  }

  const onEdit = (record: any) => {
    appStore.history.push(`/NurseHandBookFormPage/?type=${path}&&id=${record.id}&&manualType=${record.manualType}&&isAdd=`)
  }

  const onUndo = (record: any) => {
    let undoTitle = ""
    if (path == "planJM") {
      undoTitle = '确认撤销该总结吗？'
    } else if (path == "conclusionJM") {
      undoTitle = '确认撤销该计划吗？'
    } else {
      undoTitle = '确认删除该记录吗？'
    }
    Modal.confirm({
      title: undoTitle,
      centered: true,
      onOk: () => {
        setPageLoading(true)
        nurseHandBookService
          .undo({ id: record.id, status: record.status })
          .then(res => {
            message.success('撤销成功', 1, () => getData())
          }, err => setPageLoading(false))
      }
    })
  }

  const onDelete = (record: any) => {
    let deleteTitle = ""
    if (path == "planJM") {
      deleteTitle = '确认删除该计划吗？'
    } else if (path == "conclusionJM") {
      deleteTitle = '确认删除该总结吗？'
    } else {
      deleteTitle = '确认删除该记录吗？'
    }

    Modal.confirm({
      title: deleteTitle,
      centered: true,
      onOk: () => {
        setPageLoading(true)
        nurseHandBookService
          .delete(record.id, { id: record.id })
          .then(res => {
            message.success('删除成功', 1, () => getData())
          }, err => setPageLoading(false))
      }
    })
  }

  const handleRowSelect = (rowKeys: string[] | number[]) => setSelectedRowKeys(rowKeys)

  const handleExport = () => {
    setPageLoading(true)
    let startTime = weekDate[0] ? moment(weekDate[0]).format('YYYY-MM-DD') : ''
    let endTime = weekDate[1] ? moment(weekDate[1]).format('YYYY-MM-DD') : ''

    nurseHandBookService.export(path, {
      ...pageOptions,
      deptCode: deptSelect,
      keyWord: searchText,
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
    getData()
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    state,
    weekDate,
    deptSelect,
    manualType,
  ])

  useEffect(() => {
    initData()
  }, [])

  return (
    <Wrapper>
      <PageHeader>
        {<PageTitle>{titleArr[path]}</PageTitle>}
        <Place />
        <span className='label ml-20'>时间:</span>
        <DatePicker.RangePicker
          allowClear={false}
          value={[weekDate[0], weekDate[1]]}
          onChange={(value: any) => setWeekDate(value)}
          style={{ width: 220 }}
        />
       
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
      <PageHeader>
        <Place />
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
        <span className='label ml-20'>类型:</span>
        <Select
          value={manualType}
          style={{ width: 220 , marginRight: '235px'}}
          onChange={(val: any) => setManualType(val)}>
          <Select.Option value={''}>全部</Select.Option>
          {manualTypeArr[path].map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.value}>{item.name}</Select.Option>)}
        </Select>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
        // rowKey='id'
        surplusHeight={280}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: handleRowSelect,
        //   getCheckboxProps: (record: any) => ({
        //     name: record.name
        //   })
        // }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          })
        }}
      />
      <FormPageBody
        visible={editVisible}
        path={pathChange}
        id={idChange}
        onOk={() => { }}
        onCancel={() => setEditVisible(false)} />
    </Wrapper>
  )
})
const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
.active {
  color: #09a9f0;
}
.active1 {
  color: #f6ac4b;
}
.active2 {
  color: red;
}
.showFilesList {
  color: #4aa382;
  cursor: pointer;
  width: 100%;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}
`
