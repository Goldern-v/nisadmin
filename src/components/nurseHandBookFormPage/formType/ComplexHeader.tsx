import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import menuOperation from '../function/menuOperation';
import SelectModal from '../selectModal/SelectModal'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  masterInfo: any 
  complexHeadList: any
  setComplexHeadList: Function
  complexHeaderContent:any
}
export default function ComplexHeader(props: Props) {
  const { queryObj } = appStore
  const { masterInfo, setComplexHeadList, complexHeadList,complexHeaderContent } = props
  const { tBody } = masterInfo
  const [selectIndex, setSelectIndex] = useState(-1)
  const [domReact, setDomReact]: any = useState({})
  const [colIdx, setColIdx]: any = useState(-1)
  const [selectList, setSelectList]: any = useState([])
  const [menuType, setMenuType] = useState('select')
  // const [visible, setVisible]: any = useState(false)
  const [operationType, setOperationType]: any = useState("")
  const [copyRow, setCopyRow] = useState({})
  let selectRow: any = {}

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
      return item.rightWidth-1
    }else if(item.preIndex){
      return item.rightWidth - (item.preIndex * 2 - 1)
    }else{
      return item.rightWidth
    }
  }
  useEffect(() => {
      setComplexHeadList(masterInfo.complexHead.complexHeadList)
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
        <div style={{ display: 'flex', justifyContent: 'center',flexWrap:'wrap', width: `${masterInfo.complexHead.boxWidth-(masterInfo.tBody.length-1) -1}px`}}>
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
                  suppressContentEditableWarning
                  contentEditable={queryObj.audit ? false : true}
                  onInput={(e) => changeValue(e, item)}
                >{item.value}</div>
              </div>
            )
          })}
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