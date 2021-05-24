import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import {
  Button as ButtonMb,
  // DatePicker as DatePickerMb,
  List as ListMb,
  InputItem,
  Picker,
  // NavBar,
  // Icon as IconMb,
  // Modal as ModalMb,
  // TextareaItem,
  Checkbox as CheckboxMb,
  Card as CardMb
} from 'antd-mobile'
import { Icon } from 'antd'
// import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN'
// import moment from 'moment'
import { satisfiedPatSubmitService } from './api/SatisfiedPatSubmitService'
import { message } from 'antd'
import qs from 'qs'
import { questionListDefault } from 'src/modules/quality/views/qcOne/page/satisfiedPat/data/questionListDefault'
const CheckboxItem = CheckboxMb.CheckboxItem

export interface Props { }

export default function SatisfiedPatSubmit() {
  const query = qs.parse(location.hash.split('?')[1] || '')

  const [params, setParams] = useState({
    name: '',
    bedNo: '',
    sex: '1',
    age: '',
    phone: '',
    wardName: query.wardName || '',
    wardCode: query.wardCode || '',
  })

  const [questionList, setQuestionList] = useState(questionListDefault())

  /**表单校验 */
  const [rules, setRules] = useState({
    name: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '姓名不能为空'
      ]
    },
    sex: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '性别不能为空'
      ]
    },
    age: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '年龄不能为空'
      ]
    }
  })

  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const checkForm = () => {
    let rulesTotal = { ...rules } as any
    let formData = { ...params } as any
    for (let key in rulesTotal) {
      if (rulesTotal[key].rules && rulesTotal[key].rules.length > 0) {

        let result = rulesTotal[key].rules
          .reduce((prev: any, current: Function, idx: number) => {
            if (prev === true || idx === 0)
              return current(formData[key])
            else
              return prev
          })

        if (result instanceof Function) {
          result = result(formData[key])
        }

        if (typeof result !== 'boolean') {
          message.error(result)
          let el = document.querySelector('.base-info')
          el?.scrollIntoView()
          return false
        }
      }
    }

    return true
  }

  const checkAnswers = () => {
    const errMsgList = [] as string[]

    questionList
      .filter((item: any) => item.questionType === 1)
      .forEach((item: any) => {
        let chooseAnswerItem = item.answer.find((answerItem: any) => answerItem.isChoose)

        if (!chooseAnswerItem)
          errMsgList.push(`${item.sort}.${item.question}_未填写`)
      })

    if (errMsgList.length > 0) {
      message.error(errMsgList[0])
      let el = document.querySelector(`.question-item-${errMsgList[0].split('.')[0]}`)
      el?.scrollIntoView()

      let doc = document.querySelector('html')
      if (doc) {
        let docScrollTop = doc.scrollTop

        doc.scrollTop = docScrollTop + 20
      }

      return false
    }

    return true
  }

  const handleQustionChange = (item: any, idx: number) => {
    let newList = [...questionList]

    newList[idx] = item

    setQuestionList(newList)
  }

  const handleSubmit = () => {
    if (!checkForm()) return

    if (!checkAnswers()) return

    let saveParams = {
      satisfiedPatId: Number(query.id),
      satisfiedPatDetail: {
        ...params,
        score: currentScore().toString(),
        content: JSON.stringify(questionList)
      }
    }

    setLoading(true)

    satisfiedPatSubmitService
      .submitInfoToAudit(saveParams)
      .then(res => (
        setFinished(true)
      ), () => setLoading(false))
    // window.opener = null
    // window.open('about:blank', '_self', '')
    // window.close()
  }

  /**当前评价总分 */
  const currentScore = () => {
    return [0, ...questionList].reduce((score, item) => {
      return score + item.totalScore
    })
  }

  useEffect(() => {
    document.title = "患者满意度调查表"
  }, [])

  return <Wrapper>
    <div className="content" style={{ display: finished ? 'none' : 'block' }}>
      <ListMb className="base-info">
        <InputItem
          value={params.name}
          placeholder="请输入"
          onChange={(name: string) => setParams({ ...params, name })}>
          姓名
        </InputItem>
        <InputItem
          value={params.wardName}
          placeholder="请输入"
          readOnly
          onChange={(wardName: string) => setParams({ ...params, wardName })}>
          就诊科室
        </InputItem>
        <InputItem
          value={params.bedNo}
          placeholder="请输入"
          onChange={(bedNo: string) => setParams({ ...params, bedNo })}>
          床号
        </InputItem>
        <Picker
          extra="请选择"
          data={[
            { label: '男', value: '0', },
            { label: '女', value: '1', },
          ]}
          value={[params.sex]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, sex: payload[0] })
          }}>
          <ListMb.Item className="sex-row" arrow="horizontal">性别</ListMb.Item>
        </Picker>
        <InputItem
          value={params.age}
          placeholder="请输入"
          onChange={(age: string) => setParams({ ...params, age })}>
          年龄
        </InputItem>
        <InputItem
          value={params.phone}
          placeholder="请输入"
          onChange={(phone: string) => setParams({ ...params, phone })}>
          联系电话
        </InputItem>
      </ListMb>
      {questionList.map((item: any, idx: number) => (
        <CardMb
          full
          className={`question-item question-item-${item.sort}`}
          key={`question-${idx}`}>
          <CardMb.Header
            title={`${item.sort}、${item.question}`}
          />
          <CardMb.Body style={{ padding: 0 }}>
            <ListMb>
              {item.answer.map((answerItem: any, answerIdx: number) => (
                <CheckboxItem
                  key={`answer-${idx}-${answerIdx}`}
                  multipleLine
                  checked={answerItem.isChoose}
                  onChange={() => {
                    let totalScore = 0
                    let newAnswer = item.answer.map((orginItem: any, orginIdx: number) => {
                      let isCurrentAwnser = orginIdx === answerIdx
                      if (isCurrentAwnser) totalScore = orginItem.score
                      return {
                        ...orginItem,
                        isChoose: isCurrentAwnser
                      }
                    })

                    let newQuestionItem = { ...item, answer: newAnswer, totalScore }

                    handleQustionChange(newQuestionItem, idx)
                  }}>
                  {answerItem.content}
                </CheckboxItem>
              ))}
            </ListMb>
          </CardMb.Body>
        </CardMb>
      ))}
    </div>
    <div className="footer" style={{ display: finished ? 'none' : 'block' }}>
      <ButtonMb
        loading={loading}
        onClick={handleSubmit}
        type="primary">
        提&nbsp;交
      </ButtonMb>
    </div>
    <div
      className="content finished"
      style={{ display: finished ? 'block' : 'none' }}>
      <div className="fix-item">
        <Icon type="check-circle" style={{ color: 'green' }} />
        <span>提交成功</span>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  background: #eee;
  min-height: 100vh;
  overflow: hidden;
  .content{
    background: #eee;
    margin-bottom: 15px;
    .am-list{
      margin-top: 10px;
    }
    .sub-title{
      color: #aaa;
      margin-top: 10px;
      padding: 0 15px;
    }
  }
  .footer{
    background: #fff;
    /* border-top: 1px solid #ddd; */
    padding: 5px 15px;
    padding-bottom: 20px;
  }
  .finished{
    .fix-item{
      color: #000;
      position: fixed;
      left: 50%;
      top: 40%;
      font-size: 28px;
      transform: translate(-50%,-50%);
      /* background: #fff; */
      border-radius: 5px;
      &>*{
        vertical-align: middle;
        margin: 0 5px;
      }
    }
  }
  .question-item{
    margin-top: 15px;
    .am-list{
      margin:0;
      border: 0;
      .am-list-body{
      border: 0;
        &::before{
          height: 0;
          background: #fff;
        }
        &::after{
          height: 0;
          background: #fff;
        }
      }
    }
  }
`