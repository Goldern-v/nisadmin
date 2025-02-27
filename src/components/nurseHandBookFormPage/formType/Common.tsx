import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import menuOperation from '../function/menuOperation';
import SelectModal from '../selectModal/SelectModal'
import { authStore, appStore, scheduleStore } from "src/stores";
import $ from "jquery";

export interface Props {
  bodyModal: any
  setBodyModal: Function
  menuType: any
  setMenuType: Function
  visible: any
  setVisible: Function
  computeRow: any
  setComputeRow: Function
  masterInfo: any
  isPrint: any
  bodyIdx: any
  templeVisible: any
  setCopyRow: any
  copyRow: any
}
export default function Common(props: Props) {
  const { queryObj } = appStore
  const { bodyModal, setBodyModal, menuType, setMenuType, visible, setVisible, masterInfo, computeRow, setComputeRow, isPrint, bodyIdx, templeVisible, copyRow, setCopyRow } = props
  const { tBody } = masterInfo
  const [selectIndex, setSelectIndex] = useState(-1)
  const [domReact, setDomReact]: any = useState({})
  const [colIdx, setColIdx]: any = useState(-1)
  const [selectList, setSelectList]: any = useState([])
  const [operationType, setOperationType]: any = useState("")
  // const [copyRow, setCopyRow] = useState({})
  let selectRow: any = {}
  const changeValue = (e: any, item: any) => {
  }
  const onPaste = (e: any, item: any) => {
    e.preventDefault();
    e.currentTarget.innerHTML += e.clipboardData.getData('text/plain')
  }

  // 聚焦弹窗事件
  const onFocus = (e: any, colIdx: any, col: any, rowIdx: any) => {
    // e:事件对象;  colIdx:列数;
    // col:列数据;  rowIdx:行数;
    setSelectIndex(rowIdx) // 聚焦时改变当前选中行数
    selectRow = bodyModal[bodyIdx].tableData[rowIdx] // 获取聚焦行数据(不触发渲染)
    setColIdx(colIdx)
    e.preventDefault() // 阻止默认行为
    let domReact = e.currentTarget.getBoundingClientRect() // 获取当前元素相对于屏幕的样式属性
    setDomReact(domReact)//给下拉弹框传定位
    if (col.select) { // 如果当前单元格有下拉选项
      setSelectList(col.select)
      setMenuType('select')
      if (visible[bodyIdx]) {
        setVisible(templeVisible)
      }
      // 设置定时器,防止已有弹窗时不渲染
      setTimeout(() => {
        visible[bodyIdx]=true
        setVisible([...visible])
      })
    } else {
      setVisible(templeVisible)
    }
  }

  const handlerClick = (e: any, col: any ) => {
    if(queryObj.audit) return
    if(masterInfo.noEditor) return
    if (col.select){
      setMenuType("select")
    }
    col.click && col.click(col) && scheduleStore.setIsSave(true)
    col.click && setBodyModal([...bodyModal])
    // col.click && setBodyModal(JSON.parse(JSON.stringify(bodyModal)))
  }

  const tableValue = (col:any, rowIdx:any) => {
    if(col.key == "serialNumber"){
      return rowIdx + 1
    }
    return col.value
  }

  const ContextMenu = (e: any) => {
    if(selectIndex==-1) return
    setVisible(templeVisible)
    e.preventDefault()
    setMenuType('Menus')
    visible[bodyIdx]=true
    setVisible([...visible])
  }

  const refresh = () => {
    // setBodyModal(JSON.parse(JSON.stringify(bodyModal)))
    setBodyModal([...bodyModal])
    if (bodyModal[bodyIdx].tableData[selectIndex][colIdx].multiple) {
    } else {
      setVisible(templeVisible)
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
  // input事件会有光标位置错乱问题，改为失焦事件
  const onBlur = (e: any, row: any, col: any) => {
    col.value = e.currentTarget.innerHTML
    scheduleStore.setIsSave(true)
  }
  let textAlignWay = {
    "left": "start",
    "center": "center",
    "right": "end"
  }

  let verticalAlignWay = {
    "top": "start",
    "middle": "center",
    "bottom": "end"
  }

  useEffect(() => {
    if (operationType) {
      menuOperation[operationType](tBody, bodyModal, setBodyModal, selectIndex, selectRow, copyRow, setCopyRow, colIdx, computeRow,bodyIdx,masterInfo)
      scheduleStore.setIsSave(true)
      setOperationType('')
      setVisible(templeVisible)
    }
  }, [operationType])

  useEffect(() => {
    if (queryObj.isAdd) {
      masterInfo.computeRow && setComputeRow(JSON.parse(JSON.stringify(masterInfo.computeRow)))
    }
  }, [])

  return (
    <Wrapper>
      {bodyModal[bodyIdx]&&bodyModal[bodyIdx].tableData.map((row: any, rowIdx: any) =>
        <div
          className={selectIndex == rowIdx &&!isPrint  ? 'active-row common-row' : 'common-row'}
          key={rowIdx}
        >
          {row.map((col: any, colIdx: any) =>
            <div
              id={`${col.key}_${rowIdx}_${colIdx}`}
              className="common"
              style={{
                width: `${col.width}px`,
                ...col.style,
                'WebkitBoxPack': (col.style && col.style.textAlign) ? textAlignWay[col.style.textAlign] : 'center',
                'boxPack': (col.style && col.style.textAlign) ? textAlignWay[col.style.textAlign] : 'center',
                'WebkitBoxAlign': (col.style && col.style.verticalAlign) ? verticalAlignWay[col.style.verticalAlign] : 'center',
                'boxAlign': (col.style && col.style.verticalAlign) ? verticalAlignWay[col.style.verticalAlign] : 'center',
                'cursor': col.click ? 'pointer' : col.key == "serialNumber" ? 'no-drop' : 'auto',
                'display': (col.style && col.style.textAlign=='left' &&  col.style.verticalAlign=='top') ? '' : '-webkit-box',
              }}
              title={getCellTitle(col)}
              suppressContentEditableWarning
              contentEditable={masterInfo.noEditor ? false : col.noEditor ? false : queryObj.audit ? false : true}
              onFocus={(e: any) => onFocus(e, colIdx, col, rowIdx)}
              onBlur={(e: any) => onBlur(e, row, col)}
              // onKeyDown={(e: any) => enter(e, row, col)}
              onContextMenu={ContextMenu}
              onInput={(e) => changeValue(e, col)}
              onClick={(e) => handlerClick(e, col)}
              key={`${rowIdx}_${colIdx}`}
              dangerouslySetInnerHTML={{__html: tableValue(col,rowIdx)}}
              onPaste={(e) => onPaste(e, col)}
            >
            </div>)}
        </div>)}
      {computeRow[bodyIdx] && <div style={{ display: 'flex', justifyContent: 'center' }}>
        {computeRow[bodyIdx].map((col: any, colIdx: any) =>
          <div
            id={`${col.key}_${colIdx}`}
            className="common"
            style={{
              width: `${col.width}px`,
              ...col.style,
              'WebkitBoxPack': (col.style && col.style.textAlign) ? textAlignWay[col.style.textAlign] : 'center',
              'boxPack': (col.style && col.style.textAlign) ? textAlignWay[col.style.textAlign] : 'center',
              'WebkitBoxAlign': (col.style && col.style.verticalAlign) ? verticalAlignWay[col.style.verticalAlign] : 'center',
              'boxAlign': (col.style && col.style.verticalAlign) ? verticalAlignWay[col.style.verticalAlign] : 'center',
              'display': col.hidden ? 'none':(col.style && col.style.textAlign=='left')?'':'-webkit-box',
            }}
            key={`${colIdx}`}
          >
            {col.value}
          </div>)}
      </div>}
      {visible[bodyIdx] && selectIndex != -1 && <SelectModal
        menuType={menuType}
        domReact={domReact}
        refresh={refresh}
        col={bodyModal[bodyIdx].tableData[selectIndex][colIdx]}
        selectList={selectList}
        setOperationType={setOperationType}
      ></SelectModal>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
.common-row {
  display: flex;
  justify-content: center;
}
.common {
  border: 1px solid #000;
  font-size: 13px;
  min-height: 35px;
  padding-left: 2px;
  text-align: center;
  outline: none;
  margin-right:-1px; 
  margin-bottom:-1px;
  /* display: -webkit-box; */
  display: box;
  /* -webkit-box-align: center; 
  box-align: center; */
  word-break: break-all;
}
.active-row{
  /* background: #fef8b9; */
}
`