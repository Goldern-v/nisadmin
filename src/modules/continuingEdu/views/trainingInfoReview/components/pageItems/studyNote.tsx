import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Modal, message } from 'antd'
import createModal from "src/libs/createModal";
import SelectPeopleModal from "src/modules/notice/page/modal/SelectPeopleModal";
import { trainingInfoReviewService, trainingInfoReviewService as api } from '../../api/TrainingInfoReviewService'

export interface Props {
  info?: any
}

//参与人员
export default function Participation(props: Props) {
  const [noteContent, setNoteContent] = useState('')
  const [firstLevelAuditors, setFirstLevelAuditors]: any[] = useState([])
  const [secondLevelAuditors, setSecondLevelAuditors]: any[] = useState([])

  const selectPeopleModal = createModal(SelectPeopleModal)

  const handleSelectReviewer = (type: string) => {
    const checkedUserList = type === '1' ? firstLevelAuditors : secondLevelAuditors
    selectPeopleModal.show({
      checkedUserList: checkedUserList,
      onOkCallBack: (payload: any) => {
        const reviewerList = getReviewer(payload)
        const filterReviewer = reviewerList.splice(0, 3)
        type === '1' ? setFirstLevelAuditors(filterReviewer) : setSecondLevelAuditors(filterReviewer)
        if (reviewerList.length > 3) return message.warn('审核人数不能超过三人')
      }
    })
  }

  const getReviewerItem = (type: string) => {
    const checkedUserList = type === '1' ? firstLevelAuditors : secondLevelAuditors
    return checkedUserList.map((item: any, index: number) => {
      return (
        <div className={'reviewer-item'} key={item.empNo}>
          <span>{item.empName}</span>
          <Button size={"small"} shape="circle" icon="close" onClick={() => handleDeleteReviewer(type, item.empNo)}/>
        </div>
      )
    })
  }

  const handleDeleteReviewer = (type: string, empNo: string) => {
    const userList = type === '1' ? firstLevelAuditors : secondLevelAuditors
    const filterList = userList.filter((i: any) => i.empNo !== empNo)
    type === '1' ? setFirstLevelAuditors(filterList) : setSecondLevelAuditors(filterList)
  }

  const getReviewer = (list: any[]): any[] => {
    let arr: any[] = []
    list.forEach((item: any) => {
      if (item.userList) {
        const mapArr = setKey(item.userList)
        arr.push(...mapArr)
      } else {
        arr.push(item)
      }
    })
    return arr
  }

  const setKey = (arr = []) => {
    return arr.map((i: any) => {
      return {
        ...i,
        key: i.empNo,
        label: i.empName,
      }
    })
  }

  const handleSubmit = async () => {
    const params = {
      cetpId: props.info.id,
      noteContent,
      firstLevelAuditors,
      secondLevelAuditors,
    }
    const res = await api.saveStudyNote(params)
    message.success('提交成功')
  }

  useEffect(() => {
    if (props.info.id) {
      trainingInfoReviewService.getNoteInfo(props.info.id).then(res => {
        const { noteContent, firstLevelAuditors, secondLevelAuditors } = res.data
        setNoteContent(noteContent)
        setFirstLevelAuditors(setKey(firstLevelAuditors))
        setSecondLevelAuditors(setKey(secondLevelAuditors))
      })
    }
  }, [props.info])

  return <Wrapper>
    <div className="content-item-title">学习笔记：</div>
    <div>
      <Input.TextArea rows={10} value={noteContent} onChange={(event) => {
        setNoteContent(event.target.value)
      }}/>
    </div>
    <div className="reviewer">
      <span>审核人一:</span>
      {getReviewerItem('1')}
      <Button type="primary" size={"small"} shape="circle" icon="plus" onClick={() => handleSelectReviewer('1')}/>
    </div>
    <div className="reviewer">
      <span>审核人二:</span>
      {getReviewerItem('2')}
      <Button type="primary" size={"small"} shape="circle" icon="plus" onClick={() => handleSelectReviewer('2')}/>
    </div>
    <div className="submit-button">
      <Button type="primary" onClick={handleSubmit}>提交</Button>
    </div>
    <selectPeopleModal.Component/>
  </Wrapper>
}
const Wrapper = styled.div`
  .show-all-span{
    color: #00f;
    cursor: pointer;
    display: inline-block;
    :hover{
      font-weight: bold;
    }
  }

  .reviewer{
    display:flex;
    align-items:center;
    height:45px;
    font-size: 14px;
    span{
      margin-right:10px;
    }
  }
  .submit-button{
    margin-top:15px;
    display:flex;
    justify-content:flex-end;
  }
  .reviewer-item{
    border: 1px solid #aaa;
    padding: 0 10px;
    border-radius: 5px;
    margin-right: 20px;
    position: relative;
    
    button{
      position: absolute;
      top: -12px;
    }
  }
`