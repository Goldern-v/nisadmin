import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'antd'
export interface Props { }

export default function IndexPage() {

  return <Wrapper>
    <div className="centerd">
      <img src={require('./../images/登记本icon@2x.png')} alt="" className="banner" />
      <div className="text">
        <Icon type="arrow-left" />
        <span> 请选择一个登记本</span>
      </div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  flex:1;
  position: relative;
  width: 100%;
  height: 100%;
  .centerd{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid #ddd;
    width: 300px;
    border-radius: 5px;
    padding: 30px;
    background: #fff;
    text-align:center;
    .banner{
      width: 100px;
    }
    .text{
      margin: 20px auto;
      margin-bottom: 0;
      background: #00A680;
      color: #fff;
      border-radius: 5px;
      padding: 15px 10px;
      width: max-content;
      &>*{
        cursor: default;
        vertical-align:middle;
      }
    }
  }
`