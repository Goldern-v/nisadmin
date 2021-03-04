import styled from "styled-components"
import React, { useState, useEffect } from "react"
import { Button, InputNumber, Select, Modal, message, Input } from "antd"
import { promotionSettingModel } from "../model/PromotionSettingModel"
import { observer } from "mobx-react-lite"

export interface Props {
  data?: any
}

const TextArea = Input.TextArea
const Option = Select.Option

export default observer(function TabContent(props: Props) {
  const {
    data,
    loading,
    activeLevel,
    currentLevelItem,
    trainingKeyPointList,
    jobDuty
  } = promotionSettingModel

  const setJobDuty = promotionSettingModel.setJobDuty.bind(promotionSettingModel)

  const handleSave = () => {
    Modal.confirm({
      title: `${currentLevelItem.title}晋升要求发布`,
      content: (
        <div>
          <div>
            发布后层级 {currentLevelItem.current} 的护士晋升要求会同步更新
          </div>
          <div>确实发布新的晋升要求吗？</div>
          <div>
            发布后层级为 {currentLevelItem.current} 护士会立即收到一条更新消息通知
          </div>
        </div>
      ),
      centered: true,
      onOk: () => {
        promotionSettingModel
          .saveEdit(() => {
            message.success('修改成功')
          })
      }
    })
  }

  return (
    <Wrapper>
      {data.length <= 0 && <div className="no-data">
        <img
          style={{ width: '100px' }}
          src={require('src/modules/statistic/img/noData.png')} />
        <br />
        <span>暂无数据</span>
      </div>}
      {data.length > 0 &&
        <React.Fragment>
          <div className="row">
            <div className="sub-title">任职条件</div>
          </div>
          {data.map((item: any, keyIdx: number) => {
            let itemCfg = promotionSettingModel.itemConfig(item)

            let typeName = (name: string) => {
              if (itemCfg.units) {
                return `${name}2`
              } else {
                return `${name}1`
              }
            }

            return (
              <div className="row" key={keyIdx}>
                <span className="label">{item.requestKey}：</span>
                <span className="content">
                  {itemCfg.type === "number" && (
                    <React.Fragment>
                      <InputNumber
                        min={0}
                        precision={itemCfg.precision}
                        className={typeName("input-type")}
                        value={item.requestValue}
                        onChange={(requestValue: any) =>
                          promotionSettingModel.setDataItem(keyIdx, {
                            ...item,
                            requestValue
                          })
                        }
                      />
                      {!itemCfg.units && (
                        <span className="unit-span">{item.unit}</span>
                      )}
                      {itemCfg.units && (
                        <Select
                          className="unit-select"
                          value={item.unit}
                          onChange={(unit: any) =>
                            promotionSettingModel.setDataItem(keyIdx, {
                              ...item,
                              unit
                            })
                          }
                        >
                          {(itemCfg.units || []).map(
                            (unitOption: any, unitIdx: number) => (
                              <Option
                                key={`${keyIdx}-${unitIdx}-unit-opt`}
                                value={unitOption.code}
                              >
                                {unitOption.name}
                              </Option>
                            )
                          )}
                        </Select>
                      )}
                    </React.Fragment>
                  )}
                  {itemCfg.type === "select" && (
                    <Select
                      className="opt-select"
                      value={item.requestValue}
                      onChange={(requestValue: any) =>
                        promotionSettingModel.setDataItem(keyIdx, {
                          ...item,
                          requestValue
                        })
                      }
                    >
                      {(itemCfg.vals || []).map((opt: any, optIdx: number) => (
                        <Option value={opt.code} key={`${keyIdx}-${optIdx}-opt`}>
                          {opt.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </span>
              </div>
            )
          })}
          <div className="row" style={{ marginTop: 20 }}>
            <div className="sub-title">临床专业能力训练重点</div>
          </div>
          <div className="training-key-point-group">
            {trainingKeyPointList.map((item: any, idx: number) =>
              <div className="training-key-point-item" key={idx}>
                {idx + 1}.{item.trainingKeyPointName}
              </div>)}
            {trainingKeyPointList.length <= 0 && <div>未设置</div>}
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="sub-title">岗位职责:</div>
          </div>
          <div className="job-duty">
            <TextArea
              value={jobDuty}
              autosize={{ minRows: 3, maxRows: 10 }}
              onChange={(e: any) => setJobDuty(e.target.value)} />
          </div>
          <div className="row">
            <span className="label"> </span>
            <span className="content">
              <Button
                type="primary"
                disabled={loading}
                style={{ marginTop: "10px" }}
                onClick={handleSave}
              >
                保存并发布
            </Button>
            </span>
          </div>
        </React.Fragment>}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: calc(100vh - 158px);
  padding: 20px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
  ::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  .no-data{
    text-align:center;
    cursor: default;
    color: #999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    i{
      font-size: 44px;
      transform: scaleX(1.2);
    }
    span{
      font-size:20px;
    color: #aaa;
    }
  }
  .sub-title{
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
    color: #000;
  }
  .training-key-point-group{
    background: rgba(0,0,0,0.03);
    width: 600px;
    margin-left: 68px;
    padding: 5px;
    margin-bottom: 10px;
    .sub-title{
      margin-bottom: 5px;
    }
    .training-key-point-item{
      margin-bottom: 3px;
      &:last-of-type{
      margin-bottom: 0;
      }
    }
  }
  .job-duty{
    margin-left: 68px;
    width: 600px;
    margin-bottom: 10px;
  }
  div.row {
    margin-bottom: 10px;
    & > * {
      vertical-align: middle;
    }
    .label {
      width: 140px;
      text-align: right;
      display: inline-block;
    }
    .sub-title{
      padding-left: 74px;
    }
    .content{
      &>*{
        vertical-align: middle;
      }
    }
    .opt-select {
      width: 152px;
    }
    .unit-select {
      position: relative;
      /* top: -1px; */
      margin-left: 5px;
    }
    .input-type1 {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      .ant-input-number-input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .unit-span {
      display: inline-block;
      line-height: 30px;
      border: 1px solid rgb(217,217,217);
      border-left: none;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      width: 62px;
      text-align: center;
      position: relative;
      height: 32px;
      /* vertical-align: middle; */
      /* top: -2px; */
    }
  }
`
