import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Radio, Icon, Input } from 'antd'
import { qualityControlRecordEditModel as qcModel, Emp, BedNurse } from './../model/QualityControlRecordEditModel'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
const { TextArea } = Input
// import Zimage from 'src/components/Zimage'
import { observer } from 'mobx-react-lite'
import { numToChinese } from 'src/utils/number/numToChinese'
import { appStore } from 'src/stores'

export interface Props {
  itemGroup: any
  index: number
}

export default observer(function QcItemGroup(props: Props) {
  const { itemGroup, index } = props
  const { itemListErrObj } = qcModel

  const handleAttachUrlsChange = (urls: any, ids: any, idx: number) => {
    let newItemGroup = { ...itemGroup }
    let newItem = newItemGroup.itemList[idx]
    newItem.attachUrls = urls.join(',')
    newItem.attachIds = ids.join(',')
    qcModel.upadteItemGroup(newItemGroup, index)
  }

  const handleItemValueChange = (val: any, idx: number) => {
    let newItemGroup = { ...itemGroup }
    let newItem = newItemGroup.itemList[idx]
    newItem.qcItemValue = val
    qcModel.upadteItemGroup(newItemGroup, index)
  }

  const handleItemRemarkChange = (val: any, idx: number) => {
    let newItemGroup = { ...itemGroup }
    let newItem = newItemGroup.itemList[idx]
    newItem.remark = val
    qcModel.upadteItemGroup(newItemGroup, index)
  }

  const setAllQcItemValue = (val: string) => {
    let newItemGroup = { ...itemGroup }
    for (let i = 0; i < newItemGroup.itemList.length; i++) {
      newItemGroup.itemList[i].qcItemValue = val

      qcModel.setItemListErrObj(newItemGroup.itemList[i].qcItemCode, false)
    }
    qcModel.upadteItemGroup(newItemGroup, index)
  }

  const handleRemarkChange = (val: string) => {
    let newItemGroup = { ...itemGroup }
    newItemGroup.remark = val
    qcModel.upadteItemGroup(newItemGroup, index)
  }

  const itemConClass = (qcItemCode: string) => {
    let classList = ['itemCon']

    if (Object.keys(itemListErrObj).indexOf(qcItemCode) >= 0) {
      if (itemListErrObj[qcItemCode].err) classList.push('error')
    }

    return classList.join(' ')
  }

  return <QuestionItem>
    <div className='titleCon' id={`itemGroupItem${index}`}>
      <div className='titleLeftCon'>
        {`${numToChinese(index + 1)}、${itemGroup.qcItemTypeName}`}
        <div className="fl-right">
          <Button type="primary" size="small" style={{ marginRight: '10px' }} onClick={() => setAllQcItemValue('是')}>全是</Button>
          <Button type="danger" size="small" onClick={() => setAllQcItemValue('否')}>全否</Button>
        </div>
      </div>
    </div>
    {itemGroup.itemList.map((item: any, itemIndex: number) => (
      <div className={itemConClass(item.qcItemCode)} key={itemIndex} id={`itemGroupItem${index}-${itemIndex}`}>
        <div className='itemTitleCon'>
          {item.itemShowCode} {item.qcItemName}
        </div>
        <div className='itemMidCon'>
          <Radio.Group value={item.qcItemValue} buttonStyle='solid' onChange={(e: any) => {
            qcModel.setItemListErrObj(item.qcItemCode, false)
            handleItemValueChange(e.target.value, itemIndex)
          }}>
            <Radio value={'是'} style={{ marginLeft: '20px', marginRight: '30px' }}>
              是
            </Radio>
            <Radio value={'否'} style={{ marginLeft: '20px', marginRight: '30px' }}>
              否
            </Radio>
            <Radio value={'不适用'} style={{ marginLeft: '20px', marginRight: '30px' }}>
              不适用
            </Radio>
          </Radio.Group>
          <div className="img-upload">
            <MultipleImageUploader
              tip={"(最多上传三张图片)"}
              text=" "
              sizeLimited={3}
              preview
              value={
                (item.attachUrls && item.attachUrls.split(',')) || []
              }
              ids={
                (item.attachIds && item.attachIds.split(',')) || []
              }
              onChange={(urls: any, ids: any) => handleAttachUrlsChange(urls, ids, itemIndex)} />
          </div>
          {appStore.hisMatch({
            map: {
              nys: <div className='notesCon' style={{ borderBottom: 'none' }}>
                <div className='notesLeftCon'>备注</div>
                <div className='notesRightCon'>
                  <TextArea
                    rows={4}
                    value={item.remark}
                    autosize
                    onChange={(e) => handleItemRemarkChange(e.target.value, itemIndex)} />
                </div>
              </div>,
              other: '',
            }
          })}
          {/* <div className='itemAttachmentCon'>
            {item.attachUrls && (
              <Zimage
                text={
                  <span>
                    <Icon type='paper-clip' /> {item.attachUrls.split(',').length}
                  </span>
                }
                list={item.attachUrls.split(',')}
              />
            )}
          </div> */}
        </div>
      </div>
    ))}
    {appStore.hisMatch({
      map: {
        nys: '',
        other: <div className='notesCon'>
          <div className='notesLeftCon'>备注</div>
          <div className='notesRightCon'>
            <TextArea
              rows={4}
              value={itemGroup.remark}
              autosize
              onChange={(e) => handleRemarkChange(e.target.value)} />
          </div>
        </div>
      }
    })}
  </QuestionItem>
})

const QuestionItem = styled.div`
  .titleCon {
    margin: 5px 0 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    .titleLeftCon {
      flex: 1;
      width: 0;
      font-size: 14px;
      font-weight: bold;
    }
    .fl-right{
      float: right;
    }
  }
  .itemCon {
    box-sizing: border-box;
    min-height: 60px;
    padding: 4px 0;
    border-bottom: 0.5px dashed #bbbbbb;
    &.error{
      color: red;
      .ant-radio-wrapper{
        span{
          color: red;
        }
      }
    }
    .itemTitleCon {
      min-height: 28px;
      line-height: 20px;
      padding: 4px 0;
    }
    .itemMidCon {
      margin-top: 5px;
      font-size: 12px;
      .itemAttachmentCon {
        display: inline-block;
        cursor: pointer;
        span {
          color: #333;
          &:hover {
            color: ${(p) => p.theme.$mtc};
          }
        }
      }
      .ant-radio-disabled + span {
        color: black;
      }
      .ant-radio-inner::after {
        background-color: #00a680;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .notesCon {
    box-sizing: border-box;
    min-height: 116px;
    padding: 10px 0;
    display: flex;
    border-bottom: 0.5px dashed #bbbbbb;
    .notesLeftCon {
      width: 34px;
    }
    .notesRightCon {
      flex: 1;
      width: 0;
      font-size: 12px;
      textarea {
        font-size: 12px;
        resize: none;
        min-height: 90px !important;
      }
      .ant-input-disabled {
        color: black;
      }
    }
  }
  
  .img-upload{
    .inner{
      width: 50px;
      height: 50px;
    }
    .tip{
      top: 85%;
      font-size: 12px;
    }
  }
`
const QuestionBottomCon = styled.div`
  box-sizing: border-box;
  padding: 10px 0;
  height: 70px;
  .questionBottomCheckbox {
    margin-top: 10px;
    .ant-checkbox-wrapper {
      margin-right: 15px;
    }
    span {
      padding-right: 0;
      font-size: 12px;
      color: black;
    }
  }
`

const OnlyReadError = styled.div`
  text-align: right;
  margin-top: 10px;
  margin-bottom: -35px;
  position: relative;
  z-index: 2;
`