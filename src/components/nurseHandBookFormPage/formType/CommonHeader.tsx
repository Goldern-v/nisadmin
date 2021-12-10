import styled, { AnyStyledComponent } from 'styled-components'
import { Modal, message, Input } from 'src/vendors/antd'
import React, { useState, useEffect, useRef } from 'react'
import InfoItem from 'src/modules/notice/components/InfoList/InfoItem'
import Item from 'antd/lib/list/Item'


export interface Props {
  masterInfo: any
  showFixHeader: boolean
  isPrint: any
  beforeSetTableHeadContent:Function
  tableHeadContent:any
}
export default function CommonHeader(props: Props) {
  const { masterInfo, showFixHeader, isPrint, beforeSetTableHeadContent,tableHeadContent } = props
  const { tHead } = masterInfo
  const { top, mid, bottom } = tHead
  const [renderHeader, setRenderHeader]: any = useState([])
  const deepRender = (arr: any) => {
    let cloneTop = JSON.parse(JSON.stringify(arr))
    let cloneMid = JSON.parse(JSON.stringify(mid))
    let cloneBottom = JSON.parse(JSON.stringify(bottom))
    let i = 0
    cloneTop.map((item: any, index: any) => {
      if (item.colspan != 1) {
        item.hasMid = true
        item.mid = cloneMid.slice(i, i + Number(item.colspan))
        let j = 0;
        item.mid.map((midItem: any, midIndex: any) => {
          if (midItem.colspan != 1) {
            item.hasBottom = true
            midItem.bottom = cloneBottom.slice(j, j + Number(midItem.colspan))
            j += +midItem.colspan
          }
        })
        i += +item.colspan
      }
    })
    setRenderHeader(cloneTop)
  }
  const chRef: any = useRef<HTMLElement>()
  const handlerInput = (e: any, item: any) => {
    e.currentTarget.value && (item.name = e.currentTarget.value)
  }
  const changeHeader = (e: any, item: any) => {
    Modal.confirm({
      title: "修改标题",
      centered: true,
      content: <div style={{ marginTop: 30 }}>
        <Input defaultValue={item.name} onInput={(e: any) => handlerInput(e, item)}></Input>
      </div>,
      onOk: () => {
        if (item.name == "") {
          message.error('类型不能为空')
          return
        } else {
          // setRenderHeader([...renderHeader])
          beforeSetTableHeadContent([...renderHeader])
        }
      }
    })
  }
  const recursionInit = (arr:any,dictionariesObj:any)=>{
    arr.map((item:any)=>{
      // console.log(item);
      // let type = Object.prototype.toString.call(item)
      dictionariesObj[item.key] && (item.name = dictionariesObj[item.key])
      item.mid && recursionInit(item.mid,dictionariesObj)
      item.bottom && recursionInit(item.bottom,dictionariesObj)
      // console.log(dictionariesObj);
      
    })
  }
  useEffect(() => {
    // let fixHeader: any = document.getElementById("fh")
    // fixHeader && document.removeChild(fixHeader)
    if (chRef.current && chRef.current.outerHTML) {
      let fixHeader = chRef.current
      let cloneHeader = fixHeader.cloneNode(true)
      let box: any = document.getElementById("fixHeader");
      box.innerHTML = ""
      box.prepend(cloneHeader)
    }
  }, [chRef?.current?.outerHTML])
  useEffect(() => {
    beforeSetTableHeadContent([])
    deepRender(top)
  }, [])

  useEffect(()=>{
    // console.log(tableHeadContent);
    
    if(tableHeadContent.length){
      let dictionariesObj:any = {}
      tableHeadContent.map((item:any)=>{
        dictionariesObj = {...dictionariesObj,...item}
      })
      recursionInit(renderHeader,dictionariesObj)
    }
  },[tableHeadContent])
  return (
    <Wrapper id="ch">
      <div id="fixHeader" style={{ position: "fixed", top: '150px', display: showFixHeader && !isPrint ? 'block' : 'none' }}></div>
      <div className="common-header" ref={chRef}>
        {renderHeader.map((topTh: any, topIndex: any) => {
          return (
            <div className="cn-th" key={topIndex}>
              <div
                className="cn-th-top"
                style={{
                  height: `${topTh.rowspan * 20}px`,
                  flex: topTh.colspan == 1 ? '1' : '',
                  ...topTh.style,
                  width: topTh.style && topTh.style.width ? `${topTh.style.width - 2}px` : '',
                  color: topTh.canset ? 'blue' : ''
                }}
                onDoubleClick={(e: any) => { topTh.canset && changeHeader(e, topTh) }}
                dangerouslySetInnerHTML={{ __html: topTh.name }}></div>
              {topTh.hasMid && (
                <div className="cn-th-mid">
                  {topTh.mid.map((midTh: any, midIndex: any) => {
                    return (
                      <div
                        key={`${topIndex}_${midIndex}`}
                        className="mid-th"
                        style={{
                          ...midTh.style,
                          width:
                            midTh.style && midTh.style.width ? // 是否有自定义宽度
                              midIndex != topTh.mid.length - 1 ? // 有自定义宽度的情况下,判断是否最后一个
                                `${midTh.style.width - 2}px` // 是最后一个,减两像素
                                : `${midTh.style.width - 1}px`
                              : '',
                          flex: midTh.width || (midTh.style && midTh.style.width) ? '' : '1',
                          color: midTh.canset ? 'blue' : ''
                        }}
                        onDoubleClick={(e: any) => { midTh.canset && changeHeader(e, midTh) }}
                        dangerouslySetInnerHTML={{ __html: midTh.name }}></div>
                    )
                  })}
                </div>
              )}
              {topTh.hasBottom && (
                <div className="cn-th-bottom">
                  {topTh.mid.map((midTh: any, midIndex: any) => {
                    return (
                      <div className="bottom-th-box" key={`${midIndex}`}>
                        {
                          midTh.bottom && midTh.bottom.map((bottomTh: any, bottomIndex: any) => {
                            return (
                              <div
                                className="bottom-th"
                                key={`${topIndex}_${midIndex}_${bottomIndex}`}
                                style={{
                                  ...bottomTh.style,
                                  width:
                                    bottomTh.style && bottomTh.style.width ? // 是否有自定义宽度
                                      bottomIndex != midTh.bottom.length - 1 ? // 有自定义宽度的情况下,判断是否最后一个
                                        `${bottomTh.style.width - 2}px` // 不是最后一个,减两像素
                                        : `${bottomTh.style.width - 1}px`
                                      : '',
                                  flex: bottomTh.width || (bottomTh.style && bottomTh.style.width) ? '' : '1',
                                  color: bottomTh.canset ? 'blue' : ''
                                }}
                                onDoubleClick={(e: any) => { bottomTh.canset && changeHeader(e, bottomTh) }}
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
  cursor:default;
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
