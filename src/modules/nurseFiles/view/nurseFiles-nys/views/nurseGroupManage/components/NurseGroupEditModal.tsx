import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Input, Select, message, Spin } from 'antd'
import { ModalComponentProps } from "src/libs/createModal"
import SelectPeopleModal from './selectNurseModal/SelectPeopleModal'
import createModal from 'src/libs/createModal'
import { nurseFilesService } from '../../../services/NurseFilesService'

const TextArea = Input.TextArea

export interface Props extends ModalComponentProps {
  viewType: 'edit' | 'view',
  data: any,
  onOkCallback: Function
}

export default function NurseGroupEditModal(props: Props) {
  const { visible, onCancel, viewType, data, onOkCallback } = props
  const [editData, setEditData] = useState({
    groupName: '',
    memberList: [] as any[]
  } as any)
  const [loading, setLoading] = useState(false)

  let selectPeopleModal = createModal(SelectPeopleModal)

  const title = () => {
    if (!data) return ''

    if (viewType == 'view') return '查看小组'
    else if (Object.keys(data).length > 0) return '编辑小组'
    else return '新建小组'
  }

  const handleMemberEdit = () => {
    selectPeopleModal.show({
      checkedUserList: editData.memberList,
      onOkCallBack: (payload) => {

        let newMemberList = [] as any[]
        formatMenbers(payload, newMemberList)
        setEditData({
          ...editData,
          memberList: newMemberList
        })
      }
    })
  }

  //格式化选中的人员
  const formatMenbers = (data: any, containArr: any[]) => {
    if (data instanceof Array) {
      for (let i = 0; i < data.length; i++)formatMenbers(data[i], containArr)
    } else {
      if (data.empNo) {
        let appendItem = JSON.parse(JSON.stringify(data))
        appendItem = {
          ...appendItem,
          key: appendItem.empNo,
          label: appendItem.empName,
        }
        delete appendItem.userList

        let sameItem = containArr.find((item: any) => item.empNo == appendItem.empNo)
        if (!sameItem) containArr.push(appendItem)
      } else if (data.userList) {
        formatMenbers(data.userList, containArr)
      }
    }
  }

  const handleSave = () => {
    if (editData.groupName.trim() == '') {
      message.warning('小组名称不能为空')
      return
    }
    if (editData.memberList.length <= 0) {
      message.warning('小组成员不能为空')
      return
    }

    setLoading(true)
    const { groupName, memberList } = editData

    if (data && Object.keys(data).length > 0) {
      nurseFilesService
        .saveSettingNurseGroupDetail({
          nurseFileGroupId: data.id,
          nurseFileGroupDetails: memberList.map((item: any, idx: number) => {
            return {
              sortValue: idx.toString(),
              nurseFileGroupId: data.id,
              ...item,
            }
          })
        })
        .then(res => {
          message.success('保存成功', undefined, () => setLoading(false))

          onOkCallback && onOkCallback()
        }, err => setLoading(false))
    } else {
      nurseFilesService
        .saveNurseFileGroup({ groupName })
        .then(res => {
          if (res.data && res.data.id) {
            return nurseFilesService
              .saveSettingNurseGroupDetail({
                nurseFileGroupId: res.data.id,
                nurseFileGroupDetails: memberList.map((item: any, idx: number) => {
                  return {
                    sortValue: idx.toString(),
                    nurseFileGroupId: res.data.id,
                    ...item,
                  }
                })
              })
          } else {
            message.error('保存失败')
            setLoading(false)
          }
        }, err => setLoading(false))
        .then(res => {
          message.success('保存成功', undefined, () => setLoading(false))

          onOkCallback && onOkCallback()
        }, err => setLoading(false))
    }

    // console.log('save')
    // onOkCallback && onOkCallback()
  }

  useEffect(() => {
    if (visible) {
      if (data && Object.keys(data).length > 0) {
        let newEditData = { groupName: data.groupName, memberList: [] as any[] }

        setLoading(true)

        nurseFilesService
          .getByNurseFileGroupId(data.id)
          .then(res => {
            setLoading(false)

            if (res.data) newEditData.memberList = res.data.map((item: any) => {
              return {
                ...item,
                label: item.empName,
                key: item.empNo,
              }
            })

            setEditData(newEditData)
          }, err => {
            setLoading(false)
            setEditData(newEditData)
          })

        // setEditData(newEditData)
      } else {
        setEditData({
          groupName: '',
          memberList: [] as any[]
        })
      }
    } else {
      setEditData({
        groupName: '',
        memberList: [] as any[]
      })
    }
  }, [visible])

  return <React.Fragment>
    <Modal
      title={title()}
      confirmLoading={loading}
      centered
      footer={
        viewType == 'edit' ?
          <Button
            type="primary"
            loading={loading}
            onClick={handleSave}>
            保存
        </Button> :
          null
      }
      onCancel={onCancel}
      visible={visible}>
      <Wrapper>
        <Spin spinning={loading}>
          <Row className="edit-row">
            <Col span={4}>
              <span className="label">小组名称:</span>
            </Col>
            <Col span={16}>
              <TextArea
                disabled={data && data.id}
                value={editData.groupName}
                autosize={{ minRows: 1 }}
                onChange={(e: any) => setEditData({ ...editData, groupName: e.target.value })} />
            </Col>
          </Row>
          <Row className="edit-row">
            <Col span={4}>
              <span className="label">小组成员:</span>
            </Col>
            <Col span={16}>
              <Select
                style={{ width: '100%' }}
                mode="tags"
                maxTagCount={15}
                labelInValue
                onChange={(payload: any) => {
                  let newMemberList = []
                  for (let i = 0; i < payload.length; i++) {
                    let pItem = payload[i]
                    let target = editData.memberList.find((item: any) => item.empNo == pItem.key)
                    if (target) newMemberList.push(target)
                  }

                  setEditData({ ...editData, memberList: newMemberList })
                }}
                value={editData.memberList
                  .map((item: any) => ({ key: item.empNo, label: item.empName }))}>
              </Select>
            </Col>
            <Col span={4}>
              <Button className="btn-add" onClick={handleMemberEdit}>编辑</Button>
            </Col>
          </Row>
        </Spin>
      </Wrapper>
    </Modal>
    <selectPeopleModal.Component />
  </React.Fragment>
}
const Wrapper = styled.div`
  .edit-row{
    margin-bottom: 15px;
    .label{
      line-height:30px;
    }
  }
  .btn-add{
    margin-left:10px;
  }
`