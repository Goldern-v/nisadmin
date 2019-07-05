import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, Icon, Checkbox } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { ScrollBox } from 'src/components/common'
import { authStore } from 'src/stores'
const { Search } = Input
const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
}

export default function SelectPeopleModal(props: Props) {
  let { visible, onCancel } = props

  const onSave = async () => {}

  useLayoutEffect(() => {}, [visible])

  let SelectList = [
    {
      label: authStore.selectedDeptName
    },
    {
      label: '按护理单元选择'
    },
    {
      label: '按职务选择'
    },
    {
      label: '按职称选择'
    },
    {
      label: '按层级选择'
    }
  ]
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
          <div className='left-part'>
            {/* <Search placeholder='请输入搜索关键字' onSearch={(value) => console.log(value)} style={{ width: '100%' }} /> */}
            {/* <FileList>
              {SelectList.map((item, index: any) => (
                <div className='item-box'>
                  <img src={require('../../images/文件夹.png')} alt='' />
                  <span>{item.label}</span>
                </div>
              ))}
            </FileList> */}

            <CheckListCon />
          </div>
          <div className='right-part'>
            <SelectCon>
              <Select
                mode='tags'
                placeholder='...'
                value={[{ key: '1qqq', label: <span>231312</span> }]}
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
}

function CheckListCon() {
  let optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false }
  ]
  const Con = styled.div`
    .title {
      color: #333;
      margin-bottom: 15px;
    }
    .ant-checkbox-group {
      width: 100%;
    }
    .check-row {
      padding: 7px 0;
      display: flex;
      justify-content: space-between;
    }
    .open {
      color: ${(p) => p.theme.$mtc};
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
  `
  return (
    <Con>
      <div className='title'>
        <Icon type='left' />
        <span style={{ paddingLeft: 5 }}>按科室选择</span>
      </div>
      <div>
        <Checkbox.Group defaultValue={['Apple']}>
          <div className='check-row'>
            <Checkbox value='C'>C</Checkbox>
            <div>
              <span style={{ padding: '0 4px' }}>|</span>
              <span className='open'>展开</span>
            </div>
          </div>
          <div className='check-row'>
            <Checkbox value='C'>C</Checkbox>
          </div>
          <div className='check-row'>
            <Checkbox value='C'>C</Checkbox>
          </div>
          <div className='check-row'>
            <Checkbox value='C'>C</Checkbox>
          </div>
        </Checkbox.Group>
      </div>
    </Con>
  )
}

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
    padding: 20px;
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
