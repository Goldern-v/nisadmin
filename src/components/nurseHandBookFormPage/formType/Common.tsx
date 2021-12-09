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
  let selectRow: any = {}
  const changeValue = (e: any, item: any) => {
    item.value = e.currentTarget.innerText
    scheduleStore.setIsSave(true)
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
  const getCellTitle = (col: any) => {
    switch (col.key) {
      case "serialNumber":
        return '序号列不允许操作！';
      default:
        return '';
    }
  }
  const onBlur = (e: any, row: any, col: any) => {
  }
  let lcr = {
    "left": "start",
    "center": "center",
    "right": "end"
  }
  useEffect(() => {
    if (operationType) {
      menuOperation[operationType](tBody, bodyModal, setBodyModal, selectIndex, selectRow, copyRow, setCopyRow)
      scheduleStore.setIsSave(true)
      setOperationType('')
      setVisible(false)
    }
  }, [operationType])

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
              style={{
                width: `${col.width}px`,
                ...col.style,
                'WebkitBoxPack': (col.style && col.style.textAlign) ? lcr[col.style.textAlign] : 'center',
                'boxPack': (col.style && col.style.textAlign) ? lcr[col.style.textAlign] : 'center',
                'cursor': col.key == "serialNumber" ? 'no-drop' : 'auto'
              }}
              title={getCellTitle(col)}
              suppressContentEditableWarning
              contentEditable
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
      {masterInfo.computeRow && <div style={{ display: 'flex', justifyContent: 'center' }}>
        {masterInfo.computeRow.map((col: any, colIdx: any) =>
          <div
            id={`${col.key}_${colIdx}`}
            className="common"
            style={{
              width: `${col.width}px`,
              ...col.style,
              'WebkitBoxPack': (col.style && col.style.textAlign) ? lcr[col.style.textAlign] : 'center',
              'boxPack': (col.style && col.style.textAlign) ? lcr[col.style.textAlign] : 'center',
            }}
            key={`${colIdx}`}
          >
            {col.value}
          </div>)}
      </div>}
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
  -webkit-box-align: center; 
  box-align: center;
  word-break: break-all;
}
`