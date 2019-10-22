import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import { Options, MenuList, MenuListItem } from '../../types/contextMenu'
import classNames from 'classnames'

export interface Props {
  menuList: MenuList
  options: Options
  show: boolean
  setShow: any
}

export default function ContextMenu(props: Props) {
  let { menuList, options, show, setShow } = props
  let { x, y } = options
  let elRef = useRef(null)
  useEffect(() => {
    function onClose(event: any) {
      if ((event.path || []).includes(elRef.current)) {
      } else {
        // console.log(event.path, elRef.current, 'event.path')
        setShow(false)
      }
    }
    document.addEventListener('click', onClose, false)
    return () => {
      document.removeEventListener('click', onClose, false)
    }
  }, [])

  const onItemClick = (item: MenuListItem, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    item.onClick && (item.onClick(item), setShow(false))
  }

  let max_y = window.innerHeight
  if (max_y - y < 310) {
    y = max_y - 310
  }
  return (
    <div ref={elRef}>
      {show && (
        <Wrapper x={x} y={y}>
          {renderItem(menuList, onItemClick)}
        </Wrapper>
      )}
    </div>
  )
}

function renderItem(menuList: MenuListItem[], onItemClick: any) {
  return (
    menuList &&
    menuList.map((item, index) => {
      if (item.type == 'text') {
        return (
          <div
            className={classNames({ 'text-item': true, disabled: item.disabled })}
            key={index}
            onClick={() => onItemClick(item)}
          >
            {item.icon && <img src={item.icon} alt='' className='icon' />}
            {item.label}
            {item.children && <img src={require('../../images/展开二级.png')} alt='' className='more' />}
            {item.children && (
              <div className='children-con'>{item.children && renderItem(item.children, onItemClick)}</div>
            )}
          </div>
        )
      } else {
        return <div className='line-item' key={index} />
      }
    })
  )
}

export function createContextMenu() {
  let _setShow: any = null
  let _setMenuList: any = null
  let _setOptions: any = null
  return {
    Component: () => {
      const [menuList, setMenuList]: any = useState([])
      const [options, setOptions] = useState({
        x: 0,
        y: 0
      })
      const [show, setShow] = useState(false)

      _setShow = setShow
      _setMenuList = setMenuList
      _setOptions = setOptions
      return <ContextMenu menuList={menuList} options={options} show={show} setShow={setShow} />
    },
    show(menuList: MenuList, options: Options) {
      _setShow && _setShow(true)
      _setShow && _setMenuList(menuList)
      _setShow && _setOptions(options)
    },
    close() {
      _setShow(false)
    }
  }
}
const Wrapper = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${(p) => p.x}px;
  top: ${(p) => p.y}px;
  z-index: 998;
  width: 150px;
  max-height: 500px;
  border: 1px solid #d1e5e0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  background: #fff;
  padding: 5px 0;
  .icon {
    height: 14px;
    margin-right: 14px;
    position: relative;
    top: -2px;
  }
  .more {
    height: 12px;
    margin-left: 10px;
    position: relative;
    top: 9px;
    float: right;
  }
  .text-item {
    height: 26px;
    line-height: 26px;
    cursor: pointer;
    color: #486a62;
    font-size: 13px;
    padding: 0 10px;
    position: relative;
    &.disabled {
      /* background: #f8f8f8; */
      color: #aaa;
      pointer-events: none;
      img {
        opacity: 0.6;
      }
    }
    &:hover {
      background: #e4f1f0;
      > .children-con {
        display: block;
      }
    }
    .children-con {
      display: none;
      position: absolute;
      left: 148px;
      top: 0;
      width: 150px;
      max-height: 500px;
      border: 1px solid #d1e5e0;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      background: #fff;
      padding: 0 0;
      > .text-item:hover {
        background: #e4f1f0;
        > .children-con {
          display: block;
        }
      }
    }
  }
  .line-item {
    border-top: 1px solid #ddd;
  }

  .symbol-con {
    display: flex;
    width: 100%;
    height: 100%;
    .symbol-icon {
      width: 30px;
    }
    .symbol-aside {
      width: 0;
      flex: 1;
    }
  }
`
