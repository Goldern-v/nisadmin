import styled from "styled-components";
import React, { useState, useEffect } from "react";

export const Wrapper = styled.div`
  .label {
    margin-left: 10px !important;
    margin-right: 5px !important;
  }
  .ant-btn {
    margin-left: 5px;
    padding: 0 5px;
  }
`;
export const TableCon = styled.div`
  position:relative;
  .selected-operate-con{
    position: absolute;
    bottom: 12px;
    left: 24px;
  }
  .ant-table-tbody > tr.ant-table-row-selected td{
    background-color: transparent;
  }
  .warning-value {
    input {
      color: red;
    }
  }
  padding: 0 15px;
  .ant-table-header-column {
    height: 100%;
    > div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .ant-table-column-title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-select {
    width: 100%;
    border-radius: 0;
  }
  .ant-input {
    border: 0;
    border-radius: 0;
    text-align: center;
    outline: 0;
    box-shadow: none !important;
    padding: 4px;
  }
  .input-cell {
    padding: 0 !important;
    overflow: hidden;
  }
  textarea {
    border: 0;
    border-radius: 0;
    height: 100%;
    width: 100%;
    outline: none;
    resize: none;
    /* margin: 0 -8px; */
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .sign-name {
    cursor: pointer;
  }
  .checkSize-warning {
    input {
      color: red;
    }
  }
  td{
    padding:0;
    position:relative;
    .bg{
      position: absolute;
      top:0;
      bottom:0;
      z-index:-1;
      &.disabled{
        background: rgba(0,0,0,0.03)!important;
      }
    }
  }
  .color-red,
  .color-red *,
  .disabled-row .color-red[disabled],
  .disabled-row .color-red *[disabled] {
    color: red !important;
  }
  .color-orange,
  .color-orange *,
  .disabled-row .color-orange[disabled],
  .disabled-row .color-orange *[disabled] {
    color: orange !important;
  }
  .ant-select-disabled .ant-select-selection{
      background: rgba(0,0,0,0.0)!important;
  }
  .disabled-row{
    td.input-cell{
      background: rgba(0,0,0,0.03)!important;
    }
    .bg.disabled{
      background: rgba(0,0,0,0.0)!important;
    }
  }
  .ant-input[disabled]{
    color: #000!important;
      background: rgba(0,0,0,0.0)!important;
  }
`;

export const ThBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 4px;
    display: flex;
  }
  .aside {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-top: 1px solid #e8e8e8;
    font-weight: normal;
  }
`;

export const LineCon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100px;
`;

export const SvgCon = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  line {
    stroke: #e8e8e8;
    stroke-width: 1;
  }
`;
export const TextCon = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
export const Text = styled.div<{ x: string; y: string; deg: string }>`
  position: absolute;
  left: ${p => p.x};
  top: ${p => p.y};
  white-space: nowrap;
  transform: rotate(${p => p.deg}deg);
`;
