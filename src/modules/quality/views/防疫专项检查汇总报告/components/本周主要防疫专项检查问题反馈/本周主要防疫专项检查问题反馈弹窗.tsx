import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, Icon, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, DetailItem } from '../../types'
import { globalModal } from 'src/global/globalModal'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 本周主要防疫专项检查问题反馈弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let list: DetailItem[] = cloneData.list

  const addItem = () => {
    cloneData.list.push({
      detailList: []
    })
    setData(cloneData)
  }
  const deleteItem = (index: number) => {
    globalModal.confirm('删除确认', '你确认要删除该记录吗？').then((res) => {
      cloneData.list.splice(index, 1)
      setData(cloneData)
    })
  }
  const deleteDetail = (index: number, detailList: any[]) => {
    globalModal.confirm('删除确认', '你确认要删除该记录吗？').then((res) => {
      detailList.splice(index, 1)
      setData(cloneData)
    })
  }
  const onDeleteImg = (index: number, arr: any[]) => {
    globalModal.confirm('删除确认', '你确认要删除该图片吗？').then((res) => {
      arr.splice(index, 1)
      setData(cloneData)
    })
  }

  const updateNum = (e: any, obj: any, key: string) => {
    if (!Number(e.target.value) && Number(e.target.value) !== 0 && e.target.value[e.target.value.length - 1] !== '.') {
      return message.warning('只能输入数字')
    }
    obj[key] = e.target.value
    setData(cloneData)
  }
  const updateText = (e: any, obj: any, key: string) => {
    obj[key] = e.target.value
    setData(cloneData)
  }

  const addDetail = (detailList: any) => {
    detailList.push({})
    setData(cloneData)
  }
  useEffect(() => { }, [])
  return (
    <Wrapper>
      {/* <div className='button-con'>
        <Button icon='plus' size='small' onClick={addItem}>
          添加
        </Button>
      </div> */}

      {list.map((item, index: number) => (
        <div className='text-box' key={index}>
          <div className='label'>
            ({index + 1})
            <Input
              type='text'
              value={item.itemTypeName}
              style={{ width: 160 }}
              onChange={(e) => updateText(e, item, 'itemTypeName')}
            />
            (总扣分
            <Input
              type='text'
              value={item.totalDeductScore}
              style={{ width: 70 }}
              onChange={(e) => updateNum(e, item, 'totalDeductScore')}
            />
            分,共有{' '}
            <Input
              type='text'
              value={item.deductDeptSize}
              style={{ width: 70 }}
              onChange={(e) => updateNum(e, item, 'deductDeptSize')}
            />
            个扣分科室)
          </div>
          <Icon type='close' className='delete-btn' onClick={() => deleteItem(index)} />
          {item.detailList &&
            item.detailList.map((item: any, index: number, arr) => (
              <div className='detail-con' key={index}>
                <Icon type='close' className='detail-delete-btn' onClick={() => deleteDetail(index, arr)} />
                <span className='index'>{index + 1 + '.'}</span>
                <Input.TextArea value={item.content} autosize onChange={(e) => updateText(e, item, 'content')} />
                <div style={{ overflow: 'hidden', paddingLeft: 20 }}>
                  {item.attachList &&
                    item.attachList.map((item: any, index: number, arr: any) => (
                      <div className='img-con' key={index}>
                        <img className='img' src={item.attachUrl} alt='' />
                        <Icon type='close' className='close-btn' onClick={() => onDeleteImg(index, arr)} />
                        <aside>({item.wardName})</aside>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          <Button type='dashed' className='add-btn' onClick={() => addDetail(item.detailList)}>
            添加
          </Button>
        </div>
      ))}

      <Button type='dashed' className='add-btn' onClick={addItem}>
        添加
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  .text-box {
    background: #fafafa;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 2px;
    border: 1px solid #ddd;
    position: relative;
    .detail-con {
      position: relative;
    }
    .detail-delete-btn {
      position: absolute;
      top: 10px;
      right: -5px;
      cursor: pointer;
    }
    .delete-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
    .label {
      input {
        &:focus {
          background: ${(p) => p.theme.$mlc};
        }
        margin: 0 10px;
      }
    }
    textarea {
      margin-top: 10px;
      resize: none;
      min-height: 50px;
      margin-left: 20px;
      display: block;
      width: calc(100% - 35px);
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
    }
    .index {
      display: block;
      height: 0;
      position: relative;
      top: 10px;
    }
    .img-con {
      float: left;
      width: 100px;
      height: 120px;
      position: relative;
      margin: 15px 5px 5px;
      aside {
        white-space: nowrap;
      }
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        padding: 5px;
      }
      .close-btn {
        position: absolute;
        top: 4px;
        right: 4px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .add-btn {
    width: 300px;
    display: block;
    margin: 10px auto 0;
  }
`

const HeadCon = styled.div``
