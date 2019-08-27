import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTabs from 'src/components/BaseTabs'
export interface Props {}

export default function FlightMenu() {
  return (
    <Wrapper>
      <BaseTabs
        config={[
          {
            title: '可选班次',
            index: '0',
            component: <MenuCon />
          },
          {
            title: '班次套餐',
            index: '1',
            component: <MenuCon2 />
          }
        ]}
      />
    </Wrapper>
  )
}

function MenuCon() {
  const Contain = styled.div`
    padding: 5px;
    .menu-box {
      width: 50%;
      float: left;
      padding: 5px;
      .box-inner {
        height: 30px;
        padding: 5px;
      }
    }
  `
  return (
    <Contain>
      <div className='menu-box'>
        <div className='box-inner'>班次一</div>
      </div>
      <div className='menu-box'>
        <div className='box-inner'>班次二</div>
      </div>
      <div className='menu-box'>
        <div className='box-inner'>班次三</div>
      </div>
      <div className='menu-box'>
        <div className='box-inner'>班次四</div>
      </div>
    </Contain>
  )
}
function MenuCon2() {
  const Contain = styled.div`
    padding: 5px;
    .menu-box {
      width: 50%;
      float: left;
      padding: 5px;
      .box-inner {
        height: 30px;
        padding: 5px;
      }
    }
  `
  return (
    <Contain>
      <div className='menu-box'>
        <div className='box-inner'>班次一12</div>
      </div>
      <div className='menu-box'>
        <div className='box-inner'>班次二</div>
      </div>
      <div className='menu-box'>
        <div className='box-inner'>班次三</div>
      </div>
      <div className='menu-box'>
        <div className='box-inner'>班次四</div>
      </div>
    </Contain>
  )
}

const Wrapper = styled.div`
  margin-left: 20px;
  .ant-tabs-nav {
    width: 100%;
  }
  .ant-tabs-tab {
    width: 50%;
  }
`
