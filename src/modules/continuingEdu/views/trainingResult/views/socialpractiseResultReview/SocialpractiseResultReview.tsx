import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, message, Tabs, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import {
  Wrapper,
  TopPannel,
  NavCon,
  MainTitle,
  SubContent,
  ButtonGroups,
  // MainPannel,
  ActiveText,
} from './../../components/common'
import createModal from "src/libs/createModal";
import ScoreConfirmModal from './../../components/ScoreConfirmModal'
import QueryPannel from './../../components/QueryPannel'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps, Spin } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
// import moment from 'moment'
import AnswerSheetModal from './../../components/AnswerSheetModal/AnswerSheetModal'

import { trainingResultModel } from './../../models/TrainingResultModel'
import { trainingResultService } from './../../api/TrainingResultService'
import Zmage from 'react-zmage'

const TabPane = Tabs.TabPane

export interface Props { }

//查看培训结果
export default observer(function SocialpractiseResultReview() {
  const { history } = appStore
  const scorceConfirm = createModal(ScoreConfirmModal)
  const { query, tableData, tableDataTotal, loading, baseInfo, menuInfo, isSignType } = trainingResultModel
  // const setLoading = trainingResultModel.setLoading.bind(trainingResultModel)

  const answerSheetModal = createModal(AnswerSheetModal)

  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])

  const [activeTab, setActiveTab] = useState('1')

  //现场图片相关数据
  const [imgList, setImgList] = useState([] as any[])
  const [imgListLoading, setImgListLoading] = useState(false)
  const [imgTotal, setImgTotal] = useState(0)
  const [imgListQuery, setImgListQuery] = useState({ pageIndex: 1, pageSize: 20 })

  //聊天记录相关数据
  const [convs, setConvs] = useState([] as any[])
  const [convsLoading, setConvsLoading] = useState(false)
  const [convsTotal, setConvsTotal] = useState(0)
  const [convstQuery, setConvsQuery] = useState({ pageIndex: 1, pageSize: 20 })
  //聊天总结
  const [summaryInfo, setSumaryInfo] = useState({} as any)

  const statusColumns = (() => {
    //根据线上还是线下判断展示学习情况还是签到情况
    if (isSignType)
      return [{
        dataIndex: 'signInTime',
        title: '签到',
        align: 'center',
        width: 180,
        render: (signInTime: string, record: any) => {
          if (signInTime) return signInTime
          return <span style={{ color: 'red' }}>未签到</span>
        }
      }] as ColumnProps<any>[]
    else return [
      {
        dataIndex: 'taskStatus',
        title: '学习情况',
        align: 'center',
        width: 60,
        render: (status: number, record: any) => {
          let percentStr = '(0%)'
          if (record.taskFinishRate)
            percentStr = `(${record.taskFinishRate}%)`

          if (status == 0)
            return <span style={{ color: 'red' }}>未完成</span>
          else
            return <span>已完成{percentStr}</span>
        }
      },
      {
        dataIndex: 'finishTime',
        title: '完成时间',
        align: 'center',
        width: 100
      },
    ] as ColumnProps<any>[]
  })()

  let columns: ColumnProps<any>[] = [
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
      dataIndex: 'empTitle',
      title: '职称',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'bigDeptName',
      title: '片区',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'deptName',
      title: '病区',
      align: 'center',
      width: 120,
    },
    ...statusColumns,
    {
      dataIndex: 'isValidResult',
      title: '成绩有效',
      align: 'center',
      width: 60,
      render: (isValidResult: number, record: any) => {
        const itemScoreConfirm = () => {
          scorceConfirm.show({
            onOkCallBack: () => {
              message.success(`${record.empName} 的成绩修改成功`)
              trainingResultModel.getTableData()
            },
            cetpId: appStore.queryObj.id,
            empNoList: [record.empNo],
            isValidResult: record.isValidResult.toString() || ''
          })
        }

        if (isValidResult == 1)
          return <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={itemScoreConfirm}>
            有效
            </span>
        else
          return <span
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={itemScoreConfirm}>
            无效
          </span>
      }
    },
    {
      dataIndex: 'creditDesc',
      title: '学分',
      align: 'center',
      width: 120,
      render: (text: string) => {
        if (text) return text
        return '0'
      }
    },
    {
      dataIndex: 'classHoursDesc',
      title: '学时',
      align: 'center',
      width: 100,
    }
  ]

  if (baseInfo.questionStat) {
    columns = columns.concat([
      {
        title: '培训后满意度调查问卷',
        align: 'center',
        width: 100,
        children: [
          {
            dataIndex: 'scoresDesc',
            title: '得分',
            align: 'center',
            width: 60,
          },
          {
            dataIndex: 'fillTime',
            title: '时间',
            align: 'center',
            width: 120,
            render: (text: string) => {
              return text || '未完成'
            }
          },
          {
            title: '操作',
            dataIndex: 'indnex',
            align: 'center',
            width: 80,
            render: (text: string, record: any) => {
              return <DoCon>
                <span onClick={() => viewAnwserPage(record)}>查看问卷</span>
              </DoCon>
            }
          },
        ]
      }
    ])
  }

  // const handleDetail = (record: any) => {
  //   //查看详情
  // }

  const handlePageChange = (pageIndex: number, pageSize: number | undefined) => {
    trainingResultModel
      .setQuery({ ...query, pageIndex }, true)
  }
  const handleSizeChange = (pageIndex: number, pageSize: number) => {
    trainingResultModel
      .setQuery({ ...query, pageSize, pageIndex: 1 }, true)
  }

  const handleRowSelect = (rowKeys: string[] | number[]) => {
    setSelectedRowKeys(rowKeys)
  }

  const handleScoreAvailable = () => {
    if (loading) return

    if (selectedRowKeys.length <= 0) {
      message.warning('未勾选条目')
      return
    }

    scorceConfirm.show({
      onOkCallBack: () => {
        message
          .success(`选中人员（共${selectedRowKeys.length}人）的成绩修改成功`)
        trainingResultModel.getTableData()
      },
      cetpId: appStore.queryObj.id,
      empNoList: selectedRowKeys
    })
  }

  const viewAnwserPage = (record: any) => {
    if (!record.fillTime) {
      message.warning('学员未填写问卷')
      return
    }
    answerSheetModal.show({
      title: baseInfo.title,
      empNo: record.empNo,
      type: 'view',
      dataType: '问卷',
      cetpId: appStore.queryObj.id,
      hideRightSide: true,
      onOkCallBack: () => { }
    })
  }

  const getImgList = () => {
    setImgListLoading(true)
    trainingResultService
      .getPicturesByPage({
        cetpId: appStore.queryObj.id,
        ...imgListQuery
      })
      .then(res => {
        setImgListLoading(false)
        if (res.data) {
          setImgTotal(res.data.totalCount || 0)
          setImgList(res.data.list || [])
        }
      }, () => setImgListLoading(false))
  }

  const getConvList = () => {
    setConvsLoading(true)
    trainingResultService
      .getChatRecordPageList({
        cetpId: appStore.queryObj.id,
        ...convstQuery
      })
      .then(res => {
        setConvsLoading(false)
        if (res.data) {
          setConvsTotal(res.data.totalCount || 0)
          setConvs(res.data.list || [])
        }
      }, () => setConvsLoading(false))
  }

  const getSummary = () => {
    trainingResultService
      .getSummaryContent(appStore.queryObj.id || '')
      .then(res => {
        if (res.data) setSumaryInfo(res.data)
      })
  }

  useEffect(() => {
    if (loading) setSelectedRowKeys([])
  }, [loading])

  useEffect(() => {
    trainingResultModel.init()
    getSummary()
  }, [])

  useEffect(() => {
    getImgList()
  }, [imgListQuery])


  useEffect(() => {
    getConvList()
  }, [convstQuery])

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> &gt; </span>
        <span>{menuInfo.firstLevelMenuName || '一级目录'}</span>
        <span> &gt; </span>
        {<a onClick={() => appStore.history.goBack()}>{menuInfo.secondLevelMenuName}</a> || <span>二级目录</span>}
        <span> &gt; 查看结果</span>
      </NavCon>
      <MainTitle>{baseInfo.title}</MainTitle>
      <SubContent>
        <span className="label">开始时间:</span>
        <span className="content">
          {baseInfo.startTime}
        </span>
        <span className="label">类型:</span>
        <span className="content">
          {baseInfo.teachingTypeName}（{baseInfo.teachingMethodName}）
          {appStore.HOSPITAL_ID === 'wh' && baseInfo.categoryName}
        </span>
        <span className="label"> 参与人员:</span>
        <span className="content">
          {(baseInfo.participantList && baseInfo.participantList.length) || 0}人
        </span>
      </SubContent>
      <ButtonGroups>
        {appStore.hisMatch({
          map: {
            wh: <span></span>,
            other: <React.Fragment>
              {isSignType &&
                <Button onClick={() => trainingResultModel.handleSignExport()}>导出签到信息</Button>}
              <Button onClick={() => trainingResultModel.handleAttendanceExport()}>导出出勤率统计</Button>
            </React.Fragment>
          }
        })}
        <Button onClick={() => trainingResultModel.handleExportResults()}>导出</Button>
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <TableWrapper>
        <Tabs
          activeKey={activeTab}
          onChange={(tab: any) => setActiveTab(tab)}
          style={{ height: '100%' }}>
          <TabPane tab="实践结果" key="1" >
            <QueryPannel className="query-pannel" />
            <BaseTable
              loading={loading}
              rowSelection={{
                selectedRowKeys,
                onChange: handleRowSelect
              }}
              rowKey='empNo'
              surplusWidth={200}
              surplusHeight={385}
              dataSource={tableData}
              // onRow={(record: any) => {
              //   return {
              //     onDoubleClick: () => handleDetail(record)
              //   }
              // }}
              pagination={{
                pageSizeOptions: ['10', '15', '20', '30', '50'],
                current: query.pageIndex,
                pageSize: query.pageSize,
                total: tableDataTotal,
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
                checked={(selectedRowKeys.length >= tableData.length) && tableData.length > 0}>
                全选
              </Checkbox>
              <span>共选择对象（{selectedRowKeys.length}）人，执行操作：</span>
              <ActiveText onClick={handleScoreAvailable}>成绩有效？</ActiveText>
            </SelectionOperate>
          </TabPane>
          <TabPane tab="现场图片" key="2">
            {
              !imgListLoading ?
                <FullContent>
                  <div className="imglist-con content scroll-con">
                    {imgList.map((item: any, idx: number) =>
                      <div className="img-wrapper" key={idx}>
                        <img
                          src={item.path || ''}
                          onClick={() => {
                            if (item.path) Zmage.browsing({
                              src: item.path,
                              backdrop: 'rgba(0,0,0, .8)'
                            })
                          }} alt="" />
                      </div>
                    )}
                  </div>
                  <div className="pagination-footer">
                    <Pagination
                      size="small"
                      current={imgListQuery.pageIndex}
                      pageSize={imgListQuery.pageSize}
                      onChange={(pageIndex: number) => setImgListQuery({ ...imgListQuery, pageIndex })}
                      total={imgTotal} />
                  </div>
                </FullContent> :
                <div className="loading-wrapper">
                  <Spin spinning={imgListLoading}>
                    <div className="loading-wrapper"></div>
                  </Spin>
                </div>
            }
          </TabPane>
          <TabPane tab="讨论总结" key="3">
            {!convsLoading ?
              <FullContent>
                <div className="content conv">
                  <div className="sub-title">讨论区</div>
                  <div className="conv-list-wrapper scroll-con">
                    {convs.map((item: any, index: number) =>
                      <div
                        key={index}
                        className="conv-item">
                        <div className="conv-person-info">
                          <img src={item.nearImageUrl} className="head-img" />
                          <span>
                            <span>{item.empName}({item.deptName})</span>
                            <br />
                            <span>{item.messageTime}</span>
                          </span>
                        </div>
                        <div className="conv-content">
                          <pre>{item.messageContent}</pre>
                        </div>
                      </div>)}
                  </div>
                  <div className="pagination-footer">
                    <Pagination
                      size="small"
                      current={convstQuery.pageIndex}
                      pageSize={convstQuery.pageSize}
                      onChange={(pageIndex: number) => setConvsQuery({ ...convstQuery, pageIndex })}
                      total={convsTotal} />
                  </div>
                </div>
                <div className="footer summary-wrapper">
                  <div className="sub-title">总结区</div>
                  <div className="conv-item">
                    {summaryInfo.empName &&
                      <div className="conv-person-info">
                        <img src={summaryInfo.nearImageUrl} className="head-img" />
                        <span>
                          <span>{summaryInfo.empName}({summaryInfo.deptName})</span>
                          <br />
                          <span>{summaryInfo.summaryTime}</span>
                        </span>
                      </div>}
                    <div className="conv-content">
                      <pre>{summaryInfo.summaryContent}</pre>
                    </div>
                  </div>
                </div>
              </FullContent> :
              <div className="loading-wrapper">
                <Spin spinning={convsLoading}>
                  <div className="loading-wrapper"></div>
                </Spin>
              </div>}
          </TabPane>
        </Tabs>
      </TableWrapper>
    </MainPannel>
    <scorceConfirm.Component />
    <answerSheetModal.Component />
  </Wrapper>
})

