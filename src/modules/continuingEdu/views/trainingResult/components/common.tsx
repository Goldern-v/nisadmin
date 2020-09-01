import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const NavCon = styled.div`
  a{
    color: #666;
    :hover{
      color: #333;
    }
  }
  span{
    color: #888
  }
  margin-bottom: 5px;
`

export const TopPannel = styled.div`
  height: 100px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  padding: 10px 15px;
  font-size: 12px;
  position: relative;
`
export const MainTitle = styled.div`
  font-size: 24px;
  color: #000;
  min-height: 36px;
  min-width:100px;
`
export const SubContent = styled.div`
  span{
    vertical-align:middle;
    &.label{
      margin-right: 5px;
    }
    &.content{
      margin-right: 15px;
      display: inline-block;
      /* min-width: 60px; */
    }
  }
`
export const ButtonGroups = styled.div`
  position: absolute;
  right: 15px;
  top: 35px;
  button{
    margin-right:10px;
    &:last-of-type{
      margin-right:0;
    }
  }
`
export const MainPannel = styled.div`
  flex: 1;
  padding-top: 15px;
  padding-bottom: 15px;
`

export const ActiveText = styled.span`
  cursor: pointer;
  color: #1db38b;
  &:hover{
    font-weight: bold;
  }
`
