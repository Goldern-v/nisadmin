import './style.scss'
import React from 'react'
import { ContentUtils } from 'braft-utils'
import Switch from 'src/modules/badEvents/views/editor/components/common/Switch'
import { imageControlItems } from 'src/modules/badEvents/views/editor/configs/controls'

export default class Image extends React.Component {
  state = {
    toolbarVisible: false,
    toolbarOffset: 0,
    linkEditorVisible: false,
    sizeEditorVisible: false,
    tempLink: null,
    tempWidth: null,
    tempHeight: null
  }
  initialLeft
  initialTop
  initialWidth
  initialHeight
  reSizeType

  changeSize = (e) => {
    let type = this.reSizeType
    if (!this.initialLeft) {
      this.initialLeft = e.screenX
      this.initialTop = e.screenY
    }
    if (type === 'rightbottom') {
      this.initialHeight += e.screenY - this.initialTop
      this.initialWidth += e.screenX - this.initialLeft
    }
    if (type === 'leftbottom') {
      this.initialHeight += e.screenY - this.initialTop
      this.initialWidth += -e.screenX + this.initialLeft
    }

    this.initialLeft = e.screenX
    this.initialTop = e.screenY
  }

  moveImage = (e) => {
    this.changeSize(e)

    this.setState({
      tempWidth: Math.abs(this.initialWidth),
      tempHeight: Math.abs(this.initialHeight)
    })
  }

  upImage = () => {
    this.confirmImageSize()
    document.removeEventListener('mousemove', this.moveImage)
    document.removeEventListener('mouseup', this.upImage)
  }

  repareChangeSize = (type) => (e) => {
    this.reSizeType = type
    const imageRect = this.imageElement.getBoundingClientRect()
    this.initialLeft = this.initialTop = 0
    this.initialWidth = imageRect.width
    this.initialHeight = imageRect.height
    e.preventDefault()
    let that = this
    document.addEventListener('mousemove', that.moveImage)
    document.addEventListener('mouseup', this.upImage)
  }

  onloadImage = (e) => {
    console.log('onloadImage', e)
  }

