import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { authStore, appStore, scheduleStore } from "src/stores";
import SelectModal from '../selectModal/SelectModal'

export interface Props {
  masterInfo: any 
  complexHeadList: any
  setComplexHeadList: Function
  complexHeaderContent:any
  complexSelectVisible:Boolean
  setComplexSelectVisible:Function
  setMenuType:Function
}
export default function ComplexHeader(props: Props) {
  const { queryObj } = appStore
  const { masterInfo, setComplexHeadList, complexHeadList,complexHeaderContent,complexSelectVisible,setComplexSelectVisible,setMenuType } = props
  const [domReact, setDomReact]: any = useState({})
  const [selectCell, setSelectCell]: any = useState({})
  const changeValue = (e: any, item: any) => {
    item.value = e.currentTarget.innerText
    scheduleStore.setIsSave(true)
  }

  let lcr = {
    "left": "start",
    "center": "center",
    "right": "end"
  }
  const getWidth=(item:any,idx:any)=>{
    if(item.lastChild){
      return item.rightWidth + 1
    }else if(item.preIndex){
      return item.rightWidth + 1
    }else{
      return item.rightWidth + 2
    }
  }
  const handelerClick = (e:any,item:any,index:any)=>{
    if(!item.select)return
    setMenuType('complex-select')
    let domReact = e.currentTarget.getBoundingClientRect() // 获取当前元素相对于屏幕的样式属性
    setDomReact(domReact)//给下拉弹框传定位
    setSelectCell(item)
    setComplexSelectVisible(true)
  }
  useEffect(() => {
      setComplexHeadList(JSON.parse(JSON.stringify(masterInfo.complexHead.complexHeadList)))
  }, [])
  useEffect(()=>{
    if(!complexHeaderContent.length)return
    complexHeadList.map((item:any)=>{
      item.value = complexHeaderContent[0][item.key]
    })
    setComplexHeadList([...complexHeadList])
  },[complexHeaderContent])
  return (
    <Wrapper>
        <div className='complex' style={{ display: 'flex', justifyContent: 'center',flexWrap:'wrap', width: `${masterInfo.complexHead.boxWidth-(masterInfo.tBody[0].length-1) -1}px`}}>
          {complexHeadList.map((item: any, Idx: any) =>{
            return (
              <div style={{ display: 'flex', justifyContent: 'center'}} key={`${Idx}`}>
                <div 
                  className="complexHeader" 
                  key={`left_${Idx}`}
                  style={{
                    width:`${item.leftWidth}px`,
                    'WebkitBoxPack': (item.style && item.style.textAlign) ? lcr[item.style.textAlign] : 'center',
                    'boxPack': (item.style && item.style.textAlign) ? lcr[item.style.textAlign] : 'center',
                  }}
                >{item.name}</div>
                <div 
                  className="complexHeader" 
                  key={`right_${Idx}`}
                  style={{
                    width:`${getWidth(item,Idx)}px`,
                    'WebkitBoxPack': (item.style && item.style.textAlign) ? lcr[item.style.textAlign] : 'center',
                    'boxPack': (item.style && item.style.textAlign) ? lcr[item.style.textAlign] : 'center',
                  }}
                  onClick={(e)=>handelerClick(e,item,Idx)}
                  suppressContentEditableWarning
                  contentEditable={queryObj.audit ? false : true}
                  onInput={(e) => changeValue(e, item)}
                >{item.value}</div>
              </div>
            )
          })}
          {complexSelectVisible && <SelectModal
            menuType={'complex-select'}
            domReact={domReact}
            refresh={()=>setComplexHeadList([...complexHeadList])}
            col={selectCell}
            selectList={selectCell.select}
            setOperationType={()=>{}}
          ></SelectModal>}
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.complexHeader {
  border: 1px solid #000;
  font-size: 16px;
  min-height: 35px;
  text-align: center;
  outline: none;
  margin-right:-1px; 
  margin-bottom:-1px;
  display: -webkit-box;
  display: box;
  -webkit-box-align: center; 
  box-align: center;
  word-break: break-all;
}
`