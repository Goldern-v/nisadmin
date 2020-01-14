import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, message } from 'antd'
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
import createModal from "src/libs/createModal";
import ScoreConfirmModal from './../../components/ScoreConfirmModal'
import QueryPannel from './../../components/QueryPannel'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
export interface Props { }

//查看培训结果
export default observer(function PracticeResultReview() {
  const { history } = appStore
  const scorceConfirm = createModal(ScoreConfirmModal)
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
  const title = '中医自学这是标题这是标题这是标题'

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
      dataIndex: 'available',
      title: '成绩有效',
      align: 'center',
      width: 60,
      render: (status: string, record: any) => {
        return <span style={{ color: 'red' }}>无效</span>
      }
    },
    {
      dataIndex: 'latestAwnserTime',
      title: '最近答题',
      align: 'center',
      width: 180,
      render: (status: string, record: any) =>
        moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      dataIndex: 'progress',
      title: '练习进度',
      align: 'center',
      width: 60,
      render: (status: string, record: any) => '50%'
    },
    {
      dataIndex: 'progress',
      title: '正确率',
      align: 'center',
      width: 60,
      render: (status: string, record: any) => '40'
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
    setLoading(true)
    setSelectedRowKeys([])
    setTimeout(() => setLoading(false), 1000)
    console.log(query)
  }

  const handleScoreAvailable = () => {
    if (loading) return

    if (selectedRowKeys.length <= 0) {
      message.warning('未勾选条目')
      return
    }

    scorceConfirm.show({
      onOkCallBack: () => {
        message.success(`选中人员（共${selectedRowKeys.length}人）的成绩修改成功`)
        getData()
      },
      empNoList: selectedRowKeys
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
        <span> > 查看结果</span>
      </NavCon>
      <MainTitle>{title}</MainTitle>
      <SubContent>
        <span className="label">开始时间:</span>
        <span className="content">
          {moment().format('YYYY-MM-DD')}
        </span>
        <span className="label">类型:</span>
        <span className="content">中医自学（练习）</span>
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
            disabled={loading}
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
    <scorceConfirm.Component />
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