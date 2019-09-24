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
`
