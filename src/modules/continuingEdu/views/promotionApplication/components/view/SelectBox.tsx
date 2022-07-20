import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";

interface Props {
  type:string,
  disabled:boolean,
  readonly:boolean,
  value:string,
  option:string[],
}

export default observer(function SelectBox(props:Props){
  const {type,disabled,readonly,value,option} = props;

  const handleCheck =()=>{
    // if (type === 'radio' && checkValueStr === value) {
    //   // 单选的值可以取消
    //   checkValueStr = '';
    // }
  }
  return(
    <Wrapper>
      {
        option.map((item:string)=>{
          return <div className="input-item" key={item}>
            <input
              id="id + item"
              type={type}
              value={value}
              disabled={disabled}
              readOnly={readonly}
              name="id + 'check_box_items'"
              onClick={handleCheck}
            />
            <span>{item}</span>
          </div>
        })
      }
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 26px;
  display: flex;
  .input-item{
    span{
      margin: 0 8px;
    }
    input{
      width: 13px !important;
    }
  }
`