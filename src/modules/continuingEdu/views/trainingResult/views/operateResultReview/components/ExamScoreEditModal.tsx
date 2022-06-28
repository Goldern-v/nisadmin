import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, InputNumber, Spin, message ,Input } from 'antd'
import { observer } from 'mobx-react-lite'
import { ModalComponentProps } from "src/libs/createModal";
import { trainingResultService } from './../../../api/TrainingResultService'
import { appStore } from "src/stores";
const {TextArea} = Input; 
export interface Props extends ModalComponentProps {
  onOkCallBack?: Function,
  type: 'view' | 'edit',
  cetpId: string,
  empNo: string,
  empName: string,
  isValidResult: number,
}

export default observer(function ExamScoreEditModal(props: Props) {
  const { visible, onOkCallBack, onCancel, cetpId, empNo, type,empName,isValidResult } = props
  const [loading, setLoading] = useState(false)

  const [itemList, setItemList] = useState([] as any[])
  const [parcalList, setParcalList] = useState({} as any)

  let finalScore = 0

  let totalScore = 0
  let deductScore = 0
  for (let i = 0; i < itemList.length; i++) {
    let item = itemList[i]
    totalScore += item.fullScores || 0
    deductScore += item.deduction || 0
  }
  finalScore = totalScore - deductScore

  const handleOK = () => {
    Modal.confirm({
      title: '提示',
      centered: true,
      content: '确认修改该学员成绩?',
      onOk: () => {
        setLoading(true)

        trainingResultService
          .uploadScores({
            cetpId,
            empNo,
            itemDeductionList: itemList.map((item: any) => {
              return {
                id: item.id,
                deduction: item.deduction,
              }
            })
          })
          .then(res => {
            message.success('修改成功', 1, () => {
              onCancel()
              onOkCallBack && onOkCallBack()
            })
          }, err => setLoading(false))

      }
    })

  }

  const getOperateScoreList = () => {
    setLoading(true)
    if(['whyx'].includes(appStore.HOSPITAL_ID)){
      trainingResultService.reviewPaperScoreItemsByCetpId({
        cetpId,
        empNo
      }).then(res => {
        setLoading(false)
        if (res.data) {
          if(res.data.latPraticalGradeSubjectResultDtoList){
            res.data.latPraticalGradeSubjectResultDtoList = res.data.latPraticalGradeSubjectResultDtoList.sort((a:any,b:any)=>a.sort - b.sort)
          }
          setParcalList(res.data)
          // setItemList(res.data.sort((a: any, b: any) => a.sort - b.sort))
        }
      })
    }else{
      trainingResultService.reviewScoreItemsByCetpId({
        cetpId,
        empNo
      }).then(res => {
        setLoading(false)
        if (res.data) setItemList(res.data.sort((a: any, b: any) => a.sort - b.sort))
      }, err => setLoading(false))
    }
  }

  useEffect(() => {
    if (visible) getOperateScoreList()
  }, [visible])

  return (!['whyx'].includes(appStore.HOSPITAL_ID) ? <Modal
    width={500}
    confirmLoading={loading}
    visible={visible}
    onOk={handleOK}
    footer={type == 'view' ? null : <span>
      <Button onClick={() => onCancel && onCancel()}>取消</Button>
      <Button type="primary" loading={loading} onClick={() => handleOK()}>确定</Button>
    </span>}
    onCancel={onCancel}
    centered
    title={`${type == 'view' ? '查看' : '上传'}考核成绩`}>
    <Wrapper>
      <Spin spinning={loading}>
        <div className="main-title">最终成绩：{finalScore}分</div>
        {itemList.map((item: any, idx: number) =>
          <div className="edit-item" key={idx}>
            <span >
              <span>{idx + 1}.</span>
              <span className="desc" title={item.itemName}>{item.itemName}</span>
              （满分{item.fullScores || 0}分）：扣
            </span>
            <span className="content">
              <InputNumber
                min={0}
                size="small"
                disabled={type == 'view'}
                max={item.fullScores || 0}
                className="score-edit"
                value={item.deduction}
                onChange={(val: any) => {
                  let newItemList = itemList.concat()
                  newItemList[idx].deduction = val
                  setItemList(newItemList)
                }}
                precision={2} />
            </span>
            <span>分</span>
          </div>)}
      </Spin>
    </Wrapper>
  </Modal> : <Modal width={900}
    confirmLoading={loading}
    visible={visible}
    onOk={handleOK}
    footer={ <div style={{textAlign:'center'}}>
      <Button type='primary' onClick={() => onCancel && onCancel()}>关闭</Button>
    </div>}
    onCancel={onCancel}
    centered
    title={`${empName}的成绩`}>
      <Wrapper>

      <div className='total-points'><span>总得分：</span>{parcalList && parcalList.studentTotalScore} <span>成绩：</span><span style={{color:isValidResult == 1?'#04a580':'#a50804'}}>{isValidResult == 1 ? '有效':'无效'}</span></div>
      <table className="modal-table">
            <tbody>
              <tr>
                <td colSpan={3} className="td-center" style={{fontSize:14}}>
                  {parcalList.paperName}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="td-bold td-center">
                  {parcalList.chapter}
                </td>
              </tr>
              <tr className="td-bold">
                <td>
                  {parcalList.technology}
                </td>
                <td>
                  操作规范
                </td>
              </tr>
            </tbody>
          </table>
      <table className="modal-table">
            <colgroup>
              <col width={180} />
              <col width={80} />
              <col />
              <col width={80} />
              <col width={180} />
            </colgroup>
            <thead>
              <tr className="td-center">
                <td>项目</td>
                <td className='td-color'>当前得分</td>
                <td>操作内容</td>
                <td>评分标准</td>
                <td>重要与说明</td>
              </tr>
            </thead>
            <tbody>
              {parcalList.latPraticalGradeSubjectResultDtoList &&
                parcalList.latPraticalGradeSubjectResultDtoList.map(
                  (item: any, index: any) =>
                    item.latPraticalGradeOperationResultDtoList.map(
                      (itemDto: any, indexDot: any) => (
                        <tr key={indexDot + 'fds'}>
                          {indexDot == 0 && (
                            <td
                              className="td-center"
                              rowSpan={
                                item.latPraticalGradeOperationResultDtoList &&
                                item.latPraticalGradeOperationResultDtoList.length
                              }
                            >
                              {item.name}
                            </td>
                          )}
                          <td className="td-center td-color">
                            {itemDto.studentScore}
                          </td>
                          <td className="td-center">
                          <TextArea className='inp_textArea' value={itemDto.content} autosize={{ minRows: 3 }}></TextArea>
                          </td>
                          <td className="td-center">
                            {itemDto.score}
                          </td>
                          <td className="td-center">
                            {itemDto.description}
                          </td>
                        </tr>
                      )
                    )
                )}
            </tbody>
          </table>
      </Wrapper>
  </Modal>)
})

const Wrapper = styled.div`
.edit-item{
  margin-bottom: 10px;
  &:last-of-type{
    margin-bottom: 0;
  }
}
  .main-title{
    font-size: 16px;
    margin-bottom: 10px;
    color: #000;
  }
  .edit-item{
    font-size: 13px;
    .desc{
      width: 180px;
      display: inline-block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    span{
      vertical-align: middle;
    }
  }
  .score-edit{
    width: 60px;
    margin: 0 5px;
    .ant-input-number-handler-wrap{
      display: none;
    }
  }
  .total-points{
    padding:0px 20px;
    font-size: 15px;

  }
  .modal-table {
    width: 100%;
    border: 1px solid #000;
    thead {
      tr {
        td {
          border: 1px solid #000;
          line-height: 30px;
          background-color: #a8a8a8;
          font-weight: bold;
        }
      }
    }
    tbody {
      tr {
        td {
          border: 1px solid #000;
          line-height: 30px;
          font-size: 14px;
          padding: 0 5px;
        }
      }
    }
    .td-bold {
      font-weight: bold;
    }
    .td-center {
      text-align: center;
    }
    .td-color{
      background-color: #fafd4c;
    }
    .inp_textArea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      border-radius: 0;
      resize: none;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`