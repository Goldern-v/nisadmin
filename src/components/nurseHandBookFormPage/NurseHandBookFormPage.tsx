import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Select } from 'src/vendors/antd'
import SelectModal from './selectModal/SelectModal'
import { authStore, appStore, scheduleStore } from "src/stores";
import { tick } from "./function/click"
import menuOperation from './function/menuOperation';
import { copyNullRow } from "./function/render"
export interface Props {

}
export default function NurseHandBookFormPage(props: Props) {
  const [bodyModal, setBodyModal]: any = useState([])
  const [domReact, setDomReact]: any = useState({})
  const [operationType, setOperationType]: any = useState("")

  const [visible, setVisible]: any = useState(false)
  // const [menuVisible, setMenuVisible]: any = useState(false)
  const [menuType, setMenuType] = useState('select')
  const [colIdx, setColIdx]: any = useState(-1)
  const [selectList, setSelectList]: any = useState([])
  let selectRow: any = {}
  const [selectIndex, setSelectIndex] = useState(-1)
  const [copyRow, setCopyRow] = useState({})
  const changeValue = (e: any, item: any) => {
    item.value = e.currentTarget.innerText
    scheduleStore.setIsSave(false)
    // filterList(item, item.value)
  }
  // 聚焦弹窗事件
  const onFocus = (e: any, colIdx: any, col: any, rowIdx: any) => {
    // e:事件对象;  colIdx:列数;
    // col:列数据;  rowIdx:行数;
    setSelectIndex(rowIdx) // 聚焦时改变当前选中行数
    selectRow = bodyModal[rowIdx] // 获取聚焦行数据(不触发渲染)
    e.preventDefault() // 阻止默认行为
    let domReact = e.currentTarget.getBoundingClientRect() // 获取当前元素相对于屏幕的样式属性
    setDomReact(domReact)//给下拉弹框传定位
    if (col.select) { // 如果当前单元格有下拉选项
      setColIdx(colIdx)
      setSelectList(col.select)
      setMenuType('select')
      if (visible) {
        setVisible(false)
      }
      // 设置定时器,防止已有弹窗时不渲染
      setTimeout(() => {
        setVisible(true)
      })
    } else {
      setVisible(false)
    }
  }
  // 取代失焦事件,用来关闭弹窗
  const closeSelect = (e: any) => {
    let targetClass = [...e.target.classList]
    if (!targetClass.includes("t-b-2")) {
      setVisible(false)
    }
  }

  // const onBlur = () => {
  //   // setVisible(false)//关闭下拉框
  // }
  const refresh = () => {
    setBodyModal([...bodyModal])
    if (bodyModal[selectIndex][colIdx].multiple) {

    } else {
      setVisible(false)//关闭下拉框
    }

  }
  const tick = () => {
    console.log("tick");
  }
  let masterInfo = {
    defaulLength: 17
  }
  let tHead = ["第1列", "第2列", "第3列", "第4列", "第5列", "第6列", "第3列", "第4列", "第5列", "第6列"];
  let tbody = [
    {
      key: "contractionOne",
      name: "时间",
      value: "",
      width: "100px",
      select: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
      multiple: "/",
    },
    {
      key: "preInputOne",
      name: "一",
      value: "",
      width: "100px",
      select: ['但是格式的', '水电费第三方士大夫', '是大富大贵', '很过分', '华润广东', '爱我去', '表格内', 'SaaS', '按时的说法', '讽德诵功'],
      click: tick,
    },
    {
      key: "preInputTwo",
      name: "二",
      value: "",
      width: "100px",
    },
    {
      key: "uterineOne",
      name: "三",
      value: "",
      width: "100px",
    },
    {
      key: "uterineTwo",
      name: "四",
      value: "",
      width: "100px",
    },
    {
      key: "uterineTwo",
      name: "四",
      value: "",
      width: "100px",
    },
    {
      key: "uterineTwo",
      name: "四",
      value: "",
      width: "100px",
    },
    {
      key: "uterineTwo",
      name: "四",
      value: "",
      width: "100px",
    },
    {
      key: "uterineTwo",
      name: "四",
      value: "",
      width: "100px",
    },
    {
      key: "uterineThree",
      name: "五",
      value: "",
      width: "100px",
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
  const handlerClick = (e: any, col: any) => {
    setMenuType("select")
    col.click && col.click()
  }
  const ContextMenu = (e: any) => {
    setVisible(false)
    e.preventDefault()
    setMenuType('Menus')
    setVisible(true)
  }

  useEffect(() => {
    let tempArr = []
    let rows = 0
    let needNullRows = false
    if (text.length > masterInfo.defaulLength) {
      rows = text.length
    } else {
      rows = masterInfo.defaulLength;
      needNullRows = true
    }
    for (let index = 0; index < rows; index++) {
      let nullRow: any = []
      tbody.map((config: any, index: any) => {
        nullRow.push({})
        for (let key in config) {
          // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
          copyNullRow(nullRow, config, index, key)
        }
      })
      // let nullRow = JSON.parse(JSON.stringify(tbody))
      console.log(nullRow);

      nullRow.map((item: any) => {
        if (needNullRows && index >= text.length) {
          item.value = ""
        } else {
          item.value = text[index][item.key]
        }
      })
      tempArr.push(nullRow)
    }
    setBodyModal([...tempArr])
    scheduleStore.setIsSave(true)
  }, [])
  useEffect(() => {
    if (operationType) {
      menuOperation[operationType](tbody, bodyModal, setBodyModal, selectIndex, selectRow, copyRow, setCopyRow)
      setOperationType('')
      setVisible(false)
    }
  }, [operationType])
  return (
    <Wrapper onClickCapture={closeSelect}>
      <div className="page">
        <div className="space-div"></div>
        <div className="bottom-list">
          <div className="table-head">新生儿监护单</div>
          <div style={{ background: '#f9f9f9', display: 'flex', justifyContent: 'center', }}>
            {tHead.map((item: any, idx: any) =>
              <div className="t-b-1" key={idx}>{item}</div>)}
          </div>
          {
            bodyModal.map((row: any, rowIdx: any) =>
              <div
                style={{
                  background: selectIndex == rowIdx ? '#fef8b9' : '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                key={rowIdx}
              >
                {row.map((col: any, colIdx: any) =>
                  <div
                    id={`${col.key}_${rowIdx}_${colIdx}`}
                    className="t-b-2"
                    style={{ width: col.width }}
                    suppressContentEditableWarning
                    contentEditable
                    onFocus={(e: any) => onFocus(e, colIdx, col, rowIdx)}
                    // onBlur={(e: any) => onBlur()}
                    onContextMenu={ContextMenu}
                    onInput={(e) => changeValue(e, col)}
                    onClick={(e) => { handlerClick(e, col) }}
                    key={`${rowIdx}_${colIdx}`}
                  >
                    {col.value}
                  </div>)}
              </div>)}
        </div>
        <div className="space-div"></div>
      </div>
      {visible && <SelectModal
        menuType={menuType}
        domReact={domReact}
        refresh={refresh}
        col={bodyModal[selectIndex][colIdx]}
        selectList={selectList}
        setOperationType={setOperationType}
      ></SelectModal>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .page {
    margin: 20px auto;
    padding: 50px;
    padding-top: 0px;
    display: flex;
    background-color: #fff;
    width: fit-content;
  }
  .space-div{
  }
  .bottom-list{
    .table-head {
      font-size: 21px;
      padding: 10px 0;
      text-align: center;
      font-weight: 700;
      font-family: 'simsun', 'Times New Roman', 'Georgia', 'Serif'!important;
    }
  }
  .bottom-list .t-b-1{
    border: 1px solid #000;
    min-height: 30px;
    width: 100px;
    font-size: 16px;
    text-align: center;
    margin-right:-1px; 
    margin-bottom:-1px;
  }
  .bottom-list .t-b-2{
    border: 1px solid #000;
    font-size: 16px;
    min-height: 35px;
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
    word-break: break-all;
  }
  
`