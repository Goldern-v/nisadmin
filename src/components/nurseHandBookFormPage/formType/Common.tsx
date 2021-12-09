import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import menuOperation from '../function/menuOperation';
import SelectModal from '../selectModal/SelectModal'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  bodyModal: any
  setBodyModal: Function
  visible: Boolean
  setVisible: Function
  masterInfo: any
}
export default function Common(props: Props) {
  const { bodyModal, setBodyModal, visible, setVisible, masterInfo, } = props
  const { tBody } = masterInfo
  const [selectIndex, setSelectIndex] = useState(-1)
  const [domReact, setDomReact]: any = useState({})
  const [colIdx, setColIdx]: any = useState(-1)
  const [selectList, setSelectList]: any = useState([])
  const [menuType, setMenuType] = useState('select')
  // const [visible, setVisible]: any = useState(false)
  const [operationType, setOperationType]: any = useState("")
  const [copyRow, setCopyRow] = useState({})
  const [calculation_rules, setCalculation_rules]: any = useState([])
  const [rulesKey, setRulesKey]: any = useState([])
  let selectRow: any = {}
  const changeValue = (e: any, item: any) => {
    item.value = e.currentTarget.innerText
    scheduleStore.setIsSave(true)
  }
  const hasCalculation = (tBody: any) => {
    let rulesKey = {}
    let rules: any = []
    let hasCalculation = false
    tBody.map((item: any) => {
      if (item.key.includes('calculation')) {
        hasCalculation = true
        let calculation_arr = item.calculation_rules.split(" ")
        let resultKey = item.key
        let [key1, operator, key2] = calculation_arr
        rulesKey[key1] = true
        rulesKey[key2] = true
        rules = [...rules, { key1, operator, key2, resultKey }]
      }
    })
    setCalculation_rules([...rules])
    setRulesKey({ ...rulesKey })
  }
  // 聚焦弹窗事件
  const onFocus = (e: any, colIdx: any, col: any, rowIdx: any) => {
    // e:事件对象;  colIdx:列数;
    // col:列数据;  rowIdx:行数;
    setSelectIndex(rowIdx) // 聚焦时改变当前选中行数
    selectRow = bodyModal[rowIdx] // 获取聚焦行数据(不触发渲染)
    setColIdx(colIdx)
    e.preventDefault() // 阻止默认行为
    let domReact = e.currentTarget.getBoundingClientRect() // 获取当前元素相对于屏幕的样式属性
    setDomReact(domReact)//给下拉弹框传定位
    if (col.select) { // 如果当前单元格有下拉选项
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

  const handlerClick = (e: any, col: any) => {
    setMenuType("select")
    col.click && col.click(col) && scheduleStore.setIsSave(true)
    col.click && setBodyModal([...bodyModal])
  }

  const ContextMenu = (e: any) => {
    setVisible(false)
    e.preventDefault()
    setMenuType('Menus')
    setVisible(true)
  }

  const refresh = () => {
    setBodyModal([...bodyModal])
    if (bodyModal[selectIndex][colIdx].multiple) {
    } else {
      setVisible(false)//关闭下拉框
    }
    scheduleStore.setIsSave(true)
  }
  const onBlur = (e: any, row: any, col: any) => {
    if (rulesKey[col.key]) {
      // let rules = calculation_rules.filter((rule: any) => {
      //   return Object.values(rule).some((val: any) => {
      //     return val === col.key
      //   })
      // })
      calculation_rules.map((rule: any) => {
        let val1 = row.find((item: any) => item.key === rule.key1).value
        let val2 = row.find((item: any) => item.key === rule.key2).value
        let resul: Number | String = 0
        switch (rule.operator) {
          case '+':
            resul = val1 + val2;
            break;
          case '-':
            resul = val1 - val2;
            break;
          case '*':
            resul = val1 * val2;
            break;
          case '/':
            resul = val1 / val2;
            break;
        }
        if (Object.is(resul, NaN)) { resul = '数值有误' }
        let colIndex = row.findIndex((item: any) => item.key === rule.resultKey)
        row[colIndex].value = resul
        refresh()
      })
    }
  }
  useEffect(() => {
    if (operationType) {
      menuOperation[operationType](tBody, bodyModal, setBodyModal, selectIndex, selectRow, copyRow, setCopyRow)
      scheduleStore.setIsSave(true)
      setOperationType('')
      setVisible(false)
    }
  }, [operationType])
  useEffect(() => {
    hasCalculation(tBody)
  }, [])

  return (
    <Wrapper>
      {bodyModal.map((row: any, rowIdx: any) =>
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
              className="common"
              style={{ width: `${col.width}px` }}
              suppressContentEditableWarning
              contentEditable={col.key == "serialNumber" ? false : true}
              onFocus={(e: any) => onFocus(e, colIdx, col, rowIdx)}
              onBlur={(e: any) => onBlur(e, row, col)}
              onContextMenu={ContextMenu}
              onInput={(e) => changeValue(e, col)}
              onClick={(e) => handlerClick(e, col)}
              key={`${rowIdx}_${colIdx}`}
            >
              {col.key == "serialNumber" ? (rowIdx + 1) : col.value}
            </div>)}
        </div>)}
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
.common {
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