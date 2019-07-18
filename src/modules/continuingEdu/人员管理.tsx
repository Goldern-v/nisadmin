import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Select } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { RouteComponentProps } from 'react-router'
import CommonHeader from './components/CommonHeader'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'

import DeptSelect from 'src/components/DeptSelect'

import FilterCon from './components/FilterCon'

const Option = Select.Option

export interface Props extends RouteComponentProps { }

export default observer(function 人员管理(props: Props) {
  const [query, setQuery] = useState({
    deptCode: '',
    page: 1,
    pageSize: 10
  });

  const [queryFilter, setQueryFilter] = useState({
    Xl: '全部',
    Zc: '全部',
    Cj: '全部',
    Zw: '全部'
  })

  const [tableData, setTableData] = useState([] as any);
  const [total, setTotal] = useState(0 as number);
  const [dataLoading, setDataLoading] = useState(false);
  const [filterConVisible, setFilterConVisible] = useState(true);

  useEffect(() => {
    setTableData([{
      empNo: '114145',
      empName: '王大锤',
      sexual: '男',
      age: '24',
      deptName: '神经内科单元',
      zhiwu: '护士长',
      level: 'N1',
      xueli: '硕士',
      jifen: 10086,
      status: '在职'
    }])
    // console.log(query)
  }, [])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'key',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: '工号',
      key: 'empNo',
      dataIndex: 'empNo',
      width: 80,
      align: 'center'
    },
    {
      title: '姓名',
      key: 'empName',
      dataIndex: 'empName',
      width: 80,
      align: 'center'
    },
    {
      title: '性别',
      key: 'sexual',
      dataIndex: 'sexual',
      width: 80,
      align: 'center'
    },
    {
      title: '年龄',
      key: 'age',
      dataIndex: 'age',
      width: 50,
      align: 'center'
    },
    {
      title: '科室',
      key: 'deptName',
      dataIndex: 'deptName',
      width: 150,
      className: 'align-left',
      align: 'left'
    },
    {
      title: '职务',
      key: 'zhiwu',
      dataIndex: 'zhiwu',
      width: 80,
      align: 'center'
    },
    {
      title: '层级',
      key: 'level',
      dataIndex: 'level',
      width: 50,
      align: 'center'
    },
    {
      title: '学历',
      key: 'xueli',
      dataIndex: 'xueli',
      width: 50,
      align: 'center'
    },
    {
      title: '积分',
      key: 'jifen',
      dataIndex: 'jifen',
      width: 50,
      align: 'center'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 50,
      align: 'center'
    },
    {
      title: '操作',
      key: 'operation',
      width: 60,
      align: 'center',
      render: (text: string, record: any) => {
        return <span onClick={() => handleReview(record)} className="review">查看</span>
      }

    },
  ];

  const handleReview = (record: any) => {
    appStore.history.push('/continuingEduEmpDetail')
  }

  const handleDeptChange = (deptCode: any) => {
    let newQuery = { ...query, deptCode }

    if (!query.deptCode) getTableData(newQuery);

    setQuery(newQuery)
  }

  const handleSearch = () => {
    let newQuery = { ...query, page: 1 };
    getTableData(newQuery)
  }

  const getTableData = (other?: any) => {
    let _query = Object.assign({}, query, other || {});
    console.log(_query)
    setDataLoading(true);
    setTimeout(() => {
      setDataLoading(false);
    }, 1000)
  }

  const handlePageChange = (page: number) => {
    let newQuery = { ...query, page };
    setQuery(newQuery);
    getTableData(newQuery);
  }

  const handleSizeChange = (page: number, size: number) => {
    let newQuery = { ...query, page: 1, size };
    setQuery(newQuery);
    getTableData(newQuery);
  }

  const handleFilterConVisibleChange = (visible: boolean) => {
    setFilterConVisible(visible)
  }

  const handleFilterAdapterChange = (name: any, value: any) => {
    // console.log(name, value)
    setQueryFilter({ ...queryFilter, [`${name}`]: value })
  }

  const switchWrapperName = () => {
    let classList = [] as any;
    if (filterConVisible) classList.push('filter-con-visible');
    return classList.join(' ');
  }

  return <Wrapper className={switchWrapperName()}>
    <CommonHeader title={'人员管理'}>
      <span className="float-item title">科室:</span>
      <span className="float-item">
        <DeptSelect onChange={handleDeptChange} />
      </span>
      <span className="float-item title">片区:</span>
      <span className="float-item">
        <Select defaultValue="" className="dept-list">
          <Option value="">全部</Option>
        </Select>
      </span>
      <span className="float-item input-search">
        <Input />
      </span>
      <span className="float-item">
        <Button type="primary" onClick={handleSearch}>搜索</Button>
      </span>
    </CommonHeader>
    <div className="main-contain">
      <div className="filter-contain">
        <FilterCon
          filter={queryFilter}
          isOpenFilter={filterConVisible}
          onVisibleChange={handleFilterConVisibleChange}
          filterAdapterChange={handleFilterAdapterChange} />
      </div>
      <div className="table-contain">
        <BaseTable
 
          loading={dataLoading}
          columns={columns}
          surplusHeight={queryFilter ? 420 : 130}
          pagination={{
            current: query.page,
            total: total,
            pageSize: query.pageSize,
            pageSizeOptions: ['10', '20', '30'],
            showSizeChanger: true,
            onChange: handlePageChange,
            onShowSizeChange: handleSizeChange
          }}
          // type={['spaceRow']}
          dataSource={tableData} />
      </div>
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
  .common-header-continnuing-edu{
    margin-top: -60px;
    .float-item{
      &.input-search{
        width: 180px;
        margin-right:5px;
      }
      .dept-list{
        min-width: 150px;
      }
    }
  }
    
  .main-contain{
    width: 100%;
    height: 100%;
    padding: 40px 15px 10px 15px;
    .filter-contain{
      margin-top: -40px;
      margin-bottom: 10px;
    }
    #baseTable{
      box-shadow: 0px 2px 4px rgba(0,0,0,0.15);
    }
    .table-contain{
      width: 100%;
      height: 100%;
    }
    td{
      &.align-left{
        padding-left: 10px!important;
      }
      font-weight: normal;
      .review{
        cursor: pointer;
        :hover{
          color: #00A680;
          font-weight：bold;
        }
      }
    }
  }

  &.filter-con-visible{
    .main-contain{
      padding-top: 225px;
      .filter-contain{
        margin-top: -225px;
        margin-bottom: 10px;
      }
    }
  }
`