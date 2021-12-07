import styled, { AnyStyledComponent } from 'styled-components'
import React, { useState, useEffect } from 'react'
import InfoItem from 'src/modules/notice/components/InfoList/InfoItem'
import Item from 'antd/lib/list/Item'


export interface Props {
  masterInfo: any

}
export default function CommonHeader(props: Props) {
  const { masterInfo } = props
  const { tHead } = masterInfo
  const { top, mid, bottom } = tHead
  const deepRender = (arr: any) => {
    let i = 0
    arr.map((item: any, index: any) => {
      if (item.colspan != 1) {
        item.hasMid = true
        item.mid = mid.slice(i, i + Number(item.colspan))
        let j = 0;
        item.mid.map((midItem: any, midIndex: any) => {
          if (midItem.colspan != 1) {
            item.hasBottom = true
            midItem.bottom = bottom.slice(j, j + Number(midItem.colspan))
            j += +midItem.colspan
          }
        })
        i += +item.colspan
      }
    })
  }
  const isAllCell = (item: any) => {
    return item.colspan == 1
  }
  deepRender(top)
  return (
    <Wrapper>
      <div className="common-header">
        {top.map((topTh: any, topIndex: any) => {
          return (
            <div className="cn-th">
              <div
                className="cn-th-top"
                style={{
                  height: `${topTh.rowspan * 20}px`,
                  flex: topTh.colspan == 1 ? '1' : '',
                  ...topTh.style,
                  width: topTh.style && topTh.style.width ? `${topTh.style.width - 2}px` : ''
                }}
                dangerouslySetInnerHTML={{ __html: topTh.name }}></div>
              {topTh.hasMid && (
                <div className="cn-th-mid">
                  {topTh.mid.map((midTh: any, midIndex: any) => {
                    return (
                      <div
                        className="mid-th"
                        style={{
                          ...midTh.style,
                          width:
                            midTh.style && midTh.style.width ? // 是否有自定义宽度
                              midIndex != topTh.mid.length - 1 ? // 有自定义宽度的情况下,判断是否最后一个
                                `${midTh.style.width - 2}px` // 是最后一个,减两像素
                                : `${midTh.style.width - 1}px`
                              : '',
                          flex: midTh.width || (midTh.style && midTh.style.width) ? '' : '1'
                        }}
                        dangerouslySetInnerHTML={{ __html: midTh.name }}></div>
                    )
                  })}
                </div>
              )}
              {topTh.hasBottom && (
                <div className="cn-th-bottom">
                  {topTh.mid.map((midTh: any, midIndex: any) => {
                    return (
                      <div className="bottom-th-box">
                        {
                          midTh.bottom && midTh.bottom.map((bottomTh: any, bottomIndex: any) => {
                            return (
                              <div
                                className="bottom-th"
                                style={{
                                  ...bottomTh.style,
                                  width:
                                    bottomTh.style && bottomTh.style.width ? // 是否有自定义宽度
                                      bottomIndex != midTh.bottom.length - 1 ? // 有自定义宽度的情况下,判断是否最后一个
                                        `${bottomTh.style.width - 2}px` // 不是最后一个,减两像素
                                        : `${bottomTh.style.width - 1}px`
                                      : '',
                                  flex: bottomTh.width || (bottomTh.style && bottomTh.style.width) ? '' : '1'
                                }}
                                dangerouslySetInnerHTML={{ __html: bottomTh.name }}></div>
                            )
                          })
                        }
                      </div>
                    )

                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Wrapper >
  )
}

const Wrapper = styled.div`
.cn-th{
  margin-right:-1px;
  border:1px solid #000;
  border-bottom:none;
  min-width:30px;
  min-height:40px;
  display:flex;
  flex-direction:column;
  .cn-th-mid,.cn-th-bottom{
    flex:1;
    display: -webkit-box;
    display: box;
    -webkit-box-pack: center; 
    box-pack: center;
    -webkit-box-align: center; 
    box-align: center;
    word-break: break-all;
  }
  .cn-th-top{
    display: -webkit-box;
    display: box;
    -webkit-box-pack: center; 
    box-pack: center;
    -webkit-box-align: center; 
    box-align: center;
    word-break: break-all;
  }
  .cn-th-mid{
    border-top:1px solid #000;
    display:flex;
    .mid-th{
      box-sizing:boder-box; 
      display: -webkit-box;
      display: box;
      -webkit-box-pack: center; 
      box-pack: center;
      -webkit-box-align: center; 
      box-align: center;
      word-break: break-all;
      border-left:1px solid #000;
      &:first-child{
        border-left:none;
      }
    }
  }
  .cn-th-bottom{
    border-top:1px solid #000;
    display:flex;
    .bottom-th{
      box-sizing:boder-box; 
      display: -webkit-box;
      display: box;
      -webkit-box-pack: center; 
      box-pack: center;
      -webkit-box-align: center; 
      box-align: center;
      word-break: break-all;
      border-left:1px solid #000;
      &:first-child{
        border-left:none;
      }
    }
  }
  .bottom-th-box{
    display:flex;
    border-right:1px solid #000;
    &:last-child{
    border-right:none;
    }
  }
}
.commonHeader{
  border: 1px solid #000;
  min-height: 30px;
  width: 100px;
  font-size: 16px;
  text-align: center;
  margin-right:-1px; 
  margin-bottom:-1px;
  display: -webkit-box;
  display: box;
  -webkit-box-pack: center; 
  box-pack: center;
  -webkit-box-align: center; 
  box-align: center;
  word-break: break-all;
}
.common-header{
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  text-align: center;
}
`
