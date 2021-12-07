import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import InfoItem from 'src/modules/notice/components/InfoList/InfoItem'
import Item from 'antd/lib/list/Item'


export interface Props {
  masterInfo: any

}
export default function CommonHeader(props: Props) {
  const { masterInfo } = props
  console.log(masterInfo);
  
  const { tHead } = masterInfo
  console.log(tHead);
  const { top, mid, bottom } = tHead
  const deepRender = (arr: any) => {
    let i = 0
    arr.map((item: any, index: any) => {
      if (item.colspan != 1) {
        item.mid = mid.slice(i, i + Number(item.colspan))
        let j = 0;
        item.mid.map((midItem: any, midIndex: any) => {
          if (midItem.colspan != 1) {
            midItem.bottom = bottom.slice(j, j + Number(midItem.colspan))
            j += +midItem.colspan
          }
        })
        i += +item.colspan
      }
    })
  }
  deepRender(top)
  return (
    <Wrapper>
      <div style={{ background: '#f9f9f9', display: 'flex', justifyContent: 'center', textAlign: "center" }}>
        {top.map((topTh: any, topIndex: any) => {
          return <div style={{ marginLeft: '-1px', marginBottom: '-1px', width: `${topTh.width || (topTh.colspan * 30)}px`, minHeight: '90px', border: "1px solid #000" }}>
            <div key={topIndex} className="top-th" style={{ minHeight: topTh.colspan != 1 ? "25px" : "100%", margin: '-1px', border: topTh.colspan != 1 ? "1px solid #000" : "" }} dangerouslySetInnerHTML={{ __html: topTh.name }}></div>
            {topTh.colspan != 1 && (<div className="mid-bottom-box" style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
              {
                topTh.mid.map((midTh: any, midIndex: any) => {
                  return <div className="mid-bot-child" style={{ flex: 1, borderRight: midIndex != topTh.mid.length - 1 ? "1px solid #000" : '', }}>
                    <div className="mid-th" style={{ borderBottom: '1px solid #000', minHeight: midTh.colspan != 1 ? "" : "100%" }} key={midIndex} dangerouslySetInnerHTML={{ __html: midTh.name }}></div>
                    {
                      midTh.colspan != 1 && (<div style={{ flex: 1, display: 'flex', justifyContent: 'center', }}>
                        {midTh.bottom.map((bottomTh: any, bottomIndex: any) => {
                          return <div className="bottom-th" style={{ flex: 1, borderRight: bottomIndex != midTh.bottom.length - 1 ? "1px solid #000" : '' }} dangerouslySetInnerHTML={{ __html: bottomTh.name }}></div>
                        })}
                      </div>)
                    }
                  </div>
                })
              }
            </div>)}
          </div>
        })}
      </div>
      {/*
      {
        mid.map((midTh: any, index: any) => {
          return <div>{midTh.name}</div>
        })
      }
      {
        bottom.map((bottomTh: any, index: any) => {
          return <div>{bottomTh.name}</div>
        })
      } */}
      {/* {Object.keys(tHead).map((item: any, idx: any) =>
        <div className="tr" key={idx} style={{ background: '#f9f9f9', display: 'flex', justifyContent: 'start' }}>
          {tHead[item].map((thItem: any, thIdx: any) =>
            <div className="commonHeader td" key={thIdx} style={{ height: `${thItem.rowspan * 30}px` }}>{thItem.name}</div>)}
        </div>
      )} */}
    </Wrapper >
  )
}

const Wrapper = styled.div`
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
.top-th,.mid-th,.bottom-th{
  display: -webkit-box;
  display: box;
  -webkit-box-pack: center; 
  box-pack: center;
  -webkit-box-align: center; 
  box-align: center;
  word-break: break-all;
}
.mid-bottom-box{
  min-height: calc(100% - 22px)
}
.mid-bot-child{
  display:flex;
  flex-direction:column;
}
`
