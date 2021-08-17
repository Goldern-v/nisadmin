import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import InputItem from './renderItem/InputItem'
import RadioItem from './renderItem/RadioItem'
import CheckBoxItem from './renderItem/CheckBoxItem'

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
            value={editData['本次随访时间年']}
            className="underline align-center"
            style={{ width: 60 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['本次随访时间年']: e.currentTarget.value
              })} />
          <span>年</span>
          <InputItem
            value={editData['本次随访时间月']}
            className="underline align-center"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['本次随访时间月']: e.currentTarget.value
              })} />
          <span>月</span>
          <InputItem
            value={editData['日']}
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
            value={editData['随访方式']}
            originValue={'门诊'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }} />
          <RadioItem
            value={editData['随访方式']}
            originValue={'家访'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }} />
          <RadioItem
            value={editData['随访方式']}
            originValue={'电话'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }} />
          <RadioItem
            value={editData['随访方式']}
            originValue={'网络'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }} />
          <RadioItem
            value={editData['随访方式']}
            originValue={'其他'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访方式']: newVal })
            }} />
          <span>:</span>
          <InputItem
            value={editData['随访方式其他']}
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
            value={editData['是否失访']}
            originValue={'否'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['是否失访']: newVal })
            }} />
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['是否失访']}
            originValue={'是'}
            style={{ marginLeft: 65 }}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['是否失访']: newVal })
            }}>
            <span>是,</span>
          </RadioItem>
          <span className="row-title">失访原因：</span>
          <RadioItem
            value={editData['失访原因']}
            originValue={'失去联系'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['失访原因']: newVal })
            }}>
            <span>失去联系</span>
          </RadioItem>
          <RadioItem
            value={editData['失访原因']}
            originValue={'拒绝参加调查'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['失访原因']: newVal })
            }} />
          <RadioItem
            value={editData['失访原因']}
            originValue={'其他'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['失访原因']: newVal })
            }} />
          <span>:</span>
          <InputItem
            value={editData['失访原因其他']}
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
            value={editData['是否死亡']}
            originValue={'否'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['是否死亡']: newVal })
            }} />
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['是否死亡']}
            originValue={'是'}
            style={{ marginLeft: 65 }}
            editable={_editable}
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['是否死亡']: newVal })
            }}>
            <span>是,</span>
          </RadioItem>
          <span className="row-title">死亡原因：</span>
          <RadioItem
            value={editData['死亡原因']}
            originValue={'脑卒中'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }} />
          <RadioItem
            value={editData['死亡原因']}
            originValue={'冠心病'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }} />
          <RadioItem
            value={editData['死亡原因']}
            originValue={'恶性肿瘤'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }} />
          <RadioItem
            value={editData['死亡原因']}
            originValue={'呼吸系统疾病'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }} />
          <RadioItem
            value={editData['死亡原因']}
            originValue={'损伤和中毒'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }} />
          <RadioItem
            value={editData['死亡原因']}
            originValue={'其他'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }} />
          <RadioItem
            value={editData['死亡原因']}
            originValue={'不详'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['死亡原因']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title" style={{ marginLeft: 113 }}>死亡时间：</span>
          <InputItem
            value={editData['死亡时间年']}
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
            value={editData['死亡时间月']}
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
            value={editData['门诊就诊次数']}
            className="underline"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['门诊就诊次数']: e.currentTarget.value
              })} />
          <span>次,</span>
          <span className="row-title">急诊就诊次数：</span>
          <InputItem
            value={editData['急诊就诊次数']}
            className="underline"
            style={{ width: 40 }}
            editable={_editable}
            onChange={(e: any) =>
              onItemDataChange && onItemDataChange({
                ...itemData,
                ['急诊就诊次数']: e.currentTarget.value
              })} />
          <span>次,</span>
          <span className="row-title">住院次数：</span>
          <InputItem
            value={editData['急诊就诊次数']}
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
          <span className="row-title" style={{ marginLeft: 117 }}>月均门诊医疗费用：</span>
          <InputItem
            value={editData['月均门诊医疗费用']}
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
        <div className="data-row">
          <span className="row-title">随访期间护理人员：</span>
          <CheckBoxItem
            value={itemData['随访期间护理人员']}
            originValue={'家属'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {

              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访期间护理人员']: newVal
              })
            }} />
          <CheckBoxItem
            value={itemData['随访期间护理人员']}
            originValue={'医疗机构护理人员'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {

              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访期间护理人员']: newVal
              })
            }} />
          <CheckBoxItem
            value={itemData['随访期间护理人员']}
            originValue={'保姆'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {

              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访期间护理人员']: newVal
              })
            }} />
          <CheckBoxItem
            value={itemData['随访期间护理人员']}
            originValue={'自我照顾'}
            editable={_editable}
            showValue
            onChange={(newVal: string) => {

              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访期间护理人员']: newVal
              })
            }} />
          <CheckBoxItem
            value={itemData['随访期间护理人员']}
            originValue={'其他'}
            editable={_editable} showValue
            onChange={(newVal: string) => {

              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访期间护理人员']: newVal
              })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">随访期间工作情况：</span>
          <RadioItem
            value={editData['随访期间工作情况']}
            originValue={'正常工作'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访期间工作情况']: newVal })
            }} />
          <RadioItem
            value={editData['随访期间工作情况']}
            originValue={'出勤减少'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访期间工作情况']: newVal })
            }} />
          <RadioItem
            value={editData['随访期间工作情况']}
            originValue={'不工作'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange && onItemDataChange({ ...itemData, ['随访期间工作情况']: newVal })
            }} />
        </div>
      </div>
      <div className="sub-title">二、随访期间基本情况</div>
      <div className="form-area no-padding">
        <div className="data-row with-padding border-bottom">
          <span className="row-title">3.1随访期间新发疾病事件</span>
          <span>（期间存在多次发作的,发病时间填写第一次发病时间）</span>
        </div>
        <div className="data-row with-padding border-bottom">
          <div className="data-row">
            <CheckBoxItem
              value={itemData['随访期间新发疾病事件']}
              originValue={'卒中'}
              editable={_editable} showValue
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病事件']: newVal
                })
              }}
            >
              <span>卒中</span>
            </CheckBoxItem>
            <span>,卒中类型：</span>
            <CheckBoxItem
              value={itemData['卒中类型']}
              originValue={'脑梗死'}
              editable={_editable} showValue
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['卒中类型']: newVal
                })
              }}
            >
              <span>脑梗死</span>
            </CheckBoxItem>
            <CheckBoxItem
              value={itemData['卒中类型']}
              originValue={'脑出血'}
              editable={_editable} showValue
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['卒中类型']: newVal
                })
              }}
            >
              <span>脑出血</span>
            </CheckBoxItem>
            <CheckBoxItem
              value={itemData['卒中类型']}
              originValue={'蛛网膜下腔出血'}
              editable={_editable} showValue
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['卒中类型']: newVal
                })
              }}
            >
              <span>蛛网膜下腔出血</span>
            </CheckBoxItem>
            <CheckBoxItem
              value={itemData['卒中类型']}
              originValue={'其他未分类卒中'}
              editable={_editable}
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['卒中类型']: newVal
                })
              }}
            >
              <span>其他未分类卒中,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['卒中发病时间年']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['卒中发病时间年']: e.currentTarget.value
                })} />
            <span>年</span>
            <InputItem
              value={editData['卒中发病时间月']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['卒中发病时间月']: e.currentTarget.value
                })} />
            <span>月</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={itemData['随访期间新发疾病事件']}
              originValue={'TIA'}
              editable={_editable}
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病事件']: newVal
                })
              }}
            >
              <span>TIA,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['TIA发病时间年']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['TIA发病时间年']: e.currentTarget.value
                })} />
            <span>年</span>
            <InputItem
              value={editData['TIA发病时间月']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['TIA发病时间月']: e.currentTarget.value
                })} />
            <span>月</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={itemData['随访期间新发疾病事件']}
              originValue={'心肌梗死'}
              editable={_editable}
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病事件']: newVal
                })
              }}
            >
              <span>心肌梗死,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['心肌梗死发病时间年']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['心肌梗死发病时间年']: e.currentTarget.value
                })} />
            <span>年</span>
            <InputItem
              value={editData['心肌梗死发病时间月']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['心肌梗死发病时间月']: e.currentTarget.value
                })} />
            <span>月</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={itemData['随访期间新发疾病事件']}
              originValue={'不稳定心绞痛'}
              editable={_editable}
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病事件']: newVal
                })
              }}
            >
              <span>不稳定心绞痛,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['不稳定心绞痛发病时间年']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['不稳定心绞痛发病时间年']: e.currentTarget.value
                })} />
            <span>年</span>
            <InputItem
              value={editData['不稳定心绞痛发病时间月']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['不稳定心绞痛发病时间月']: e.currentTarget.value
                })} />
            <span>月</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={itemData['随访期间新发疾病事件']}
              originValue={'心力衰竭'}
              editable={_editable}
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病事件']: newVal
                })
              }}
            >
              <span>心力衰竭（住院）,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['心力衰竭发病时间年']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['心力衰竭发病时间年']: e.currentTarget.value
                })} />
            <span>年</span>
            <InputItem
              value={editData['心力衰竭发病时间月']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['心力衰竭发病时间月']: e.currentTarget.value
                })} />
            <span>月</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={itemData['随访期间新发疾病事件']}
              originValue={'肺栓塞'}
              editable={_editable}
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病事件']: newVal
                })
              }}
            >
              <span>肺栓塞,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['肺栓塞发病时间年']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['肺栓塞发病时间年']: e.currentTarget.value
                })} />
            <span>年</span>
            <InputItem
              value={editData['肺栓塞发病时间月']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['肺栓塞发病时间月']: e.currentTarget.value
                })} />
            <span>月</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={itemData['随访期间新发疾病事件']}
              originValue={'周围血管疾病'}
              editable={_editable}
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病事件']: newVal
                })
              }}
            >
              <span>周围血管疾病（住院）,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['周围血管疾病发病时间年']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['周围血管疾病发病时间年']: e.currentTarget.value
                })} />
            <span>年</span>
            <InputItem
              value={editData['周围血管疾病发病时间月']}
              className="underline"
              style={{ width: 60 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['周围血管疾病发病时间月']: e.currentTarget.value
                })} />
            <span>月</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={itemData['随访期间新发疾病事件']}
              originValue={'因其他疾病住院'}
              editable={_editable}
              onChange={(newVal: string) => {

                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病事件']: newVal
                })
              }}
            >
              <span>因其他疾病住院,</span>
            </CheckBoxItem>
            <span>住院主要诊断：</span>
            <InputItem
              value={editData['因其他疾病住院发病时间年']}
              className="underline"
              style={{ width: 425 }}
              editable={_editable}
              onChange={(e: any) =>
                onItemDataChange && onItemDataChange({
                  ...itemData,
                  ['因其他疾病住院发病时间年']: e.currentTarget.value
                })} />
          </div>
        </div>
        <div className="data-row with-padding border-bottom">
          <span className="row-title">3.2随访期间新发疾病危险因素</span>
        </div>
        <div className="data-row with-padding">
          <CheckBoxItem
            value={itemData['随访期间新发疾病危险因素']}
            originValue={'高血压'}
            editable={_editable} showValue
            onChange={(newVal: string) => {

              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访期间新发疾病危险因素']: newVal
              })
            }} />
          <CheckBoxItem
            value={itemData['随访期间新发疾病危险因素']}
            originValue={'糖尿病'}
            editable={_editable} showValue
            onChange={(newVal: string) => {

              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访期间新发疾病危险因素']: newVal
              })
            }} />
          <CheckBoxItem
            value={itemData['随访期间新发疾病危险因素']}
            originValue={'血脂异常'}
            editable={_editable} showValue
            onChange={(newVal: string) => {

              onItemDataChange && onItemDataChange({
                ...itemData,
                ['随访期间新发疾病危险因素']: newVal
              })
            }} />
          <CheckBoxItem
            value={itemData['随访期间新发疾病危险因素']}
            originValue={'房颤口以上均无'}
            editable={_editable} showValue
            onChange={(newVal: string) => {

              onItemDataChange &&
                onItemDataChange({
                  ...itemData,
                  ['随访期间新发疾病危险因素']: newVal
                })
            }} />
        </div>
      </div>
      <div className="sub-title">四、随访期间生活方式</div>
      <div className="form-area">
        <div className="data-row">
          <span className="sub-row">吸烟情况：</span>
          <RadioItem
            value={editData['吸烟情况']}
            originValue={'从不吸烟'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['吸烟情况']: newVal })
            }} />
          <RadioItem
            value={editData['吸烟情况']}
            originValue={'现在吸烟'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['吸烟情况']: newVal })
            }} />
          <RadioItem
            value={editData['吸烟情况']}
            originValue={'已戒烟'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['吸烟情况']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="sub-row">饮酒情况：</span>
          <RadioItem
            value={editData['饮酒情况']}
            originValue={'从不饮酒'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['饮酒情况']: newVal })
            }} />
          <RadioItem
            value={editData['饮酒情况']}
            originValue={'少量饮酒'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['饮酒情况']: newVal })
            }} />
          <RadioItem
            value={editData['饮酒情况']}
            originValue={'经常大量饮酒'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['饮酒情况']: newVal })
            }} />
          <RadioItem
            value={editData['饮酒情况']}
            originValue={'已戒酒'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['饮酒情况']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="sub-row">运动情况：</span>
          <RadioItem
            value={editData['运动情况']}
            originValue={'经常运动'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['运动情况']: newVal })
            }} />
          <span>（相当于快步走的中等强度运动，且每周≥3次、每次≥30分钟)</span>
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['运动情况']}
            originValue={'缺乏运动'}
            style={{ marginLeft: 60 }}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['运动情况']: newVal })
            }} />
        </div>
      </div>
      <div className="sub-title">五、随访期间危险因素控制情况</div>
      <div className="form-area">
        <div className="data-row">
          <span className="row-title">血压</span>
        </div>
      </div>
    </div>
    <div className="page-item">
      <div className="form-area">
        <div className="data-row with-padding border-bottom">
          <span className="row-title">血压测量频率：</span>
          <RadioItem
            value={editData['血压测量频率']}
            originValue={'每周测量'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['血压测量频率']: newVal })
            }} />
          <RadioItem
            value={editData['血压测量频率']}
            originValue={'每月测量'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['血压测量频率']: newVal })
            }} />
          <RadioItem
            value={editData['血压测量频率']}
            originValue={'每月测量'}
            editable={_editable} showValue
            onChange={(newVal: string) => {
              onItemDataChange &&
                onItemDataChange({ ...itemData, ['血压测量频率']: newVal })
            }} />
        </div>
        <div className="data-row with-padding border-bottom">
          <span className="row-title">血糖（糖尿病患者填写）</span>
        </div>
        <div className="data-row with-padding">
          <span className="row-title">血糖测量频率：</span>
        </div>
      </div>
    </div>
  </PageGroup>
}
const PageGroup = styled.div`
  .page-item{
    padding: 30px 40px!important;
    margin-bottom:20px;
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
    &.no-padding{
      padding: 0;
    }
  }
  .data-row{
    margin-bottom: 2px;
    &>*{
      vertical-align: middle;
    }
    &.with-padding{
      padding: 3px 5px;
      margin: 0;
    }
    &.border-bottom{
      border-bottom: 1px solid #000;
    }
  }
`