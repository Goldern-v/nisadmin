import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import {Button, Radio, Icon, Input, InputNumber, Row, Col,  Select} from 'antd'
import { qualityControlRecordEditModel as qcModel } from './../model/QualityControlRecordEditModel'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
const { TextArea } = Input
import { observer } from 'mobx-react-lite'
import { numToChinese } from 'src/utils/number/numToChinese'
import { appStore } from 'src/stores'
const {Option } = Select

export interface Props {
  itemGroup: any
  baseInfo: any
  index: number
}

export default observer(function QcItemGroup(props: Props) {
  const { itemGroup, baseInfo, index } = props
  const { itemListErrObj } = qcModel
  let deductMarksType = baseInfo.useSubItemFixedScore ? '自定义扣分' : '问题总扣分'

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

  const handleItemChange = (newItem: any, idx: number) => {
    let newItemGroup = { ...itemGroup }
    newItemGroup.itemList[idx] = newItem

    qcModel.upadteItemGroup(newItemGroup, index)
  }

  const setAllQcItemValue = (val: string) => {
    //
    let newItemGroup = { ...itemGroup }
    for (let i = 0; i < newItemGroup.itemList.length; i++) {
      let item = newItemGroup.itemList[i]
      item.qcItemValue = val

      if (qcModel.baseInfo.useScore) {
        if (appStore.HOSPITAL_ID == 'fssdy') {
          if (val === '不符合' && !item.subItemList) {
            item.remarkDeductScore = item.fixedScore.toString()
          } else if (val === '部分符合' && !item.subItemList) {
            item.remarkDeductScore = item.partialMatchScore.toString()
          } else if (val === '符合') {
            item.remarkDeductScore = ''
            if (item.subItemList)
              item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
          } else if (val === '不适用') {
            item.remarkDeductScore = ''
            if (item.subItemList)
              item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
          }
        }else if(appStore.HOSPITAL_ID == 'ytll'){
          if (val === '不达标' && !item.subItemList) {
            item.remarkDeductScore = item.fixedScore.toString() || '0'
          } else if (val === '部分达标' && !item.subItemList) {
            // console.log("val===",val);
            item.remarkDeductScore =item.partialMatchScore ? item.partialMatchScore:(Number(item.fixedScore)/2 || 0).toString()
            // item.remarkDeductScore = item.partialMatchScore.toString()
          } else if (val === '完全达标') {
            // console.log("val===",val);
            item.remarkDeductScore = ''
            if (item.subItemList)
              item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
          } else if (val === '不适用') {
            item.remarkDeductScore = ''
            if (item.subItemList)
              item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
          }
        } else {
          if (val === '否' && !item.subItemList) {
            if (item.remarkDeductScore === null || item.remarkDeductScore === '') {
              item.remarkDeductScore = item.fixedScore.toString()
            }
          } else if (val === '是') {
            item.remarkDeductScore = ''
            if (item.subItemList)
              item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
          } else if (val === '不适用') {
            item.remarkDeductScore = ''
            if (item.subItemList)
              item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
          }
        }
      }
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

  const formatQcItemDesc = (qcItemDesc?: string) => {
    if (!qcItemDesc) return <span></span>

    if (qcItemDesc.match(/\n/))
      return <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          color: '#999'
        }}>
        （{`${qcItemDesc}`}）
      </pre>

    return <span style={{ color: '#999' }}>{`（${qcItemDesc}）`}</span>
  }

  return <QuestionItem>
    <div className='titleCon' id={`itemGroupItem${index}`}>
      <div className='titleLeftCon'>
        {`${numToChinese(index + 1)}、${itemGroup.qcItemTypeName}`}
        <div className="fl-right">
          {appStore.hisMatch({
            map:{
              'fssdy':(<Button type="primary" size="small" style={{ marginRight: '10px' }} onClick={() => setAllQcItemValue('符合')}>全符合</Button>),
               'ytll':(<Button type="primary" size="small" style={{ marginRight: '10px' }} onClick={() => setAllQcItemValue('完全达标')}>全完全达标</Button>),
              other:(<Button type="primary" size="small" style={{ marginRight: '10px' }} onClick={() => setAllQcItemValue('是')}>全是</Button>)
            }
          })}
          {appStore.HOSPITAL_ID == 'fssdy' && <Button
            type='default'
            size="small" style={{ marginRight: '10px' }}
            onClick={() => setAllQcItemValue('部分符合')}>
            全部分符合
          </Button>}
          {appStore.HOSPITAL_ID == 'ytll' && <Button
              type='default'
              size="small" style={{ marginRight: '10px' }}
              onClick={() => setAllQcItemValue('部分达标')}>
            全部分达标
          </Button>}
          {
            appStore.hisMatch({
              map:{
                'nys':<></>,
                'fssdy':(<Button type="danger" size="small" onClick={() => setAllQcItemValue('不符合')}>全不符合</Button>),
                'ytll':(<Button type="danger" size="small" onClick={() => setAllQcItemValue('不达标')}>全不达标</Button>),
                other:(<Button type="danger" size="small" onClick={() => setAllQcItemValue('否')}>全否</Button>)
              }
            })
          }
          {/*{appStore.HOSPITAL_ID !== 'nys' && (appStore.HOSPITAL_ID == 'fssdy' ? <Button*/}
          {/*  type="danger"*/}
          {/*  size="small"*/}
          {/*  onClick={() => setAllQcItemValue('不符合')}>*/}
          {/*  全不符合*/}
          {/*</Button> : <Button*/}
          {/*  type="danger"*/}
          {/*  size="small"*/}
          {/*  onClick={() => setAllQcItemValue('否')}>*/}
          {/*  全否*/}
          {/*</Button>*/}
          {/*)}*/}
          {['lcey', 'whyx', 'whhk', 'whsl'].includes(appStore.HOSPITAL_ID) && (
            <Button
              style={{ marginLeft: '10px', backgroundColor: '#FFA500', color: '#FFFFFF' }}
              type="default"
              size="small"
              onClick={() => setAllQcItemValue('不适用')}>
              全不适用
            </Button>
          )}
        </div>
      </div>
    </div>
    {itemGroup.itemList.map((item: any, itemIndex: number) => (
      <div className={itemConClass(item.qcItemCode)} key={itemIndex} id={`itemGroupItem${index}-${itemIndex}`}>
        <div className='itemTitleCon'>
          {item.isSensitiveIndex === '是' && <Icon type="star" theme='filled' />}
          <span style={{ marginRight: 5 }}>{item.itemShowCode}</span>
          {item.problemLevel && (
            <span style={{ color: '#469b30' }}>（{item.problemLevel}）</span>
          )}
          {item.qcNameFill || item.qcItemName}
          {item.fixedScore &&
            appStore.hisMatch({
              map: {
                "whyx,whhk": '',
                other: (
                  <span style={{ color: '#999' }}>（{item.fixedScore}分）</span>
                )
              },
              vague: true,
            })
          }
          {item.inspectionMethod && (
            <span style={{ color: '#999' }}>（{item.inspectionMethod}）</span>
          )}
          <div>{formatQcItemDesc(item.qcItemDeductDesc)}</div>
        </div>
        {item.fillDataList && (
          <Row gutter={10}>
            {item.fillDataList.map((fillItem: any, fillItemIdx: number) => (
              <Col
                span={8}
                key={`fillItem-${index}-${itemIndex}-${fillItemIdx}`}
                style={{ display: 'flex', margin: '2.5px 0' }}>
                {/* fillItemIdx + 1 */}
                <div style={{ lineHeight: '20px', color: '#666' }}>{fillItem.itemName ? fillItem.itemName : '自定义内容' + (fillItemIdx + 1)}：</div>
                <Input
                  size="small"
                  style={{ flex: 1, fontSize: '12px' }}
                  value={fillItem.itemValue}
                  // type={appStore.HOSPITAL_ID == 'gzsrm' ? 'number' : 'text'}
                  onChange={(e) => {
                    let newFillDataList = [...item.fillDataList]
                    newFillDataList[fillItemIdx].itemValue = e.target.value

                    handleItemChange({ ...item, fillDataList: newFillDataList }, itemIndex)
                  }} />
              </Col>
            ))}
          </Row>
        )}
        <div className='itemMidCon'>
          {
            appStore.hisMatch({
              map: {
                'fssdy':(<Radio.Group
                    value={item.qcItemValue}
                    buttonStyle='solid'
                    onChange={(e: any) => {
                      qcModel.setItemListErrObj(item.qcItemCode, false)

                      let newItem = { ...item, qcItemValue: e.target.value }

                      if (qcModel.baseInfo.useScore) {
                        if (e.target.value === '不符合' && !newItem.subItemList) {
                          newItem.remarkDeductScore = newItem.fixedScore.toString()
                        } else if (e.target.value === '部分符合' && !newItem.subItemList) {
                          newItem.remarkDeductScore = newItem.partialMatchScore.toString()
                        } else if (e.target.value === '符合') {
                          newItem.remarkDeductScore = ''
                          if (newItem.subItemList)
                            newItem.subItemList = newItem.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
                        }
                      }
                      handleItemChange({ ...newItem }, itemIndex)
                    }}>
                  <Radio value={'符合'} className='buttonStyle'>
                    符合
                  </Radio>
                  <Radio value={'部分符合'} className='buttonStyle'>
                    部分符合
                  </Radio>
                  <Radio value={'不符合'} className='buttonStyle'>
                    不符合
                  </Radio>
                  <Radio value={'不适用'} className='buttonStyle'>
                    不适用
                  </Radio>
                </Radio.Group>),
                'ytll':(
                    <Radio.Group
                        value={item.qcItemValue}
                        buttonStyle='solid'
                        onChange={(e: any) => {
                          qcModel.setItemListErrObj(item.qcItemCode, false)
                          let newItem = { ...item, qcItemValue: e.target.value }
                          if (qcModel.baseInfo.useScore) {
                            if ((e.target.value === '不达标' || e.target.value==='不适用') && !newItem.subItemList) {
                              newItem.remarkDeductScore = (newItem.fixedScore || 0).toString()
                            } else if (e.target.value === '部分达标' && !newItem.subItemList) {
                              newItem.remarkDeductScore = newItem.partialMatchScore?newItem.partialMatchScore.toString():(Number(newItem.fixedScore)/2 || 0).toString()
                            } else if (e.target.value === '完全达标') {
                              newItem.remarkDeductScore = ''
                              if (newItem.subItemList)
                                newItem.subItemList = newItem.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
                            }
                          }
                          handleItemChange({ ...newItem }, itemIndex)
                        }}>
                      <Radio value={'完全达标'} className='buttonStyle'>
                        完全达标
                      </Radio>
                      <Radio value={'部分达标'} className='buttonStyle'>
                        部分达标
                      </Radio>
                      <Radio value={'不达标'} className='buttonStyle'>
                        不达标
                      </Radio>
                      <Radio value={'不适用'} className='buttonStyle'>
                        不适用
                      </Radio>
                    </Radio.Group>
                ),
                other:(
                    <Radio.Group
                        value={item.qcItemValue}
                        buttonStyle='solid'
                        onChange={(e: any) => {
                          qcModel.setItemListErrObj(item.qcItemCode, false)
                          let newItem = { ...item, qcItemValue: e.target.value }
                          if (qcModel.baseInfo.useScore) {
                            if (e.target.value === '否' && !newItem.subItemList) {
                              if (newItem.remarkDeductScore === null || newItem.remarkDeductScore === '') {
                                newItem.remarkDeductScore = newItem.fixedScore.toString()
                              }
                            } else if (e.target.value === '是') {
                              newItem.remarkDeductScore = ''
                              if (newItem.subItemList)
                                newItem.subItemList = newItem.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
                            }
                          }
                          handleItemChange({ ...newItem }, itemIndex)
                        }}>
                      <Radio value={'是'} className='buttonStyle'>
                        是
                      </Radio>
                      <Radio value={'否'}className='buttonStyle'>
                        否
                      </Radio>
                      {!['gzsrm','925'].includes(appStore.HOSPITAL_ID) && <Radio value={'不适用'} className='buttonStyle'>
                        不适用
                      </Radio>}
                    </Radio.Group>
                )
              },
              vague:true
            })
          }
          {qcModel.baseInfo.useScore && <div className="sub-item-list">
            {(item.subItemList || []).map((subItem: any, subItemIdx: number) => (
              <div
                key={subItem.subItemCode}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  let newSubItemList = [...item.subItemList]
                  let currentChecked = newSubItemList[subItemIdx].checked
                  newSubItemList[subItemIdx].checked = !currentChecked

                  qcModel.setItemListErrObj(item.qcItemCode, false)

                  handleItemChange({
                    ...item,
                    qcItemValue: !currentChecked ? '否' : item.qcItemValue,
                    subItemList: newSubItemList,
                  }, itemIndex)

                }}>
                <Icon
                  type="close-square"
                  className={subItem.checked ? 'checked' : 'unchecked'} />
                <span style={{ verticalAlign: 'middle' }}>
                  {subItem.subItemName}
                  {baseInfo.useSubItemFixedScore && <span>({subItem.fixedScore})</span>}
                </span>
              </div>
            ))}
            {
              appStore.hisMatch({
                map: {
                  "whyx,whhk,925": '',
                  other: (<div>
                    <span
                      style={{
                        marginRight: '5px',
                        marginLeft: '26px',
                        verticalAlign: 'middle',
                        color: 'rgba(0, 0, 0, 0.65)',
                      }}>
                      {deductMarksType}
                    </span>
                    <InputNumber
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle'
                      }}
                      size="small"
                      max={item.fixedScore || undefined}
                      min={0}
                      value={!isNaN(item.remarkDeductScore) ? Number(item.remarkDeductScore) : 0}
                      onChange={(val) => {
                        qcModel.setItemListErrObj(item.qcItemCode, false)
                        handleItemChange({
                          ...item,
                          qcItemValue: '否',
                          remarkDeductScore: val?.toString() || '',
                        }, itemIndex)
                      }} />
                    {baseInfo.useSubItemFixedScore && <span
                      style={{
                        marginRight: '5px',
                        marginLeft: '26px',
                        verticalAlign: 'middle',
                        color: 'rgba(0, 0, 0, 0.65)',
                      }}>
                      问题总扣分
                    </span>}
                    {baseInfo.useSubItemFixedScore && <InputNumber
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle'
                      }}
                      size="small"
                      readOnly={true}
                      value={
                        (item.subItemList || []).reduce((pre: any, itemScore: any) => {
                          if (itemScore.checked) {
                            return Number(pre + itemScore.fixedScore)
                          } else {
                            return Number(pre)
                          }
                        }, Number(item.remarkDeductScore))
                      }
                    />}
                  </div>)
                },
                vague: true,
              })
            }

            {['925', 'zjhj','zzwy','jmfy','ytll','gzsrm'].includes(appStore.HOSPITAL_ID) && <div style={{ marginTop: 5 }}>
              <Input.TextArea
                value={item.remark}
                autosize={{ minRows: 2 }}
                placeholder="备注"
                disabled={['whyx', 'whhk'].includes(appStore.HOSPITAL_ID) && (item.qcItemValue == '是' || item.qcItemValue == '')}
                onChange={(e) => handleItemChange({
                  ...item,
                  remark: e.target.value,
                }, itemIndex)} />
            </div>}
          </div>}
          {appStore.hisMatch({
            map: {
              '925,yczyy': !qcModel.baseInfo.useScore && <div className="sub-item-list">
                <div style={{ marginTop: 5 }}>
                  <Input.TextArea
                    value={item.remark}
                    autosize={{ minRows: 2 }}
                    placeholder="备注"
                    onChange={(e) => handleItemChange({
                      ...item,
                      remark: e.target.value,
                    }, itemIndex)} />
                </div>
              </div>,
              other: ''
            },
            vague: true
          })}
          { appStore.HOSPITAL_ID ==='925' && <>
            <div>责任人: <Select
                showSearch
                value={item.liableNo ? item.liableNo.split(','):[]}
                onChange={(e:any)=>{
                  item.liableNo = e.join(',')
                }}
                mode={'multiple'}
                filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{width:180,margin:'0 5px'}}>
              {(qcModel.userNurseList||[]).map((nurse: any) => <Option key={nurse?.empNo}>{nurse.empName}</Option>)}
            </Select></div>
          </>}
          {appStore.hisMatch({
            map: {
              "whyx,whhk": '',
              other: <div className="img-upload">
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
            },
            vague: true
          })
          }

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
              gzhd: <>
                {
                  !qcModel.baseInfo.useScore && <div className="sub-item-list">
                    <div style={{ marginTop: 5 }}>
                      <Input.TextArea
                        value={item.remark}
                        autosize={{ minRows: 2 }}
                        placeholder="备注"
                        onChange={(e) => handleItemChange({
                          ...item,
                          remark: e.target.value,
                        }, itemIndex)} />
                    </div>
                  </div>
                }
              </>,
              lcey: !qcModel.baseInfo.useScore &&
                <div className='notesCon' style={{ borderBottom: 'none' }}>
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
        'nys,whyx,gxjb,whhk': '',
        // lcey: '',
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
      },
      vague: true
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
      .buttonStyle{
        margin-left: 20px;
        margin-right: 30px
      }
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

  .sub-item-list{
    background: rgba(0,0,0,0.05);
    padding: 5px 20px;
    margin: 5px 0;
    &>div{
      margin: 2.5px 0;
    }
  }

  i.anticon-close-square{
    color: #999;
     font-size: 16px;
      vertical-align: middle;
      margin-right: 10px;
    &.checked{
      color: red;
    }
    &.unchecked{
      position: relative;
      &::after{
        content: '';
        width: 10px;
        height: 10px;
        background-color: #eee;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
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
