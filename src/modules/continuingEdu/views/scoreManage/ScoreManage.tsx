import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Input, message } from 'antd'
import BaseTabs from 'src/components/BaseTabs'
import BaseTable, { DoCon } from "src/components/BaseTable"
import { scoreManageService } from './api/ScoreManageService'
import { Place } from "src/components/common"
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
// import createModal from "src/libs/createModal"

const Option = Select.Option

export interface Props { }

export default observer(function ScoreManage(props: Props) {

  const { queryObj } = appStore
  const [tableData, setTableData] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [dataTotal, setDataTotal] = useState(0)
  // const [selectedRowKeys, setSelectRowKeys] = useState([] as any[])
  // const [selectedRows, setSelectRows] = useState([] as any[])
  const [firstLevelMenu, setFirstLevelMenu] = useState([] as any[])
  const [secondLevelMenu, setSecondLevelMenu] = useState([] as any[])
  const [query, setQuery] = useState({
    firstLevelMenuId: queryObj.firstLevelMenuId || '',
    secondLevelMenuId: queryObj.secondLevelMenuId || '',
    keyWord: queryObj.keyWord || '',
    pageSize: queryObj.pageSize ? Number(queryObj.pageSize) : 15,
    pageIndex: queryObj.pageIndex ? Number(queryObj.pageIndex) : 1
  })
  const [activeKey, setActiveKey]: any = useState(queryObj.activeKey || '0')

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: (selectedRowKeys: any, selectedRows: any) => {
  //     setSelectRowKeys(selectedRowKeys)
  //     setSelectRows(selectedRows)
  //   }
  // }

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) =>
        (query.pageIndex - 1) * query.pageSize + index + 1,
      align: "center",
      width: 40
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      align: "center",
      width: 100,
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      align: "center",
      width: 100,
    },
    {
      title: "一级分类",
      dataIndex: "firstLevelMenuName",
      align: "center",
      width: 100,
    },
    {
      title: "二级分类",
      dataIndex: "secondLevelMenuName",
      align: "center",
      width: 100
    },
    {
      title: "培训类型",
      dataIndex: "thirdLevelMenuName",
      align: "center",
      width: 100
    },
    {
      title: "教学方式",
      dataIndex: "teachingMethodName",
      align: "center",
      className: 'teaching-method-name',
      width: 60,
      render: (text: string) => {
        let bgColor = ''
        let textColor = ''

        switch (text) {
          case '学习':
            bgColor = '#EEFDEE'
            textColor = '#4CA21D'
            break
          case '培训':
            bgColor = '#FDF8E6'
            textColor = '#DD7316'
            break
          case '考试':
            bgColor = '#FCECE9'
            textColor = '#EA3838'
            break
          case '练习':
            bgColor = '#EEF1FF'
            textColor = '#2754A8'
            break
          case '实操':
            bgColor = '#F0F8F8'
            textColor = '#006667'
            break
          case '演练':
            bgColor = '#FAEAFB'
            textColor = '#AB2892'
            break
          default:
        }

        return <div
          className="teaching-method-item"
          style={{ backgroundColor: bgColor }}>
          <span style={{ color: textColor }}>{text}</span>
        </div>
      }
    },
    {
      title: "标题",
      dataIndex: "title",
      align: "left",
      width: 180
    },
    {
      title: "参与人员",
      dataIndex: "participantsCount",
      width: 60,
      align: "center"
    },
    {
      title: "评分负责人",
      dataIndex: "scorePersons",
      width: 120,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "statusDesc",
      width: 100,
      align: "center",
    },
    {
      title: "操作",
      key: "8",
      width: 80,
      align: "center",
      render: (text: any, record: any, c: any) => {
        let btnText = activeKey == 0 ? "立即评分" : "查看"
        return (
          <DoCon>
            {btnText == '立即评分' ?
              (record.statusDesc == '已结束' ?
                <span onClick={() => handleDetail(record)}>
                  {btnText}
                </span> :
                <span style={{
                  color: '#999',
                  cursor: 'default'
                }}>
                  {btnText}
                </span>) :
              <span onClick={() => handleDetail(record)}>
                {btnText}
              </span>}
          </DoCon>
        )
      }
    }
  ]

  const handlePageChange = (pageIndex: number) => {
    setQuery({ ...query, pageIndex })
  }

  const handlePageSizeChange = (pageIndex: number, pageSize: number) => {
    setQuery({ ...query, pageSize, pageIndex: 1 })
  }

  const handleDetail = (record: any) => {
    if (record.statusDesc != '已结束') return

    let newQuery = {
      id: record.cetpId,
      // taskId: record.taskId,
      // statusDesc: record.statusDesc,
    } as any

    // if (activeKey == '0') newQuery.audit = true
    // appStore.history.push(`/trainingInfoReview?${qs.stringify(newQuery)}`)
    if (record.teachingMethodName == '考试') {
      appStore.history.push(`/testingResultReview?${qs.stringify(newQuery)}`)
    } else {
      appStore.history.push(`/operateResultReview?${qs.stringify(newQuery)}`)
    }

  }

  const ScorePannel = <div>
    <GroupPostBtn
      onClick={() => getTableData(query)}>
      刷新
    </GroupPostBtn>
    {/* {activeKey == 0 &&
      <GroupPostBtn
        onClick={handleAuditOpen}
        style={{ right: 110 }}>
        批量评分
      </GroupPostBtn>} */}
    <BaseTable
      surplusHeight={280}
      surplusWidth={280}
      dataSource={tableData}
      loading={loading}
      columns={columns}
      onRow={(record: any) => {
        return {
          onDoubleClick: () => handleDetail(record)
        }
      }}
      // rowSelection={activeKey == 0 ? rowSelection : undefined}
      pagination={{
        pageSizeOptions: ['10', '15', '20'],
        total: dataTotal,
        onChange: handlePageChange,
        onShowSizeChange: handlePageSizeChange,
        current: query.pageIndex,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: query.pageSize
      }} />
  </div>

  const tabList = [
    {
      title: '待我评分',
      component: ScorePannel
    }, {
      title: '已发布',
      component: ScorePannel
    }
  ]

  const getTableData = (query: any) => {
    setLoading(true)
    // setSelectRowKeys([])
    // setSelectRows([])
    appStore.history.replace(`/continuingEdu/评分管理?${qs.stringify({
      ...appStore.queryObj,
      ...query,
      activeKey
    })}`)
    let req = (query: any) => {
      if (activeKey == 0) {
        return scoreManageService.queryToAuditPageList(query)
      } else {
        return scoreManageService.queryAuditedPageList(query)
      }
    }

    req({
      ...query,
      firstLevelMenuId: query.firstLevelMenuId ? Number(query.firstLevelMenuId) : '',
      secondLevelMenuId: query.secondLevelMenuId ? Number(query.secondLevelMenuId) : '',
    })
      .then(res => {
        setLoading(false)
        if (res.data) {
          setDataTotal(res.data.totalCount)
          setTableData(res.data.list)
        }
      }, () => setLoading(false))

  }

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }
  const getMenuInfo = () => {
    scoreManageService
      .getMenuTree()
      .then(res => {
        if (res.data) {
          setFirstLevelMenu(res.data)
          let target = res.data.find((item: any) => item.id == query.firstLevelMenuId)
          if (target) setSecondLevelMenu(target.childList || [])
        }
      })
  }

  useEffect(() => {
    getTableData(query)
  }, [query, activeKey])

  useEffect(() => {
    getMenuInfo()
  }, [])

  return <Wrapper>
    <HeaderCon>
      <Title>评分管理</Title>
      <Place />
      <span style={{ marginLeft: 20 }}>一级分类：</span>
      <Select
        value={query.firstLevelMenuId}
        style={{ width: 120 }}
        onChange={(id: string | number) => {
          setQuery({
            ...query,
            pageIndex: 1,
            firstLevelMenuId: id,
            secondLevelMenuId: ''
          })
          let newArr = [] as any[]
          let target = firstLevelMenu.find((item: any) => item.id == id)
          if (target && target.childList) newArr = target.childList
          setSecondLevelMenu(newArr)
        }}>
        <Option value="">全部</Option>
        {firstLevelMenu
          .map((item: any, idx: number) =>
            <Option
              value={item.id.toString()}
              key={idx}>
              {item.name}
            </Option>)}
      </Select>
      <span style={{ marginLeft: 20 }}>二级分类：</span>
      <Select
        value={query.secondLevelMenuId}
        style={{ width: 120 }}
        onChange={(id: | number) =>
          setQuery({ ...query, pageIndex: 1, secondLevelMenuId: id })}>
        <Option value="">全部</Option>
        {secondLevelMenu
          .map((item: any, idx: number) =>
            <Option
              value={item.id.toString()}
              key={idx}>
              {item.name}
            </Option>)}
      </Select>
      <Input
        placeholder="输入要搜索的关键字，包括标题、评分负责人"
        style={{ width: 280, marginLeft: 20 }}
        allowClear
        defaultValue={query.keyWord}
        onBlur={(e: any) => setQuery({ ...query, pageIndex: 1, keyWord: e.target.value })} />
      <Button type="primary" onClick={handleSearch} style={{ marginLeft: 20 }}>
        搜索
      </Button>
    </HeaderCon>
    <ScrollCon>
      <BodyWarpper>
        <MainCon>
          <BaseTabs
            defaultActiveKey={activeKey}
            config={tabList}
            onChange={(key: any) => {
              setActiveKey(key)
              setQuery({ ...query, pageIndex: 1 })
            }} />
        </MainCon>
      </BodyWarpper>
    </ScrollCon>
    {/* <auditModal.Component /> */}
  </Wrapper>
})

const Wrapper = styled.div`
  padding: ${(p) => p.theme.$mcp};
  padding-bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  .teaching-method-name{
    position: relative;
    .teaching-method-item{
      position: absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      span{
        cursor: default;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
`

const HeaderCon = styled.div`
display: flex;
align-items: center;
color: #333;
height: 32px;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const ScrollCon = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0 -15px;
  /* padding: ${(p) => p.theme.$mcp}; */
`

const BodyWarpper = styled.div`
height: 100%;
display: flex;
flex-direction: column;
`

const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 137px);
  align-items: stretch;
  display: flex;
  margin: 20px;
`

const GroupPostBtn = styled(Button)`
  position: fixed !important;
  top: 121px;
  right: 33px;
`