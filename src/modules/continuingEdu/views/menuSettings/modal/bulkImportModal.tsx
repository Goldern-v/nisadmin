import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Upload, Modal, message, Select, Icon, Spin } from 'antd'
import { meunSettingApi } from "../api/MeunSettingApi";
import { fileDownload } from 'src/utils/file/file'
import { authStore, appStore } from "src/stores";

const api = meunSettingApi;
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
}
export default function editModal(props: Props) {
  let header:any = {'App-Token-Nursing':'51e827c9-d80e-40a1-a95a-1edc257596e7','Auth-Token-Nursing':authStore.getAuthToken()}
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp} = props
  const [loading, setLoading] = useState(false)
  const afterClose = () => {}
  const uploadOnChange = (info:any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(0);
    fileList = fileList.map(file => {
      if (file.response) {
        message.success('导入成功')
        onOk && onOk(file.response.data)
      }
      return file;
    });

  };
  const download = () => {
    api.exportPersonList()
      .then(res => {
        fileDownload(res)
      })
  }
  
  return <Modal
    title={"批量导入"}
    width={800}
    afterClose={afterClose}
    confirmLoading={loading}
    footer={null}
    centered
    visible={visible}
    onOk={() => {
      onOk()
    }}
    onCancel={() => onCancel()}>
    <Wrapper>
      <div className="boxBody">
      <div className="boxButton">
      <Upload 
        action="/crNursing/api/studyAndTrain/menuManage/importPersonList" 
        headers={header} 
        accept={".xls,.xlsx"} 
        onChange={uploadOnChange}
        multiple={true}
        name="filename"
        showUploadList={false}
      >
        <Button type="primary" key="bulkImport" block>
          立刻上传
        </Button>
      </Upload>
      </div>
      <div className="remark">说明：1.上传前请<a onClick={download}>下载模板</a>，按照模板要求将内容填完后，再点击上方按钮进行导入。</div>
      </div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
.boxBody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .boxButton {
    width:100px;
  }
  .remark {
    font-size: 16px;
    margin-top: 30px;
  }
}

`
