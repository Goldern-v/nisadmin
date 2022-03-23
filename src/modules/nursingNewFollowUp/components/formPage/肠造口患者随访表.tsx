import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import InputItem from './renderItem/InputItem'
import RadioItem from './renderItem/RadioItem'
import CheckBoxItem from './renderItem/CheckBoxItem'

export default function 肠造口患者随访表(props: any) {
  const { editable, itemDataMap, onItemDataMapChange, master, onMasterChange, } = props

  const editData = itemDataMap || {}

  const masterData = master || {}

  return <PageGroup>
    <div className="page-item">
      <div className="form-title">
        <div>肠造口患者随访表</div>
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
            value={editData['V002001']}
            className="underline align-center"
            style={{ width: 180 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V002001']: e.currentTarget.value
              })} />
        </div>
        <div className="data-row">
          <span className="row-title">随访方式：</span>
          <RadioItem
            value={editData['V002002']}
            originValue={'门诊'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V002002']: newVal })
            }} />
          <RadioItem
            value={editData['V002002']}
            originValue={'家访'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V002002']: newVal })
            }} />
          <RadioItem
            value={editData['V002002']}
            originValue={'电话'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V002002']: newVal })
            }} />
          <RadioItem
            value={editData['V002002']}
            originValue={'网络'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V002002']: newVal })
            }} />
          <RadioItem
            value={editData['V002002']}
            originValue={'其他'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V002002']: newVal })
            }} />
          <span>:</span>
          <InputItem
            value={editData['V001071']}
            className="underline"
            style={{ width: 180 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001071']: e.currentTarget.value
              })} />
        </div>
        <div className="data-row">
          <span className="row-title">造肠口手术日期：</span>
          <InputItem
            value={editData['V009001']}
            className="underline align-center"
            style={{ width: 180 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V009001']: e.currentTarget.value
              })} />
        </div>
        <div className="data-row">
          <span className="row-title">造口类型：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'结肠造口'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'回肠造口'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'尿路造口'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'其他'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <span>:</span>
          <InputItem
            value={editData['V001071']}
            className="underline"
            style={{ width: 180 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001071']: e.currentTarget.value
              })} />
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['V001001']}
            originValue={'永久性造口'}
            style={{ marginLeft: 65 }}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
            <RadioItem
            value={editData['V001001']}
            originValue={'临时性造口'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">造口高度：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'凸出腹壁'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'与腹壁平齐'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'低于腹壁平面'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">造口黏膜颜色：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'红润'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'发紫'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'发黑'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">造口用品类型：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'一件式'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'二件式'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">底盘类型：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'平面'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'凸面'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'透明袋'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'不透明袋'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'尿路造口袋'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title" style={{marginLeft: 26}}>袋子：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'闭口袋'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'开口袋'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">是否失访：</span>
          <RadioItem
            value={editData['V001002']}
            originValue={'否'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001002']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">造口附件：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'腰带'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'防漏膏'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'防漏条/环'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'护肤粉'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'皮肤保护膜'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'过滤片'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">获得造口产品的途径：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'在医院购买'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'网购'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">医保状况：</span>
          <RadioItem
            value={editData['V001001']}
            originValue={'城镇职工基本医疗保险'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'城镇居民医疗保险'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'新农合'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'商业保险'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'部队医疗'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
          <RadioItem
            value={editData['V001001']}
            originValue={'全自付'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001001']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">是否失访：</span>
          <RadioItem
            value={editData['V001002']}
            originValue={'否'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001002']: newVal })
            }} />
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['V001002']}
            originValue={'是'}
            style={{ marginLeft: 65 }}
            editable={editable}
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001002']: newVal })
            }}>
            <span>是,</span>
          </RadioItem>
          <span className="row-title">失访原因：</span>
          <RadioItem
            value={editData['V001003']}
            originValue={'失去联系'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001003']: newVal })
            }}>
            <span>失去联系</span>
          </RadioItem>
          <RadioItem
            value={editData['V001003']}
            originValue={'拒绝参加调查'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001003']: newVal })
            }} />
          <RadioItem
            value={editData['V001003']}
            originValue={'其他'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001003']: newVal })
            }} />
          <span>:</span>
          <InputItem
            value={editData['V001004']}
            className="underline"
            style={{ width: 180 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001004']: e.currentTarget.value
              })} />
        </div>
        <div className="data-row">
          <span className="row-title">是否死亡：</span>
          <RadioItem
            value={editData['V001005']}
            originValue={'否'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001005']: newVal })
            }} />
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['V001005']}
            originValue={'是'}
            style={{ marginLeft: 65 }}
            editable={editable}
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001005']: newVal })
            }}>
            <span>是,</span>
          </RadioItem>
          <span className="row-title">死亡原因：</span>
          <RadioItem
            value={editData['V001006']}
            originValue={'脑卒中'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001006']: newVal })
            }} />
          <RadioItem
            value={editData['V001006']}
            originValue={'冠心病'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001006']: newVal })
            }} />
          <RadioItem
            value={editData['V001006']}
            originValue={'恶性肿瘤'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001006']: newVal })
            }} />
          <RadioItem
            value={editData['V001006']}
            originValue={'呼吸系统疾病'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001006']: newVal })
            }} />
          <RadioItem
            value={editData['V001006']}
            originValue={'损伤和中毒'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001006']: newVal })
            }} />
          <RadioItem
            value={editData['V001006']}
            originValue={'其他'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001006']: newVal })
            }} />
          <RadioItem
            value={editData['V001006']}
            originValue={'不详'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001006']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title" style={{ marginLeft: 113 }}>死亡时间：</span>
          <InputItem
            value={editData['V001007']}
            className="underline"
            style={{ width: 180 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001007']: e.currentTarget.value
              })} />
        </div>
      </div>
      <div className="sub-title">二、随访期间基本情况</div>
      <div className="form-area">
        <div className="data-row">
          <span className="row-title">随访期间就诊信息：门诊就诊次数：</span>
          <InputItem
            value={editData['V001008']}
            className="underline"
            style={{ width: 40 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001008']: e.currentTarget.value
              })} />
          <span>次,</span>
          <span className="row-title">急诊就诊次数：</span>
          <InputItem
            value={editData['V001009']}
            className="underline"
            style={{ width: 40 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001009']: e.currentTarget.value
              })} />
          <span>次,</span>
          <span className="row-title">住院次数：</span>
          <InputItem
            value={editData['V001010']}
            className="underline"
            style={{ width: 40 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001010']: e.currentTarget.value
              })} />
          <span>次</span>
        </div>
        <div className="data-row">
          <span className="row-title" style={{ marginLeft: 117 }}>月均门诊医疗费用：</span>
          <InputItem
            value={editData['V001011']}
            className="underline"
            style={{ width: 60 }}
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001011']: e.currentTarget.value
              })} />
          <span>元</span>
        </div>
        <div className="data-row">
          <span className="row-title">随访期间护理人员：</span>
          <CheckBoxItem
            value={editData['V001012']}
            originValue={'家属'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {

              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001012']: newVal
              })
            }} />
          <CheckBoxItem
            value={editData['V001012']}
            originValue={'医疗机构护理人员'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {

              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001012']: newVal
              })
            }} />
          <CheckBoxItem
            value={editData['V001012']}
            originValue={'保姆'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {

              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001012']: newVal
              })
            }} />
          <CheckBoxItem
            value={editData['V001012']}
            originValue={'自我照顾'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {

              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001012']: newVal
              })
            }} />
          <CheckBoxItem
            value={editData['V001012']}
            originValue={'其他'}
            editable={editable} showValue
            onChange={(newVal: string) => {

              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001012']: newVal
              })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">随访期间工作情况：</span>
          <RadioItem
            value={editData['V001013']}
            originValue={'正常工作'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001013']: newVal })
            }} />
          <RadioItem
            value={editData['V001013']}
            originValue={'出勤减少'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001013']: newVal })
            }} />
          <RadioItem
            value={editData['V001013']}
            originValue={'不工作'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange && onItemDataMapChange({ ...editData, ['V001013']: newVal })
            }} />
        </div>
      </div>
      <div className="sub-title">三、随访期间新发事件</div>
      <div className="form-area no-padding">
        <div className="data-row with-padding border-bottom">
          <span className="row-title">3.1随访期间新发疾病事件</span>
          <span>（期间存在多次发作的,发病时间填写第一次发病时间）</span>
        </div>
        <div className="data-row with-padding border-bottom">
          <div className="data-row">
            <CheckBoxItem
              value={editData['V001014']}
              originValue={'卒中'}
              editable={editable} showValue
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001014']: newVal
                })
              }}
            >
              <span>卒中</span>
            </CheckBoxItem>
            <span>,卒中类型：</span>
            <CheckBoxItem
              value={editData['V001015']}
              originValue={'脑梗死'}
              editable={editable} showValue
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001015']: newVal
                })
              }}
            >
              <span>脑梗死</span>
            </CheckBoxItem>
            <CheckBoxItem
              value={editData['V001015']}
              originValue={'脑出血'}
              editable={editable} showValue
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001015']: newVal
                })
              }}
            >
              <span>脑出血</span>
            </CheckBoxItem>
            <CheckBoxItem
              value={editData['V001015']}
              originValue={'蛛网膜下腔出血'}
              editable={editable} showValue
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001015']: newVal
                })
              }}
            >
              <span>蛛网膜下腔出血</span>
            </CheckBoxItem>
            <CheckBoxItem
              value={editData['V001015']}
              originValue={'其他未分类卒中'}
              editable={editable}
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001015']: newVal
                })
              }}
            >
              <span>其他未分类卒中,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['V001016']}
              className="underline"
              style={{ width: 150 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001016']: e.currentTarget.value
                })} />
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={editData['V001014']}
              originValue={'TIA'}
              editable={editable}
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001014']: newVal
                })
              }}
            >
              <span>TIA,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['V001017']}
              className="underline"
              style={{ width: 180 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001017']: e.currentTarget.value
                })} />
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={editData['V001014']}
              originValue={'心肌梗死'}
              editable={editable}
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001014']: newVal
                })
              }}
            >
              <span>心肌梗死,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['V001018']}
              className="underline"
              style={{ width: 180 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001018']: e.currentTarget.value
                })} />
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={editData['V001014']}
              originValue={'不稳定心绞痛'}
              editable={editable}
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001014']: newVal
                })
              }}
            >
              <span>不稳定心绞痛,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['V001019']}
              className="underline"
              style={{ width: 180 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001019']: e.currentTarget.value
                })} />
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={editData['V001014']}
              originValue={'心力衰竭'}
              editable={editable}
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001014']: newVal
                })
              }}
            >
              <span>心力衰竭（住院）,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['V001020']}
              className="underline"
              style={{ width: 180 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001020']: e.currentTarget.value
                })} />
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={editData['V001014']}
              originValue={'肺栓塞'}
              editable={editable}
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001014']: newVal
                })
              }}
            >
              <span>肺栓塞,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['V001021']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001021']: e.currentTarget.value
                })} />
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={editData['V001014']}
              originValue={'周围血管疾病'}
              editable={editable}
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001014']: newVal
                })
              }}
            >
              <span>周围血管疾病（住院）,</span>
            </CheckBoxItem>
            <span>发病时间:</span>
            <InputItem
              value={editData['V001022']}
              className="underline"
              style={{ width: 180 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001022']: e.currentTarget.value
                })} />
          </div>
          <div className="data-row">
            <CheckBoxItem
              value={editData['V001014']}
              originValue={'因其他疾病住院'}
              editable={editable}
              onChange={(newVal: string) => {

                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001014']: newVal
                })
              }}
            >
              <span>因其他疾病住院,</span>
            </CheckBoxItem>
            <span>住院主要诊断：</span>
            <InputItem
              value={editData['V001023']}
              className="underline"
              style={{ width: 425 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001023']: e.currentTarget.value
                })} />
          </div>
        </div>
        <div className="data-row with-padding border-bottom">
          <span className="row-title">3.2随访期间新发疾病危险因素</span>
        </div>
        <div className="data-row with-padding">
          <CheckBoxItem
            value={editData['V001024']}
            originValue={'高血压'}
            editable={editable} showValue
            onChange={(newVal: string) => {

              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001024']: newVal
              })
            }} />
          <CheckBoxItem
            value={editData['V001024']}
            originValue={'糖尿病'}
            editable={editable} showValue
            onChange={(newVal: string) => {

              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001024']: newVal
              })
            }} />
          <CheckBoxItem
            value={editData['V001024']}
            originValue={'血脂异常'}
            editable={editable} showValue
            onChange={(newVal: string) => {

              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001024']: newVal
              })
            }} />
          <CheckBoxItem
            value={editData['V001024']}
            originValue={'房颤口以上均无'}
            editable={editable} showValue
            onChange={(newVal: string) => {

              onItemDataMapChange &&
                onItemDataMapChange({
                  ...editData,
                  ['V001024']: newVal
                })
            }} />
        </div>
      </div>
      <div className="sub-title">四、随访期间生活方式</div>
      <div className="form-area">
        <div className="data-row">
          <span className="sub-row">吸烟情况：</span>
          <RadioItem
            value={editData['V001025']}
            originValue={'从不吸烟'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001025']: newVal })
            }} />
          <RadioItem
            value={editData['V001025']}
            originValue={'现在吸烟'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001025']: newVal })
            }} />
          <RadioItem
            value={editData['V001025']}
            originValue={'已戒烟'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001025']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="sub-row">饮酒情况：</span>
          <RadioItem
            value={editData['V001026']}
            originValue={'从不饮酒'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001026']: newVal })
            }} />
          <RadioItem
            value={editData['V001026']}
            originValue={'少量饮酒'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001026']: newVal })
            }} />
          <RadioItem
            value={editData['V001026']}
            originValue={'经常大量饮酒'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001026']: newVal })
            }} />
          <RadioItem
            value={editData['V001026']}
            originValue={'已戒酒'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001026']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="sub-row">运动情况：</span>
          <RadioItem
            value={editData['V001027']}
            originValue={'经常运动'}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001027']: newVal })
            }} />
          <span>（相当于快步走的中等强度运动,且每周≥3次、每次≥30分钟)</span>
        </div>
        <div className="data-row">
          <RadioItem
            value={editData['V001027']}
            originValue={'缺乏运动'}
            style={{ marginLeft: 60 }}
            editable={editable} showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001027']: newVal })
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
      <div className="form-area no-padding">
        <div className="data-row with-padding border-bottom">
          <div className="data-row">
            <span className="row-title">血压测量频率：</span>
            <RadioItem
              value={editData['V001028']}
              originValue={'每周测量'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001028']: newVal })
              }} />
            <RadioItem
              value={editData['V001028']}
              originValue={'每月测量'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001028']: newVal })
              }} />
            <RadioItem
              value={editData['V001028']}
              originValue={'未达到'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001028']: newVal })
              }} />
            <RadioItem
              value={editData['V001028']}
              originValue={'未测量'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001028']: newVal })
              }} />
          </div>
          <div className="data-row">
            <span className="row-title">平时血压水平：</span>
          </div>
          <div className="data-row">
            <span className="row-title" style={{ marginLeft: 30 }}>收缩压：</span>
            <RadioItem
              value={editData['V001029']}
              originValue={'<120mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001029']: newVal })
              }} />
            <RadioItem
              value={editData['V001029']}
              originValue={'120~139mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001029']: newVal })
              }} />
            <RadioItem
              value={editData['V001029']}
              originValue={'140~159mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001029']: newVal })
              }} />
            <RadioItem
              value={editData['V001029']}
              originValue={'160~179mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001029']: newVal })
              }} />
            <RadioItem
              value={editData['V001029']}
              originValue={'>=180mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001029']: newVal })
              }} />
          </div>
          <div className="data-row">
            <span className="row-title" style={{ marginLeft: 30 }}>舒张压：</span>
            <RadioItem
              value={editData['V001030']}
              originValue={'<80mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001030']: newVal })
              }} />
            <RadioItem
              value={editData['V001030']}
              originValue={'80~89mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001030']: newVal })
              }} />
            <RadioItem
              value={editData['V001030']}
              originValue={'90~99mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001030']: newVal })
              }} />
            <RadioItem
              value={editData['V001030']}
              originValue={'100~109mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001030']: newVal })
              }} />
            <RadioItem
              value={editData['V001030']}
              originValue={'>=110mmHg'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001030']: newVal })
              }} />
          </div>
        </div>
        <div className="data-row with-padding border-bottom">
          <span className="row-title">血糖（糖尿病患者填写）</span>
        </div>
        <div className="data-row with-padding">
          <div className="data-row">
            <span className="row-title">血糖测量频率：</span>
            <RadioItem
              value={editData['V001031']}
              originValue={'每周测量'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001031']: newVal })
              }} />
            <RadioItem
              value={editData['V001031']}
              originValue={'每月测量'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001031']: newVal })
              }} />
            <RadioItem
              value={editData['V001031']}
              originValue={'未达到'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001031']: newVal })
              }} />
            <RadioItem
              value={editData['V001031']}
              originValue={'未测量'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001031']: newVal })
              }} />
          </div>
          <div className="data-row">
            <span className="row-title">平时血糖水平：</span>
            <span>空腹血糖：</span>
            <RadioItem
              value={editData['V001032']}
              originValue={'<7.0mmol/L'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001032']: newVal })
              }} />
            <RadioItem
              value={editData['V001032']}
              originValue={'≥7.1mmol/L'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001032']: newVal })
              }} />
          </div>
          <div className="data-row">
            <span style={{ marginLeft: 90 }}>餐后两小时血糖：</span>
            <RadioItem
              value={editData['V001033']}
              originValue={'<11.1 mmol/L'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001033']: newVal })
              }} />
            <RadioItem
              value={editData['V001033']}
              originValue={'≥11.1 mmol/L'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001033']: newVal })
              }} />
          </div>
        </div>
      </div>
      <div className="sub-title">六、随访期间用药情况</div>
      <div className="form-area no-padding">
        <div className="data-row with-padding border-bottom">
          <div className="data-row">
            <span className="row-title">抗栓药物：</span>
            <RadioItem
              value={editData['V001034']}
              originValue={'是'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001034']: newVal })
              }} />
            <RadioItem
              value={editData['V001034']}
              originValue={'否'}
              editable={editable} showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001034']: newVal })
              }} />
          </div>
          <div className="data-row">
            <span className="row-title">服用药物名称：</span>
            <CheckBoxItem
              value={editData['V001035']}
              originValue={'阿司匹林'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001036']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001036']: e.currentTarget.value
                })} />
            <span>mg</span>
            <CheckBoxItem
              style={{ marginLeft: 100 }}
              value={editData['V001035']}
              originValue={'氯吡格雷'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001041']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001041']: e.currentTarget.value
                })} />
            <span>mg</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              style={{ marginLeft: 91 }}
              value={editData['V001035']}
              originValue={'奥扎格雷'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001037']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001037']: e.currentTarget.value
                })} />
            <span>mg</span>
            <CheckBoxItem
              style={{ marginLeft: 100 }}
              value={editData['V001035']}
              originValue={'双嘧达莫'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001042']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001042']: e.currentTarget.value
                })} />
            <span>mg</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              style={{ marginLeft: 91 }}
              value={editData['V001035']}
              originValue={'塞氯吡啶'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001038']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001038']: e.currentTarget.value
                })} />
            <span>mg</span>
            <CheckBoxItem
              style={{ marginLeft: 100 }}
              value={editData['V001035']}
              originValue={'西洛他唑'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001043']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001043']: e.currentTarget.value
                })} />
            <span>mg</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              style={{ marginLeft: 91 }}
              value={editData['V001035']}
              originValue={'华法令'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001039']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001039']: e.currentTarget.value
                })} />
            <span>mg</span>
            <CheckBoxItem
              style={{ marginLeft: 113 }}
              value={editData['V001035']}
              originValue={'达比加群'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001044']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001044']: e.currentTarget.value
                })} />
            <span>mg</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              style={{ marginLeft: 91 }}
              value={editData['V001035']}
              originValue={'利伐沙班'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001040']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001040']: e.currentTarget.value
                })} />
            <span>mg</span>
            <CheckBoxItem
              style={{ marginLeft: 100 }}
              value={editData['V001035']}
              originValue={'阿哌沙班'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">,每日剂量</span>
            <InputItem
              value={editData['V001045']}
              className="underline"
              style={{ width: 60 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001045']: e.currentTarget.value
                })} />
            <span>mg</span>
          </div>
          <div className="data-row">
            <CheckBoxItem
              style={{ marginLeft: 91 }}
              value={editData['V001035']}
              originValue={'其他药品'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001035']: newVal })
              }} />
            <span className="row-title">:</span>
            <InputItem
              value={editData['V001046']}
              className="underline"
              style={{ width: 180 }}
              editable={editable}
              onChange={(e: any) =>
                onItemDataMapChange && onItemDataMapChange({
                  ...editData,
                  ['V001046']: e.currentTarget.value
                })} />
          </div>
        </div>
        <div className="data-row with-padding border-bottom">
          <div className="data-row">
            <span className="row-title">降压药：</span>
            <RadioItem
              value={editData['V001047']}
              originValue={'是'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001047']: newVal })
              }} />
            <RadioItem
              value={editData['V001047']}
              originValue={'否'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001047']: newVal })
              }} />
          </div>
          <div className="data-row">
            <span className="row-title">服用降糖药类型：</span>
            <CheckBoxItem
              value={editData['V001051']}
              originValue={'胰岛素'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001051']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001051']}
              originValue={'磺酰脲类'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001051']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001051']}
              originValue={'双胍类'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001051']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001051']}
              originValue={'α糖苷酶抑制剂'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001051']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001051']}
              originValue={'胰岛素增敏剂'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001051']: newVal })
              }} />
          </div>
          <div className="data-row">
            <CheckBoxItem
              style={{ marginLeft: 104 }}
              value={editData['V001051']}
              originValue={'非磺酰脲类促胰岛素分泌剂'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001051']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001051']}
              originValue={'其他'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001051']: newVal })
              }} />
          </div>
        </div>
        <div className="data-row with-padding">
          <div className="data-row">
            <span className="row-title">调脂药：</span>
            <RadioItem
              value={editData['V001052']}
              originValue={'是'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001052']: newVal })
              }} />
            <RadioItem
              value={editData['V001052']}
              originValue={'否'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001052']: newVal })
              }} />
          </div>
          <div className="data-row">
            <span className="row-title">服用调脂药类型：</span>
            <CheckBoxItem
              value={editData['V001053']}
              originValue={'他汀类'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001053']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001053']}
              originValue={'贝特类'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001053']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001053']}
              originValue={'烟酸及其衍生物'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001053']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001053']}
              originValue={'胆固醇吸收抑制剂'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001053']: newVal })
              }} />
            <CheckBoxItem
              value={editData['V001053']}
              originValue={'其他'}
              editable={editable}
              showValue
              onChange={(newVal: string) => {
                onItemDataMapChange &&
                  onItemDataMapChange({ ...editData, ['V001053']: newVal })
              }} />
          </div>
        </div>
      </div>
      <div className="sub-title">七、评分</div>
      <div className="form-area">
        <div className="data-row">
          <span className="row-title">mRS评分：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001054']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001054']: e.currentTarget.value
              })} />
          <span>分；</span>
          <RadioItem
            value={editData['V001069']}
            originValue={'未评分'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001069']: newVal })
            }} />
        </div>
        <div className="data-row">
          <span className="row-title">NIHSS评分（面访必填）：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001055']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001055']: e.currentTarget.value
              })} />
          <span>分；</span>
          <RadioItem
            value={editData['V001070']}
            originValue={'未评分'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001070']: newVal })
            }} />
        </div>
      </div>
      <div className="sub-title">八、检查（12个月随访患者必填）</div>
      <div className="sub-title" style={{ fontSize: 14 }}>8.1体格检查</div>
      <div className="form-area">
        <div className="data-row">
          <span className="row-title">体重：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001056']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001056']: e.currentTarget.value
              })} />
          <span>kg,</span>
          <span className="row-title">收缩压：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001057']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001057']: e.currentTarget.value
              })} />
          <span>mmHg,</span>
          <span className="row-title">舒张压：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001058']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001058']: e.currentTarget.value
              })} />
          <span>mmHg</span>
        </div>
        <div className="data-row">
          <span className="row-title">心电图：</span>
          <RadioItem
            value={editData['V001059']}
            originValue={'已查'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001059']: newVal })
            }} />
          <RadioItem
            value={editData['V001059']}
            originValue={'未查'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001059']: newVal })
            }} />
          <span className="row-title">,检查结果：</span>
          <CheckBoxItem
            value={editData['V001060']}
            originValue={'房颤'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001060']: newVal })
            }} />
          <CheckBoxItem
            value={editData['V001060']}
            originValue={'房扑'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001060']: newVal })
            }} />
          <CheckBoxItem
            value={editData['V001060']}
            originValue={'其他类型'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001060']: newVal })
            }} />
          <CheckBoxItem
            value={editData['V001060']}
            originValue={'正常'}
            editable={editable}
            showValue
            onChange={(newVal: string) => {
              onItemDataMapChange &&
                onItemDataMapChange({ ...editData, ['V001060']: newVal })
            }} />
        </div>
      </div>
      <div className="sub-title" style={{ fontSize: 14 }}>8.2实验室检验</div>
      <div className="form-area">
        <div className="data-row">
          <span className="row-title">血糖：空腹血糖：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001061']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001061']: e.currentTarget.value
              })} />
          <span>mmol/L,</span>
          <span className="row-tite">餐后两小时血糖（推荐）：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001062']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001062']: e.currentTarget.value
              })} />
          <span>mmol/L,</span>
          <span className="row-title">糖化血红蛋白：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001063']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001063']: e.currentTarget.value
              })} />
          <span>%</span>
        </div>
        <div className="data-row">
          <span className="row-title">血脂四项：甘油三酯：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001064']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001064']: e.currentTarget.value
              })} />
          <span>mmol/L,</span>
          <span className="row-title">胆固醇：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001065']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001065']: e.currentTarget.value
              })} />
          <span>mmol/L,</span>
        </div>
        <div className="data-row">
          <span className="row-title" style={{ marginLeft: 64 }}>低密度脂蛋白胆固醇：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001066']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001066']: e.currentTarget.value
              })} />
          <span>mmol/L,</span>
          <span className="row-title">高密度脂蛋白胆固醇：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001067']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001067']: e.currentTarget.value
              })} />
          <span>mmol/L</span>
        </div>
        <div className="data-row">
          <span className="row-title">同型半胱氨酸：</span>
          <InputItem
            style={{ width: 60 }}
            value={editData['V001068']}
            className="underline"
            editable={editable}
            onChange={(e: any) =>
              onItemDataMapChange && onItemDataMapChange({
                ...editData,
                ['V001068']: e.currentTarget.value
              })} />
          <span>μmol/L</span>
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
    font-size:18px;
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