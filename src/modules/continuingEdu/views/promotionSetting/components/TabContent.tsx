import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, InputNumber, Select, Modal } from "antd";
import { promotionSettingModel } from "../model/PromotionSettingModel";
import { observer } from "mobx-react-lite";
export interface Props {
  data?: any;
}

const Option = Select.Option;

export default observer(function TabContent(props: Props) {
  const { data, config } = promotionSettingModel;

  const handleSave = () => {
    Modal.confirm({
      title: "N0升N1晋升要求发布",
      content: (
        <div>
          <div>发布后层级 N0 的护士晋升要求会同步更新</div>
          <div>确实发布新的晋升要求吗？</div>
          <div>发布后层级为N0护士会立即收到一条更新消息通知</div>
        </div>
      ),
      centered: true,
      onOk: () => {
        console.log("ok");
      }
    });
  };

  return (
    <Wrapper>
      {/* {Object.keys(data).map((key: string, keyIdx: number) => {
      let cfgItem = config[key]
      let value = data[key]
      let unitType = 0
      if (cfgItem.unit) {
        unitType = 1
        if (cfgItem.units && cfgItem.units.length > 1) unitType = 2
      }
      let typeName = (name: string) => {
        switch (unitType) {
          case 1:
            return `${name}1`
          case 2:
            return `${name}2`
          default:
            return ''
        }
      }
      if (cfgItem)
        return <div className="row" key={keyIdx}>
          <span className="label">{cfgItem.title}：</span>
          <span className="content">
            {cfgItem.type === 'number' && <React.Fragment>
              <InputNumber
                size="small"
                className={typeName('input-type')}
                value={value}
                onChange={(val: any) =>
                  promotionSettingModel.setDataItem(key, val)} />
              {unitType == 1 && <span className="unit-span">{cfgItem.unit}</span>}
              {unitType == 2 && <Select
                className="unit-select"
                size="small"
                value={cfgItem.unit}
                onChange={(val: any) =>
                  promotionSettingModel.setConfigItem(key, { ...cfgItem, unit: val })}>
                {cfgItem.units.map((unitOption: any, unitIdx: number) => <Option
                  key={`${keyIdx}-${unitIdx}-unit-opt`}
                  value={unitOption.code}>
                  {unitOption.name}
                </Option>)}
              </Select>}
            </React.Fragment>}
            {cfgItem.type === 'select' && <Select
              size="small"
              className="opt-select"
              value={value}
              onChange={(val: any) =>
                promotionSettingModel.setDataItem(key, val)}>
              {cfgItem.options.map((opt: any, optIdx: number) => <Option
                value={opt.code}
                key={`${keyIdx}-${optIdx}-opt`}>
                {opt.name}
              </Option>)}
            </Select>}
          </span>
        </div>
      else
        return ''

    })} */}
      <div className="row">
        <span className="label"> </span>
        <span className="content">
          <Button
            type="primary"
            style={{ marginTop: "10px" }}
            onClick={handleSave}
          >
            保存并发布
          </Button>
        </span>
      </div>
    </Wrapper>
  );
});

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
      width: 145px;
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
      line-height: 22px;
      border: 1px solid rgb(217, 217, 217);
      border-left: none;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      width: 55px;
      text-indent: 5px;
      position: relative;
    }
  }
`;
