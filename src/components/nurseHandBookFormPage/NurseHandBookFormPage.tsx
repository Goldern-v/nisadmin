import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export interface Props {
  
}
export default function NurseHandBookFormPage(props: Props) {
  const changeValue = (e:any,item:any)=>{
    item.value = e.currentTarget.innerText
  }
  const [bodyModal,setBodyModal]:any = useState([])

  let masterInfo = {
    defaulLength:17
  }
  let tHead = ["第1列","第2列","第3列","第4列","第5列","第6列","第7列","第8列"];
  let tbody = [
    {
      key:"contractionOne",
      name:"时间",
      value:""
    },
    {
      key:"preInputOne",
      name:"一",
      value:""
    },
    {
      key:"preInputTwo",
      name:"二",
      value:""
    },
    {
      key:"uterineOne",
      name:"三",
      value:""
    },
    {
      key:"uterineTwo",
      name:"四",
      value:""
    },
    {
      key:"uterineThree",
      name:"五",
      value:""
    }]

  let text = [
    {
      "contractionOne": "40",
      "preInputOne": "tqw",
      "preInputTwo": "120",
      "uterineOne": "中",
      "uterineTwo": "33",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "czx",
      "preInputTwo": "130",
      "uterineOne": "中",
      "uterineTwo": "35",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    }
  ]

  useEffect(()=>{
    let tempArr = []
    let rows = 0
    let needNullRows = false
    if(text.length>masterInfo.defaulLength){
      rows=text.length
    }else{
      rows=masterInfo.defaulLength;
      needNullRows = true
    }
    for(let index = 0;index<rows;index++){
      let nullRow = JSON.parse(JSON.stringify(tbody))
      nullRow.map((item:any)=>{
        if(needNullRows&&index>=text.length){
          item.value  = ""
        }else{
          item.value = text[index][item.key]
        }
      })
      tempArr.push(nullRow)
    }
    console.log(tempArr);
    
    setBodyModal([...tempArr])
  },[])
  return (
    <Wrapper>
      <div className="bottom-list">
        {/* <div style={{background:'#f9f9f9',display: 'flex',justifyContent: 'center',}}>
          {tHead.map((item: any, idx: any) =>
            <div className="t-b-1">{item}</div>)}
        </div> */}
        {
          bodyModal.map((row: any, rowIdx: any) =>
          <div style={{background:'#fff',display: 'flex',justifyContent: 'center',}} key={rowIdx}>
            {row.map((col: any, colIdx: any) =>
              <div 
                id={`${col.key}_${rowIdx}_${colIdx}`}
                className="t-b-2"
                suppressContentEditableWarning
                contentEditable 
                onInput={(e)=>changeValue(e,col)}
                key={colIdx}
              >{col.value}</div>)}
          </div>)}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .bottom-list{
    width: 1000px;
  }
  .bottom-list .t-b-1{
    border: 1px solid #000;
    min-height: 30px;
    width: 20%;
    font-size: 16px;
    text-align: center;
  }
  .bottom-list .t-b-2{
    border: 1px solid #000;
    font-size: 16px;
    min-height: 35px;
    width: 20%;
    text-align: center;
    outline: none;
    margin-right:-1px; 
    margin-bottom:-1px;
    display: -webkit-box;
    display: box;
    -webkit-box-pack: center; 
    box-pack: center;
    -webkit-box-align: center; 
    box-align: center;
  }
`