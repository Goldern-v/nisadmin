import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import InputItem from './renderItem/InputItem'
import RadioItem from './renderItem/RadioItem'

export default function 脑卒中高危人群院内综合干预量表(props: any) {
  const { editable, itemData, onItemDataChange } = props

  const editData = itemData || {}
  const _editable = true

  return <PageGroup>
    <div className="page-item">
      <div className="form-title">
        <div>脑卒中高危人群院内综合干预量表</div>
        <div>（随访部分）</div>
      </div>
      <div
        className="align-center"
        style={{
          margin: '20px 0px'
        }}>
        （适用于国家脑卒中防治基地医院开展住院人群出院1、6、12个月随访和健康管理）
      </div>
      <div className="sub-title">一、随访基本信息</div>
      <div className="form-area">
        <div className="data-row">
          <span className="row-title">本次随访时间：</span>
          <InputItem
            value={editData['年'] || ''}
            className="underline align-center"
            style={{ width: 60 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['年']: e.currentTarget.value
              })} />
          <span>年</span>
          <InputItem
            value={editData['月'] || ''}
            className="underline align-center"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['月']: e.currentTarget.value
              })} />
          <span>月</span>
          <InputItem
            value={editData['日'] || ''}
            className="underline align-center"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['日']: e.currentTarget.value
              })} />
          <span>日</span>
        </div>
        <div className="data-row">
          <span className="row-title">随访方式：</span>
          <RadioItem
            value={editData['随访方式'] || ''}
            orginValue={'门诊'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }}>
            <span>门诊</span>
          </RadioItem>
          <RadioItem
            value={editData['随访方式'] || ''}
            orginValue={'家访'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }}>
            <span>家访</span>
          </RadioItem>
          <RadioItem
            value={editData['随访方式'] || ''}
            orginValue={'电话'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }}>
            <span>电话</span>
          </RadioItem>
          <RadioItem
            value={editData['随访方式'] || ''}
            orginValue={'网络'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }}>
            <span>网络</span>
          </RadioItem>
          <RadioItem
            value={editData['随访方式'] || ''}
            orginValue={'其他'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }}>
            <span>其他</span>
          </RadioItem>
          <span>:</span>
          <InputItem
            value={editData['随访方式其他'] || ''}
            className="underline"
            style={{ width: 180 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访方式其他']: e.currentTarget.value
              })} />
        </div>
        <div className="data-row">
          <span className="row-title">是否失访：</span>
          <RadioItem
            value={editData['是否失访'] || ''}
            orginValue={'否'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['是否失访']: newVal })
            }}>
            <span>否</span>
          </RadioItem>
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['是否失访'] || ''}
            orginValue={'是'}
            style={{ marginLeft: 65 }}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['是否失访']: newVal })
            }}>
            <span>是，</span>
          </RadioItem>
          <span className="row-title">失访原因：</span>
          <RadioItem
            value={editData['失访原因'] || ''}
            orginValue={'失去联系'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['失访原因']: newVal })
            }}>
            <span>失去联系</span>
          </RadioItem>
          <RadioItem
            value={editData['失访原因'] || ''}
            orginValue={'拒绝参加调查'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['失访原因']: newVal })
            }}>
            <span>拒绝参加调查</span>
          </RadioItem>
          <RadioItem
            value={editData['失访原因'] || ''}
            orginValue={'其他'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['失访原因']: newVal })
            }}>
            <span>其他</span>
          </RadioItem>
          <span>:</span>
          <InputItem
            value={editData['失访原因其他'] || ''}
            className="underline"
            style={{ width: 180 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['失访原因其他']: e.currentTarget.value
              })} />
        </div>
        <div className="data-row">
          <span className="row-title">是否死亡：</span>
          <RadioItem
            value={editData['是否死亡'] || ''}
            orginValue={'否'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['是否死亡']: newVal })
            }}>
            <span>否</span>
          </RadioItem>
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['是否死亡'] || ''}
            orginValue={'是'}
            style={{ marginLeft: 65 }}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['是否死亡']: newVal })
            }}>
            <span>是，</span>
          </RadioItem>
          <span className="row-title">死亡原因：</span>
          <RadioItem
            value={editData['死亡原因'] || ''}
            orginValue={'脑卒中'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }}>
            <span>脑卒中</span>
          </RadioItem>
          <RadioItem
            value={editData['死亡原因'] || ''}
            orginValue={'冠心病'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }}>
            <span>冠心病</span>
          </RadioItem>
          <RadioItem
            value={editData['死亡原因'] || ''}
            orginValue={'恶性肿瘤'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }}>
            <span>恶性肿瘤</span>
          </RadioItem>
          <RadioItem
            value={editData['死亡原因'] || ''}
            orginValue={'呼吸系统疾病'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }}>
            <span>呼吸系统疾病</span>
          </RadioItem>
          <RadioItem
            value={editData['死亡原因'] || ''}
            orginValue={'损伤和中毒'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }}>
            <span>损伤和中毒</span>
          </RadioItem>
          <RadioItem
            value={editData['死亡原因'] || ''}
            orginValue={'其他'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }}>
            <span>其他</span>
          </RadioItem>
          <RadioItem
            value={editData['死亡原因'] || ''}
            orginValue={'不详'}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }}>
            <span>不详</span>
          </RadioItem>
        </div>
        <div className="data-row">
          <span className="row-title" style={{ marginLeft: 113 }}>死亡时间：</span>
          <InputItem
            value={editData['死亡时间年'] || ''}
            className="underline"
            style={{ width: 60 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['死亡时间年']: e.currentTarget.value
              })} />
          <span>年</span>
          <InputItem
            value={editData['死亡时间月'] || ''}
            className="underline"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['死亡时间月']: e.currentTarget.value
              })} />
          <span>月</span>
        </div>
      </div>
      <div className="sub-title">二、随访期间基本情况</div>
      <div className="form-area">
        <div className="data-row">
          <span className="row-title">随访期间就诊信息：门诊就诊次数：</span>
          <InputItem
            value={editData['门诊就诊次数'] || ''}
            className="underline"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['门诊就诊次数']: e.currentTarget.value
              })} />
          <span>次，</span>
          <span className="row-title">急诊就诊次数：</span>
          <InputItem
            value={editData['急诊就诊次数'] || ''}
            className="underline"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['急诊就诊次数']: e.currentTarget.value
              })} />
          <span>次，</span>
          <span className="row-title">住院次数：</span>
          <InputItem
            value={editData['急诊就诊次数'] || ''}
            className="underline"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['急诊就诊次数']: e.currentTarget.value
              })} />
          <span>次</span>
        </div>
        <div className="data-row">
          <span className="row-title">月均门诊医疗费用：</span>
          <InputItem
            value={editData['月均门诊医疗费用'] || ''}
            className="underline"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['月均门诊医疗费用']: e.currentTarget.value
              })} />
          <span>元</span>
        </div>
      </div>
    </div>
  </PageGroup>
}
const PageGroup = styled.div`
  .page-item{
    padding: 30px 40px!important;
  }
  .sub-title{
    font-size:14px;
    font-weight: bold;
    line-height: 24px;
  }
  .row-title{
    font-weight: bold;
  }
  .form-area{
    border: 1px solid #000;
    padding: 5px;
    margin-bottom: 8px;
  }
  .data-row{
    margin-bottom: 2px;
    &>*{
      vertical-align: middle;
    }
  }
`