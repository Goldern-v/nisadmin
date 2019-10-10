import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, Icon, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, DetailItem } from '../../types'
// import { globalModal } from 'src/global/globalModal'
import MultipleImageUploader from './../common/MultipleImageUploader'

const TextArea = Input.TextArea

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 片区团队建设活动附件弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })

  let list: any[] = []

  if (cloneData && cloneData.list) list = cloneData.list.map((item: any) => {
    return {
      path: item.attachUrl || '',
      id: item.attachId || '',
      fileName: item.fileName || ''
    }
  }) || []

  const handleUploadChange = (payload: any) => {
    // console.log(payload)
    let newData = payload.map((item: any) => {
      return {
        attachUrl: item.path,
        attachId: item.id,
        fileName: item.fileName
      }
    });

    setData({ list: newData })
  }

  // useEffect(() => { }, [])
  return (
    <Wrapper>
      <MultipleImageUploader text='添加图片' onChange={handleUploadChange} tip="" value={list} />
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
    .delete-btn {
      position: absolute;
      top: 5px;
      right: 10px;
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
      min-height: 80px;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
    }
    .img-con {
      float: left;
      width: 100px;
      height: 100px;
      position: relative;
      margin: 15px 5px 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
