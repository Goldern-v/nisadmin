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
  const {tableObj} = PromotionAppUtils;
  // const onRadioChange = (e:any,value:any) =>{
  //   tableObj[value] = e.target.value
  // }
  const onClickRadio = (e:any,value:any) =>{
    if(tableObj[value] == e.target.value){
      tableObj[value] = ''
    }else{
      tableObj[value] = e.target.value
    }
  }
  const onCheckboxChange = (e:any,value:any) =>{
    tableObj[value] = e;
  }
  return(
    <Wrapper>
      {
        type && type == "radio" ?(
          option.map((item:any)=>{
            return <Radio.Group  value={values} key={item.label} className="mar-btom">
            <Radio value={item.value} onClick={(e)=>{onClickRadio(e,inputKey)}}>{item.label}</Radio>
          </Radio.Group>
          })
        ):(
          <Checkbox.Group key={values} options={option} defaultValue={values} onChange={(e)=>{onCheckboxChange(e,inputKey)}} className="mar-btom"/>
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
  }
`