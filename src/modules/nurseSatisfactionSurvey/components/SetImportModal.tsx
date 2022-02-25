import styled from 'styled-components'
import React, { useState } from 'react'
import { Button, Upload, Modal, message } from 'antd'
import NurseSatisfactionSurveyService from '../services/NurseSatisfactionSurveyService'

import { fileDownload } from 'src/utils/file/file'
import { authStore } from "src/stores";

const api = new NurseSatisfactionSurveyService();
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
      if (file.response && file.response.code == "300") {
        message.error('导入失败,请检查导入模板是否正确！')
      }else if(file.response && file.response.code == "200"){
        message.success('导入成功')
        onOk && onOk()
      }
      return file;
    });

  };
  const download = () => {
    api.getTemplate()
      .then(res => {
        fileDownload(res)
      })
  }
  
  return <Modal
    title={"导入"}
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
          action="/crNursing/api/satisfaction/setting/uploadSetting" 
          headers={header} 
          accept={".xls,.xlsx"} 
          onChange={uploadOnChange}
          multiple={true}
          name="file"
          showUploadList={false}
        >
          <Button type="primary" key="bulkImport" block>
            导入
          </Button>
        </Upload>
        </div>
        <div className="remark">说明：
          <br/>1.上传前请<a onClick={download}>下载模板</a>，按照模板要求将内容填完后，再点击上方按钮进行导入。
          <br/>2.请设置文件格式：调查表名.xls，需要注意的是调查表名也将作为快速筛选项<br/>目，以请设置有含义的文件名称。
        </div>
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
    width: 100px;
    margin-top: 25px;
  }
  .remark {
    font-size: 16px;
    margin-top: 25px;
  }
}

`
