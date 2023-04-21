import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button,Input } from "antd";

import BaseTable, { DoCon } from "src/components/BaseTable";
import { cloneJson } from "src/utils/json/clone";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import configDefault from './config/default'
import configNys from './config/nys'
import configDghl from './config/dghl'
import configFqfybjy from './config/fqfybjy'
import configGzsrm from './config/gzsrm'
import configSdlj from './config/sdlj'

const { TextArea } = Input
export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}
const isSdljText = 'sdlj,nfsd,qzde'

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
      dghl: configDghl.getColumns(cloneData, calBack),
      fqfybjy: configFqfybjy.getColumns(cloneData, calBack),
      //暂时隐藏20210926
      'gzsrm': configGzsrm.getColumns(cloneData, calBack),
      [isSdljText]: configSdlj.getColumns(cloneData, calBack),
      default: configDefault.getColumns(cloneData, calBack)
    },
    vague: true,
  })

  const addAllMoney = (record: any) => {
    const keys = appStore.hisMatch({
      map: {
        nys: configNys.moneyKeyList,
        dghl: configDghl.moneyKeyList,
        fqfybjy: configFqfybjy.moneyKeyList,
        [isSdljText]: configSdlj.moneyKeyList,
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
        dghl: configDghl.item,
        fqfybjy: configFqfybjy.item,
        'gzsrm': configGzsrm.item(),
        [isSdljText]: configSdlj.item,
        default: configDefault.item
      },
      vague:true,
    })
    cloneData.list.push(item)
    // console.log(item)
    // console.log(cloneData.list)
    setData(cloneData);
  };

  // useEffect(() => {
  //   if (!cloneData.list.length) {
  //     addItem()
  //   }
  // },[])
  

  return (
    <Wrapper>
      {!['gzsrm'].includes(appStore.HOSPITAL_ID) && <div className="remark">{configSdlj.remark}</div>}
      <div className="button-con">
        <Button icon="plus" size="small" onClick={addItem}>
          添加
        </Button>
      </div>

      <BaseTable
        surplusHeight={400}
        // surplusWidth={200}
        columns={columns}
        dataSource={cloneData.list || []}
        wrapperStyle={{
          padding: 0,
          paddingTop: 20
        }}
      />
      <div style={{marginTop:'5px',display:'flex'}}>
      {/* // setTextArea3_1(e.target.value) */}
        <span style={{flex:'none'}}>备注：</span>
        <TextArea className='print-page_ipt' placeholder='字数上限2000字' value={cloneData.remark}
         onChange={(e: any) => {
          cloneData.remark = e.target.value 
          setData(cloneData)
        }}
        maxLength={2000} autosize={{ minRows: 3 }} />
      </div>
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
  .remark {
    position: absolute;
    top: -13px;
    left: 0;
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
