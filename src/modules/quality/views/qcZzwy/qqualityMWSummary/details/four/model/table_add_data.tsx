import { Radio, Form } from 'antd'
import { Modal, Input } from 'antd/es'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment';
import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import { FormComponentProps } from 'antd/es/form'
import { api } from 'src/modules/quality/views/qcZzwy/qqualityMWSummary/api'

import { fourData } from '../fourData'

const Option = Select.Option;

export interface IProps extends FormComponentProps {
  table_add_data: boolean | undefined;
  handleCancel: () => void;
}

export interface Props {
}
export default Form.create()(observer(function (props: IProps) {
  const { table_add_data, handleCancel, form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props

  const [formList, setFormList]: any[] = useState([])
  const [selectedObjects, setSelectedObjects] = useState([]);

  const handleChange = (value: any) => {
    let objects = value.map((value: any) => {
      const item = formList.find((form: any) => form.qcCode === value);
      return item;
    });
    setSelectedObjects(objects);
  }

  const handleOk = async () => {
    let { reportMasterData }: any = localStorage.getItem('qqualityMWSummaryDetail') ? JSON.parse(localStorage.getItem('qqualityMWSummaryDetail') || '') : {}
    let params = {
      reportLevel: reportMasterData?.reportLevel,
      startDate: reportMasterData?.startDate,
      endDate: reportMasterData?.endDate,
      wardCode: reportMasterData?.wardCode,
      type: 1,
      getEvalRateDataList: selectedObjects
    }
    let { data } = await api.getMasterEvalRate(params)
    fourData.tableList = data || []
    handleonCancel()
  }
  const handleonCancel = () => {
    handleCancel()
    resetFields()
  }


  const templateLists = async() => {
    let { data } = await api.templateList()
    setFormList(data || [])
  }

  useEffect(() => {
    templateLists()
  }, [])

  useEffect(() => {
    if (table_add_data) {
      setFieldsValue({
        'select-multiple': fourData.tableList.map((item: any) => item.qcCode)
      });
    }
  }, [table_add_data])
  
  return (
    <Modal
      title="添加"
      visible={table_add_data}
      onOk={handleOk}
      onCancel={handleonCancel}
      okText='确定'
      centered
    >
      <Wrapper>
        <Form 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}>
          <Form.Item label="表单选择">
            {getFieldDecorator('select-multiple', {
              rules: [
                { required: true, message: '表单不能为空', type: 'array' },
              ],
            })(
              <Select onChange={handleChange} mode="multiple" placeholder="请选择表单">
                {
                  formList.map((item: any) => {
                    return <Option value={item.qcCode} key={item.qcCode}>{item.qcName}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>
        </Form>
      </Wrapper>
    </Modal>
  )
}))

const Wrapper = styled.div`
padding: 10px 0;
`