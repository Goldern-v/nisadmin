import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import {
  TopPannel,
  NavCon,
  MainTitle,
  SubContent,
  ButtonGroups,
  MainPannel,
} from './../../components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps, message } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
export interface Props { }

export default observer(function StudyResultReview() {
  const { history } = appStore
  const [query, setQuery] = useState({
    pageIndex: 1,
    pageSize: 10,
  })
  const [tableData, setTableData] = useState([] as any[])
  const [dataTotal, setDataTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const title = '2020年新职工培训教学计划'

  const columns: ColumnProps<any>[] = []

  const handleDetail = (record: any) => {
    //查看详情
  }
  const handlePageChange = () => {

  }
  const handleSizeChange = () => {

  }

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> > </span>
        <Link to="/home">一级目录</Link>
        <span> > </span>
        <Link to="/home">二级目录</Link>
        <span> > 学习计划</span>
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
        <BaseTable
          loading={loading}
          type={['index']}
          surplusWidth={200}
          surplusHeight={225}
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
      </TableWrapper>
    </MainPannel>
  </Wrapper>
})

const Wrapper = styled.div``
const TableWrapper = styled(TabledCon)`
  td{
    word-break: break-all;
  }
  .ellips{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height: 19px;
  }
`