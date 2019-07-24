import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message } from 'antd';
import Form from 'src/components/Form'
import { authStore } from 'src/stores'

import FlatManageService from './../api/FlatManageService'

const api = new FlatManageService();

export interface Props {
  visible: boolean,
  onOk: any,
  onCancel: any,
  params?: any,
  deptCode: any
}

export default function NewNursingRulesAddModal(props: Props) {
  const refForm = React.createRef<Form>();
  const { visible, onOk, onCancel, params, deptCode } = props;
  const [empNo, setEmpNo] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [acceptingNewParams, setAcceptingNewParams] = useState(false);

  // let uploadAccept = 'image/png,image/gif,image/jpeg,application/msword,.doc,.docx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf';
  let uploadAccept = '.pdf';

  const openImportFile = () => {
    let target = document.querySelector('.new-nursing-rules-add-modal .file-content') as HTMLElement;
    target.click();
  }

  const handleImportFileChange = (e: any) => {
    let target = e.target;
    let nameEL = document.querySelector('.new-nursing-rules-add-modal .file-name') as HTMLInputElement;

    let fName = target.value.split('\\');
    fName = fName[fName.length - 1];
    nameEL.value = fName;

    let current = refForm.current;
    if (current) {
      let manageType = current.getField('manageType');
      if (!manageType) {
        let newName = fName.split('.');
        if (newName.length >= 2) newName.pop();

        current.setField('manageType', newName.join('.'));
      }
    }
  }

  useEffect(() => {
    if (authStore.getUser()) setEmpNo(authStore.getUser().empNo);
    if (visible) {

      let nameEL = document.querySelector('.new-nursing-rules-add-modal .file-name') as HTMLInputElement;
      if (nameEL && nameEL.value) nameEL.value = "";

      setTimeout(() => {
        if (refForm && refForm.current) refForm.current.clear(() => {
          if (refForm && refForm.current && params instanceof Object) {
            if (params.id) setAcceptingNewParams(true);

            let keys = Object.keys(params);
            if (keys.length > 0) {

              refForm.current.setFields({
                deptCode: params.deptCode,
                manageType: params.manageType
              });

              //防止在handleFormChange中把目录字段替换为空字符
              new Promise((resolve) => setTimeout(() => resolve('ok'), 100))
                .then(() => {
                  setAcceptingNewParams(false)
                })

            }
          }
        })
      })
    }
  }, [visible])

  const handleOkBtn = () => {
    if (refForm && refForm.current) {
      let formData = refForm.current.getFields();
      let fileEL = document.querySelector('.new-nursing-rules-add-modal .file-content') as HTMLInputElement;
      let nameEl = document.querySelector('.new-nursing-rules-add-modal .file-name') as HTMLInputElement;
      let file: any;
      let data = new FormData();
      if (fileEL.files && fileEL.files.length > 0)
        file = fileEL.files[0]

      if (!formData.manageType)
        return Message.error('未填写管理类型');

      if (!params.id) {
        if (!(file && nameEl.value))
          return Message.error('未选择上传文件');

        data.append('file', file);
      }

      data.append('empNo', empNo);

      for (let x in formData) {
        data.append(x, formData[x]);
      }

      setUploadLoading(true)

      let successCallback = (res?: any, msg?: any) => {
        Message.success(msg || '上传成功');

        setUploadLoading(false)
        onOk();
      }

      let failedCallback = (err?: any, msg?: any) => {
        Message.error(msg || '上传失败');
        setUploadLoading(false)
      }

      if (params && Object.keys(params).length > 0) {
        // data.append('id', params.id);
        api.update({
          id: params.id,
          manageType: formData.manageType
        }).then(res => {
          if (res.code == 200)
            successCallback(null, '修改成功')
          else
            failedCallback(null, '修改失败')
        }, err => {
          failedCallback(err)
        })
      } else {
        data.append('deptCode', deptCode);
        api.upload(data).then(res => {
          if (res.code == 200)
            successCallback()
          else
            failedCallback()
        }, err => {
          failedCallback(err)
        })
      }

    }

  }

  const FileContent = () => {
    if (visible) {
      return <Input
        type="file"
        className="file-content"
        // accept={uploadAccept}
        onChange={handleImportFileChange} />
    } else
      return ''
  }

  const handleCancel = () => {
    if (uploadLoading) return

    onCancel && onCancel()
  }

  return <Modal
    className="new-nursing-rules-add-modal"
    title={params.id ? '修改管理类型' : '新建'}
    onOk={handleOkBtn}
    centered
    confirmLoading={uploadLoading}
    onCancel={handleCancel}
    visible={visible}>
    <ModalContent>
      <Form ref={refForm}>
        <div className="row">
          <span className="label">管理类型:</span>
          <span className="content">
            <Form.Field name="manageType">
              <Input className="ipt" />
            </Form.Field>
          </span>
        </div>
        <div className="row" style={{ display: `${params.id ? 'none' : 'flex'}` }}>
          <span className="label">文件上传:</span>
          <span className="content">
            <input readOnly className="ipt ant-input file-name" />
            <Button onClick={openImportFile} className="more">...</Button>
            <span style={{ display: 'none' }}>
              {FileContent()}
            </span>
          </span>
        </div>
      </Form>
    </ModalContent>
  </Modal>
}

const ModalContent = styled.div`
  .row{ 
    display: flex; 
    margin- bottom: 10px;
    .label{
      width: 90px;
      text-align: right;
      line-height: 32px;
    }
    .content{
      .ipt{
        width:260px!important;
      }
      input,button,.ant-select{
        vertical-align: middle;
        margin-left:20px;
      }
      .more{
        width: 50px;
      }
    }
  }
`