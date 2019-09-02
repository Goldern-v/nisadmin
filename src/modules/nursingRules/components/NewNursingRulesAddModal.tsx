import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message } from 'antd';
import Form from 'src/components/Form'
import { authStore } from 'src/stores'
import NursingRulesApiService from './../api/NursingRulesApiService';

const api = new NursingRulesApiService();

export interface Props {
  visible: boolean,
  onOk: any,
  onCancel: any,
  fileTypeList: any,
  params?: any
}

export default function NewNursingRulesAddModal(props: Props) {
  const refForm = React.createRef<Form>();
  const { visible, onOk, onCancel, fileTypeList, params } = props;
  const [deptList, setDeptList] = useState(authStore.deptList);
  const [deptCode, setDeptCode] = useState('000000');
  const [empNo, setEmpNo] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [catalogList, setCatalogList] = useState([] as any);
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
      let institutionName = current.getField('institutionName');
      if (!institutionName) {
        let newName = fName.split('.');
        if (newName.length >= 2) newName.pop();

        current.setField('institutionName', newName.join('.'));
      }
    }
  }

  const handleSelect = (code: any) => {
    setDeptCode(code)
  }

  useEffect(() => {
    if (deptList.length <= 0) setDeptList(authStore.deptList);
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
                institutionName: params.institutionName,
                fileType: params.fileType,
                catalog: params.catalog
              });

              getCatalog(params.fileType);

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
      let file;
      if (fileEL.files && fileEL.files.length > 0)
        file = fileEL.files[0]

      if (!formData.institutionName)
        return Message.error('未填写制度名称');

      if (!formData.fileType)
        return Message.error('未选择制度类型');

      if (!formData.catalog)
        return Message.error('未选择所属目录');

      if (!(file && nameEl.value))
        return Message.error('未选择上传文件');


      if (fileEL.value.split('.')[fileEL.value.split('.').length - 1] !== 'pdf')
        return Message.error('文件上传类型为pdf');

      let data = new FormData();
      let publicUse = 0;
      if (!formData.deptCode || formData.deptCode == '公共' || formData.deptCode == '000000')
        publicUse = 1;

      data.append('publicUse', publicUse.toString());
      data.append('file', file);
      data.append('empNo', empNo);

      for (let x in formData) {
        data.append(x, formData[x]);
      }

      setUploadLoading(true)

      let successCallback = (res?: any) => {
        Message.success('上传成功');

        setUploadLoading(false)
        onOk();
      }

      let failedCallback = (err?: any) => {
        setUploadLoading(false)
      }

      if (params && Object.keys(params).length > 0) {
        data.append('id', params.id);
        api.updateFile(data).then(res => {
          successCallback(res)
        }, err => {
          failedCallback(err)
        })
      } else {
        api.upload(data).then(res => {
          successCallback(res)
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
        accept={uploadAccept}
        onChange={handleImportFileChange} />
    } else
      return ''
  }

  const handleCancel = () => {
    if (uploadLoading) return

    onCancel && onCancel()
  }

  const handleFormChange = (key: string, value: string) => {
    if (key === 'fileType') {
      let current = refForm.current;
      if (!acceptingNewParams && current) {
        current.setField('catalog', '')
        getCatalog(value)
      }
    }
  }

  const getCatalog = (type: string) => {
    api.getCatalogByType(type).then(res => {
      if (res.data instanceof Array) setCatalogList(res.data);
    })
  }

  return <Modal
    className="new-nursing-rules-add-modal"
    title={params ? '制度修订' : '导入文件'}
    onOk={handleOkBtn}
    centered
    confirmLoading={uploadLoading}
    onCancel={handleCancel}
    visible={visible}>
    <ModalContent>
      <Form ref={refForm} onChange={handleFormChange}>
        <div className="row">
          <span className="label">制度名称:</span>
          <span className="content">
            <Form.Field name="institutionName">
              <Input className="ipt" />
            </Form.Field>
          </span>
        </div>
        <div className="row">
          <span className="label">科室权限:</span>
          <span className="content">
            <div className="ipt">
              <Form.Field name="deptCode">
                <Select
                  value={deptCode}
                  onSelect={handleSelect}>
                  <Select.Option value={'000000'}>公共</Select.Option>
                  {deptList.map((item: any, index: number) => {
                    return <Select.Option key={index} value={item.code}>
                      {item.name}
                    </Select.Option>
                  })}
                </Select>
              </Form.Field>
            </div>
          </span>
        </div>
        <div className="row">
          <span className="label">制度类型:</span>
          <div className="content">
            <div className="ipt">
              <Form.Field name="fileType">
                <Select>
                  {fileTypeList.map((item: any) => <Select.Option value={item.type} key={item.id}>{item.type}</Select.Option>)}
                </Select>
              </Form.Field>
            </div>
          </div>
        </div>
        <div className="row">
          <span className="label">所属目录:</span>
          <div className="content">
            <div className="ipt">
              <Form.Field name="catalog">
                <Select>
                  {catalogList.map((item: any) => <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>)}
                </Select>
              </Form.Field>
            </div>
          </div>
        </div>
        <div className="row">
          <span className="label">附件:</span>
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
        width:260px;
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