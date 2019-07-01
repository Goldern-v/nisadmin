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
  fileTypeList: any
}

export default function NewNursingRulesAddModal(props: Props) {
  const refForm = React.createRef<Form>();
  const { visible, onOk, onCancel, fileTypeList } = props;
  const [deptList, setDeptList] = useState(authStore.deptList);
  const [deptCode, setDeptCode] = useState('公共');
  const [empNo, setEmpNo] = useState();

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

  useEffect((): void => {
    if (deptList.length <= 0) setDeptList(authStore.deptList);
    if (authStore.getUser()) setEmpNo(authStore.getUser().empNo);

    if (visible) {
      let nameEL = document.querySelector('.new-nursing-rules-add-modal .file-name') as HTMLInputElement;
      if (nameEL && nameEL.value) nameEL.value = "";

      if (refForm && refForm.current) refForm.current.clear()
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
        return Message.error('未选择护理类型');

      if (file && nameEl.value) {
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


        api.upload(data).then(res => {
          Message.success('上传成功');
          onOk();
        }, err => {
          Message.error('上传失败');
        })
      } else {
        Message.error('未选择上传文件');
      }

    }

  }

  return <Modal
    className="new-nursing-rules-add-modal"
    title='导入文件'
    onOk={handleOkBtn}
    onCancel={onCancel}
    visible={visible}>
    <ModalContent>
      <Form ref={refForm}>
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
          <span className="label">护理类型:</span>
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
          <span className="label">附件:</span>
          <span className="content">
            <input readOnly className="ipt ant-input file-name" />
            <Button onClick={openImportFile} className="more">...</Button>
            <span style={{ display: 'none' }}>
              <Input
                type="file"
                className="file-content"
                accept="image/png,image/gif,image/jpeg,application/msword,.doc,.docx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf"
                onChange={handleImportFileChange} />
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