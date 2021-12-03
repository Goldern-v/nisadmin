import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
export interface Props {
  domReact: any
  col: any
  selectList: Array<any>
  refresh: Function
}
export default function SelectModal(props: Props) {
  const { domReact, col, refresh, selectList } = props
  const [selectTop, setSelectTop]: any = useState(0)
  const [renderList, setRenderList]: any = useState([])
  // const [timer, setTimer]: any = useState(null)
  let timer: any = null
  const [selectLeft, setSelectLeft]: any = useState(0)
  const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//浏览器窗口宽度
  const H = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//浏览器窗口高度
  const selectw = Math.ceil(domReact.left) + Math.ceil(domReact.width);//下拉框弹窗宽度
  const selectH = Math.ceil(domReact.top) + Math.ceil(domReact.height);//下拉框弹窗高度
  const maxTop = H - 350

  const open = () => {
    console.log(111);

    setRenderList(selectList || [])
    setSelectLeft(selectw)
    if (domReact.top >= maxTop) {
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

    if (col.multiple) {
      col.value = col.value + col.multiple + item
    } else {
      col.value = item
    }
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
      {<div className="selectBody" style={{ top: `${selectTop || 0}px`, left: `${selectLeft || 0}px` }}>
        {renderList.map((item: String, index: any) =>
          <div className="selectOption" onClick={() => selectOptionClick(item)} key={index}>{item}
          </div>)}
      </div>}
    </Wrapper>
  )

}

const Wrapper = styled.div`
  .selectBody{
    position: fixed;
    width: 250px;
    height: 300px;
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