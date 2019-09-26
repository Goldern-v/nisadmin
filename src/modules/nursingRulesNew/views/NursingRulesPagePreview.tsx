import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message as Message } from 'antd'
import { Link } from 'react-router-dom'
import { appStore } from 'src/stores'
import { BaseStepCon, BaseStepBox } from 'src/components/BaseStep'
import GroupAuditModal from '../components/GroupAuditModal'
import PdfViewer from './../components/PdfViewer'
import { observer } from 'mobx-react-lite'
import qs from 'qs'

import { ReactComponent as SYZ } from './../assets/上一章.svg'
import { ReactComponent as ML } from './../assets/目录.svg'
import { ReactComponent as SC } from './../assets/收藏.svg'
import { ReactComponent as YSC } from './../assets/已收藏.svg'
import { ReactComponent as XYZ } from './../assets/下一章.svg'

//内容面板宽度
const contentWidth = 740

export interface Props { }

export default observer(function NursingRulesPagePreview(props: Props) {
  const { history, location } = appStore;
  const search = qs.parse(location.search.replace('?', ''))
  const viewType = search.viewType || ''

  const [loading, setLoading] = useState(false)
  const [indexList, setIndexList] = useState([] as any)
  const [chapter, setChapter] = useState('' as any)
  const [pageUrl, setPageUrl] = useState('' as string)

  const bookName = search.bookName || ''
  const chapterName = chapter.name || ''

  useEffect(() => {
    initedIndex()
  }, [])

  const initedIndex = () => {
    if (!search.bookId) Message.error('未知书籍id')

    let newIndexList: any[] = []

    setIndexList(newIndexList)

    if (search.nodeNum) {
      let newChapter = findChapter(search.nodeNum)

      if (newChapter) {
        setChapter(newChapter)

        if (search.pageUrl) {
          let url = findUrl(newChapter, search.pageUrl)

          if (url) {
            setPageUrl(search.pageUrl)
          } else {
            if (newChapter.urls) setPageUrl(search.pageUrl)
          }
        } else {

        }
      } else {
        initChapterAndPage(newIndexList)
      }

    } else {
      initChapterAndPage(newIndexList)
    }
  }

  useEffect(() => {
    if (chapter && pageUrl) history.replace(`${location.pathname}?${qs.stringify({
      ...search,
      nodeNum: chapter.nodeNum,
      pageUrl
    })}`)
  }, [pageUrl, chapter])

  //初始化章节和预览路径
  const initChapterAndPage = (indexList: any[]) => {
    let newChapter
    let pageUrl

    if (indexList.length > 0) {
      if (indexList[0].childrenList && indexList[0].childrenList.length > 0) {
        newChapter = indexList[0].childrenList[0]
        if (newChapter.urls && newChapter.urls.length > 0) {
          pageUrl = newChapter.urls[0]
        }
      }
    }

    if (newChapter) setChapter(newChapter)
    if (pageUrl) setPageUrl(pageUrl)

  }

  const findChapter = (nodeNum: any) => {
    for (let i = 0; i < indexList.length; i++) {
      if (indexList[i].childrenList) {
        let target = indexList.childrenList.find((item: any) => item.nudeNum == nodeNum)
        if (target) return target
      }
    }

    return null
  }

  const findUrl = (chapter: any, pageUrl: string) => {
    let url = ''

    if (chapter.urls) {
      let target = chapter.urls.find((item: string) => search.pageUrl == item)
      if (target) url = target
    }

    return url
  }

  const [auditCfg, setAuditCfg] = useState({
    visible: false,
    params: {
      audit: true,
    }
  })

  const leftControl = [
    {
      name: '目录',
      icon: <ML className="active index" />,
      onClick: () => {
        history.push('/NursingRulesNewDetail')
      }
    },
    {
      name: '收藏',
      icon: (() => {
        if (chapter.inCollection)
          return <YSC />

        return <SC className="active" />
      })(),
      onClick: () => {
        Message.success('收藏成功')
      }
    },
    {
      name: '上一章',
      icon: <SYZ className="active" />,
      onClick: () => {
        let idx1
        let idx2
        let newChapter
        for (let i = 0; i < indexList.length; i++) {
          if (indexList[i].childrenList)
            for (let j = 0; j < indexList[i].childrenList.length; j++) {
              if (indexList[i].childrenList[j].nodeNum == chapter.nodeNum) {
                idx1 = i
                idx2 = j
              }
            }
        }

        if ((!idx1 && idx1 !== 0) || (!idx2 && idx2 !== 0)) {
          Message.warning('已是开始章节')
          return
        }

        if (indexList[idx1] && indexList[idx1].childrenList[idx2 - 1]) {
          newChapter = indexList[idx1].childrenList[idx2 - 1]
        }

        if (!newChapter) {
          idx1--
          if (indexList[idx1] && indexList[idx1].childrenList) {
            let idx2 = indexList[idx1].childrenList.length - 1
            newChapter = indexList[idx1].childrenList[idx2]
          }
        }

        if (newChapter) {
          setChapter(newChapter)
          if (newChapter.urls) setPageUrl(newChapter.urls[0])
        } else {
          Message.warning('已是开始章节')
        }

      }
    },
    {
      name: '下一章',
      icon: <XYZ className="active" />,
      onClick: () => {
        let idx1
        let idx2
        let newChapter
        for (let i = 0; i < indexList.length; i++) {
          if (indexList[i].childrenList)
            for (let j = 0; j < indexList[i].childrenList.length; j++) {
              if (indexList[i].childrenList[j].nodeNum == chapter.nodeNum) {
                idx1 = i
                idx2 = j
              }
            }
        }

        if ((!idx1 && idx1 !== 0) || (!idx2 && idx2 !== 0)) {
          Message.warning('已是最后章节')
          return
        }
        if (indexList[idx1] && indexList[idx1].childrenList[idx2 + 1]) {
          newChapter = indexList[idx1].childrenList[idx2 + 1]
        }

        if (!newChapter) {
          idx1++
          idx2 = 0
          if (indexList[idx1] && indexList[idx1].childrenList[idx2]) {
            newChapter = indexList[idx1].childrenList[idx2]
          }
        }

        if (newChapter) {
          setChapter(newChapter)
          if (newChapter.urls) setPageUrl(newChapter.urls[0])
        } else {
          Message.warning('已是最后章节')
        }
      }
    }
  ]

  const prevDisabled = (() => {
    if (loading) return true
    if (!pageUrl) return true
    if (!chapter || !chapter.urls) return true
    if (chapter.urls.indexOf(pageUrl) <= 0) return true

    return false
  })()

  const nextDisabled = (() => {
    if (loading) return true
    if (!pageUrl) return true
    if (!chapter || !chapter.urls) return true
    if (chapter.urls.indexOf(pageUrl) >= chapter.urls.length - 1) return true

    return false
  })()

  const rightControl = [
    {
      name: '首页',
      disabled: prevDisabled,
      onClick: () => {
        if (prevDisabled) return

        setPageUrl(chapter.urls[0])
      }
    }, {
      name: '上一页',
      disabled: prevDisabled,
      onClick: () => {
        if (prevDisabled) return

        let idx = chapter.urls.indexOf(pageUrl)
        idx--
        setPageUrl(chapter.urls[idx])
      }
    }, {
      name: '下一页',
      disabled: nextDisabled,
      onClick: () => {
        if (nextDisabled) return

        let idx = chapter.urls.indexOf(pageUrl)
        idx++
        setPageUrl(chapter.urls[idx])
      }
    }, {
      name: '末页',
      disabled: nextDisabled,
      onClick: () => {
        if (nextDisabled) return

        let idx = chapter.urls.length - 1
        setPageUrl(chapter.urls[idx])
      }
    }
  ]

  const handleAudit = (audit: boolean) => {
    setAuditCfg({ ...auditCfg, params: { audit: audit }, visible: true })
  }


  const handleAuditOk = () => {
    handleAuditCancel();
  }

  const handleAuditCancel = () => {
    setAuditCfg({ ...auditCfg, visible: false })
  }

  const ViewContent = () => {
    let type = 'pdf'
    let url = pageUrl
    if (!pageUrl) return <div style={{ height: '500px', lineHeight: '500px', textAlign: 'center' }}>未知页面</div>

    switch (type) {
      case 'jpg':
      case 'gif':
      case 'jpeg':
        return <img src={url} width='100%' />
      case 'pdf':
        return <PdfViewer file={url} width={contentWidth - 2} />
      default:
        return <div style={{ height: '500px', lineHeight: '500px', textAlign: 'center' }}>该文件格式不支持预览</div>
    }
  }

  return <Wrapper>
    <div className="topbar">
      <NavCon>
        <Link to="/nursingRulesNew">护理制度</Link>
        <span> > </span>
        <Link to="/nursingRulesNewDetail">{bookName || '书籍名称'}</Link>
        <span> > </span>
        <span>{chapterName || '章节名称'}</span>
      </NavCon>
      <div className="fl-right">
        <Button onClick={() => handleAudit(true)} type="primary">审核</Button>
      </div>
    </div>
    <div className="main-contain">
      <div className="audit-content" style={{ display: 'block' }}>
        <TopTitleCon>
          <div className='topTitleIcon' />
          <div className='topTitle'>审核过程</div>
        </TopTitleCon>
        <BaseStepCon>
          <BaseStepBox success={'success'}>
            <StepBox>
              <div className="title">提交书籍</div>
              <div>王大锤 2019-08-19 12:00</div>
            </StepBox>
          </BaseStepBox>
          <BaseStepBox success={''}>
            <StepBox>
              <div className="title">护理部审核</div>
              <div>审核中 耗时10小时</div>
            </StepBox>
          </BaseStepBox>
        </BaseStepCon>
      </div>
      <div className="preview-content">
        <div className="left-control" style={{ display: viewType == '' ? 'block' : 'none' }}>
          {leftControl.map((item: any, idx: number) => {
            return <div className="item" onClick={() => item.onClick()} key={idx}>
              <div className="icon">{item.icon}</div>
              <div className="text">{item.name}</div>
            </div>
          })}
        </div>
        <div className="right-control">
          {rightControl.map((item: any, idx: number) => <div className={['item', item.disabled ? 'disabled' : ''].join(' ')} onClick={() => item.onClick()} key={idx}>{item.name}</div>)}
        </div>
        <div className="scroll-warpper">
          <div className="page-content">
            {ViewContent()}
          </div>
          <div className="page-info">
            {`第${(chapter.urls && chapter.urls.length && chapter.urls.indexOf(pageUrl) + 1) || 0}页/共${chapter.urls && chapter.urls.length || 0}页`}
          </div>
        </div>
      </div>
    </div>
    <GroupAuditModal visible={auditCfg.visible} defaultParams={auditCfg.params} onOk={handleAuditOk} onCancel={handleAuditCancel} title="审核" />
  </Wrapper>
})

