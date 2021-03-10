import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { PageTitle } from 'src/components/common'
import { Button, Select, DatePicker, message, Modal } from 'antd'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { checkWardService } from "../../services/CheckWardService";
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { fileDownload } from "src/utils/file/file";
export interface Props { }

export default observer(function TotalDetails() {
  const id: any = appStore.match.params.id;
  const [title, setTitle] = useState('');
  const [tableList, setTableList] = useState([] as any);
  const [tableLoading, setTableLoading] = useState(false);
  const [query, setQuery]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  })

  // 初始化
  useEffect(() => {
    onLoad()
  }, [])

  // 获取查房报告详情
  const onLoad = () => {
    setTableLoading(true)
    checkWardService.getDetailTotal(id).then(res => {
      setTableLoading(false)
      setTitle(res.title)
      setTableList(res.data.csrTotalDetail)
    })
  }

  // 导出
  const handleExport = () => {
    checkWardService.export(id).then(res => {
      fileDownload(res)
    })
  }

  const columns: any = [
    {
      title: "时间",
      dataIndex: "srDate",
      width: 120,
      align: "center"
    },
    {
      title: "人员",
      dataIndex: "empName",
      width: 80,
      align: "center"
    },
    {
      title: "社区",
      dataIndex: "community",
      width: 100,
      align: "center"
    },
    {
      title: "检查重点",
      dataIndex: "keyPoints",
      width: 200,
      align: "center"
    },
    {
      title: "本周质控检查记录",
      children: [
        {
          title: "存在问题",
          dataIndex: "existProblems",
          width: 100,
          align: "center"
        },
        {
          title: "持续改进",
          dataIndex: "improvement",
          width: 100,
          align: "center"
        },
        {
          title: "其他",
          dataIndex: "recordExpand",
          width: 100,
          align: "center"
        }
      ]
    },
    {
      title: "护理业务查房",
      children: [
        {
          title: "查房内容",
          dataIndex: "srContent",
          width: 100,
          align: "center"
        },
        {
          title: "小讲课人员",
          dataIndex: "lecturer",
          width: 100,
          align: "center"
        },
        {
          title: "小讲课",
          dataIndex: "lectureContent",
          width: 100,
          align: "center"
        },
        {
          title: "其他",
          dataIndex: "lectureExpand",
          width: 100,
          align: "center"
        }
      ]
    }
  ]


  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon>
          <PageTitle>{title}</PageTitle>
        </LeftIcon>
        <RightIcon>
          <Button type='primary' onClick={handleExport}>
            导出
          </Button>
          <Button onClick={() => appStore.history.goBack()} className='checkButton'>
            返回
          </Button>
        </RightIcon>
      </HeaderCon>
      <TableWrapper>
        <BaseTable
          loading={tableLoading}
          dataSource={tableList}
          columns={columns}
          surplusHeight={260}
          surplusWidth={300}
          pagination={{
            current: query.pageIndex,
            total: query.total,
            pageSize: query.pageSize
          }}
          onChange={pagination => {
            setQuery(
              {
                ...query,
                pageIndex: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total
              }
            );
            onLoad()
          }}
        />
      </TableWrapper>
    </Wrapper>
  )
})

const TableWrapper = styled(TabledCon)`
td{
  position: relative;
  word-break: break-all;
  .ellips{
    position: absolute;
    left:0;
    top: 0;
    height: 30px;
    line-height: 30px;
    right: 0;
    padding: 0 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
`

const HeaderCon = styled(TableHeadCon)`
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  .checkButton {
    margin-left: 20px;
  }
  .month-select{
    width: 70px;
  }
  .year-select{
    width: 100px;
    display:inline-block;
  }
`
const Wrapper = styled.div`
  .operate-group{
    .delete{
      color: red;
    }
  }
`

const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  /* padding: 0 0 0 15px; */
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

