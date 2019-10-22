import * as React from 'react'
import styled from 'styled-components'
/* 用于弹性盒子占位用 */
export const Place = styled.div`
  flex: 1;
`
export const ScrollBox = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
`
export const ScrollUl = styled.ul`
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
`

/** 滚动加载 */
export const DownLoader = () => {
  const Loader = styled.div`
    text-align: center;
    font-size: 12px;
    color: #ddd;
    margin: 5px 0;
  `
  return <Loader>正在加载中...</Loader>
}

/* 页面标题 */
export const PageTitle = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  @media (max-width: 1400px) {
    display: none;
  }
`

/* 页面头部 */
export const PageHeader = styled.div`
  height: 50px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 15px 0 15px;
  display: flex;
  align-items: center;
  z-index: 1;
  > span.label {
    margin-left: 15px;
    margin-right: 10px;
  }
  > button:first-of-type {
    margin-left: 20px;
  }
  > button {
    margin-left: 10px;
  }
  > .ant-select {
    min-width: 100px;
  }
`
