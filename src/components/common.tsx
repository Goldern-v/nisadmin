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
` as any
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
  // @media (max-width: 1400px) {
  //   display: none;
  // }
  @media (max-width: ${(props: { maxWidth?: number }) => props.maxWidth || 1400}px) {
    display: none;
  }
`

/* 页面头部 */
export const PageHeader: any = styled.div`
  height: 50px;
  font-size: 13px;
  position: relative;
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
  > .select-year {
    width: 100px;
  }
  > .ant-input {
    max-width: 120px;
  }
`

export const Pre = styled.pre`
  white-space: pre-wrap;
  text-align: left;
`
// 页面主体
export const PageContainer: any = styled.div`
  background: #fff;
  padding: 10px;
  //margin: 0 15px 15px;
  ///* border-radius: 5px; */
`
export const PageContainerDetail: any = styled.div`
  background: #fff;
  padding: 10px;
  //margin: 0 15px 15px;
  /* border-radius: 5px; */
`

/**分析报告类型的内容部分 */
export const ReportContainer: any = styled.div<{ height?: number }>`
  height: calc(100% - ${p => p.height || 76}px);
  position: relative;
  .main-ctx {
    /* width: calc(100% - 250px); */
    height: 100%;
    padding: 15px 120px 15px;
    overflow-y: auto;
  }
`
export const ReportCtx: any = styled.div`
  width: 750px;
  background: #fff;
  padding: 15px;
  margin: 0px auto;
  white-space: pre-wrap;
  font-size: 14px;
  line-height: 24px;
  &.ctx--view {
    pointer-events: none;
  }
`