const scrollBarStyle = `
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.1);
}
::-webkit-scrollbar-track {
  background-color: #ddd;
}
`

const Wrapper = styled.div`
  height: 100%;
  width:100%;
  .topbar{
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    .fl-right{
      float: right;
      margin-top: -4px;
    }
  }
  .main-contain{
    position: fixed;
    left: 0;
    right: 0;
    top: 94px;
    bottom: 0;
  }
  .audit-content{
    float: right;
    width: 260px;
    background: #fff;
    border-left: 1px solid #ddd;
    height: 100%;
    padding: 20px;
  }
  .preview-content{
    overflow:hidden;
    height: 100%;
    position: relative;
    .scroll-warpper{
      width: 100%;
      height: 100%;
      padding: 15px 0;
      overflow: auto;
      ${scrollBarStyle}

      .page-content{
        width: ${contentWidth}px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #ddd;
        border-bottom: 0;
        min-height: 500px;
        position: relative;
        img{
          width: 100%;
        }
      }
      .page-info{
        width: ${contentWidth}px;
        margin: 0 auto;
        background: #fff;
        border:1px solid #ddd;
        border-top: 0;
        padding: 10px 0;
        text-align:center;
      }
    }
    .left-control{
      position: absolute;
      left: 50%;
      top: 15px;
      width: 80px;
      background: #fff;
      transform: translate(-464px);
      border: 1px solid #ddd;
      .item{
        width: 100%;
        height: 78px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        overflow: hidden;
        &:last-of-type{
          border-bottom: none;
        }
        .text{
          transition: all .5s;
        }
        .icon{
          height: 25px;
          width: 25px;
          margin: 12px auto 8px;
          svg{
            width: 100%;
            height: 100%;
            g,path{
              transition: all .3s;
            }
          }
        }
        :hover{
          .text{
            color:#00A680;
          }
          .icon{
            svg.active{
              g{
                opacity: 1;
              }
              path{
                stroke:#00A680;
              }
              &.index path{
                stroke:#00A680;
                fill:#00A680;
              }
            }
          }
        }
        .text{
          font-size: 16px;
          text-align: center;
        }
      }
    }
    .right-control{
      position: absolute;
      right: 50%;
      top: 15px;
      width: 80px;
      background: #fff;
      transform: translate(456px);
      border: 1px solid #ddd;
      .item{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        transition: all .3s;
        &:last-of-type{
          border-bottom: none;
        }
        &.disabled{
          background: rgba(0,0,0,0.05);
          color: #aaa;
          cursor: not-allowed;
        }
        :hover{
          color:#00A680;
          &.disabled{
            color: #aaa;
          }
        }
      }
    }
  }
`

const NavCon = styled.div`
  display:inline-block;
  line-height: 24px;
  a{
    color: #666;
    :hover{
      color: #333;
    }
  }
  span{
    color: #888
  }
`

const TopTitleCon = styled.div`
  margin-bottom: 16px;
  .topTitleIcon {
    margin-left: -5px;
    display: inline-block;
    width: 6px;
    height: 12px;
    background: rgba(75, 176, 141, 1);
  }
  .topTitle {
    margin-left: 10px;
    display: inline-block;
    font-size: 16px;
    color: #333333;
  }
  `

const StepBox = styled.div`
  padding-bottom: 10px;
  * {
    font-size: 12px;
  }
  .title {
    color: #000;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .info,
  .date,
  .nodo {
    color: #687179;
    margin-bottom: 3px;
  }
  .text-box {
    color: 12px;
    background: #e6eceb;
    border-radius: 2px;
    padding: 10px 12px;
    margin: 5px 0 0;
    .text-box-title {
      font-weight: bold;
    }
  }
`