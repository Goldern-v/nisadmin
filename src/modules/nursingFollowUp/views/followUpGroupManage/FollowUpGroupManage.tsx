import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, Input, ColumnProps, PaginationConfig, Modal, message, Switch } from 'src/vendors/antd'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import BaseTable from 'src/components/BaseTable'
import FollowUpGroupModal from '../components/FollowUpGroupModal'
import FollowUpGroupManageServices from './services/FollowUpGroupManageServices'
export interface Props { }
const api = new FollowUpGroupManageServices();
export default function FollowUpGroupManage(props: any) {
  let [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  const [dataTotal, setDataTotal] = useState(0)
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [searchText, setSearchText] = useState('')
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [selectedDistribution, setSelectedDistribution]: any = useState('')
  const [templateList, setTemplateList]: any = useState([])
  const [distributionList, setDistributionList]: any = useState([])
  const [tableData, setTableData] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [editVisible, setEditVisible] = useState(false)

  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  //设置随访小组
  const setFollowUpGroup = (record: any) => {
    setEditVisible(true)
  }
  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }
  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }
  const handleDetailView = (bookId: string) => {}
  const onSave = () => { 
    setPageLoading(true)
    let visitTeamList = tableData.map((item: any)=>{return {teamId:item.visitTeam.teamId,empNo:item.empNo}})
    visitTeamList = visitTeamList.filter((item: any)=>{return !!item.teamId})
    api
      .setVisitTeam({visitTeamList})
      .then((res) => {
        setPageLoading(false)
        message.success('保存成功')
      }, err => setPageLoading(false))
  }
  const getData = () => {
    setPageLoading(true)
    api
      .queryNursePageList({
        ...query,
        wardCode: deptSelect,
        teamId: selectedTemplate,
        status: selectedDistribution,
        keyword: searchText,
      })
      .then((res) => {
        setPageLoading(false)
        setSelectedRowKeys([])
        setDataTotal(res.data.totalCount)
        let list = res.data.list.map((item: any)=> {
         item.visitTeam = item.visitTeam || [{}]
         return item
        })
        setTableData(list)
      }, err => setPageLoading(false))
  }
  const columns: any = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 30,
    },
    {
      title: '护理单元',
      dataIndex: 'deptName',
      key: 'deptName',
      align: 'center',
      width: 150,
    }
    ,
    {
      title: '工号',
      dataIndex: 'empNo',
      key: 'empNo',
      align: 'center',
      width: 80
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      key: 'empName',
      align: 'center',
      width: 80
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      align: 'center',
      width: 50,
      render(sex: any) {
        return sex == "0" ? "男" : sex == "1" ? "女" : "";
      }
    },
    {
      title: '职称',
      dataIndex: 'newTitle',
      key: 'newTitle',
      align: 'center',
      width: 100
    },
    {
      title: '职务',
      dataIndex: 'job',
      key: 'job',
      align: 'center',
      width: 100
    },
    {
      title: '层级',
      dataIndex: 'nurseHierarchy',
      key: 'nurseHierarchy',
      align: 'center',
      width: 100
    },
    {
      title: '随访小组',
      dataIndex: 'visitTeam.teamName',
      key: 'visitTeam.teamName',
      width: 70,
      align: 'center',
    },
    // {
    //   title: '随访小组',
    //   dataIndex: 'visitTeam.teamId',
    //   key: 'visitTeam.teamId',
    //   width: 70,
    //   align: 'center',
    //   // className: 'ipt-cell',
    //   render: (text: string, record: any) => {
    //     return (
    //       <div>
    //         <Select 
    //           style={{ width: '100%' }}
    //           id={"box_select"}
    //           showArrow={false}
    //           value={record.visitTeam == null ? '' : record.visitTeam.teamId}
    //           onChange={(value: any) => {
    //             record.visitTeam.teamId = value
    //             setTableData([...tableData])
    //           }}>
    //           {templateList.map((item: any, index: number) => (
    //             <Select.Option key={index} value={item.teamId}>
    //             {item.teamName}
    //           </Select.Option>
    //           ))}
    //         </Select>
    //       </div>
    //     )
    //   }
    // }
  ]

  useEffect(() => {
    getData()
  }, [
    query.pageIndex,
    query.pageSize,
    selectedTemplate,
    selectedDistribution,
    deptSelect,
  ])
  useEffect(() => {
    setDeptSelect(user.deptCode)
    getTemplateList(user.deptCode)
    getDeptList();
    getDistributionList();
  }, []);
  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }
  const getTemplateList = (val: any) => {
    api.visitTeam({wardCode:val}).then(res => {
      if (res.data instanceof Array) setTemplateList(res.data);
    })
  }
  const getDistributionList = () => {
    const b : any = [
    {code: "1", name: "已分配"},
    {code: "2", name: "未分配"},]
    setDistributionList(b)
  }
  return <Wrapper>
    <PageHeader>
      <Place />
      <span className='label'>护理单元:</span>
        <Select
          value={deptSelect}
          style={{ width: 230 }}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val: string) => {
            setDeptSelect(val)
            getTemplateList(val)

          }}>
          <Select.Option value={''}>全部</Select.Option>
          {deptList.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
        </Select>
        <span className='label'>随访小组:</span>
        <Select style={{ width: 180 }} value={selectedTemplate} onChange={(value: any) => setSelectedTemplate(value)}>
          <Select.Option value=''>全部</Select.Option>
          {templateList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.teamId}>
              {item.teamName}
            </Select.Option>
          ))}
        </Select>
        <span className='label'>分配情况:</span>
        <Select style={{ width: 180 }} value={selectedDistribution} onChange={(value: any) => setSelectedDistribution(value)}>
          <Select.Option value=''>全部</Select.Option>
          {distributionList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Input
          placeholder='请输入姓名/工号关键字检索'
          style={{ width: 220 }}
          value={searchText}
          onChange={onChangeSearchText}
          className='ml-20'
        />
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        {/* <Button type='primary' onClick={() => onSave()}>
          保存
        </Button> */}
        <Button onClick={setFollowUpGroup}>
          设置随访小组
        </Button>
      </PageHeader>
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
          surplusHeight={220} />
      <FollowUpGroupModal
        visible={editVisible}
        deptList={deptList}
        onOk={() => {
          getData()
          getTemplateList(deptSelect)
          setEditVisible(false)
        }}
        onCancel={() => setEditVisible(false)} />  
  </Wrapper>
}
const Wrapper = styled.div`
  height: 100%;
  width: calc(100vw - 200px);
  margin-left:20px;
  .ml-20 {
    margin-left: 20px;
  }
  #box_select {
    /deep/.ant-select-selection{
      text-align:center;
      text-align-last:center;
    }
  }
  .ipt-cell{
    padding:0!important;
    textarea,.ant-select-selection,.ant-input{
      border:0;
      outline:0;
      border-radius:0;
      resize: none;
    }
    .ant-select-arrow{
      display:none;
    }
    .ant-select-selection-selected-value{
      padding-right:0!important;
    }
  }
`