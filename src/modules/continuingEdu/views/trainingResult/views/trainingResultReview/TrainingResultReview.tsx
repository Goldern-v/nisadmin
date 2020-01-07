import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, message, Modal } from 'antd'
import { Link } from 'react-router-dom'
import {
  Wrapper,
  TopPannel,
  NavCon,
  MainTitle,
  SubContent,
  ButtonGroups,
  MainPannel,
  ActiveText,
} from './../../components/common'
import QueryPannel from './../../components/QueryPannel'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
export interface Props { }

//查看培训结果
export default observer(function TrainingResultReview() {
  const { history } = appStore
  const [query, setQuery] = useState({
    pianqv: '',
    bingqv: '',
    zhicheng: '',
    wanchengqingkuang: '',
    pageIndex: 1,
    pageSize: 10,
  } as any)

  const [tableData, setTableData] = useState([
    { empName: '测试1', empNo: 'H0001' },
    { empName: '测试2', empNo: 'H0002' },
    { empName: '测试3', empNo: 'H0003' },
    { empName: '测试4', empNo: 'H0004' },
  ] as any[])
  const [dataTotal, setDataTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  const title = '2020年新职工培训教学计划'

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'empName',
      title: '姓名',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'empNo',
      title: '工号',
      align: 'center',
      width: 60,
    },
    {
      dataIndex: 'zhiwu',
      title: '职位',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'pianqv',
      title: '片区',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'bingqv',
      title: '病区',
      align: 'center',
    },
    {
      dataIndex: 'status',
      title: '学习情况',
      align: 'center',
      width: 60,
      render: (status: string, record: any) => {
        return <span style={{ color: 'red' }}>未完成</span>
      }
    },
    {
      dataIndex: 'completeDate',
      title: '完成时间',
      align: 'center',
      width: 180,
      render: (status: string, record: any) =>
        moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      dataIndex: 'score',
      title: '学分',
      align: 'center',
      width: 120,
    },
    {
      dataIndex: 'studyTime',
      title: '学时',
      align: 'center',
      width: 100,
    },
  ]

  const handleDetail = (record: any) => {
    //查看详情
  }
  const handlePageChange = (pageIndex: number, pageSize: number | undefined) => {
    setQuery({ ...query, pageIndex })
  }
  const handleSizeChange = (pageIndex: number, pageSize: number) => {
    setQuery({ ...query, pageSize, pageIndex: 1 })
  }

  const handleRowSelect = (rowKeys: string[] | number[]) => {
    console.log(rowKeys)
    setSelectedRowKeys(rowKeys)
  }

  const getData = (reqParams: any = query) => {
    console.log(query)
  }

  const handleScoreAvailable = () => {
    if (selectedRowKeys.length <= 0) {
      message.warning('未勾选条目')
      return
    }

    const content = <div>
      <div>你需要修改选中人员（共2人）的成绩为有效或无效吗？</div>
    </div>

    Modal.confirm({
      title: '修改成绩有效',
      centered: true,
      content,
      onOk: () => {

      }
    })
  }

  useEffect(() => {
    getData()
  }, [query])

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> > </span>
        <Link to="/home">一级目录</Link>
        <span> > </span>
        <Link to="/home">二级目录</Link>
        <span> > 培训计划</span>
      </NavCon>
      <MainTitle>{title}</MainTitle>
      <SubContent>
        <span className="label">开始时间:</span>
        <span className="content">
          {moment().format('YYYY-MM-DD')}
        </span>
        <span className="label">类型:</span>
        <span className="content">教学计划（学习）</span>
        <span className="label"> 参与人员:</span>
        <span className="content">35人</span>
      </SubContent>
      <ButtonGroups>
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <TableWrapper>
        <QueryPannel
          onQueryChange={(newQuery: any) => setQuery({ ...newQuery })}
          onSearch={getData}
          query={query} />
        <BaseTable
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: handleRowSelect
          }}
          rowKey='empNo'
          surplusWidth={200}
          surplusHeight={315}
          dataSource={tableData}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => handleDetail(record)
            }
          }}
          pagination={{
            current: query.pageIndex,
            pageSize: query.pageSize,
            total: dataTotal,
            onChange: handlePageChange,
            onShowSizeChange: handleSizeChange
          }}
          columns={columns}
        />
        <SelectionOperate>
          <Checkbox
            indeterminate={(() => {
              if (selectedRowKeys.length <= 0)
                return false
              if (selectedRowKeys.length >= tableData.length)
                return false
              return true
            })()}
            onChange={(e: any) => {
              let checked = e.target.checked
              if (checked)
                setSelectedRowKeys(tableData.map((item: any) => item.empNo))
              else
                setSelectedRowKeys([])
            }}
            checked={selectedRowKeys.length >= tableData.length}>
            全选
          </Checkbox>
          <span>共选择对象（{selectedRowKeys.length}）人，执行操作：</span>
          <ActiveText onClick={handleScoreAvailable}>成绩有效？</ActiveText>
        </SelectionOperate>
      </TableWrapper>
    </MainPannel>
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
  position: relative;
  td{
    word-break: break-all;
  }
  .ellips{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height: 19px;
  }
  #baseTable{
    padding: 10px 15px;
    .ant-table-column-title{
      .ant-table-selection{
        display: none;
      }
    }
  }
`

const SelectionOperate = styled.div`
  position: absolute;
  bottom: 15px;
  left: 38px;
  /* font-size: 12px; */
  span{
    vertical-align: middle;
  }
`