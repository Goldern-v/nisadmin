import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`

export const NavCon = styled.div`
  a{
    color: #666;
    :hover{
      color: #333;
    }
  }
  span{
    color: #888
  }
  margin-bottom: 5px;
`

export const TopPannel = styled.div`
  height: 100px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  padding: 10px 15px;
  font-size: 12px;
  position: relative;
`
export const MainTitle = styled.div`
  font-size: 24px;
  height: 36px;
  color: #000;
`
export const SubContent = styled.div`
  span{
    vertical-align:middle;
    &.label{
      margin-right: 5px;
    }
    &.content{
      margin-right: 15px;
      display: inline-block;
      min-width: 60px;
    }
  }
`
export const ButtonGroups = styled.div`
  position: absolute;
  right: 15px;
  top: 35px;
  button{
      margin-right: 5px;
    :last-of-type{
      margin-right:0;
    }
  }
`
export const MainPannel = styled.div`
  height: calc(100vh - 150px);
`

export const ActiveText = styled.span`
  cursor: pointer;
  color: #1db38b;
  &:hover{
    font-weight: bold;
  }
`
export const BaseInfoPannel = styled.div`
overflow: hidden;
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
height: 100%;
`

export const BaseInfoPage = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  width: 760px;
  padding: 15px 20px;
  margin: 15px auto;
  min-height: 800px;
  .main-title{
    padding: 15px;
    text-align: center;
    font-size: 28px;
    color: #000;
    line-height: 30px;
  }
  .content-item-title{
    font-size: 14px;
    margin: 10px 0;
    ::before{
      content:'';
      display: inline-block;
      height: 18px;
      width: 5px;
      background: rgba(112, 182, 3, 1);
      vertical-align: sub;
      margin-right: 10px;
    }
  }
  table {
    border-collapse: collapse;
    border-color: #333;
    table-layout: fixed;
    width: 100%;
    tr {
      width: 100%;
    }
    .header {
      td {
        background: #fff;
      }
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #ccc solid;
      .ant-input{
        overflow: hidden;
        resize: none;
      }
      &.relative{
        position: relative;
      }
      .delete-btn{
        position: absolute;
        right: 100%;
      }
    }
  }
`

export const AuditInfoPannel = styled.div`
  background: #fff;
  border-left: 1px solid #ddd;
  padding: 10px 15px;
  width: 270px;
  height: 100%;
  float: right;
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
  .audit-title{
    font-size: 14px;
    margin: 10px 0;
    ::before{
      content:'';
      display: inline-block;
      height: 18px;
      width: 5px;
      background: rgba(112, 182, 3, 1);
      vertical-align: sub;
      margin-right: 10px;
    }
  }
  .audit-item{
    color: #666;
    padding-top: 10px;
    position: relative;
    &::before{
      position: absolute;
      content: '';
      width:1px;
      height: 100%;
      background: #ddd;
      top: 0;
      left: 20px;
    }
    &:first-of-type{
      padding-top:0;
    }
    &:last-of-type{
      &::before{
        height: 24px;
      }
    }
    .status-icon{
      width: 40px;
      position: relative;
      float: left;
      .step-status{
        position: absolute;
        right: 10px;
        bottom: -18px;
        background: #fff;
        font-size: 18px;
        border-radius: 50%;
        &.no-status{
          width: 17px;
          height: 17px;
          background: #ddd;
          right: 11px;
        }
        color: #666;
        &.error{
          color: red;
        }
        &.success{
          color: rgb(2, 159, 123);
        }
      }
    }
    .info{
      font-size: 13px;
      padding-left: 45px;
      .step-title{
        font-size: 15px;
        color: #000;
      }
      .desc{
        padding: 5px;
        border-radius: 3px;
        background: #eee;
      }
    }
  }
`
