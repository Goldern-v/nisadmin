import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Input, Modal, Row, Col, message } from "antd"
import { onlineLearningApi } from '../../api/OnlineLearningApi'
import SelectPeopleModal from "src/modules/notice/page/modal/SelectPeopleModal";
import createModal from "src/libs/createModal";

interface Props {
  modalId: string
  visible: boolean
  onOk: Function
  onCancel: Function
}

export default observer((props: Props) => {
  const { modalId, visible, onOk, onCancel } = props
  const defaultForm = {
    id: "",
    title: "",
    describe: '',
    perception: '',
    evaluate: '',
    analysis: '',
    conclusion: '',
    action: '',
  }
  const [form, setForm] = useState(defaultForm)
  const setFormItem = (obj: Object) => {
    setForm({ ...form, ...obj })
  }
  const [checkedUserList, setCheckedUserList]: any[] = useState([])
  const selectPeopleModal = createModal(SelectPeopleModal)

  const handleOk = async () => {
    const res = await onlineLearningApi.updateMyWorkList({ ...form })
    onOk()
  }

  // 获取审核人dom
  const getReviewerItem = () => {
    return checkedUserList.map((item: any) => {
      return (
        <div className={'reviewer-item'} key={item.key}>
          <span>{item.empName}</span>
          <Button size={"small"} shape="circle" icon="close" onClick={() => handleDeleteReviewer(item.key)}/>
        </div>
      )
    })
  }

  // 删除审核人
  const handleDeleteReviewer = (key: string) => {

  }

  // 审核人增加按钮点击事件
  const handleSelectReviewer = () => {
    selectPeopleModal.show({
      checkedUserList: checkedUserList,
      onOkCallBack: (payload: any) => {
        const reviewerList = getReviewer(payload)
        const filterReviewer = reviewerList.splice(0, 3)
        setCheckedUserList(filterReviewer)
        if (reviewerList.length > 3) return message.warn('审核人数不能超过三人')
      }
    })
  }

  // 工具方法 用来获取到数组里面的审核人
  const getReviewer = (list: any[]): any[] => {
    let arr: any[] = []
    list.forEach((item: any) => {
      if (item.userList) {
        const mapArr = item.userList.map((i: any) => {
          return {
            ...i,
            key: i.empNo,
            label: i.empName,
          }
        })
        arr.push(...mapArr)
      } else {
        arr.push(item)
      }
    })
    return arr
  }

  useEffect(() => {
    if (visible && modalId) {
      onlineLearningApi.getMyWorkItem(modalId).then(res => {
        const _form: any = Object.keys(defaultForm).reduce((acc: object, cur: string) => {
          return { ...acc, [cur]: res.data[cur] }
        }, {})
        setForm(_form)
      })
    } else {
      setForm(defaultForm)
    }
  }, [visible])

  return (
    <Modal
      title={`工作反思`}
      centered
      width={ 600}
      visible={visible}
      onCancel={() => onCancel()}
      footer={
        <div>
          <Button onClick={() => onCancel()}>
            取消
          </Button>
          <Button type='primary' onClick={handleOk}>
            {modalId ? '保存' : '新增'}
          </Button>
        </div>
      }
    >
      <Wrapper>
        <div className={"form-wrapper"}>
          <Row>
            <Col span={4}>标题</Col>
            <Col span={20}>
              <Input
                value={form.title}
                onChange={(event) => setFormItem({ title: event.target.value })}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>描述</Col>
            <Col span={20}>
              <Input.TextArea
                value={form.describe}
                onChange={(event) => setFormItem({ describe: event.target.value })}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>感知</Col>
            <Col span={20}>
              <Input.TextArea
                value={form.perception}
                onChange={(event) => setFormItem({ perception: event.target.value })}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>评价</Col>
            <Col span={20}>
              <Input.TextArea
                value={form.evaluate}
                onChange={(event) => setFormItem({ evaluate: event.target.value })}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>分析</Col>
            <Col span={20}>
              <Input.TextArea
                value={form.analysis}
                onChange={(event) => setFormItem({ analysis: event.target.value })}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>结论</Col>
            <Col span={20}>
              <Input.TextArea
                value={form.conclusion}
                onChange={(event) => setFormItem({ conclusion: event.target.value })}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>行动</Col>
            <Col span={20}>
              <Input.TextArea
                value={form.action}
                onChange={(event) => setFormItem({ action: event.target.value })}/>
            </Col>
          </Row>
          {/*<Row style={{ marginTop: '20px' }}>*/}
          {/*  <Col span={4}>审核人</Col>*/}
          {/*  <Col span={20} className="reviewer-list">*/}
          {/*    {getReviewerItem()}*/}
          {/*    <Button type="primary" size={"small"} shape="circle" icon="plus" onClick={() => handleSelectReviewer()}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <selectPeopleModal.Component/>
        </div>
        {/*{modalId && <div className={'reviewer'}>*/}
        {/*  <div className={'title'}>审核过程</div>*/}
        {/*</div>}*/}
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  line-height: 32px;
  
  .form-wrapper{
    width:500px;
    .ant-row{
      width:100%
      display: flex;
      align-items:center;
      margin-bottom: 10px;
      .ant-col-4{
        text-align: right;
        padding-right: 15px;
      }
      input {
        width: 100%;
      }
      textarea{
        resize: none;
      }
      .reviewer-list{
        display:flex;
        align-items:center;
        height:32px;
        font-size: 14px;
        .reviewer-item{
          border: 1px solid #aaa;
          padding: 0 10px;
          border-radius: 5px;
          margin-right: 20px;
          position: relative;
          span{
            margin-right:10px;
          }
          button{
            position: absolute;
            top: -12px;
          }
        }
      }
    }
  }
  .reviewer{
    flex:1;
    padding-left: 30px;
    .title{
      line-height: 32px;
      position: relative;
      
      &::before{
          position: absolute;
          content: "";
          width: 8px;
          height: 100%;
          background: rgb(112, 182, 3);
          left: -10px;
      }
    }
  }
`
