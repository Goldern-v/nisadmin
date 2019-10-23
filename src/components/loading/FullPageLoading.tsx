import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore } from 'src/stores'
export interface Props extends RouteComponentProps {}

export default observer(function FullPageLoading() {
  const [progress, setProgress] = useState('0%')
  const [fullPage, setFullPage] = useState(false)
  useEffect(() => {
    /** 模拟进度 */
    let duration = appStore.fullLoadingBarObj!.duration
    if (duration) {
      setTimeout(() => {
        setProgress('51%')
      }, duration * 0.1)
      setTimeout(() => {
        setProgress('73%')
      }, duration * 0.3)
      setTimeout(() => {
        setProgress('85%')
      }, duration * 0.5)
      setTimeout(() => {
        setProgress('92%')
      }, duration * 0.7)
      setTimeout(() => {
        setProgress('95%')
      }, duration * 0.9)
      setTimeout(() => {
        setProgress('99%')
      }, duration * 1)
    }
  }, [])
  return (
    <div>
      {fullPage ? (
        <FullPageWrapper>
          <div className='text-con'>
            <div className='title'>{appStore.fullLoadingBarObj!.progress || progress || '0%'}</div>
            <div className='aside'>{appStore.fullLoadingBarObj!.aside}</div>
          </div>
          <div className='inner'>
            <div className='container' style={{ width: appStore.fullLoadingBarObj!.progress || progress || 0 }}>
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
          <div className='toSmallBtn' onClick={() => setFullPage(false)}>
            <img src={require('./images/缩小@2x.png')} alt='' />
          </div>
        </FullPageWrapper>
      ) : (
        <SmallPageWrapper>
          <div className='text-con'>
            <div className='title'>{appStore.fullLoadingBarObj!.progress || progress || '0%'}</div>
            <div className='aside'>{appStore.fullLoadingBarObj!.aside}</div>
          </div>
          <div className='inner'>
            <div className='container' style={{ width: appStore.fullLoadingBarObj!.progress || progress || 0 }}>
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
          <img className='toFull-btn' src={require('./images/放大@2x.png')} alt='' onClick={() => setFullPage(true)} />
        </SmallPageWrapper>
      )}
    </div>
  )
})

const BAR_WIDTH = '737px'
const BAR_HEIGHT = '40px'
const DEEP_COLOR = '#00A680'
const LIGHT_COLOR = '#0EB690'
const BG_COLOR = '#323335'
const PROGRESS_TEXT_SIZE = '90px'

const S_BAR_WIDTH = '260px'
const S_BAR_HEIGHT = '12px'
const S_DEEP_COLOR = '#00A680'
const S_LIGHT_COLOR = '#0EB690'
const S_BG_COLOR = '#323335'
const S_PROGRESS_TEXT_SIZE = '40px'
const FullPageWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1000;
  h3 {
    color: #fff;
    font-size: 200%;
    text-align: center;
    text-shadow: 2px 1px 6px #111;
  }
  div.text-con {
    position: absolute;
    margin: auto;
    padding-bottom: 150px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    color: #fff;
    text-align: center;
    height: 160px;
    box-sizing: content-box;
    .title {
      font-size: ${PROGRESS_TEXT_SIZE};
      line-height: ${PROGRESS_TEXT_SIZE};
    }
    .aside {
      font-size: 20px;
    }
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
    background: ${BG_COLOR};
  }
  div.toSmallBtn {
    width: 55px;
    height: 55px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    border: 1px solid rgba(179, 179, 179, 1);
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 150px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 28px;
    }
  }

  /*** set div as container ***/
  div.container {
    position: relative;
    /* top: 11px;
    left: 11px; */
    left: 0;
    height: ${BAR_HEIGHT};
    overflow: hidden;
    z-index: 10000;
    box-shadow: inset 0px 1px 3px #ddd;
    width: 0;
    transition: width 0.5s;
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
    height: ${BAR_HEIGHT};
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
const SmallPageWrapper = styled.div`
  position: fixed;
  left: 5px;
  bottom: 5px;
  border-radius: 13px;
  width: 300px;
  height: 140px;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1000;
  h3 {
    color: #fff;
    font-size: 200%;
    text-align: center;
    text-shadow: 2px 1px 6px #111;
  }
  div.text-con {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 20px;
    color: #fff;
    text-align: center;
    /* height: 160px; */
    box-sizing: content-box;
    .title {
      font-size: ${S_PROGRESS_TEXT_SIZE};
      line-height: ${S_PROGRESS_TEXT_SIZE};
      margin-bottom: 10px;
    }
    .aside {
      font-size: 12px;
    }
  }
  div.inner {
    width: ${S_BAR_WIDTH};
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 30px;
    height: ${S_BAR_HEIGHT};
    background: ${S_BG_COLOR};
  }

  /*** set div as container ***/
  div.container {
    position: relative;
    /* top: 11px;
    left: 11px; */
    left: 0;
    height: ${S_BAR_HEIGHT};
    overflow: hidden;
    z-index: 10000;
    box-shadow: inset 0px 1px 3px #ddd;
    width: 0;
    transition: width 0.5s;
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
    height: ${S_BAR_HEIGHT};
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
    background-color: ${S_LIGHT_COLOR};
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
    background-color: ${S_DEEP_COLOR};
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
  .toFull-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`