  getBase64Image = (img) => {
    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)
    let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
    let dataURL = canvas.toDataURL('image/' + ext)
    return dataURL
  }

  render() {
    const { mediaData, language, imageControls } = this.props
    const { toolbarVisible, toolbarOffset, linkEditorVisible, sizeEditorVisible, tempWidth, tempHeight } = this.state
    const blockData = this.props.block.getData()

    let float = blockData.get('float')
    let alignment = blockData.get('alignment')
    let { url, link, link_target, width, height, meta } = mediaData
    let imageStyles = {}
    let clearFix = false

    if (float) {
      alignment = null
    } else if (alignment === 'left') {
      imageStyles.float = 'left'
      clearFix = true
    } else if (alignment === 'right') {
      imageStyles.float = 'right'
      clearFix = true
    } else if (alignment === 'center') {
      imageStyles.textAlign = 'center'
    } else {
      imageStyles.float = 'left'
      clearFix = true
    }

    const renderedControlItems = imageControls.map((item, index) => {
      if (typeof item === 'string' && imageControlItems[item]) {
        return (
          // eslint-disable-next-line
          <a
            className={item === 'link' && link ? 'active' : ''}
            key={index}
            // eslint-disable-next-line
            href='javascript:void(0);'
            onClick={() => this.executeCommand(imageControlItems[item].command)}
          >
            {imageControlItems[item].text}
          </a>
        )
      } else if (item && (item.render || item.text)) {
        return item.render ? (
          item.render(mediaData, this.props.block)
        ) : (
          // eslint-disable-next-line
          <a key={index} href='javascript:void(0);' onClick={() => item.onClick && this.executeCommand(item.onClick)}>
            {item.text}
          </a>
        )
      } else {
        return null
      }
    })

    return (
      <div className='bf-media'>
        <div
          style={imageStyles}
          draggable={true}
          onMouseEnter={this.showToolbar}
          onMouseMove={this.showToolbar}
          onMouseLeave={this.hideToolbar}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          ref={(instance) => (this.mediaEmbederInstance = instance)}
          className='bf-image'
        >
          {toolbarVisible ? (
            <div
              style={{ marginLeft: toolbarOffset }}
              ref={(instance) => (this.toolbarElement = instance)}
              data-float={float}
              data-align={alignment}
              className='bf-media-toolbar'
            >
              {linkEditorVisible ? (
                <div className='bf-image-link-editor'>
                  <div className='editor-input-group'>
                    <input
                      type='text'
                      placeholder={language.linkEditor.inputWithEnterPlaceHolder}
                      onKeyDown={this.handleLinkInputKeyDown}
                      onChange={this.setImageLink}
                      defaultValue={link}
                    />
                    <button type='button' onClick={this.confirmImageLink}>
                      {language.base.confirm}
                    </button>
                  </div>
                  <div className='switch-group'>
                    <Switch active={link_target === '_blank'} onClick={() => this.setImageLinkTarget(link_target)} />
                    <label>{language.linkEditor.openInNewWindow}</label>
                  </div>
                </div>
              ) : null}
              {sizeEditorVisible ? (
                <div className='bf-image-size-editor'>
                  <div className='editor-input-group'>
                    <input
                      type='text'
                      placeholder={language.base.width}
                      onKeyDown={this.handleSizeInputKeyDown}
                      onChange={this.setImageWidth}
                      defaultValue={width}
                    />
                    <input
                      type='text'
                      placeholder={language.base.height}
                      onKeyDown={this.handleSizeInputKeyDown}
                      onChange={this.setImageHeight}
                      defaultValue={height}
                    />
                    <button type='button' onClick={this.confirmImageSize}>
                      {language.base.confirm}
                    </button>
                  </div>
                </div>
              ) : null}
              {renderedControlItems}
              <i style={{ marginLeft: toolbarOffset * -1 }} className='bf-media-toolbar-arrow' />
            </div>
          ) : null}
          <div style={{ position: 'relative', width: `${width}px`, height: `${height}px`, display: 'inline-block' }}>
            <img
              ref={(instance) => (this.imageElement = instance)}
              src={url}
              width={width}
              height={height}
              onLoad={this.onloadImage(this)}
              alt={''}
              {...meta}
            />
            {toolbarVisible && (
              <div className='bf-csize-icon right-bottom' onMouseDown={this.repareChangeSize('rightbottom')} />
            )}
            {toolbarVisible && (
              <div className='bf-csize-icon left-bottom' onMouseDown={this.repareChangeSize('leftbottom')} />
            )}
            <div
              className={`bf-pre-csize ${this.reSizeType}`}
              style={{ width: `${tempWidth}px`, height: `${tempHeight}px` }}
            />
          </div>
        </div>
        {clearFix && <div className='clearfix' style={{ clear: 'both', height: 0, lineHeight: 0, float: 'none' }} />}
      </div>
    )
  }

  lockEditor() {
    this.props.editor.lockOrUnlockEditor(true)
  }

  unlockEditor() {
    this.props.editor.lockOrUnlockEditor(false)
  }

  calcToolbarOffset() {
    if (!this.props.containerNode) {
      return 0
    }

    const viewRect = this.props.containerNode.querySelector('.bf-content').getBoundingClientRect()
    const toolbarRect = this.toolbarElement.getBoundingClientRect()
    const imageRect = this.imageElement.getBoundingClientRect()

    const right = viewRect.right - (imageRect.right - imageRect.width / 2 + toolbarRect.width / 2)
    const left = imageRect.left + imageRect.width / 2 - toolbarRect.width / 2 - viewRect.left

    if (right < 10) {
      return right - 10
    } else if (left < 10) {
      return left * -1 + 10
    } else {
      return 0
    }
  }

  handleDragStart = () => {
    if (this.props.editor.editorProps.readOnly || this.props.editor.editorProps.disabled) {
      return false
    }

    window.__BRAFT_DRAGING__IMAGE__ = {
      block: this.props.block,
      mediaData: {
        type: 'IMAGE',
        ...this.props.mediaData
      }
    }

    this.setState(
      {
        toolbarVisible: false
      },
      () => {
        this.unlockEditor()
      }
    )

    return true
  }

  handleDragEnd = () => {
    window.__BRAFT_DRAGING__IMAGE__ = null
    return false
  }

  executeCommand = (command) => {
    if (typeof command === 'string') {
      const [method, param] = command.split('|')
      this[method] && this[method](param)
    } else if (typeof command === 'function') {
      command(this.props.block, this.props.mediaData, this.props.editorState)
    }
  }

  removeImage = () => {
    this.props.editor.setValue(ContentUtils.removeBlock(this.props.editorState, this.props.block))
    this.unlockEditor()
  }

  toggleLinkEditor = () => {
    this.setState({
      linkEditorVisible: !this.state.linkEditorVisible,
      sizeEditorVisible: false
    })
  }

  toggleSizeEditor = () => {
    this.setState({
      linkEditorVisible: false,
      sizeEditorVisible: !this.state.sizeEditorVisible
    })
  }

  handleLinkInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.confirmImageLink()
    } else {
      return
    }
  }

  setImageLink = (e) => {
    this.setState({ tempLink: e.currentTarget.value })
    return
  }

  setImageLinkTarget(link_target) {
    link_target = link_target === '_blank' ? '' : '_blank'
    this.props.editor.setValue(ContentUtils.setMediaData(this.props.editorState, this.props.entityKey, { link_target }))
    window.setImmediate(this.props.editor.forceRender)
  }

  confirmImageLink = () => {
    const { tempLink: link } = this.state

    if (link !== null) {
      this.props.editor.setValue(ContentUtils.setMediaData(this.props.editorState, this.props.entityKey, { link }))
      window.setImmediate(this.props.editor.forceRender)
    }
  }

  handleSizeInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.confirmImageSize()
    } else {
      return
    }
  }

  setImageWidth = ({ currentTarget }) => {
    let { value } = currentTarget

    value && !isNaN(value) && (value = value + 'px')

    this.setState({
      tempWidth: value
    })

    return
  }

  setImageHeight = ({ currentTarget }) => {
    let { value } = currentTarget

    value && !isNaN(value) && (value = value + 'px')

    this.setState({
      tempHeight: value
    })

    return
  }

  confirmImageSize = () => {
    const { tempWidth: width, tempHeight: height } = this.state
    const newImageSize = {}

    width !== null && (newImageSize.width = width)
    height !== null && (newImageSize.height = height)

    this.props.editor.setValue(ContentUtils.setMediaData(this.props.editorState, this.props.entityKey, newImageSize))
    window.setImmediate(this.props.editor.forceRender)
  }

  setImageFloat = (float) => {
    this.props.editor.setValue(ContentUtils.setMediaPosition(this.props.editorState, this.props.block, { float }))
    this.unlockEditor()
  }

  setImageAlignment = (alignment) => {
    this.props.editor.setValue(ContentUtils.setMediaPosition(this.props.editorState, this.props.block, { alignment }))
    this.unlockEditor()
  }

  showToolbar = (event) => {
    if (this.props.editor.editorProps.readOnly || this.props.editor.editorProps.disabled) {
      return false
    }

    event.preventDefault()

    if (!this.state.toolbarVisible) {
      this.setState(
        {
          toolbarVisible: true
        },
        () => {
          this.lockEditor()
          this.setState({ toolbarOffset: this.calcToolbarOffset() })
        }
      )
    }
  }

  hideToolbar = (event) => {
    event.preventDefault()

    this.setState(
      {
        toolbarVisible: false
      },
      () => {
        this.unlockEditor()
        // this.props.editor.requestFocus()
      }
    )
  }
}
