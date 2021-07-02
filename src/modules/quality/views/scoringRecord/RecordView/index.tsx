import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { Button, Input, Timeline, Modal, Col, Row, Radio } from "src/vendors/antd";
import { appStore, authStore } from "src/stores";
import api from '../api'
import moment from 'moment'

interface Props {

}

export default observer((props: Props) => {
  const { history, location, match } = appStore
  const [master, setMaster]: any = useState({})
  const [process, setProcess]: any[] = useState([])
  const [form, setForm]: any = useState({})
  const setFormItem = (item: object) => {
    const keys = ['SR0001009', 'SR0001011', 'SR0001013', 'SR0001015', 'SR0001017']
    const sum = keys.reduce((acc: number, cur: string) => {
      const val = form[cur]
      const valNum = isNaN(+val) ? 0 : +val
      return acc + valNum
    }, 0)
    setForm({ ...form, ...item, 'SR0001019': sum })
  }
  const [processVisible, setProcessVisible] = useState(false)
  const [checkUserVisible, setCheckUserVisible] = useState(false)
  const defaultUser = {
    nopass: undefined,
    handleContent: '',
    empNo: '',
    password: '',
  }
  const [user, setUser] = useState(defaultUser)

  const getData = async (id = appStore.queryObj.id) => {
    const { data } = await api.getItem(id)
    setMaster(data.master)
    setProcess(data.handlenodeDto)
    setFormItem(data.itemDataMap)
  }

  const hasSubmit = () => {
    if (!(master.currentNodeCode && process.length)) return false
    const current = process.find((item: any) => {
      return master.currentNodeCode === item.nodeCode
    })
    return current?.canUpdate
  }

  const handleSubmit = async () => {
    const res = await api.saveItem({
      master: master,
      itemDataMap: form,
      commit: false
    })
    await getData()
  }

  const hasAudit = () => {
    if (!(master.currentNodeCode && process.length)) return false
    const current = process.find((item: any) => {
      return master.currentNodeCode === item.nodeCode
    })
    return current?.canHandle
  }

  const handleAudit = async () => {
    setUser(defaultUser)
    setProcessVisible(true)
  }

  const handleCheck = async () => {
    const params = {
      id: master.id,
      nodeCode: 'commit',
      nopass: user.nopass,
      handleContent: user.handleContent,
      empNo: user.empNo,
      password: user.password,
    }
    try {
      await api.auditItem(params)
      await getData()
    } finally {
      setCheckUserVisible(false)
    }
  }

  useEffect(() => {
    getData().then()
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
          <div style={{ fontWeight: "bold" }}>{master.deptName}中夜班查房记录表</div>
          <div>状态：待提交</div>
        </div>
        <div className='right-bottom'>
          {hasSubmit() && <Button type='primary' className="con-item" onClick={() => handleSubmit()}>保存</Button>}
          {hasAudit() && <Button type='primary' className="con-item" onClick={() => handleAudit()}>审核</Button>}
          <Button className="con-item" onClick={() => history.goBack()}>返回</Button>
        </div>
      </HeadWrapper>
      <MainWrapper>
        <div style={{ overflow: 'auto', height: '100%', pointerEvents: hasSubmit() ? 'auto' : 'none' }}>
          <div className='table-wrapper'>
            <div className='table-title'>
              05月20日护士长班查房评分表
            </div>
            <table>
              <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <td colSpan={4}/>
                <td>值班护长：</td>
                <td>
                  <Input
                    value={form.SR0001001}
                    onChange={(e) =>
                      setFormItem({ 'SR0001001': e.target.value })
                    }/>
                </td>
              </tr>
              <tr>
                <td>病区：</td>
                <td>
                  <Input
                    value={form.SR0001002}
                    onChange={(e) =>
                      setFormItem({ 'SR0001002': e.target.value })
                    }/>
                </td>
                <td>病人数：</td>
                <td>
                  <Input
                    value={form.SR0001003}
                    onChange={(e) =>
                      setFormItem({ 'SR0001003': e.target.value })
                    }/>
                </td>
                <td>危重病人：</td>
                <td>
                  <Input
                    value={form.SR0001004}
                    onChange={(e) =>
                      setFormItem({ 'SR0001004': e.target.value })
                    }/>
                </td>
              </tr>
              <tr>
                <td>值班护士：</td>
                <td>
                  <Input
                    value={form.SR0001005}
                    onChange={(e) =>
                      setFormItem({ 'SR0001005': e.target.value })
                    }/>
                </td>
                <td>陪护数：</td>
                <td>
                  <Input
                    value={form.SR0001006}
                    onChange={(e) =>
                      setFormItem({ 'SR0001006': e.target.value })
                    }/>
                </td>
                <td>I级护理：</td>
                <td>
                  <Input
                    value={form.SR0001007}
                    onChange={(e) =>
                      setFormItem({ 'SR0001007': e.target.value })
                    }/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>查房内容</td>
                <td colSpan={3}>存在问题</td>
                <td>得分</td>
              </tr>
              <tr>
                <td colSpan={2}>护士的服务礼仪(20分)</td>
                <td colSpan={3}>
                  <Input.TextArea
                    value={form.SR0001008}
                    onChange={(e) =>
                      setFormItem({ 'SR0001008': e.target.value })
                    }/>
                </td>
                <td>
                  <Input
                    value={form.SR0001009}
                    onChange={(e) =>
                      setFormItem({ 'SR0001009': e.target.value })
                    }/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>级别护理的落实(20分)</td>
                <td colSpan={3}>
                  <Input.TextArea
                    value={form.SR0001010}
                    onChange={(e) =>
                      setFormItem({ 'SR0001010': e.target.value })
                    }/>
                </td>
                <td>
                  <Input
                    value={form.SR0001011}
                    onChange={(e) =>
                      setFormItem({ 'SR0001011': e.target.value })
                    }/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>交接班制度的落实(20分)</td>
                <td colSpan={3}>
                  <Input.TextArea
                    value={form.SR0001012}
                    onChange={(e) =>
                      setFormItem({ 'SR0001012': e.target.value })
                    }/>
                </td>
                <td>
                  <Input
                    value={form.SR0001013}
                    onChange={(e) =>
                      setFormItem({ 'SR0001013': e.target.value })
                    }/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>医嘱执行的落实(20分)</td>
                <td colSpan={3}>
                  <Input.TextArea
                    value={form.SR0001014}
                    onChange={(e) =>
                      setFormItem({ 'SR0001014': e.target.value })
                    }/>
                </td>
                <td>
                  <Input
                    value={form.SR0001015}
                    onChange={(e) =>
                      setFormItem({ 'SR0001015': e.target.value })
                    }/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>急救物品及药品管理标准(20分)</td>
                <td colSpan={3}>
                  <Input.TextArea
                    value={form.SR0001016}
                    onChange={(e) =>
                      setFormItem({ 'SR0001016': e.target.value })
                    }/>
                </td>
                <td>
                  <Input
                    value={form.SR0001017}
                    onChange={(e) =>
                      setFormItem({ 'SR0001017': e.target.value })
                    }/>
                </td>
              </tr>
              <tr>
                <td colSpan={6}>
                  <div style={{ display: "flex" }}>
                    <span style={{ width: '140px' }}>工作内容及建议:</span>
                    <Input.TextArea
                      rows={4}
                      value={form.SR0001018}
                      onChange={(e) =>
                        setFormItem({ 'SR0001018': e.target.value })
                      }/>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
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
                        {item.handleContent}
                      </div>
                    </Timeline.Item>
                  })
                }
              </Timeline>,
            </div>
          </div>
        </div>
      </MainWrapper>
      <Modal
        title="审核"
        visible={processVisible}
        width={500}
        onOk={() => {
          setProcessVisible(false)
          setCheckUserVisible(true)
        }}
        onCancel={() => {
          setProcessVisible(false)
        }}
      >
        <div style={{ lineHeight: '28px', fontSize: '16px' }}>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>审核结果:</Col>
            <Col span={20}>
              <Radio.Group
                value={user.nopass}
                onChange={(e) => setUser({ ...user, 'nopass': e.target.value })}>
                <Radio value={true}>通过</Radio>
                <Radio value={false}>驳回</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>审核意见:</Col>
            <Col span={20}>
              <Input.TextArea
                value={user.handleContent}
                rows={4}
                onChange={(e) =>
                  setUser({ ...user, 'handleContent': e.target.value })
                }/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>审核时间:</Col>
            <Col span={20}>{moment().format("YYYY-MM-DD HH:mm")}</Col>
          </Row>
        </div>
      </Modal>
      <Modal
        title="请输入账号密码"
        visible={checkUserVisible}
        width={400}
        onOk={() => handleCheck()}
        onCancel={() => {
          setCheckUserVisible(false)
        }}
      >
        <div style={{ lineHeight: '28px', fontSize: '16px' }}>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>账号:</Col>
            <Col span={20}>
              <Input
                value={user.empNo}
                onChange={(e) =>
                  setUser({ ...user, 'empNo': e.target.value })
                }/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>密码:</Col>
            <Col span={20}>
              <Input
                type='password'
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, 'password': e.target.value })
                }/>
            </Col>
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
   
   .table-wrapper{
      background: #fff;
      min-height: 100%;
      width: 50%;
      margin: 0 auto;
      padding: 30px 50px 80px;
      
      
      .table-title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      table{
        border-collapse: collapse;
        border-color: #000;
        width: 100%;
        table-layout: fixed;
        tr {
          width: 100%;
        }
        td{
          border: 1px #000 solid;
          line-height: 24px;
          min-height: 24px;
          text-align: center;
          input{
            border: none;
          }
        }
      }
   }
   
   .audit-wrapper{
      position: absolute;
      height: 100%;
      width: 250px;
      background: #fff;
      top: 0;
      right: 0;
      padding: 20px 20px;
      
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