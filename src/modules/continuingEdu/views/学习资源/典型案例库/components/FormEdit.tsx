import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Select } from 'antd'
import { ReactComponent as Checked } from './../imgs/checked.svg'
import { ReactComponent as Uncheck } from './../imgs/uncheck.svg'
import deptNameList from './../utils/deptNameList'

const Option = Select.Option

export interface Props {
  style?: React.CSSProperties
  editable?: boolean
  onEditDataChange?: Function
  editData?: any
}

export default function FormEdit(props: Props) {
  const { style, editable, editData, onEditDataChange } = props

  const totalCol = 12

  const EditCon = (params: {
    code: string,
    type: string,
    value?: any,
    defaultValue?: any,
    placeholder?: string,
    style?: React.CSSProperties,
    options?: any[]
  }) => {
    const { code, type, options, placeholder, value, style, defaultValue } = params

    const placeSpan = <span style={{ height: 24, width: 24, display: 'inline-block' }}></span>

    switch (type) {
      case 'input':
        if (!editable) return editData[code] || placeSpan
        return (
          <Input
            style={style}
            value={editData[code]}
            placeholder={placeholder}
            onChange={(e: any) =>
              onEditDataChange && onEditDataChange({ ...editData, [code]: e.target.value })} />
        )
      case 'select':
        if (!editable) {
          let target = (options || []).find((item: any) => item.value == editData[code])

          if (target) return target.label

          return editData[code] || placeSpan
        }
        return (
          <Select
            value={editData[code]}
            style={{ width: '100%', ...style }}
            onChange={(val: any) =>
              onEditDataChange && onEditDataChange({ ...editData, [code]: val })}>
            {(options || []).map((item: any) => (
              <Option
                value={item.value}
                key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        )
      case 'radio':
        const handleClick = () => {
          if (!editable) return

          let newVal = null as any
          if (editData[code] !== value) {
            newVal = value
          } else {
            if (defaultValue) newVal = defaultValue
          }

          onEditDataChange && onEditDataChange({ ...editData, [code]: newVal })
        }
        return editData[code] === value ?
          <Checked
            style={{ cursor: 'pointer', ...style }}
            onClick={() => handleClick()} /> :
          <Uncheck
            style={{ cursor: 'pointer', ...style }}
            onClick={() => handleClick()} />
      default: return editData[code]
    }
  }

  return <Wrapper style={style}>
    <div className="form-content">
      <div className="main-title">典型病例库入库信息收集表</div>
      <div className="edit-table">
        <table>
          <colgroup>
            <col />
            <col width="80" />
            <col width="60" />
            <col width="60" />
            <col />
            <col />
            <col />
            <col />
            <col width="60" />
            <col width="80" />
            <col />
            <col width="60" />
          </colgroup>
          <tbody>
            <tr>
              <td className="title">科室</td>
              <td>
                {EditCon({
                  code: 'f00140',
                  type: 'select',
                  options: deptNameList
                    .map((name: string) => ({ label: name, value: name }))
                })}
              </td>
              <td className="title">患者姓名</td>
              <td>
                {EditCon({ code: 'f00141', type: 'input' })}
              </td>
              <td className="title">性别</td>
              <td>
                {EditCon({
                  code: 'f00003',
                  type: 'select',
                  options: [
                    { label: '男', value: 0 },
                    { label: '女', value: 1 }
                  ]
                })}
              </td>
              <td className="title">年龄</td>
              <td>
                {EditCon({ code: 'f00125', type: 'input' })}
              </td>
              <td className="title">收集日期</td>
              <td>{editData['f00142']}</td>
              <td className="title">收集人</td>
              <td>{editData['f00144']}</td>
            </tr>
            <tr>
              <td colSpan={totalCol} className="title align-left">现病史（包含六个要素）</td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00145', type: 'input', placeholder: '起病情况及患病时间' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00146', type: 'input', placeholder: '主要症状特点：包括主要症状出现的部位、性质、持续时间和程度' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00147', type: 'input', placeholder: '病因与诱因' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00148', type: 'input', placeholder: '病情发展与演变：主要症状的变化或新症状的出现' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00149', type: 'input', placeholder: '伴随症状' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00150', type: 'input', placeholder: '诊疗经过：只需一部分（关键的化验检查、用药、疗效和疗程）' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol} className="align-left">
                <span className="title" style={{ marginRight: 10 }}>过敏史</span>
                <span style={{ marginRight: 10 }}>无</span>
                {EditCon({ code: 'f00151', type: 'radio', value: '有', defaultValue: '' })}
                <span style={{ marginRight: 10 }}>有</span>
                {EditCon({ code: 'f00152', type: 'input', style: { width: 540 } })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol} className="title align-left">既往病史</td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00153', type: 'input' })}
              </td>
            </tr>
            {editData['f00003'] == '1' && <React.Fragment>
              <tr>
                <td colSpan={totalCol} className="title align-left">婚育史/月经史</td>
              </tr>
              <tr>
                <td colSpan={totalCol}>
                  {EditCon({ code: 'f00156', type: 'input' })}
                </td>
              </tr>
            </React.Fragment>}
            <tr>
              <td colSpan={totalCol} className="title align-left">体格检查、专科检查</td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00157', type: 'input' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol} className="title align-left">辅助检查结果</td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00158', type: 'input' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol} className="title align-left">主要诊断</td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00159', type: 'input' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol} className="title align-left">治疗过程及疗效</td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00160', type: 'input' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol} className="title align-left">实施护理程序</td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00161', type: 'input', placeholder: '主要护理评估' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00162', type: 'input', placeholder: '主要护理问题（护理诊断）' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00163', type: 'input', placeholder: '主要护理措施' })}
              </td>
            </tr>
            <tr>
              <td colSpan={totalCol}>
                {EditCon({ code: 'f00164', type: 'input', placeholder: '护理效果评价' })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Wrapper>
}
const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
  padding: 0;
  font-size: 12px;
  color: #000;
  height: 24px;
`
const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`

const Wrapper = styled.div`
 background: #eee;
 padding: 10px 0;
 width: 100%;
 overflow-y: auto;
 .form-content{
  width: 760px;
  min-height: 900px;
  padding: 15px 40px 30px 40px;
  margin: 0 auto;
  background: #fff;
  color: #000;
  .main-title{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  table{
    border-collapse: collapse;
    border-color: #000;
    width: 100%;
    table-layout: fixed;
    tr {
    width: 100%;
    }
    td{
      border: 1px #000 solid;
      line-height: 24px;
      min-height: 24px;
      text-align: center;
      &>*{
        vertical-align: middle;
      }
      &.title,.title{
        font-weight: bold;
      }
      &.align-left,.align-left{
        text-align: left;
      }
    }
  }
  .ant-input{
    resize: none;
    ${defaultInputStyle}
    :hover{
      ${activeInputStyle}
        background: ${(p) => p.theme.$mlc};
    }
    :focus{
      ${activeInputStyle}
        background: ${(p) => p.theme.$mlc};
    }
  }
  .ant-select,.ant-select-selection__rendered,.ant-select-selection-selected-value{
    height: 24px;
    line-height: 24px;
    margin: 0;
  }
  .ant-select-selection__rendered{
    text-align: center;
  }
  .ant-select-selection-selected-value{
    padding-right: 10px;
  }
  .ant-select-selection{
    ${defaultInputStyle}
  }

  .ant-select-open,.ant-select-focused{
    .ant-select-selection{
      ${activeInputStyle}
      &:focus{
        ${activeInputStyle}
        background: ${(p) => p.theme.$mlc};
      }
    }
  }

  textarea{
    resize: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    line-height: 24px;
    :hover{
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    }
    :focus{
      outline: none;
      border: none;
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }

  .radio-con{

  }
 }
`