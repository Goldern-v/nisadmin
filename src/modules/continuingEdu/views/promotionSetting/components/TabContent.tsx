import styled from "styled-components"
import React, { useState, useEffect } from "react"
import { Button, InputNumber, Select, Modal, message } from "antd"
import { promotionSettingModel } from "../model/PromotionSettingModel"
import { observer } from "mobx-react-lite"
export interface Props {
  data?: any
}

const Option = Select.Option

export default observer(function TabContent(props: Props) {
  const { data, loading, activeLevel, currentLevelItem } = promotionSettingModel

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
            发布后层级为{currentLevelItem.current}护士会立即收到一条更新消息通知
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
      {data.length > 0 && (
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
      )}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  min-height: 300px;
  max-height: calc(100vh - 158px);
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
    .opt-select {
      width: 152px;
    }
    .unit-select {
      position: relative;
      top: -1px;
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
      vertical-align: middle;
      top: -2px;
    }
  }
`
