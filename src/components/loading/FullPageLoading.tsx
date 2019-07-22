import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function FullPageLoading() {
  useEffect(() => {})
  return (
    <Wrapper>
      <div className='inner'>
        <div className='container'>
          <ul>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

const BAR_WIDTH = '420px'
const BAR_WIDTH_INNER = '400px'
const BAR_HEIGHT = '40px'
const DEEP_COLOR = '#00A680'
const LIGHT_COLOR = '#0EB690'
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1000;
  h3 {
    font-family: 'Open sans';
    color: #fff;
    font-size: 200%;
    text-align: center;
    text-shadow: 2px 1px 6px #111;
  }

  div.inner {
    width: ${BAR_WIDTH};
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: ${BAR_HEIGHT};
  }
/* 
  div.impress {
    position: absolute;
    width: ${BAR_WIDTH};
    height: ${BAR_HEIGHT};
    background: ${LIGHT_COLOR};
    background: -moz-linear-gradient(top, ${LIGHT_COLOR} 0%, ${DEEP_COLOR} 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, ${LIGHT_COLOR}), color-stop(100%, ${DEEP_COLOR}));
    background: -webkit-linear-gradient(top, ${LIGHT_COLOR} 0%, ${DEEP_COLOR} 100%);
    background: -o-linear-gradient(top, ${LIGHT_COLOR} 0%, ${DEEP_COLOR} 100%);
    background: -ms-linear-gradient(top, ${LIGHT_COLOR} 0%, ${DEEP_COLOR} 100%);
    background: linear-gradient(to bottom, ${LIGHT_COLOR} 0%, ${DEEP_COLOR} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${LIGHT_COLOR}', endColorstr='${DEEP_COLOR}',GradientType=0 );
    box-shadow: inset 0 -2px 10px #222;
    border: 1px solid #222;
    opacity: 0.4;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
  } */

  /*** set div as container ***/
  div.container {
    position: relative;
    top: 11px;
    left: 11px;
    width: ${BAR_WIDTH_INNER};
    height: 20px;
    overflow: hidden;
    z-index: 10000;
    box-shadow: inset 0px 1px 3px #ddd;
  }

  div.container:before {
    position: absolute;
    content: ' ';
    width: 100%;
    height: 50%;
    background-color: #fff;
    opacity: 0.2;
  }

  /*** start ul config ***/

  ul {
    position: relative;
    width: 200%;
    height: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: -1;
  }

  /*** set li:first-child as our background  ***/

  ul li:first-child {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${LIGHT_COLOR};
    transform: none;
    -moz-transform: none;
    -webkit-transform: none;
  }

  /*** set other li's as loading bars ***/

  ul li:nth-child(n + 2) {
    position: relative;
    width: 7%;
    height: 100%;
    transform: skewX(-45deg);
    -moz-transform: skewX(-45deg);
    -webkit-transform: skewX(-45deg);
    background-color: ${DEEP_COLOR};
    margin-right: 5%;
    display: inline-block;
    animation: loading 0.5s infinite linear;
    -moz-animation: loading 0.5s infinite linear;
    -webkit-animation: loading 0.5s infinite linear;
    -o-animation: loading 0.5s infinite linear;
  }

  /*** setup our animation ***/

  @keyframes loading {
    from {
      left: -10%;
    }
    to {
      left: 3%;
    }
  }

  @-moz-keyframes loading {
    from {
      left: -10%;
    }
    to {
      left: 3%;
    }
  }

  @-webkit-keyframes loading {
    from {
      left: -10%;
    }
    to {
      left: 3%;
    }
  }

  @-o-keyframes loading {
    from {
      left: -10%;
    }
    to {
      left: 3%;
    }
  }
`
