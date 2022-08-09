import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { Radio ,Checkbox} from "antd";
import {PromotionAppUtils} from '../../PromotionAppUtils'

interface Props {
  type:string,
  disabled:boolean,
  values:any,
  option:any[],
  inputKey:string,
}

export default observer(function SelectBox(props:Props){
  const {type,disabled,values,option,inputKey} = props;
  const {tableObjN1,tableObjN2,tableObjN3,tableObjN4} = PromotionAppUtils;
  const onClickRadio = (e:any,value:any) =>{
    if(PromotionAppUtils.master.formCode == 'HSJS_0001'){
      if(tableObjN1[value] == e.target.value){
        tableObjN1[value] = ''
      }else{
        tableObjN1[value] = e.target.value
      }
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0002') {
      if(tableObjN2[value] == e.target.value){
        tableObjN2[value] = ''
      }else{
        tableObjN2[value] = e.target.value
      }
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0003') {
      if(tableObjN3[value] == e.target.value){
        tableObjN3[value] = ''
      }else{
        tableObjN3[value] = e.target.value
      }
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0004') {
      if(tableObjN4[value] == e.target.value){
        tableObjN4[value] = ''
      }else{
        tableObjN4[value] = e.target.value
      }
    }
    
  }
  const onCheckboxChange = (e:any,value:any) =>{
    let list = e.filter((item:any)=> item != ',')
    
    if(PromotionAppUtils.master.formCode == 'HSJS_0001'){
      tableObjN1[value] = list.toString();
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0002') {
      tableObjN2[value] = list.toString();
      console.log(tableObjN2[value]);
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0003') {
      tableObjN3[value] = list.toString();
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0004') {
      tableObjN4[value] = list.toString();
    }
  }
  return(
    <Wrapper>
      {
        type && type == "radio" ?(
          option.map((item:any,index)=>{
            return <Radio.Group  value={values} key={index} >
            <Radio value={item.value} onClick={(e)=>{onClickRadio(e,inputKey)}} disabled={disabled} >{item.label}</Radio>
          </Radio.Group>
          })
        ):(
          <Checkbox.Group options={option} value={values} onChange={(e)=>{onCheckboxChange(e,inputKey)}} />
        )
      }
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
  .input-item{
    span{
      margin: 0 8px;
    }
    input{
      width: 13px !important;
    }
  }
  .ant-radio-wrapper{
    font-size: 12px;
    margin: 0px;
    margin-left: 5px;
  }
  .ant-checkbox-wrapper{
    font-size: 12px;
  }
  .ant-checkbox-input , .ant-radio-input{
    width: 20px  !important;
  }
`