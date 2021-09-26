import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { cloneJson } from "src/utils/json/clone";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import service from "src/services/api";
import configDefault from './config/default'
import configNys from './config/nys'
import configDghl from './config/dghl'
import configGzsrm from './config/gzsrm'

const commonApi = service.commonApiService;

export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}

export default observer(function 夜班费上报表弹窗(props: Props) {
  let { sectionId, setData, data } = props;

  let cloneData: any = cloneJson(data || { list: [] });

  const calBack = (type: string, data: any) => {
    switch (type) {
      case 'setData':
        setData(data)
        break
      case 'addAllMoney':
        addAllMoney(data)
        break
    }
  }
  const columns: any = appStore.hisMatch({
    map: {
      nys: configNys.getColumns(cloneData, calBack),
      'dghl,fqfybjy': configDghl.getColumns(cloneData, calBack),
      //'gzsrm': configGzsrm.getColumns(cloneData, calBack),暂时隐藏20210926
      default: configDefault.getColumns(cloneData, calBack)
    },
    vague: true,
  })

  const addAllMoney = (record: any) => {
    const keys = appStore.hisMatch({
      map: {
        nys: configNys.moneyKeyList,
        'dghl,fqfybjy': configDghl.moneyKeyList,
      },
      vague: true,
    })
    record.totalAll = keys.reduce((acc: number, cur: string) => {
      const num = isNaN(+record[cur]) ? 0 : +record[cur]
      return acc + num
    }, 0)
  };
  const addItem = () => {
    const item = appStore.hisMatch({
      map: {
        nys: configNys.item,
        'dghl,fqfybjy': configDghl.item,
        'gzsrm': configGzsrm.item(),
        default: configDefault.item
      },
    })
    cloneData.list.push(item)
    setData(cloneData);
  };

  return (
    <Wrapper>
      <div className="button-con">
        <Button icon="plus" size="small" onClick={addItem}>
          添加
        </Button>
      </div>

      <BaseTable
        surplusHeight={400}
        columns={columns}
        dataSource={cloneData.list || []}
        wrapperStyle={{
          padding: 0,
          paddingTop: 20
        }}
      />
    </Wrapper>
  );
});

const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
`;

const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`;

const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  td {
    padding: 0 !important;
  }
  textarea{
    resize: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    /* :hover{
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    } */
    :focus{
      outline: none;
      border: none;
      background: ${p => p.theme.$mlc};
      box-shadow: none;
    }
  }
  .ant-input{
      resize: none;
      ${defaultInputStyle}
      /* :hover{
        ${activeInputStyle}
          background: ${p => p.theme.$mlc};
      } */
      :focus{
        ${activeInputStyle}
          background: ${p => p.theme.$mlc};
      }
    }
    .ant-select-selection{
      ${defaultInputStyle}
    }
  .ant-select-selection{
      ${defaultInputStyle}
    }

    .ant-select-open,.ant-select-focused{
      .ant-select-selection{
        ${activeInputStyle}
        &:focus{
          ${activeInputStyle}
          background: ${p => p.theme.$mlc};
        }
      }
    }

  input {
    text-align: center;
  }  
`;

const HeadCon = styled.div``;
