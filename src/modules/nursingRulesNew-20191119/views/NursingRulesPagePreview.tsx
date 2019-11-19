import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message as Message, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { appStore, authStore } from 'src/stores'
import { BaseStepCon, BaseStepBox } from 'src/components/BaseStep'
import GroupAuditModal from '../components/GroupAuditModal'
import { nursingRulesApiService } from './../api/nursingRulesNewService'
import PdfViewer from './../components/PdfViewer'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import Watermark from 'src/components/Watermark'
import qs from 'qs'

import { ReactComponent as SYZ } from './../assets/SYZ.svg'
import { ReactComponent as ML } from './../assets/ML.svg'
import { ReactComponent as SC } from './../assets/SC.svg'
import { ReactComponent as YSC } from './../assets/YSC.svg'
import { ReactComponent as XYZ } from './../assets/XYZ.svg'

//内容面板宽度和高度
const contentWidth = 780
const contentHeight = 1043

export interface Props { }

export default observer(function NursingRulesPagePreview(props: Props) {
  const { history, location } = appStore
  const search = qs.parse(location.search.replace('?', ''))
  const viewType = search.viewType || ''
  const viewTop = React.createRef<HTMLDivElement>()

  const [loading, setLoading] = useState(false)
  const [indexList, setIndexList] = useState([] as any)
  const [chapter, setChapter] = useState('' as any)
  const [pageUrl, setPageUrl] = useState('' as string)

  const [auditInfo, setAuditInfo] = useState({} as any)

  const bookName = search.bookName || ''
  const chapterName = chapter.name || ''

  useEffect(() => initedIndex(), [])

  const initedIndex = () => {
    if (!search.bookId) {
      Message.error('未知书籍id')
      return
    }

    setLoading(true)

    const callback = (newList?: any[]) => {
      setLoading(false)
      if (!newList) return

      setIndexList(newList)

      if (search.nodeNum) {
        let newChapter = findChapter(search.nodeNum, newList)

        if (newChapter) {
          setChapter(newChapter)

          if (search.pageUrl) {
            if (hasUrl(newChapter, search.pageUrl)) setPageUrl(search.pageUrl)
            else if (newChapter.urls) setPageUrl(newChapter.urls[0])
          } else if (newChapter.urls) setPageUrl(newChapter.urls[0])
        } else initChapterAndPage(newList)
      } else initChapterAndPage(newList)
    }

    if (viewType == 'favor')
      nursingRulesApiService.getCollections(search.bookId).then(
        (res) => {
          callback([
            {
              childrenList: res.data.map((item: any) => {
                return {
                  ...item,
                  name: item.nodeName
                }
              })
            }
          ])
        },
        (err) => callback()
      )
    else if (viewType == 'audit')
      Promise.all([
        nursingRulesApiService.getToAuditChapters(search.bookId),
        nursingRulesApiService.getBookInfo(search.bookId)
      ]).then(
        (res) => {
          callback(res[0].data)

          setAuditInfo(res[1].data)
        },
        (err) => callback()
      )
    else nursingRulesApiService.getBookCataLog(search.bookId).then((res) => callback(res.data), (err) => callback())
  }

  useEffect(() => {
    if (chapter && pageUrl)
      history.replace(
        `${location.pathname}?${qs.stringify({
          ...search,
          nodeNum: chapter.nodeNum,
          pageUrl
        })}`
      )

    if (viewTop.current) viewTop.current.scrollIntoView()
  }, [pageUrl, chapter])

  //初始化章节和预览路径为第一章第一节第一页
  const initChapterAndPage = (indexList: any[]) => {
    let newChapter
    let pageUrl

    if (indexList.length > 0) {
      if (indexList[0].childrenList && indexList[0].childrenList.length > 0) {
        newChapter = indexList[0].childrenList[0]
        if (newChapter.urls && newChapter.urls.length > 0) pageUrl = newChapter.urls[0]
      }
    }

    if (newChapter) setChapter(newChapter)
    if (pageUrl) setPageUrl(pageUrl)
  }

  const findChapter = (nodeNum: any, indexList: any) => {
    for (let i = 0; i < indexList.length; i++) {
      let target
      if (indexList[i].nodeNum == nodeNum) return indexList[i]

      if (indexList[i].childrenList) {
        target = indexList[i].childrenList.find((item: any) => item.nodeNum == nodeNum)
        if (target) return target
      }
    }

    return null
  }

  const hasUrl = (chapter: any, url: string): boolean => {
    if (chapter.urls) {
      let target = chapter.urls.find((item: string) => url == item)
      if (target) return true
    }

    return false
  }

  const [auditCfg, setAuditCfg] = useState({
    visible: false,
    params: {
      audit: true
    }
  })

  const leftControl = [
    {
      name: '目录',
      icon: <ML className='active index' />,
      onClick: () => {
        history.goBack()
      }
    },
    {
      name: chapter.collectionId ? '取消收藏' : '收藏',
      icon: (() => {
        if (chapter.inCollection) return <YSC />

        return <SC className='active' />
      })(),
      onClick(chapter: any, indexList: any) {
        if (chapter.inCollection)
          nursingRulesApiService.cancelCollection(chapter.collectionId).then((res) => {
            Message.success('已取消收藏')
            chapter.inCollection = 0
            chapter.collectionId = null
            setChapter({ ...chapter })
          })
        else
          nursingRulesApiService
            .addCollection({
              nodeNum: chapter.nodeNum,
              bookId: search.bookId
            })
            .then((res) => {
              Message.success('已收藏')
              if (res.data) {
                chapter.inCollection = 1
                chapter.collectionId = res.data.id
                setChapter({ ...chapter })
              }
            })
      }
    },
    {
      name: '上一章',
      icon: <SYZ className='active' />,
      onClick: () => {
        let idx1
        let idx2
        let newChapter

        for (let i = 0; i < indexList.length; i++) {
          let parent = indexList[i]
          if (parent.childrenList)
            for (let j = 0; j < parent.childrenList.length; j++) {
              if (parent.childrenList[j].nodeNum == chapter.nodeNum) {
                idx1 = i
                idx2 = j
              }
            }
          else if (parent.nodeNum == chapter.nodeNum) idx1 = i
        }

        if (!idx1 && idx1 !== 0) {
          Message.warning('缺失章节信息')
          return
        }

        if (indexList[idx1] && idx2 !== undefined) {
          //如果还有子章节
          idx2--
          let target = indexList[idx1].childrenList[idx2]
          if (target) newChapter = indexList[idx1].childrenList[idx2]
        }

        if (!newChapter) {
          //没有子章节 父章节序号往前进
          idx1--
          if (indexList[idx1]) {
            let childrenList = indexList[idx1].childrenList
            //如果子节点取最后一个子节点
            if (childrenList && childrenList.length >= 0) {
              newChapter = childrenList[childrenList.length - 1]
            } else {
              //否则取自己
              newChapter = indexList[idx1]
            }
          }
        }

        if (newChapter) {
          setChapter(newChapter)
          if (newChapter.urls) setPageUrl(newChapter.urls[0])
        } else {
          Message.warning('已是第一章')
        }
      }
    },
    {
      name: '下一章',
      icon: <XYZ className='active' />,
      onClick: () => {
        let idx1
        let idx2
        let newChapter
        for (let i = 0; i < indexList.length; i++) {
          let parent = indexList[i]
          if (parent.childrenList)
            for (let j = 0; j < parent.childrenList.length; j++) {
              if (parent.childrenList[j].nodeNum == chapter.nodeNum) {
                idx1 = i
                idx2 = j
              }
            }
          else if (parent.nodeNum == chapter.nodeNum) idx1 = i
        }

        if (!idx1 && idx1 !== 0) {
          Message.warning('缺失章节信息')
          return
        }

        if (indexList[idx1] && idx2 !== undefined) {
          //如果还有子章节
          idx2++
          let target = indexList[idx1].childrenList[idx2]
          if (target) newChapter = indexList[idx1].childrenList[idx2]
        }

        if (!newChapter) {
          //没有子章节 父章节序号往前进
          idx1++
          if (indexList[idx1]) {
            let childrenList = indexList[idx1].childrenList
            //如果子节点取第一个子节点
            if (childrenList && childrenList.length >= 0) {
              newChapter = childrenList[0]
            } else {
              //否则取自己
              newChapter = indexList[idx1]
            }
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
    },
    {
      name: '上一页',
      disabled: prevDisabled,
      onClick: () => {
        if (prevDisabled) return

        let idx = chapter.urls.indexOf(pageUrl)
        idx--
        setPageUrl(chapter.urls[idx])
      }
    },
    {
      name: '下一页',
      disabled: nextDisabled,
      onClick: () => {
        if (nextDisabled) return

        let idx = chapter.urls.indexOf(pageUrl)
        idx++
        setPageUrl(chapter.urls[idx])
      }
    },
    {
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
    setTimeout(() => history.goBack(), 1000)
    handleAuditCancel()
  }

  const handleAuditCancel = () => {
    setAuditCfg({ ...auditCfg, visible: false })
  }

  const ViewContent = () => {
    if (!pageUrl) return <div className='content-message'>暂无页面</div>
    let pageUrlArr = pageUrl.split('.')
    let type = pageUrlArr[pageUrlArr.length - 1]
    let url = `/crNursing/asset${pageUrl}`

    switch (type) {
      case 'jpg':
      case 'gif':
      case 'jpeg':
      case 'png':
        return (
          <Watermark>
            <img src={url} width='100%' />
          </Watermark>
        )
      case 'pdf':
        return <PdfViewer file={url} width={contentWidth - 2} />
      default:
        return <div className='content-message'>该文件格式不支持预览</div>
    }
  }

  const overTime = () => {
    if (!auditInfo.upLoadTime) return '...小时'
    let time = moment().diff(moment(auditInfo.upLoadTime), 'minute')

    let minutes = time % 60 ? `${time % 60}分钟` : ''
    time = parseInt((time / (24 * 60)).toString())
    let hours = time % 24 ? `${time % 24}小时` : ''
    let days = time / 24 ? `${time / 24}天` : ''
    if (!hours && !minutes && !days) return '0小时'
    return days + hours + minutes
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <NavCon>
          <Link to='/nursingRulesNew'>护理制度</Link>
          <span> > </span>
          <a onClick={() => history.goBack()}>{bookName || '书籍名称'}</a>
          <span> > </span>
          <span>{chapterName || '章节名称'}</span>
        </NavCon>
        <div className='fl-right'>
          <Button
            onClick={() => handleAudit(true)}
            type='primary'
            disabled={loading || !!!authStore.isDepartment}
            style={{ display: viewType == 'audit' ? 'block' : 'none' }}
          >
            审核
          </Button>
          <Button onClick={() => history.goBack()}>返回</Button>
        </div>
      </div>
      <div className='main-contain'>
        <div className='audit-content' style={{ display: viewType == 'audit' ? 'block' : 'none' }}>
          <TopTitleCon>
            <div className='topTitleIcon' />
            <div className='topTitle'>审核过程</div>
          </TopTitleCon>
          <BaseStepCon>
            <BaseStepBox success={'success'}>
              <StepBox>
                <div className='title'>提交书籍</div>
                <div>{`${auditInfo.upLoaderEmpName || ''} ${auditInfo.upLoadTime || ''}`}</div>
              </StepBox>
            </BaseStepBox>
            <BaseStepBox success={''}>
              <StepBox>
                <div className='title'>护理部审核</div>
                <div>审核中 耗时{overTime()}</div>
              </StepBox>
            </BaseStepBox>
          </BaseStepCon>
        </div>
        <div className='preview-content'>
          <Spin spinning={loading} className='main-loading' />
          <div className='left-control' style={{ display: viewType == '' ? 'block' : 'none' }}>
            {leftControl.map((item: any, idx: number) => (
              <div className='item' onClick={() => item.onClick(chapter, indexList)} key={idx}>
                <div className='icon'>{item.icon}</div>
                <div className='text'>{item.name}</div>
              </div>
            ))}
          </div>
          <div className='right-control'>
            {rightControl.map((item: any, idx: number) => (
              <div
                className={['item', item.disabled ? 'disabled' : ''].join(' ')}
                onClick={() => item.onClick()}
                key={idx}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className='scroll-warpper'>
            <div ref={viewTop} className='scroll-top' />
            <div className='page-content'>{ViewContent()}</div>
            <div className='page-info'>
              {`第${(chapter.urls && chapter.urls.length && chapter.urls.indexOf(pageUrl) + 1) ||
                0}页/共${(chapter.urls && chapter.urls.length) || 0}页`}
            </div>
          </div>
        </div>
      </div>
      <GroupAuditModal
        visible={auditCfg.visible}
        defaultParams={auditCfg.params}
        onOk={handleAuditOk}
        onCancel={handleAuditCancel}
        bookId={search.bookId}
        nodeNums={[search.nodeNum]}
        title='审核'
      />
    </Wrapper>
  )
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
  width: 100%;
  .topbar {
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    .fl-right {
      float: right;
      margin-top: -4px;
      & > * {
        float: left;
        margin-left: 10px;
      }
    }
  }
  .main-contain {
    position: fixed;
    left: 0;
    right: 0;
    top: 94px;
    bottom: 0;
    .main-loading {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      background: rgba(255, 255, 255, 0.5);
      .ant-spin-dot-spin {
        position: absolute;
        top: 50%;
        left: 50%;
      }
    }
    .scroll-top {
      position: relative;
      top: -15px;
    }
  }
  .audit-content {
    float: right;
    width: 260px;
    background: #fff;
    border-left: 1px solid #ddd;
    height: 100%;
    padding: 20px;
  }
  .preview-content {
    overflow: hidden;
    height: 100%;
    position: relative;
    .scroll-warpper {
      width: 100%;
      height: 100%;
      padding: 15px 0;
      overflow: auto;
      ${scrollBarStyle}

      .page-content {
        width: ${contentWidth}px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #ddd;
        border-bottom: 0;
        min-height: ${contentHeight}px;
        position: relative;
        img {
          width: 100%;
        }
        .content-message {
          width: ${contentWidth}px;
          height: ${contentHeight}px;
          line-height: ${contentHeight * 0.6}px;
          text-align: center;
          font-size: 14px;
        }
      }
      .page-info {
        width: ${contentWidth}px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #ddd;
        border-top: 0;
        padding: 10px 0;
        text-align: center;
      }
    }
    .left-control {
      position: absolute;
      left: 50%;
      top: 15px;
      width: 80px;
      background: #fff;
      transform: translate(-486px);
      border: 1px solid #ddd;
      .item {
        width: 100%;
        height: 78px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        overflow: hidden;
        &:last-of-type {
          border-bottom: none;
        }
        .text {
          transition: all 0.5s;
        }
        .icon {
          height: 25px;
          width: 25px;
          margin: 12px auto 8px;
          svg {
            width: 100%;
            height: 100%;
            g,
            path {
              transition: all 0.3s;
            }
          }
        }
        :hover {
          .text {
            color: #00a680;
          }
          .icon {
            svg.active {
              g {
                opacity: 1;
              }
              path {
                stroke: #00a680;
              }
              &.index path {
                stroke: #00a680;
                fill: #00a680;
              }
            }
          }
        }
        .text {
          font-size: 14px;
          text-align: center;
        }
      }
    }
    .right-control {
      position: absolute;
      right: 50%;
      top: 15px;
      width: 80px;
      background: #fff;
      transform: translate(478px);
      border: 1px solid #ddd;
      .item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        text-align: center;
        font-size: 14px;
        transition: all 0.3s;
        &:last-of-type {
          border-bottom: none;
        }
        &.disabled {
          background: rgba(0, 0, 0, 0.05);
          color: #aaa;
          cursor: not-allowed;
        }
        :hover {
          color: #00a680;
          &.disabled {
            color: #aaa;
          }
        }
      }
    }
  }
`

const NavCon = styled.div`
  display: inline-block;
  line-height: 24px;
  a {
    color: #666;
    :hover {
      color: #333;
    }
  }
  span {
    color: #888;
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
