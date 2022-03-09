import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Select, Modal } from 'antd';
// import { FormInstance } from 'antd/es/form';
// import Form from 'src/components/Form'
import { authStore } from 'src/stores'
import { FormComponentProps } from 'antd/lib/form/Form'
import { appStore } from "src/stores";
import emitter from 'src/libs/ev'

const { Option } = Select;
// import FlatManageService from './../api/FlatManageService'

// const api = new FlatManageService()

// export interface Props {
//   // rules: any
//   isModalVisible?: boolean,
// }
export interface Props extends FormComponentProps {
  isModalVisible: boolean,
}
export interface DeptType {
  code: string;
  name: string;
}

function AddModal(props: Props) {
  const refForm = React.createRef<Form>()
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const{ isModalVisible, form: { getFieldDecorator, validateFields } } = props
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  let deptList = authStore.deptList;

  const handleOkBtn = () => {
    // appStore.history.push(`/checkWard/wardsView`)
    appStore.history.push(`/checkWard/recordView`)

    validateFields((err, value) => {
      if (err) {
        return
      }
      console.log(value)
      // if (value.birthday) value.birthday = value.birthday.format('YYYY-MM-DD')
      // if (value.deptCode) value.deptName = authStore.deptList.find((item) => item.code == value.deptCode)!.name
      // nurseFilesService.saveOrUpdate(value).then((res) => {
      //   message.success('操作成功')
      //   nurseFilesListViewModel.loadNursingList()
      //   handleOk()
      // })
    })
  }
  const handleCancel = () => {}


  return (
    <Modal
      className='add-modal'
      title='新建夜查评分表'
      onOk={handleOkBtn}
      centered
      // confirmLoading={uploadLoading}
      onCancel={handleCancel}
      visible={isModalVisible}
    >
      <ModalContent>
        <Form ref={refForm} {...layout} name="control-ref">
        <Form.Item label="科室" hasFeedback>
            {getFieldDecorator('deptCode', {
              rules: [{ required: true, message: '请选择病区' }],
            })(
              <Select placeholder="请选择科室">
                {deptList.map((item: DeptType) => (
                  <Select.Option key={item.name} value={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {/* <Form.Item label="病区" hasFeedback>
            {getFieldDecorator('select', {
              rules: [{ required: true, message: '请选择病区' }],
            })(
              <Select placeholder="请选择病区">
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="病人数">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写病人数',
                },
              ],
            })(<Input placeholder="请填写病人数" />)}
          </Form.Item>
          <Form.Item label="危重病人">
            {getFieldDecorator('username1', {
              rules: [
                {
                  required: true,
                  message: '请填写危重病人',
                },
              ],
            })(<Input placeholder="请填写危重病人" />)}
          </Form.Item>
          <Form.Item label="1级护理">
            {getFieldDecorator('username2', {
              rules: [
                {
                  required: true,
                  message: '请填写1级护理',
                },
              ],
            })(<Input placeholder="请填写1级护理" />)}
          </Form.Item>
          <Form.Item label="陪护数">
            {getFieldDecorator('username3', {
              rules: [
                {
                  required: true,
                  message: '请填写陪护数',
                },
              ],
            })(<Input placeholder="请填写陪护数" />)}
          </Form.Item>
          <Form.Item label="值班护士" hasFeedback>
            {getFieldDecorator('select1', {
              rules: [{ required: true, message: '请选择值班护士' }],
            })(
              <Select placeholder="请选择值班护士">
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="值班护长">
            {getFieldDecorator('username4', {
              rules: [
                {
                  required: true,
                  message: '请填写值班护长',
                },
              ],
            })(<Input placeholder="请填写值班护长" />)}
          </Form.Item> */}
        </Form>
      </ModalContent>
    </Modal>
  )
}
export default Form.create()(AddModal)

const ModalContent = styled.div`
  .row {
    display: flex;
    margin-bottom: 10px;
    .label {
      width: 90px;
      text-align: right;
      line-height: 32px;
    }
    .content {
      .ipt {
        width: 260px !important;
      }
      input,
      button,
      .ant-select {
        vertical-align: middle;
        margin-left: 20px;
      }
      .more {
        width: 50px;
      }
    }
  }
`
