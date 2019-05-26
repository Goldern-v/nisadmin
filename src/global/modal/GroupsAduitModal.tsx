import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Input, message } from 'antd'
import { ReactComponent as AgreeIcon } from '../images/默认勾选.svg'
import { authStore } from 'src/stores'
const { TextArea } = Input
import { Modal } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { modalService } from '../services/ModalService'
export interface Props extends ModalComponentProps {
  selectedRows?: []
  getTableData?: any
}

export default function GroupsAduitModal (props: Props) {
  let { visible, onCancel, selectedRows } = props

  /** 评估结果 */
  let [agree, setAgree]: [any, any] = useState('')

  /** 评估意见 */
  let [opinion, setOpinion]: [any, any] = useState('')

  useEffect(() => {
    if (visible) {
      setAgree('')
      setOpinion('')
    }
  }, [visible])

  const onOk = () => {
    if (!agree) {
      return message.warning('审核结果不能为空')
    }
    let obj = {
      saveAudites: selectedRows,
      flagAudited: agree === 'agree' ? true : agree === 'disagree' ? false : '',
      detail: opinion
    }
    modalService.auditeList(obj).then((res) => {
      message.success('审核成功')
      props.getTableData && props.getTableData()
      onCancel()
    })
  }
  return (
    <Modal title='批量审核' visible={visible} onOk={onOk} onCancel={onCancel} okText='保存' forceRender width={800}>
      <MainPart>
        <AduitCon>
          <FormCon>
            <div className='row'>
              <div className='key'>审核结果：</div>
              <div className='vale'>
                <ResultBox className={agree == 'agree' ? 'agree' : ''} onClick={() => setAgree('agree')}>
                  通过
                  <AgreeIcon />
                </ResultBox>
                <ResultBox className={agree == 'disagree' ? 'disagree' : ''} onClick={() => setAgree('disagree')}>
                  退回
                  <AgreeIcon />
                </ResultBox>
              </div>
            </div>
            <div className='row'>
              <div className='key'>审核意见：</div>
              <div className='vale'>
                <TextArea
                  rows={3}
                  style={{ width: 554 }}
                  value={opinion}
                  onChange={(e) => setOpinion(e.target.value)}
                />
              </div>
            </div>
            <div className='row' style={{ paddingTop: '2px' }}>
              <div className='key'>审核人：</div>
              <div className='vale'>
                <div className='block'>{authStore.user!.empName}</div>
              </div>
            </div>
          </FormCon>
        </AduitCon>
      </MainPart>
    </Modal>
  )
}

const Wrapper = styled.div`
  font-size: 13px;
  color: #999;
`
const MainPart = styled.div``
const AduitCon = styled.div``

const FormCon = styled.div`
  .row {
    display: flex;
    margin-bottom: 10px;
    .status {
      font-size: 15px;
      color: #333;
      padding: 3px 0;
      font-weight: bold;
    }
    .block {
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      color: #333333;
      background: rgba(238, 239, 240, 1);
      border-radius: 2px;
      padding: 0 13px;
    }
    .value {
      color: #666;
    }
    .key {
      width: 83px;
      padding: 4px 0;
    }
  }
`

const ResultBox = styled.div`
  width: 70px;
  height: 32px;
  line-height: 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(204, 204, 204, 1);
  margin-right: 10px;
  font-size: 13px;
  color: #333;
  position: relative;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  svg {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &.agree {
    border-color: #1d9165;
    svg path {
      fill: #1d9165;
    }
  }
  &.disagree {
    border-color: #ff3b30;
    svg path {
      fill: #ff3b30;
    }
  }
`
