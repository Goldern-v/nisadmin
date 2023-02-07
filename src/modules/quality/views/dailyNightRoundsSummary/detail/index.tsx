import styled from "styled-components"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { Button, Input, Timeline, Modal, Col, Row, Radio, message } from "src/vendors/antd";
import { appStore } from "src/stores";
import api from 'src/services/api/quality/nightRoundsRecordApi'
import moment from 'moment'
import { Obj } from "src/libs/types";
import { globalModal } from "src/global/globalModal";
import { fileDownload } from "src/utils/file/file";
import printFn from "printing";
import Container from "./components/container";
interface Props {

}
/** 每日夜查房汇总详情页 by江门妇幼 */
export default observer((props: Props) => {
  const { history, queryObj } = appStore
  const [detail, setDetail]: any = useState({})
  const [process, setProcess]: any[] = useState([])
  // 其他住院数据
  const [editList, setEditList] = useState<Obj[]>([])

  const [processVisible, setProcessVisible] = useState(false)

  const defaultUser = {
    noPass: false,
    handleContent: '',
    empNo: '',
    password: '',
  }
  const [user, setUser] = useState(defaultUser)
  /**初始化数据 */
  const getData = async (id = queryObj.id) => {
    const { data: { nodeDataList, ordinaryRecords, ...other } } = await api.dailySummaryDetails(id)

    setDetail(other)
    setProcess(nodeDataList)
    setEditList(ordinaryRecords.filter((v: Obj) => v.id))
  }
  /**当前节点 */
  const curNode = useMemo(() => {
    if (!(detail.summary && detail.summary.currentNodeCode && process.length)) return null
    const cur = [...process].reverse().find((item: any) => {
      return detail.summary.nextNodeCode === item.nodeCode
    })
    return cur || null
  }, [detail, process])
  /**获取下一节点 */
  const getNextNode = () => {
    if (!(detail.summary && detail.summary.nextNodeCode && process.length)) return null
    const cur = [...process].reverse().find((item: any) => {
      return detail.summary.nextNodeCode === item.nodeCode
    })
    return cur || null
  }
  const formatEdit = () => {
    return editList.reduce((prev: Obj[], v: Obj) => {
      if (!v.id) return prev
      const { id, workContentAndSuggestions, specialCaseRecord } = v
      prev.push({ id, workContentAndSuggestions, specialCaseRecord })
      return prev
    }, [])
  }

  const hasSubmit = useMemo(() => {
    // return curNode?.nodeCode?.includes('SUBMIT')
    return curNode?.canHandle && curNode?.nodeCode?.includes('SUBMIT')
  }, [curNode])
  /**
   * 提交审核
   */
  const handleSubmit = async () => {
    const nextNode = getNextNode()
    if (!nextNode) return
    const res = await api.dailySummaryHandleNode({
      summaryCode: queryObj.id,
      handleNodeParam: {
        nodeCode: nextNode.nodeCode,
        handleContent: '',
        noPass: false
      },
      // recordUpdateInfos: []
      recordUpdateInfos: formatEdit()
    })
    if (res.code == 200) {
      message.success('审核成功')
      await getData()
    }
  }
  /**暂存 */
  const handleStaging = async () => {
    const res = await api.stagingDailySummary({
      summaryCode: queryObj.id,
      // recordUpdateInfos: []
      recordUpdateInfos: formatEdit()
    })
    if (res.code == 200) {
      message.success('暂存成功')
      await getData()
    }
  }
  /**同步更新 */
  const handleUpdate = () => {
    Modal.confirm({
      title: "同步更新",
      centered: true,
      content: '工作内容和建议将被覆盖，是否确认同步数据？',
      okText: '是',
      onOk: async () => {
        console.log('test-1', 1)
      }
    })
  }

  const hasAudit = useMemo(() => {
    return curNode?.nodeCode?.includes('ROUNDS_SUMMARY_CHAIN_AUDIT')
    // return curNode?.canHandle && curNode?.nodeCode?.includes('ROUNDS_SUMMARY_CHAIN_AUDIT')
  }, [curNode])

  const handleAudit = async () => {
    setUser(defaultUser)
    setProcessVisible(true)
  }

  const handleCheck = async () => {
    const nextNode = getNextNode()
    if (!nextNode) return
    try {
      const res = await api.dailySummaryHandleNode({
        summaryCode: queryObj.id,
        handleNodeParam: {
          nodeCode: nextNode.nodeCode,
          noPass: user.noPass,
          handleContent: user.handleContent
        },
        recordUpdateInfos: []
      })
      if (res.code == 200) {
        message.success('审核成功')
        await getData()
      }
    } catch (e) {
      console.log('test-e', e)
    }
  }
  /**撤回 */
  const handleCancel = () => {
    Modal.confirm({
      title: '撤回',
      content: '是否撤回？',
      onOk: async () => {
        try {
          const res = await api.dailySummaryCancelCommit(detail.summary.id)
          if (res.code == 200) {
            message.success('审核成功')
            await getData()
          }
        } catch (e) {
          console.log('test-e', e)
        }
      }
    })
  }
  const onExport = () => {
    api.dailySummaryExport(detail?.summary?.id).then(res => {
      fileDownload(res)
    })
  }

  const printRef = useRef<any>(null)
  const onPrint = () => {
    printFn(printRef.current, {
      injectGlobalCss: true,
      direction: 'horizontal',
      scanStyles: false,
      css: `
        @page {
          margin: 0;
        }
        .ctx {
          width: auto;
          height: auto;
          max-height: inherit;
        }
        .ctx .table-wrapper {
          padding: 20px 0;
        }
        .ant-input {
          height: auto;
          border: none;
          white-space: pre-wrap;
        }
      `
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Wrapper>
      <BreadcrumbBox
        style={{ padding: '5px 10px 0', height: '26px' }}
        data={[
          { name: '每日夜查房汇总', link: '/checkWard/dailyNightRoundsSummary' },
          { name: "记录详情" },
        ]}
      />
      <HeadWrapper>
        <div>
          <div style={{ fontWeight: "bold" }}>{detail.title}</div>
          <div>状态：{detail?.summary?.statusDescription}</div>
        </div>
        <div className='right-bottom'>
          <Button className="con-item" onClick={() => history.goBack()}>返回</Button>
          {hasSubmit &&
            <>
              <Button type='primary' className="con-item" onClick={() => handleSubmit()}>提交</Button>
              {/* <Button type='primary' className="con-item" onClick={() => handleStaging()}>暂存</Button> */}
              {/* <Button className="con-item" onClick={() => handleUpdate()}>同步更新</Button> */}
            </>}
          {hasAudit &&
            <>
              <Button type='primary' className="con-item" onClick={() => handleCancel()}>撤回</Button>
              {curNode?.canHandle && <Button type='primary' className="con-item" onClick={() => handleAudit()}>审核</Button>}
            </>}
          <Button className="con-item" onClick={onExport}>导出</Button>
          <Button className="con-item" onClick={onPrint}>打印</Button>
        </div>
      </HeadWrapper>
      <MainWrapper>
        <Container ref={printRef} className='main-ctx' {...{ detail, editList, setEditList, hasSubmit }} />
        <div className='audit-wrapper'>
          <div className='audit-title'>审核流程</div>
          <div>
            <Timeline>
              {
                process.map((item: any, index: number) => {
                  return <Timeline.Item key={index} color={item.status === '1' ? 'green' : 'rgba(0,0,0,.25)'}>
                    <div className='timeline-item'>{item.nodeName}</div>
                    {item.status === '1' && <>
                      <div className='timeline-item'>{item.handlerName}</div>
                      <div className='timeline-item'>{item.handleTime}</div>
                      <div className='timeline-item'
                        style={{
                          background: 'rgb(238,238,238)',
                          borderRadius: '5px',
                          padding: '0 5px'
                        }}>
                        <span>{item.handleContent}</span>
                      </div>
                    </>}
                  </Timeline.Item>
                })
              }
            </Timeline>
          </div>
        </div>
      </MainWrapper>
      <Modal
        title="审核"
        visible={processVisible}
        width={500}
        onOk={() => {
          setProcessVisible(false)
          globalModal.signModal.show({
            onCallBack: (empNo: string, password: string) => {
              handleCheck()
            }
          })
        }}
        onCancel={() => {
          setProcessVisible(false)
        }}
      >
        <div style={{ lineHeight: '28px', fontSize: '16px' }}>
          {/* <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>审核结果:</Col>
            <Col span={20}>
              <Radio.Group
                value={user.noPass}
                onChange={(e) => setUser({ ...user, 'noPass': e.target.value })}>
                <Radio value={true}>通过</Radio>
                <Radio value={false}>驳回</Radio>
              </Radio.Group>
            </Col>
          </Row> */}
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>审核意见:</Col>
            <Col span={20}>
              <Input.TextArea
                value={user.handleContent}
                rows={4}
                onChange={(e) =>
                  setUser({ ...user, 'handleContent': e.target.value })
                } />
            </Col>
          </Row>
          <Row>
            <Col span={4}>审核时间:</Col>
            <Col span={20}>{moment().format("YYYY-MM-DD HH:mm")}</Col>
          </Row>
        </div>
      </Modal>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`

const HeadWrapper = styled.div`
  height: 50px;
  background: #fff;
  font-size: 14px;
  display:flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  
  .right-bottom{
    .con-item{
      margin-left: 10px;
      font-size: 12px;
    }
  }
`

const MainWrapper = styled.div`
  height: calc(100% - 50px);
  position: relative;
  
  .audit-wrapper{
    position: absolute;
    height: 100%;
    width: 250px;
    background: #fff;
    top: 0;
    right: 0;
    padding: 20px 20px;
    overflow: auto;
    
    .audit-title{
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .timeline-item{
      line-height:22px;
    }
  }
`
