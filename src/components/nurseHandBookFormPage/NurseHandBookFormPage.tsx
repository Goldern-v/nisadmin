import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Select } from 'src/vendors/antd'
import SelectModal from './selectModal/SelectModal'
import { authStore, appStore, scheduleStore } from "src/stores";
export interface Props {
  
}
export default function NurseHandBookFormPage(props: Props) {
  const [bodyModal,setBodyModal]:any = useState([])
  const [domReact,setDomReact]:any = useState({})
  const [visible,setVisible]:any = useState(false)
  const [col,setCol]:any = useState({})
  const [selectList,setSelectList]:any = useState([])
  let selectRow:any = {}
  const [selectIndex,setSelectIndex] = useState(-1)
  const changeValue = (e:any,item:any)=>{
    item.value = e.currentTarget.innerText
    scheduleStore.setIsSave(false)
    filterList(item,item.value)
  }

  const onFocus = (e:any,colIdx:any,col:any,rowIdx:any)=>{
    setSelectIndex(rowIdx)
    selectRow = bodyModal[rowIdx]
    e.preventDefault()
    let domReact = e.currentTarget.getBoundingClientRect()
    setDomReact(domReact)//给下拉弹框传定位
    if(col.select?.length>0){
      setCol(col)
      setSelectList(col.select)
      setVisible(true)//打开下拉框
    }else{
      setVisible(false)//
    }
  }
  //过滤下拉框数组（智能联想） 
  const filterList = (col:any, value:String) => {
    let arr = col.select.filter((selectItem:any) => {
      return selectItem.includes(value);
    });
    setSelectList(arr)
  }

  const onBlur = ()=>{
    // setTimeout(()=>{
    //   setVisible(false)//关闭下拉框
    // })
  }

  const refresh = ()=> {
    setBodyModal([...bodyModal])
    if(col.multiple){
      
    }else{
      setVisible(false)//关闭下拉框
    }
    
  }

  let masterInfo = {
    defaulLength:17
  }
  let tHead = ["第1列","第2列","第3列","第4列","第5列","第6列","第7列","第8列"];
  let tbody = [
    {
      key:"contractionOne",
      name:"时间",
      value:"",
      select: ['1','2','3','1','2','3','1','2','3','1','2','3','1','2','3'],
      multiple: "/",
    },
    {
      key:"preInputOne",
      name:"一",
      value:"",
      select: ['但是格式的','水电费第三方士大夫','是大富大贵','很过分','华润广东','爱我去','表格内','SaaS','按时的说法','讽德诵功'],
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
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },
    {
      "contractionOne": "40",
      "preInputOne": "sda",
      "preInputTwo": "140",
      "uterineOne": "强",
      "uterineTwo": "44",
      "uterineThree": "2",
    },

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
    setBodyModal([...tempArr])
    scheduleStore.setIsSave(true)
  },[])
  return (
    <Wrapper>
      <div className="page">
      <div className="bottom-list">
        <div style={{background:'#f9f9f9',display: 'flex',justifyContent: 'center',}}>
          {tHead.map((item: any, idx: any) =>
            <div className="t-b-1">{item}</div>)}
        </div>
        {
          bodyModal.map((row: any, rowIdx: any) =>
          <div style={{background:selectIndex==rowIdx?'#fef8b9':'#fff',display: 'flex',justifyContent: 'center',}} key={rowIdx}>
            {row.map((col: any, colIdx: any) =>
              <div 
                id={`${col.key}_${rowIdx}_${colIdx}`}
                className="t-b-2"
                suppressContentEditableWarning
                contentEditable 
                onFocus={(e:any)=>onFocus(e,colIdx,col,rowIdx)}
                onBlur={(e:any)=>onBlur()}
                onInput={(e)=>changeValue(e,col)}
                key={colIdx}
              >
                {col.value}
              </div>)}
          </div>)}
      </div>
      </div>
      <SelectModal visible={visible} domReact={domReact} refresh={refresh} col={col} selectList={selectList}></SelectModal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .page {
    padding:50px;
    background-color:#fff;
  }
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