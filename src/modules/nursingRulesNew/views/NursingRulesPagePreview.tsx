import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message as Message, Tooltip, Upload, Icon, message, Input } from 'antd'
import { Link } from 'react-router-dom'
import { appStore, authStore } from 'src/stores'
import { BaseStepCon, BaseStepBox } from 'src/components/BaseStep'
import GroupAuditModal from '../components/GroupAuditModal'
import { nursingRulesApiService } from './../api/nursingRulesNewService'
import PdfViewer from './../components/PdfViewer'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import Watermark from 'src/components/Watermark'
import ReversionPannel from './../components/ReversionPannel'
import qs from 'qs'

import { ReactComponent as SYZ } from './../assets/SYZ.svg'
import { ReactComponent as ML } from './../assets/ML.svg'
import { ReactComponent as SC } from './../assets/SC.svg'
import { ReactComponent as YSC } from './../assets/YSC.svg'
import { ReactComponent as XYZ } from './../assets/XYZ.svg'
import { Modal } from 'antd/es'

//内容面板宽度和高度
const contentWidth = 780
const contentHeight = 1043
const Dragger = Upload.Dragger

export interface Props { }

export default observer(function NursingRulesPagePreview(props: Props) {
  const { history, location } = appStore
  const search = appStore.queryObj
  const viewType = search.viewType || ''
  const viewTop = React.createRef<HTMLDivElement>()

  const [loading, setLoading] = useState(false)
  const [indexList, setIndexList] = useState([] as any)
  const [chapter, setChapter] = useState('' as any)
  const [pageUrl, setPageUrl] = useState('' as string)

  const [auditInfo, setAuditInfo] = useState({} as any)

  const [reversionList, setReversionList] = useState([] as any[])
  const [reversionVisible, setReversionVisible] = useState(false as boolean)

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
          getReversionList(newChapter)

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

  const getReversionList = (chapter: any, callback?: Function) => {
    if (chapter.treePathCode)
      nursingRulesApiService
        .getChapterRevisions(chapter.treePathCode, search.bookId)
        .then(res => {
          if (res.data) setReversionList(res.data)
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
      getReversionList(newChapter)
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
      Message.warning('已是第一章')
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
      Message.warning('已是最后章节')
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
      icon: <Icon type="download" style={{ fontSize: '30px' }} />,
      onClick: () => {
        nursingRulesApiService
          .downloadPage(`/crNursing/asset${pageUrl}`, chapterName)
      }
    },
    {
      name: '修订记录',
      icon: loading ?
        <Icon type="loading" style={{ fontSize: '30px' }} /> :
        <Icon type="file-search" style={{ fontSize: '30px' }} />,
      onClick: () => {
        // setReversionVisible(true)
        setLoading(true)
        getReversionList(chapter, (val: any) => {
          setLoading(false)
          if (val) setReversionVisible(true)
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

  const uploadFile = (file: File) => {
    if (file) {
      if (file.name !== chapter.fileName) {
        message.error(`上传的文件名${file.name}与目录指定的文件名${chapter.fileName}不一致`)
        return false
      }
      setLoading(true)
      nursingRulesApiService.upLoadChapterBodyFile({
        bookId: search.bookId || '',
        nodeNum: chapter.nodeNum || '',
        remark: '',
        bodyFile: file
      }).then(res => {
        setLoading(false)
        message.success('文件已提交,待护理部审核', 1, () => {
          // history.replace(`/nursingRulesNewDetail?bookId=${search.bookId}`)
          history.goBack()
        })
      }, () => setLoading(false))
    }
    return false
  }

  const handleFileChange = (file: any) => {
    if (file) {
      setLoading(true)

      nursingRulesApiService.revChapter({
        bodyFile: file,
        bookId: search.bookId,
        nodeNum: chapter.nodeNum,
        rematk: ''
      })
        .then(res => {
          setLoading(false)
          message.success('修订已提交,待护理部审核', 1, () => {
            // history.replace(`/nursingRulesNewDetail?bookId=${search.bookId}`)
            history.goBack()
          })
        }, (err) => setLoading(false))
    }
  }

  const handleReversion = () => {
    let file: any
    let title = chapterName
    let iptStyle = {
      width: '175px',
      margin: '0 10px',
      marginTop: '10px'
    }
    let noticeText = `请上传${chapter.fileName}`
    // if (chapter.fileName) title += `(${chapter.fileName})`
    let content = <React.Fragment>
      <div>
        <span>章节名称:</span>
        <Input
          style={iptStyle}
          disabled={true}
          title={chapterName}
          value={title} />
      </div>
      <div>
        <span>上传文件:</span>
        <Input
          disabled={true}
          style={iptStyle}
          placeholder={noticeText}
          className="fileNameIpt" />
        <input type="file" style={{ display: 'none' }} onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            file = e.target.files[0]

            let fileName = e.target.files[0].name
            let fileNameIpt = document.querySelector('.fileNameIpt') as HTMLInputElement
            if (fileNameIpt) fileNameIpt.value = fileName
          }
        }} id="reversionIpt" />
        <Tooltip title={noticeText}>
          <Button
            onClick={() => {
              let target = document.getElementById('reversionIpt')
              if (target) target.click()
            }}>
            <span>...</span>
          </Button>
        </Tooltip>
      </div>
    </React.Fragment>

    Modal.confirm({
      title: '修订本章节',
      content,
      icon: <Icon type="file-add" style={{ color: '#00A680' }} />,
      centered: true,
      onOk: () => {
        if (!file) {
          message.error('未选择上传文件')
          return
        }

        handleFileChange(file)
      }
    })
  }

  const ViewContent = () => {
    if (!pageUrl && loading) {
      return <div
        className='content-message page-item'
        style={{
          fontSize: '16px',
          lineHeight: `${contentHeight / 2 + 100}px`
        }}>
        <Icon type="loading" /> 载入中...
        </div>
    }

    if (!viewType && chapter && !chapter.isFileUploaded) {
      return <div className='content-message page-item'>
        <ChapterTitleCon className="no-border">{chapterTitle()}</ChapterTitleCon>
        <UploadCon>
          <Dragger
            accept="image/*,.pdf"
            className="ant-dragger"
            beforeUpload={uploadFile}>
            <p className="ant-upload-drag-icon">
              <Icon type="cloud-upload" />
            </p>
            <p className="ant-upload-text">未上传文件</p>
            <p className="ant-upload-hint">请上传 {chapter.fileName || ''}</p>
          </Dragger>
        </UploadCon>
      </div>
    }

    if (!viewType && chapter && chapter.isFileUploaded == 1 && chapter.fileStatus == 1) {
      return <div
        className='content-message page-item'
        style={{
          fontSize: '16px',
          color: '#00A680',
          lineHeight: `${contentHeight / 2 + 100}px`
        }}>
        <Icon type="solution" /> 文件已上传,待审核
      </div>
    }

    if (!pageUrl) {
      return <div
        className='content-message page-item'
        style={{
          fontSize: '16px',
          color: 'red',
          lineHeight: `${contentHeight / 2 + 100}px`
        }}>
        <Icon type="stop" /> 无预览文件
        </div>
    }

    let pageUrlArr = pageUrl.split('.')
    let type = pageUrlArr[pageUrlArr.length - 1]
    let url = `/crNursing/asset${pageUrl}`

    switch (type) {
      case 'jpg':
      case 'gif':
      case 'jpeg':
      case 'png':
        return <Watermark>
          <ChapterTitleCon>{chapterTitle()}</ChapterTitleCon>
          <img src={url} width='100%' className="page-item" />
        </Watermark>
      case 'pdf':
        return <React.Fragment>
          <ChapterTitleCon>{chapterTitle()}</ChapterTitleCon>
          <PdfViewer file={url} width={contentWidth - 2} />
        </React.Fragment>
      default:
        return <div
          className='content-message page-item'
          style={{
            fontSize: '16px',
            color: 'red',
            lineHeight: `${contentHeight / 2 + 100}px`
          }}>
          <ChapterTitleCon className="no-border">{chapterTitle()}</ChapterTitleCon>
          <Icon type="stop" /> 该文件格式不支持预览
        </div>
    }
  }

  const overTime = (startTime: string) => {
    if (!startTime) return '...小时'
    let time = moment().diff(moment(startTime), 'minute')

    let minutes = time % 60 ? `${time % 60}分钟` : ''
    let days: any = parseInt((time / (24 * 60)).toString())
    let hours: any = parseInt(((time / 60) % 24).toString())
    hours = hours >= 1 ? `${hours}小时` : ''
    days = days >= 1 ? `${days}天` : ''
    if (!hours && !minutes && !days) return '0小时'
    return days + hours + minutes
  }

  const reversionInfo = () => {
    let target = reversionList.find((item) => item.urls && item.urls[0] == appStore.queryObj.pageUrl)
    if (target) return `(${target.upLoadTime} ${target.upLoaderEmpName})`
    return ''
  }

  const chapterTitle = () => {
    return chapterName ? chapterName + reversionInfo() : '章节名称'
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
            disabled={loading || !!!authStore.isDepartment}
            style={{ display: viewType == 'audit' ? 'block' : 'none' }}>
            审核
          </Button>
          <Button
            onClick={handleReversion}
            disabled={loading}
            style={{ display: viewType ? 'none' : 'block' }}>
            修订本章节
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
                <div>审核中 耗时{overTime(auditInfo.upLoadTime)}</div>
              </StepBox>
            </BaseStepBox>
          </BaseStepCon>
        </div>
        <div className='preview-content'>
          <div
            className='left-control'
            style={{ display: viewType == '' ? 'block' : 'none' }}>
            {leftControl.map((item: any, idx: number) => (
              <div className='item' onClick={() => item.onClick(chapter, indexList)} key={idx}>
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
            <div className='page-content'>
              {ViewContent()}
            </div>
          </div>
        </div>
      </div>
      <ReversionPannel
        visible={reversionVisible}
        pageUrl={(chapter.urls && chapter.urls[0]) || ''}
        reversionList={reversionList}
        handleSelect={(revesionItem: any) => {
          if (revesionItem.urls && revesionItem.urls[0])
            setPageUrl(revesionItem.urls[0] || '')

          setReversionVisible(false)
        }}
        onClose={() => setReversionVisible(false)} />
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

      .page-content {
        &>*{
          width: ${contentWidth}px;
          margin: 0 auto;
          min-height: ${contentHeight}px;
          position: relative;
        }
        .page-item{
          background: #fff;
          border: 1px solid #ddd;
        }
        img {
          width: 100%;
        }
        .content-message {
          width: ${contentWidth}px;
          height: ${contentHeight}px;
          text-align: center;
          font-size: 14px;
        }
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

const UploadCon = styled.div`
  margin: 0 auto;
  margin-top: 250px;
  width: 200px;
  .ant-upload {
    border-width: 2px!important;
    background: rgba(0,0,0,0.004)!important;
  }
  .ant-upload-list{
    display: none;
  }
`

const ChapterTitleCon = styled.div`
  height: 31px;
  line-height: 31px;
  font-size: 16px;
  font-weight: bold;
  min-height: 0!important;
  text-align: center;
  background: #fff;
  border: 1px solid #ddd;
  border-bottom: 0;
  position: relative;
  bottom: -1px;
  z-index: 1;
  &.no-border{
    border: none;
  }
`
