import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import { Options, MenuList, MenuListItem } from '../../types/contextMenu'

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
    item.onClick && item.onClick()
    setShow(false)
  }

  return (
    <div ref={elRef}>
      {show && (
        <Wrapper x={x} y={y}>
          {renderItem(menuList)}
        </Wrapper>
      )}
    </div>
  )
}

function renderItem(menuList: MenuListItem[]) {
  return (
    menuList &&
    menuList.map((item, index) => {
      if (item.type == 'text') {
        return (
          <div className='text-item' key={index}>
            {item.label}
            {item.children && <div className='children-con'>{item.children && renderItem(item.children)}</div>}
          </div>
        )
      } else {
        return <div className='line-item' key={index} />
      }
    })
  )
}

export function createContextMenu() {
  const [menuList, SetMenuList]: any = useState([])
  const [options, SetOptions] = useState({
    x: 0,
    y: 0
  })
  const [show, setShow] = useState(false)

  return {
    Component: () => {
      return <ContextMenu menuList={menuList} options={options} show={show} setShow={setShow} />
    },
    show(menuList: MenuList, options: Options) {
      setShow(true)
      SetMenuList(menuList)
      SetOptions(options)
      console.log('show')
    },
    close() {
      setShow(false)
    }
  }
}
const Wrapper = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${(p) => p.x}px;
  top: ${(p) => p.y}px;
  z-index: 998;
  width: 160px;
  max-height: 500px;
  border: 1px solid #d1e5e0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  background: #fff;
  padding: 10px 0;

  .text-item {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    color: #486a62;
    font-size: 14px;
    padding: 0 10px;
    position: relative;
    &:hover {
      background: #e4f1f0;
      > .children-con {
        display: block;
      }
    }
    .children-con {
      display: none;
      position: absolute;
      left: 155px;
      top: 0;
      width: 160px;
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
`
