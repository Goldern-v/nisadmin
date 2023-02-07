import styled from "styled-components"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { Button, Input, Timeline, Modal, Col, Row, Radio, message } from "src/vendors/antd";
import { appStore } from "src/stores";
import api from 'src/services/api/quality/nightRoundsRecordApi'
import moment from 'moment'
import ContainerWard from "./components/container-ward";
import { Obj } from "src/libs/types";
import { globalModal } from "src/global/globalModal";
import { fileDownload } from "src/utils/file/file";
import printFn from "printing";
import ContainerTwo from "./components/container-two";
interface Props {

}
/**护长/二值护士夜查房详情页 by江门妇幼 */
export default observer((props: Props) => {
  const { history, queryObj } = appStore
  const [master, setMaster]: any = useState({})
  const [process, setProcess]: any[] = useState([])
  // 疫情防疫数据
  const [form1, setForm1] = useState<Obj>({})

  const [processVisible, setProcessVisible] = useState(false)
  /**是否为二值护士 */
  const isTwoNurse = useMemo(()=> queryObj.type == 2, [queryObj])
  const defaultUser = {
    nopass: false,
    handleContent: '',
    empNo: '',
    password: '',
  }
  const [user, setUser] = useState(defaultUser)
  /**初始化数据 */
  const getData = async (id = queryObj.id) => {
    const { data } = await api.getItem(id, queryObj.type)
    if (isTwoNurse) {
      const { problems, title }  = data
      setMaster({ ...data.nurseRoundsRecord, formItems: data.formItems, problems, title })
    } else {
      setMaster({ ...data.nurseRoundsRecord, formItems: data.formItems })
      setForm1({ ...data.antiepidemicFormItem, roundsRecordProblem: data.nurseRoundsRecord.workContentAndSuggestions })
    }
    setProcess(data.nodeDataList)
  }
  /**当前节点 */
  const curNode = useMemo(() => {
    if (!(master.currentNodeCode && process.length)) return null
    const cur = [...process].reverse().find((item: any) => {
      return master.nextNodeCode === item.nodeCode
    })
    return cur || null
  }, [master, process])
  /**获取下一节点 */
  const getNextNode = () => {
    if (!(master.nextNodeCode && process.length)) return null
    const cur = [...process].reverse().find((item: any) => {
      return master.nextNodeCode === item.nodeCode
    })
    return cur || null
  }

  const hasSubmit = () => {
    // return curNode?.nodeCode?.includes('commit')
    return curNode?.canHandle && curNode?.nodeCode?.includes('commit')
  }
  /**
   * 提交审核
   */
  const handleSubmit = async () => {
    const { id, subFormItems, problems, title, roundsRecordProblem } = form1
    /**form1单选需要必填 */
    const isForm1ItemValueNull: boolean = subFormItems.some((v: Obj) => v.value == null)
    if (isForm1ItemValueNull) {
      return message.warning(`${title}选项为必填`)
    }
    const nextNode = getNextNode()
    if (!nextNode) return
    const res = await api.saveItem({
      recordId: master.id,
      handleNodeParam: {
        nodeCode: nextNode.nodeCode,
        handleContent: '',
        noPass: false
      },
      roundsRecordProblem,
      antiepidemicSaveInfo: {
        id,
        problem: problems,
        itemSelectedInfos: subFormItems.map((v: Obj) => ({ id: v.id, value: v.value }))
      }
    }, queryObj.type)
    if (res.code == 200) {
      message.success('提交成功')
      await getData()
    }
  }

  const hasAudit = useMemo(() => {
    // return curNode?.nodeCode?.includes('nursing_minister')
    return curNode?.canHandle && curNode?.nodeCode?.includes('nursing_minister')
  }, [curNode])

  const handleAudit = async () => {
    setUser(defaultUser)
    setProcessVisible(true)
  }

  const handleCheck = async () => {
    const nextNode = getNextNode()
    if (!nextNode) return
    try {
      const res = await api.saveItem({
        recordId: master.id,
        handleNodeParam: {
          nodeCode: nextNode.nodeCode,
          nopass: user.nopass,
          handleContent: user.handleContent
        },
      }, queryObj.type)
      if (res.code == 200) {
        message.success('审核成功')
        await getData()
      }
    } catch (e) {
      console.log('test-e', e)
    }
  }
  const onExport = () => {
    api.exportTable(master.id, queryObj.type).then(res => {
      fileDownload(res)
    })
  }

  const printRef = useRef<any>(null)
  const onPrint = () => {
    printFn(printRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
        @page {
          margin: 0;
        }
        .ctx {
          width: auto;
          height: auto;
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
          { name: '查房记录', link: '/checkWard/scoringRecord' },
          { name: "记录详情" },
        ]}
      />
      <HeadWrapper>
        <div>
          <div style={{ fontWeight: "bold" }}>{master.deptName}{isTwoNurse ? '二值护士夜查房记录表' : '中夜班查房记录表'}</div>
          <div>状态：{getNextNode()?.nodeName}</div>
        </div>
        <div className='right-bottom'>
          <Button className="con-item" onClick={() => history.goBack()}>返回</Button>
          {hasSubmit() && <Button type='primary' className="con-item" onClick={() => handleSubmit()}>提交</Button>}
          {hasAudit && <Button type='primary' className="con-item" onClick={() => handleAudit()}>审核</Button>}
          <Button className="con-item" onClick={onExport}>导出</Button>
          <Button className="con-item" onClick={onPrint}>打印</Button>
        </div>
      </HeadWrapper>
      <MainWrapper>
        {
          isTwoNurse ?
          <ContainerTwo ref={printRef} className='main-ctx' {...{ master, hasSubmit }} />
          :
          <ContainerWard ref={printRef} className='main-ctx' {...{ master, form1, setForm1, hasSubmit }} />
          }
        <div className='audit-wrapper'>
          <div className='audit-title'>审核流程</div>
          <div>
            <Timeline>
              {
                process.map((item: any, index: number) => {
                  return <Timeline.Item key={index} color={item.status === '1' ? 'green' : 'rgba(0,0,0,.25)'}>
                    <div className='timeline-item'>{item.nodeName}</div>
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
                value={user.nopass}
                onChange={(e) => setUser({ ...user, 'nopass': e.target.value })}>
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
