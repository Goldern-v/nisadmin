import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { patientVisitMonthModel } from '../../model/PatientVisitMonthModel'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import { Report } from '../../types'
import Zimage from 'src/components/Zimage'
import createModal from 'src/libs/createModal'
import service from 'src/services/api'
import OneLevelTitle from '../common/OneLevelTitle'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 附件模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = patientVisitMonthModel.getSectionData(sectionId)
  let report: Report = patientVisitMonthModel.getDataInAllData('report')
  const previewModal = createModal(PreviewModal)
  let list = data ? data.list || [] : []

  const onPreView = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, file: any) => {
    previewModal.show({
      title: file.name,
      path: file.path
    })
    e.stopPropagation()
  }

  const downFile = (path: string, name: string) => {
    service.commonApiService.getFileAndDown(path, name)
  }

  useEffect(() => { })

  return (
    <Wrapper>
      <OneLevelTitle text="附件" />
      <EditButton onClick={() => patientVisitMonthModel.openEditModal(sectionId)}>编辑</EditButton>
      <FileCon>
        {list.map((item: any, index: number) => (
          <div className='file-box' key={index}>
            <div className='file-inner' onClick={() => downFile(item.path, item.name)}>
              {getFileType(item.path) == 'img' ? (
                <Zimage src={item.path} className='type-img' alt='' />
              ) : (
                  <img
                    src={getFilePrevImg(item.path)}
                    className='type-img'
                    alt=''
                    onClick={(e) => onPreView(e, item)}
                  />
                )}
              <div className='file-name'>{item.name}</div>
              {/* <div className='file-size'>{getFileSize(item.size)}</div> */}
            </div>
          </div>
        ))}
      </FileCon>
      <previewModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  padding: 5px 0;
  position: relative;

  .sup-title {
    color: #000;
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
`

const FileCon = styled.div`
  overflow: hidden;
  padding: 42px;
  padding-top: 20px;
  padding-bottom: 0;

  .file-box {
    width: 20%;
    float: left;
    padding-left: 8px;
    padding-bottom: 8px;

    .file-inner {
      word-break: break-all;
      height: 125px;
      background: rgba(246, 246, 246, 1);
      border-radius: 2px;
      border: 1px dotted rgba(0, 166, 128, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 5px 10px;
      cursor: pointer;
      .type-img {
        height: 44px;
        min-height: 44px;
        width: 44px;
      }
      .file-name {
        font-size: 13px;
        color: #333333;
        margin: 5px 0 3px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .file-size {
        font-size: 13px;
        color: #999;
      }
    }
  }
`
