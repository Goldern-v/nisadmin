import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, Icon, Checkbox, Spin } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { ScrollBox } from 'src/components/common'
import { authStore } from 'src/stores'
import { selectPeopleViewModel } from './SelectPeopleViewModel'
import { noticeService } from '../../serveices/NoticeService'
import { observer } from 'mobx-react-lite'
const { Search } = Input
const Option = Select.Option

import { CheckboxChangeEvent } from 'antd/lib/checkbox/index'

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
}

export default observer(function SelectPeopleModal(props: Props) {
  let { visible, onCancel } = props

  const [checkedUserList, setCheckedUserList] = useState([])

  const onSave = async () => {}

  useLayoutEffect(() => {
    if (visible) {
      selectPeopleViewModel.initData()
    }
  }, [visible])

  return (
    <Modal
      title='选择联系人'
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender
      width={800}
      footer={null}
    >
      <Wrapper>
        <div className='main-con'>
          <div className='left-part scrollBox'>
            <Spin spinning={selectPeopleViewModel.modalLoading}>
              {selectPeopleViewModel.currentTreeData ? (
                <CheckListCon checkedUserList={checkedUserList} setCheckedUserList={setCheckedUserList} />
              ) : (
                <div>
                  <Search
                    placeholder='请输入搜索关键字'
                    onSearch={(value) => console.log(value)}
                    style={{ width: '100%' }}
                  />
                  <FileList>
                    {selectPeopleViewModel.selectTreeData.map((item, index: any) => (
                      <div className='item-box' onClick={() => selectPeopleViewModel.pushStep(item.step)} key={index}>
                        <img src={require('../../images/文件夹.png')} alt='' />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </FileList>
                </div>
              )}
            </Spin>
          </div>
          <div className='right-part'>
            <SelectCon>
              <Select
                mode='tags'
                placeholder='...'
                value={checkedUserList}
                labelInValue={true}
                style={{ width: '100%' }}
                open={false}
              />
            </SelectCon>

            <div className='footer-con'>
              <Button>取消</Button>
              <Button type='primary'>确认</Button>
            </div>
          </div>
        </div>
      </Wrapper>
    </Modal>
  )
})
const CheckListCon = observer(function(props: any) {
  let { checkedUserList, setCheckedUserList } = props
  const onCheck = (e: CheckboxChangeEvent, item: any) => {
    if (e.target.checked) {
      setCheckedUserList((prevList: any[]) => {
        return [
          ...prevList,
          {
            key: e.target.value,
            userList: item.userList
          }
        ]
      })
    } else {
      setCheckedUserList((prevList: any[]) => {
        let index = prevList.findIndex((item: any) => item.key === e.target.value)
        if (index != undefined) prevList.splice(index, 1)
        return [...prevList]
      })
    }
  }
  const onCheckAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheckedUserList((prevList: any[]) => {
        let data = []
        selectPeopleViewModel.currentTreeData!.list
        return [
          ...prevList,
          {
            key: e.target.value
            // userList: item.userList
          }
        ]
      })
    } else {
      setCheckedUserList((prevList: any[]) => {
        let index = prevList.findIndex((item: any) => item.key === e.target.value)
        if (index != undefined) prevList.splice(index, 1)
        return [...prevList]
      })
    }
  }
  const Con = styled.div`
    .title {
      color: #333;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .ant-checkbox-group {
      width: 100%;
    }
    .check-row {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
    }
    .open {
      display: inline-block;
      width: 38px;
      text-align: center;
      color: ${(p) => p.theme.$mtc};
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
    .scrollBox {
      height: 390px;
      box-sizing: content-box;
      padding-right: 10px;
      margin-right: -10px;
    }
  `

  let checkAll = false
  let indeterminate = false

  try {
    let allLabels = selectPeopleViewModel.currentTreeData!.list.map((item: any) => {
      let type = selectPeopleViewModel!.currentTreeData!.type
      let label =
        type == 'userList'
          ? item[selectPeopleViewModel!.currentTreeData!.dataLabel || '']
          : `
            ${item[selectPeopleViewModel!.currentTreeData!.dataLabel || '']}（${item.userList.length}人）
            `
      return label
    })
    let checkedLabels = checkedUserList.map((item: any) => item.key)

    checkAll = (() => {
      for (let i = 0; i < allLabels.length; i++) {
        if (checkedLabels.indexOf(allLabels[i]) == -1) return false
      }
      return true
    })()
    indeterminate = (() => {
      for (let i = 0; i < allLabels.length; i++) {
        if (checkedLabels.indexOf(allLabels[i]) > -1) return true
      }
      return false
    })()
  } catch (error) {}

  return (
    <Con>
      <div className='title' onClick={() => selectPeopleViewModel.popStep()}>
        <Icon type='left' />
        <span style={{ paddingLeft: 5 }}>{selectPeopleViewModel.currentTreeData!.parent}</span>
      </div>
      <div className='scrollBox'>
        <div className='check-row'>
          <Checkbox checked={checkAll} indeterminate={indeterminate} onChange={(e) => onCheckAll(e)}>
            全选
          </Checkbox>
        </div>
        <Checkbox.Group value={checkedUserList.map((item: any) => item.key)}>
          {selectPeopleViewModel.currentTreeData!.list.map((item: any, index: number) => {
            let type = selectPeopleViewModel!.currentTreeData!.type
            let label =
              type == 'userList'
                ? item[selectPeopleViewModel!.currentTreeData!.dataLabel || '']
                : `
            ${item[selectPeopleViewModel!.currentTreeData!.dataLabel || '']}（${item.userList.length}人）
            `
            return (
              <div className='check-row' key={index}>
                <Checkbox value={label} onChange={(e) => onCheck(e, item)}>
                  {label}
                </Checkbox>
                {selectPeopleViewModel!.currentTreeData!.type !== 'userList' && (
                  <div>
                    <span style={{ padding: '0 4px' }}>|</span>
                    <span
                      className='open'
                      onClick={() =>
                        selectPeopleViewModel.pushStep(item[selectPeopleViewModel!.currentTreeData!.dataLabel || ''])
                      }
                    >
                      展开
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </Checkbox.Group>
      </div>
    </Con>
  )
})
const Wrapper = styled.div`
  margin: -24px;
  .main-con,
  .left-part,
  .right-part {
    height: 460px;
  }
  .main-con {
    display: flex;
  }
  .left-part {
    width: 350px;
    border-right: 1px solid #dddddd;
    padding: 15px 20px;
  }
  .right-part {
    width: 0;
    flex: 1;
    position: relative;
  }
  .ant-select-selection {
    min-height: 30px;
    padding: 8px 0;
    border: 0;
    outline: none;
    box-shadow: none !important;
  }

  .footer-con {
    position: absolute;
    right: 20px;
    bottom: 10px;
    button {
      margin-left: 20px;
    }
  }
`

const SelectCon = styled(ScrollBox)`
  height: 400px;
`

const FileList = styled.div`
  margin: 10px 0;
  .item-box {
    height: 20px;
    padding: 7px 7px;
    font-size: 14px;
    color: #333333;
    box-sizing: content-box;
    cursor: pointer;
    border-radius: 2px;
    &:hover {
      background: #eee;
    }
    img {
      width: 16px;
      margin-right: 10px;
      position: relative;
      top: -2px;
    }
  }
`
