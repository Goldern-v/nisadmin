import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import classNames from 'classnames'
export interface Props {}

export function BaseStepCon(props: any) {
  const Wrapper = styled.div`
    & .step-box:last-of-type .line {
      display: none;
    }
  `
  return <Wrapper>{props.children}</Wrapper>
}

interface BoxProps {
  children: React.ReactNode
  success: boolean
}

export function BaseStepBox(props: BoxProps) {
  let { success } = props
  const Wrapper = styled.div`
    position: relative;
    .box {
      padding-left: 35px;
    }
    .success-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      background: ${(p) => p.theme.$mtc};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      z-index: 3;
      img {
        width: 12px;
      }
    }
    .unSuccess-icon {
      position: absolute;
      left: 3px;
      top: 3px;
      width: 12px;
      height: 12px;
      background: #d8d8d8;
      border-radius: 50%;
      z-index: 3;
    }
    .line {
      position: absolute;
      left: 9px;
      top: 0;
      bottom: -3px;
      width: 1px;
      background: #d8d8d8;
      &.success {
        background: ${(p) => p.theme.$mtc};
        z-index: 2;
      }
    }
  `
  return (
    <Wrapper className='step-box'>
      <div className='box'>{props.children}</div>
      {success ? (
        <div className='success-icon'>
          <img src={require('./images/step-勾.png')} alt='' />
        </div>
      ) : (
        <div className='unSuccess-icon' />
      )}

      <div
        className={classNames({
          line: true,
          success: success
        })}
      />
    </Wrapper>
  )
}
