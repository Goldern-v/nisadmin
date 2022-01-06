import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker, Icon } from 'antd';
import moment from 'moment'

export interface Props {
  domReact: any
  col: any
  selectList: Array<any>
  refresh: Function
  menuType: String
  setOperationType: Function
}
export default function SelectModal(props: Props) {
  const { domReact, col, refresh, selectList, menuType, setOperationType, } = props
  const [selectTop, setSelectTop]: any = useState()
  const [selectLeft, setSelectLeft]: any = useState()
  const [renderList, setRenderList]: any = useState([])
  // const [timer, setTimer]: any = useState(null)
  let timer: any = null
  const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//浏览器窗口宽度
  const H = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//浏览器窗口高度
  const selectw = Math.ceil(domReact.left) + Math.ceil(domReact.width);//下拉框弹窗宽度
  const selectH = Math.ceil(domReact.top) + Math.ceil(domReact.height);//下拉框弹窗高度
  const maxTop = H - 350
  const menus = [
    { name: "复制整行", code: "copyRow", icon: 'copy' },
    { name: "粘贴整行", code: "paste", icon: 'edit' },
    { name: "上增一行", code: "addRowBefore", icon: 'plus-square' },
    { name: "下增一行", code: "addRowAfter", icon: 'minus-square' },
    { name: "清空当前行数据", code: "wipeData", icon: 'delete' },
    { name: "删除当前行", code: "delCurrentRow", icon: 'delete' },
    { name: "计算当前行", code: "calculation_currentRow", icon: 'calculator' },
    { name: "计算当前列", code: "calculation_currentColumn", icon: 'calculator' },
  ]
  const open = () => {
    setRenderList(selectList || [])
    setSelectLeft(selectw)
    if (selectH >= maxTop) {
      setSelectTop(maxTop - 20)
    } else {
      setSelectTop(selectH)
    }
    timer && clearInterval(timer)
    timer = setInterval(() => {
      filterArr(props.col.value)
    }, 1000)
  }

  const filterArr = (key: any) => {
    let arr = selectList.filter(item => {
      return item.includes(key)
    })
    if (arr.length) {
      setRenderList([...arr])
    } else {
      setRenderList([...selectList])
    }
  }

  const selectOptionClick = (item: String) => {
    if (col.value && col.multiple) {
      col.value = col.value + col.multiple + item
    } else {
      col.value = item
    }
    refresh()
  }
  const menuOperation = (code: any) => {
    setOperationType(code)
  }

  const datePickerOnChange = (value:any) => {
    col.value = moment(value).format('YYYY-MM-DD')
    refresh()
  }

  useEffect(() => {
    open()
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Wrapper>
      {(menuType == "Menus" || (!!renderList.length && menuType == "select")) && <div className="selectBody" style={{ top: `${selectTop}px`, left: `${selectLeft}px` }}>
        {menuType == "select" && renderList.map((item: String, index: any) =>
          <div className="selectOption" onClick={() => selectOptionClick(item)} key={index}>{item}
        </div>)}
        {menuType == "Menus" && menus.map((menu: any, index: any) =>
          <div
            className="selectOption"
            onClick={() => menuOperation(menu.code)}
            key={index}
          >
            <Icon type={menu.icon} style={{ marginRight: '5px', fontSize: '16px' }} />
            {menu.name}
          </div>)}
      </div>}
      {menuType == "timePicker" && <div className="timePickerBody" style={{ top: `${selectTop}px`, left: `${selectLeft}px` }}>
        <DatePicker
          open={true}
          onChange={(value: any) => datePickerOnChange(value)}
        />
        </div>}
    </Wrapper>
  )

}

const Wrapper = styled.div`
  .timePickerBody{
    position: fixed;
    width: 280px;
    height: 340px;
    background-color: #fff;
    /* border: 1px solid #000; */
    box-shadow:5px 5px 5px rgba(233, 233, 234);
    z-index: 10;
    overflow-y: auto;
    border-radius: 10px;
  }
  .selectBody{
    position: fixed;
    width: 200px;
    height: 260px;
    background-color: #fff;
    /* border: 1px solid #000; */
    box-shadow:5px 5px 5px rgba(233, 233, 234);
    z-index: 10;
    overflow-y: auto;
    border-radius: 10px;
  }
  .selectOption{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
    cursor: pointer;
    
  }
  .selectOption:hover {
    background: #e6f1f0;
  }
  .selectBody::-webkit-scrollbar
  {
    width: 4px;
    height: 4px;
    background-color: #F5F5F5;
  }
  
  /*定义滚动条轨道 内阴影+圆角*/
  .selectBody::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 4px;
    background-color: #eaeaea;
  }
  
  /*定义滑块 内阴影+圆角*/
  .selectBody::-webkit-scrollbar-thumb
  {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #c2c2c2;
  }
`