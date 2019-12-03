import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { appStore, authStore } from 'src/stores'
import GroupAuditModal from '../components/GroupAuditModal'
import { nursingRulesApiService } from './../api/nursingRulesNewService'
import { observer } from 'mobx-react-lite'
import qs from 'qs'

import RevisionPannel from './../components/RevisionPannel'
import ViewContent from './../components/previewPage/ViewContent'
import AuditInfo from './../components/previewPage/AuditInfo'
import RevisionBtn from './../components/previewPage/RevisionBtn'

// import { ReactComponent as SYZ } from './../assets/SYZ.svg'
import { ReactComponent as ML } from './../assets/ML.svg'
import { ReactComponent as SC } from './../assets/SC.svg'
import { ReactComponent as YSC } from './../assets/YSC.svg'
// import { ReactComponent as XYZ } from './../assets/XYZ.svg'

//内容面板宽度和高度
const contentWidth = 780
const contentHeight = 1043

export interface Props { }

export default observer(function NursingRulesPagePreview(props: Props) {
  const { history, location } = appStore
  const { isDepartment } = authStore

  const search = appStore.queryObj
  const viewType = search.viewType || ''
  const viewTop = React.createRef<HTMLDivElement>()

  const [loading, setLoading] = useState(false)
  const [indexList, setIndexList] = useState([] as any)
  const [chapter, setChapter] = useState('' as any)
  const [pageUrl, setPageUrl] = useState('' as string)

  const [auditInfo, setAuditInfo] = useState({} as any)

  const [revisionList, setRevisionList] = useState([] as any[])
  const [revisionVisible, setRevisionVisible] = useState(false as boolean)

  const bookName = search.bookName || ''
  const chapterName = chapter.name || ''

  useEffect(() => initedIndex(), [])

  const initedIndex = () => {
    if (!search.bookId) {
      message.error('未知书籍id')
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
          getRevisionList(newChapter)

          if (search.pageUrl) {
            // console.log(newChapter)
            setPageUrl(search.pageUrl)
            // if (hasUrl(newChapter, search.pageUrl)) setPageUrl(search.pageUrl)
            // else if (newChapter.urls) setPageUrl(newChapter.urls[0]||'')
          } else if (newChapter.urls) setPageUrl(newChapter.urls[0] || '')
        } else initChapterAndPage(newList)
      } else initChapterAndPage(newList)
    }

    if (viewType == 'favor')
      nursingRulesApiService.getCollections(search.bookId).then(
        (res) => {
          callback([{
            childrenList: res.data.map((item: any) => {
              return {
                ...item,
                name: item.nodeName
              }
            })
          }])
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
    else {
      nursingRulesApiService
        .getBookCataLog(search.bookId)
        .then((res) => callback(res.data), (err) => callback())
    }
  }

  const getRevisionList = (chapter: any, callback?: Function) => {
    if (chapter.treePathCode)
      nursingRulesApiService
        .getChapterRevisions(chapter.treePathCode, search.bookId)
        .then(res => {
          if (res.data) setRevisionList(res.data)
          callback && callback(res.data)
        }, () => callback && callback())
    else
      callback && callback()
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

    if (newChapter) {
      setChapter(newChapter)
      getRevisionList(newChapter)
    }

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

  const [auditCfg, setAuditCfg] = useState({
    visible: false,
    params: {
      audit: true
    }
  })

  const toggleCollection = (chapter: any, indexList: any) => {
    if (chapter.inCollection)
      nursingRulesApiService.cancelCollection(chapter.collectionId).then((res) => {
        message.success('已取消收藏')
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
          message.success('已收藏')
          if (res.data) {
            chapter.inCollection = 1
            chapter.collectionId = res.data.id
            setChapter({ ...chapter })
          }
        })
  }

  const toPrevChapter = () => {
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
      // else if (parent.nodeNum == chapter.nodeNum) idx1 = i
    }

    if (!idx1 && idx1 !== 0) {
      message.warning('缺失章节信息')
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
      while (idx1 >= 0) {
        idx1--
        if (indexList[idx1]) {
          let childrenList = indexList[idx1].childrenList
          //如果子节点取最后一个子节点
          if (childrenList && childrenList.length >= 0) {
            newChapter = childrenList[childrenList.length - 1]
            // } else {
            //   //否则取自己
            //   newChapter = indexList[idx1]
          }
        }
        if (newChapter) break
      }
    }

    if (newChapter) {
      setChapter(newChapter)
      if (newChapter.urls) setPageUrl(newChapter.urls[0])
    } else {
      message.warning('已是第一章')
    }
  }

  const toNextChapter = () => {
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
      // else if (parent.nodeNum == chapter.nodeNum) idx1 = i
    }

    if (!idx1 && idx1 !== 0) {
      message.warning('缺失章节信息')
      return
    }

    if (indexList[idx1] && idx2 !== undefined) {
      //如果还有子章节
      idx2++
      let target = indexList[idx1].childrenList[idx2]
      if (target) newChapter = indexList[idx1].childrenList[idx2]
    }

    if (!newChapter) {
      //没有子章节 循环到最近的章节
      while (idx1 < indexList.length) {
        idx1++
        if (indexList[idx1]) {
          let childrenList = indexList[idx1].childrenList
          //如果子节点取第一个子节点
          if (childrenList && childrenList.length >= 0) {
            newChapter = childrenList[0]
            // } else {
            //   //否则取自己
            //   newChapter = indexList[idx1]
          }
        }
        if (newChapter) break
      }
    }

    if (newChapter) {
      setChapter(newChapter)
      if (newChapter.urls) setPageUrl(newChapter.urls[0])
    } else {
      message.warning('已是最后章节')
    }
  }

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
        toggleCollection(chapter, indexList)
      }
    },
    {
      name: '下载',
      hidden: !isDepartment,
      icon: <Icon type="download" style={{ fontSize: '30px' }} />,
      onClick: () => {
        nursingRulesApiService
          .downloadPage(`/crNursing/asset${pageUrl}`, `${chapterName.replace('.pdf', '')}.pdf`)
      }
    },
    {
      name: '修订记录',
      icon: loading ?
        <Icon type="loading" style={{ fontSize: '30px' }} /> :
        <Icon type="file-search" style={{ fontSize: '30px' }} />,
      onClick: () => {
        // setRevisionVisible(true)
        setLoading(true)
        getRevisionList(chapter, (val: any) => {
          setLoading(false)
          if (val) setRevisionVisible(true)
        })

      }
    }
  ]

  const rightControl = [
    {
      name: '上一章',
      onClick: () => toPrevChapter()
    },
    {
      name: '下一章',
      onClick: () => toNextChapter()
    }
  ] as any[]

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

  const revisionInfo = () => {
    let target = revisionList.find((item) => item.urls && item.urls[0] == appStore.queryObj.pageUrl)
    if (target) return `(${target.upLoadTime} ${target.upLoaderEmpName})`
    return ''
  }

  const chapterTitle = () => {
    return chapterName ? chapterName + revisionInfo() : '章节名称'
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <NavCon>
          <Link to='/nursingRulesNew'>护理制度</Link>
          <span> > </span>
          <a onClick={() => history.goBack()}>{bookName || '书籍名称'}</a>
          <span> > </span>
          <span>{chapterTitle()}</span>
        </NavCon>
        <div className='fl-right'>
          <Button
            onClick={() => handleAudit(true)}
            type='primary'
            disabled={loading || !!!isDepartment}
            style={{ display: viewType == 'audit' ? 'block' : 'none' }}>
            审核
          </Button>
          <RevisionBtn
            loading={loading}
            chapter={chapter}
            onLoading={(newLoading) => setLoading(newLoading)} />
          <Button onClick={() => history.goBack()}>返回</Button>
        </div>
      </div>
      <div className='main-contain'>
        <div className='audit-content' style={{ display: viewType == 'audit' ? 'block' : 'none' }}>
          <AuditInfo upLoadTime={auditInfo.upLoadTime} upLoaderEmpName={auditInfo.upLoaderEmpName} />
        </div>
        <div className='preview-content'>
          <div
            className='left-control'
            style={{ display: viewType == '' ? 'block' : 'none' }}>
            {leftControl.map((item: any, idx: number) => (
              <div
                className={item.hidden ? 'item hidden' : 'item'}
                onClick={() => item.onClick(chapter, indexList)} key={idx}>
                <div className='icon'>{item.icon}</div>
                <div className='text'>{item.name}</div>
              </div>
            ))}
          </div>
          <div
            className='right-control'
            style={{ display: viewType == '' ? 'block' : 'none' }}>
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
            <ViewContent
              contentWidth={contentWidth}
              contentHeight={contentHeight}
              loading={loading}
              pageUrl={pageUrl}
              chapter={chapter}
              chapterTitle={chapterTitle()}
              onLoading={(newLoading) => setLoading(newLoading)} />
          </div>
        </div>
      </div>
      <RevisionPannel
        visible={revisionVisible}
        pageUrl={(chapter.urls && chapter.urls[0]) || ''}
        revisionList={revisionList}
        handleSelect={(revesionItem: any) => {
          if (revesionItem.urls && revesionItem.urls[0])
            setPageUrl(revesionItem.urls[0] || '')

          setRevisionVisible(false)
        }}
        onClose={() => setRevisionVisible(false)} />
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
  .file-input{
    display: none;
  }
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
        &.hidden{
          display:none;
        }
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
          .anticon{
            color: #888;
          }
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
          color: #00a680;
          .anticon{
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
  .ant-dragger{
    .ant-upload{
      padding: 16px 10px;
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
