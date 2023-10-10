import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, InputNumber, DatePicker, Select, message, Icon, Upload, } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { observer } from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import {QuarterlyZzwyData} from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/Data";
import { appStore, authStore } from 'src/stores';
const { Option } = Select
import styled from 'styled-components'

// import { preJobManageApi } from "../PreJobManageApi";
export interface Props extends FormComponentProps {
  visible: boolean,
  handleOk: any,
  handleCancel: () => void,
}
const formItemLayout = {
  labelCol: {
    sm: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 20 }
  }
}


function AnalysisSelectReport(props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
  } = props
  // const [codeList, setCodeList] = useState([]);//二级项目list
  // 由于选择数据之后，之前的simpleName会丢失，记录旧数据用于对比,{}
  const [sourceCodeList, setSourceCodeList] = useState({});

  const onSave = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
      let tempArray:any = []
      value.itemCode.map((it:any)=>{
        it.simpleName = value[it.key]
        tempArray.push(it)
      })
      QuarterlyZzwyData.templateData.qcCode = value.qcCode
      QuarterlyZzwyData.templateData.itemCodeObj = tempArray || []
      console.log("value===",value);
      console.log("tempArray===",tempArray);
      delete value.itemCode;
      delete value.qcCode
      // let keys = Object.keys(value)
      QuarterlyZzwyData.templateData.itemCodeList = tempArray.map((item:any)=>item.key)
      QuarterlyZzwyData.handleSelectReport(tempArray)
      QuarterlyZzwyData.getRatioByItemCode()
      // console.log(keys,tempArray)
      handleOk(value)
      // console.log('创建的内容',value)
   
    })
  }

  useEffect(() => {
    if (visible) {
      resetFields()
      // setCodeList(QuarterlyZzwyData.templateData.itemCodeObj || [])
      let newObj = {}
      for (const item of QuarterlyZzwyData.templateData.itemCodeObj || []) {
        newObj[item.key] = item;
      }
      setSourceCodeList(newObj || {})
      QuarterlyZzwyData.getTemplateList()
      QuarterlyZzwyData.getReportTwoItem()
    }
  }, [visible])
  

  return (
    <Modal title={'改进项目'} visible={visible}
      onOk={onSave}
      onCancel={handleCancel}
      centered maskClosable={false}
    >
      <Wrapper>
      <Form>
        {/* 在创建的时候已经选择了表模板，所以不需要再次创建 */}
        {/*<Form.Item {...formItemLayout} label='表模板'>*/}
        {/*  {getFieldDecorator('qcCode', {*/}
        {/*      initialValue: QuarterlyZzwyData.templateData.qcCode || '',*/}
        {/*      rules: [{ required: true, message: '表模板不能为空' }]*/}
        {/*    })(*/}
        {/*      <Select showSearch filterOption={(input:any, option:any) =>*/}
        {/*        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
        {/*      }*/}
        {/*        style={{ width: '100%' }}*/}
        {/*        onChange={(val:any)=>{*/}
        {/*          QuarterlyZzwyData.getReportTwoItem(val)*/}
        {/*        }} >*/}
        {/*        {QuarterlyZzwyData.templateList.map((v:any) =>*/}
        {/*              <Option value={v.qcCode} key={v.qcCode}>{v.qcName}</Option>)}*/}
        {/*      </Select>*/}
        {/*    )}*/}
        {/*</Form.Item>*/}
        <Form.Item {...formItemLayout} label='二级项目'>
          {getFieldDecorator('itemCode', {
              initialValue: QuarterlyZzwyData.templateData.itemCodeObj || [],
              rules: [{ required: true, message: '二级项目不能为空' }]
            })(
              <Select showSearch mode='multiple' labelInValue
                style={{ width: '100%' }}
                filterOption={(input:any, option:any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val:any)=>{
                  val.map((it:any)=>{
                    it.simpleName=sourceCodeList[it.key]?.simpleName || undefined
                  })
                  // setCodeList(val)
                }}
               > 
                {QuarterlyZzwyData.reportTwoItem.map((v:any) =>
                      <Option value={v.qcItemCode} key={v.qcItemCode}>{v.qcItemName}</Option>)}
              </Select>
            )}
        </Form.Item>
        {/*{codeList.map((it:any)=> <Form.Item {...formItemLayout} label='项目简称'*/}
        {/*extra={'二级项目：'+it.label}>*/}
        {/*      {getFieldDecorator(it.key+'', {*/}
        {/*        initialValue: it.simpleName || '',*/}
        {/*        rules: [{ required: true, message: '项目简称不能为空' }]*/}
        {/*      })(<Input key={it.key} style={{ width: '100%' }} />)}*/}
        {/*    </Form.Item>*/}
        {/*)}*/}

      </Form>
      </Wrapper>
    </Modal>
  )
}
const Wrapper = styled.div`
.two-name{
  line-height: 1;
  margin: 0;
  color: #999;
  font-size: 12px;
}
`
export default Form.create()(observer(AnalysisSelectReport)) as any