const FullContent = styled.div`
  width: calc(100% - 30px);
  position: fixed;
  height: calc(100% - 240px);
  display:flex;
  flex-direction: column;
  .content{
    flex:1;
    margin: 0 1px;
    padding: 0 15px;
    overflow: auto;
    
    &.conv{
      display: flex;
      flex-direction: column;
      .conv-list-wrapper{
        flex:1;
        overflow: auto;
      }
      .pagination-footer{
        padding: 5px 15px;
      }
      .conv-item{
        margin: 8px 0;
        position: relative;
        pre{
          padding-bottom: 10px;
        }
        &::after{
          content: '';
          left: 0;
          right: 24px;
          position: absolute;
          bottom: 0;
          height: 1px;
          background-color: #ddd;
        }

        &:last-child{
          &::after{
            display: none;
          }
        }
      }
    }
  }
  .scroll-con{
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #eaeaea;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 50px;
      background-color: #c2c2c2;
    }
    ::-webkit-scrollbar-track {
      border-radius: 50px;
      background-color: #eaeaea;
    }
  }
  .pagination-footer{
    text-align: right;
    padding:15px;
  }
  .imglist-con{
    .img-wrapper{
      width: 20%;
      float: left;
      display: inline-block;
      padding: 0 15px;
      margin: 10px  0;
      height: 200px;
      text-align: center;
      img{
        background-color: #eee;
        cursor: pointer;
        max-width:100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  
  .sub-title{
    font-weight: bold;
    font-size: 20px;
    color: #000;
  }

  .conv-item{
    .conv-person-info{
      &>*{
        vertical-align: top;
      }
      &>span{
        color: #666;
        display: inline-block;
        margin-left: 12px;
        font-size: 14px;
        line-height: 25px;
        vertical-align: top;
      }
    }
    .conv-content{
      pre{
        word-break: break-all;
        white-space: pre-wrap;
        color: #000;
        font-size: 14px;
        margin: 5px 0 0 0;
      }
    }
  }
  
  .head-img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: url('${require('src/assets/护士默认头像.png')}');
    background-size: 100%;
    object-fit: cover;
  }
  .summary-wrapper{
    min-height: 150px;
    padding: 0 20px;
    border-top: 1px solid #eee;
    .sub-title{
      margin-bottom: 10px;
    }
  }
`

export const MainPannel = styled.div`
  flex: 1;
  display: flex;
  padding: 15px 0;
`

const TableWrapper = styled(TabledCon)`
  width: 100%;
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
  .query-pannel{
    padding-top: 0;
    padding-bottom: 2px;
  }
  .loading-wrapper{
    width: calc(100% - 30px);
    position: fixed;
    height: calc(100% - 240px);
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