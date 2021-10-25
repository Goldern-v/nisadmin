import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Switch, DatePicker, Progress } from 'antd'
import moment from 'moment'
import { numToChinese } from 'src/utils/number/numToChinese'

export interface Props {
  setpChange?: (step: number) => void
}

export default observer(function PreviewPannel(props: Props) {
  const { setpChange } = props
  // const { master, baseInfo, itemGroupList } = qcModel
  return <Wrapper>
    <div className='master-area'>jjjjj</div>
  </Wrapper>
})

const Wrapper = styled.div`
  .master-area{
    margin-top: 10px;
    line-height: 24px;
    padding: 10px 20px;
    background-color: #f2f2f2;
    font-size: 14px;
    .item{
      width: 50%;
      margin: 5px 0;
      display: inline-block;
      &.item-large{
        width: 100%;
      }
      &>div{
        display: inline-block;
        vertical-align: middle;
        min-height:32px;
      }
      .label{
        width: 130px;
      }
      .content{
        width: 200px;
        &>*{
          width:100%;
        }
        .ant-switch{
          width: auto;
        }
      }
    }
  }
  .item-gorup-info{
    margin-top: 45px;
    margin-right: 15px;
    position: relative;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .top-title{
      position: absolute;
      width:100%;
      left: 0;
      top: -25px;
      color: #666;
      .left{
        float:left;
      }
      .right{
        float:right;
      }
    }
    .item{
      display: flex;
      font-size: 14px;
      line-height: 30px;
      border-bottom: 1px dashed #ddd;
      cursor: pointer;
      :hover{
        background: rgba(0,0,0,0.02);
      }
      &:last-of-type{
        border-bottom: none;
      }

      .title{
        flex: 1;
      }
      .ant-progress-text{
        font-size: 14px;
      }
      .rate{
        margin-left: 15px;
        width:150px;
      }
    }
  }
`