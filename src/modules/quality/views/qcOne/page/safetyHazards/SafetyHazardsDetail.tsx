import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { PageHeader, PageTitle, Place, ScrollBox } from 'src/components/common'
import { DatePicker, Row, Col, Select, Input, TimePicker, message, Spin, AutoComplete } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTabs from 'src/components/BaseTabs'
import Table from './components/Table'
import Form from 'src/components/Form'
import { observer } from 'mobx-react-lite'
import service from 'src/services/api'
import { DictItem } from 'src/services/api/CommonApiService'
import { qcOneService } from '../../services/QcOneService'
import moment from 'moment'
import { to } from 'src/libs/fns'
import { globalModal } from 'src/global/globalModal'
export interface Props { }

export default observer(function SafetyHazardsDetail() {
  const [pageLoading, setPageLoading] = useState(false)
  const [oldData, setOldData] = useState(null)
  const [wardList, setWardList]: any = useState([
    {
      code: '总务处',
      name: '总务处'
    },
    {
      code: '设备科',
      name: '设备科'
    },
    {
      code: '药学部',
      name: '药学部'
    },
    {
      code: '无',
      name: '无'
    }
  ])
  const [recordDate, setRecordDate]: any = useState(moment())
  const [safetyCheckList, setSafetyCheckList] = useState([{}, {}, {}, {}, {}])
  const refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    let obj: any = Object.assign({}, oldData || {})
    obj.recordDate = recordDate ? moment(recordDate).format('YYYY-MM-DD HH:mm') : ''
    obj.wardCode = authStore.selectedDeptCode
    obj.wardName = authStore.selectedDeptName
    obj.assistWardCode = value.assistWardCode
    obj.assistWardName = obj.assistWardCode
    obj.contentWithBigDept = value.contentWithBigDept
    obj.contentWithNd = value.contentWithNd
    obj.suggetions = value.suggetions
    obj.safetyCheckList = safetyCheckList.filter((item: any) => item.problemType)
    qcOneService.qcSafetyCheckSaveOrUpdate(obj).then((res) => {
      message.success('保存成功')
      appStore.history.goBack()
    })
  }

  const onDel = () => {
    globalModal.confirm('删除确认', '你确定要删除此安全隐患排查记录吗？').then((res) => {
      qcOneService.qcSafetyCheckDelete(appStore.queryObj.id).then((res) => {
        message.success('删除成功')
        appStore.history.goBack()
      })
    })
  }

  useLayoutEffect(() => {
    setPageLoading(true)
    let form = refForm.current
    // service.commonApiService.getNursingUnitAll().then((res) => {
    //   setWardList(res.data.deptList)

    /** 编辑 or 新建 */
    if (appStore.queryObj.id) {
      qcOneService.qcSafetyGetDetail(appStore.queryObj.id).then((res) => {
        form!.setFields({
          assistWardCode: res.data.assistWardCode,
          // assistWardName: res.data.assistWardName,
          contentWithBigDept: res.data.contentWithBigDept,
          contentWithNd: res.data.contentWithNd,
          suggetions: res.data.suggetions
        })
        while (res.data.safetyCheckList.length <= 5) {
          res.data.safetyCheckList.push({})
        }
        setOldData(res.data)
        setRecordDate(res.data.recordDate ? moment(res.data.recordDate) : null)
        setSafetyCheckList(res.data.safetyCheckList)
        setPageLoading(false)
      })
    } else {
      form!.setFields({
        assistWardCode: '',
        // assistWardName: '',
        contentWithBigDept: '',
        contentWithNd: '',
        suggetions: ''
      })
      setPageLoading(false)
    }
    // })
  }, [])

  return (
    <Wrapper>
      <Spin spinning={pageLoading}>
        <HeadCon>
          <BreadcrumbBox
            data={[
              {
                name: '安全隐患排查表',
                link: '/qcOne/safetyHazards'
              },
              {
                name: '安全隐患排查表设置'
              }
            ]}
          />
          <PageHeader>
            <PageTitle>安全隐患排查表设置</PageTitle>
            <Place />
            <Button type='primary' onClick={onSave}>
              保存
            </Button>
            {appStore.queryObj.id && (
              <Button type='danger' onClick={onDel}>
                删除
              </Button>
            )}

            <Button onClick={() => appStore.history.goBack()}>返回</Button>
          </PageHeader>
          <Line />
        </HeadCon>

        <ScrollBox style={{ height: 'calc(100vh - 142px)' }}>
          <PageHeader style={{ marginTop: 10 }}>
            <span className='label'>排查日期:</span>
            <DatePicker
              format='YYYY-MM-DD'
              allowClear={false}
              style={{ width: 160 }}
              value={recordDate}
              onChange={(date) => setRecordDate(date)}
            />
            <span className='label'>排查时间:</span>
            <TimePicker
              format='HH:mm'
              allowClear={false}
              style={{ width: 133 }}
              value={recordDate}
              onChange={(date) => setRecordDate(date)}
            />
            <span className='label'>科室:</span>
            <Input value={authStore.selectedDeptName} disabled={true} style={{ width: 200 }} />
          </PageHeader>
          <Table safetyCheckList={safetyCheckList} setSafetyCheckList={setSafetyCheckList} />
          <FormCon>
            <Form ref={refForm} labelWidth={150}>
              <Row>
                {/* <Col span={24}>
                  <Form.Field label={`需协助科室`} name='assistWardCode'>
                    <AutoComplete dataSource={wardList.map((item: any) => item.name)} />
                  </Form.Field>
                </Col> */}
                <Col span={24}>
                  <Form.Field label={`需大科协调的问题`} name='contentWithBigDept'>
                    <Input.TextArea />
                  </Form.Field>
                </Col>
                <Col span={24}>
                  <Form.Field label={`需护理部协调的问题`} name='contentWithNd'>
                    <Input.TextArea />
                  </Form.Field>
                </Col>
                <Col span={24}>
                  <Form.Field label={`查新及建议`} name='suggetions'>
                    <Input.TextArea />
                  </Form.Field>
                </Col>
              </Row>
            </Form>
          </FormCon>
        </ScrollBox>
      </Spin>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 100%;
`
const HeadCon = styled.div``

const Line = styled.div`
  border-top: 1px solid #d8d8d8;
`
const FormCon = styled.div`
  margin: 20px 30px;
  width: 850px;
  .label {
    justify-content: flex-start;
  }
`
