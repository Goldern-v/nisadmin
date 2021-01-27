import * as React from 'react'
import styled from 'styled-components'
import { Icon, message } from 'antd'
import service from 'src/services/api'
import tinyPic from 'src/utils/img/tinyPic'
import Zimage from 'src/components/Zimage'

export interface Props {
  tip: string
  accept: string
  value?: string[]
  ids?: string[],
  text?: string
  upload?: (files: FileList) => Promise<string[]>
  onChange: (value: string[], ids?: string[], defaultValue?: string[]) => void
  uploadOption?: any,
  sizeLimited?: number,
  preview?: boolean
}

export interface State {
  loading: boolean
  src: string[]
  iptVisible: boolean
  iptId: string
}

export default class MultipleImageUploader extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    accept: 'image/jpg, image/jpeg, image/png, image/bmp',
    tip: '支持jpg、jpeg、png、bmp格式的图片',
    text: '上传图片',
    onChange: () => { }
  }

  public static getDerivedStateFromProps(nextProps: Props) {
    return nextProps.value ? { src: nextProps.value } : { src: [] }
  }

  public state: State = {
    loading: false,
    src: [],
    iptVisible: false,
    iptId: `file-input-el-${(Math.random() * 1000).toString()}`
  }

  // private refInput = React.createRef<HTMLInputElement>()

  // public componentDidMount() {
  //   const $input = this.refInput.current
  //   if ($input) $input.addEventListener('change', this.onChange)
  // }

  // public componentWillUnmount() {
  //   const $input = this.refInput.current
  //   if ($input) $input.removeEventListener('change', this.onChange)
  // }

  private open = () => {
    this.setState({ ...this.state, iptVisible: false })
    console.log('open')

    setTimeout(() => {
      this.setState({ ...this.state, iptVisible: true })
      let iptEl = document.getElementById(this.state.iptId)
      if (iptEl) iptEl.click()
    }, 100)
    // const $input = this.refInput.current
    // if ($input) $input.click()
  }

  private getBase64 = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }

  private onOpen = () => {
    let sizeLimited = this.props.sizeLimited
    if (sizeLimited || sizeLimited === 0) {
      if (this.props.value && this.props.value.length >= sizeLimited) {
        message.error(`上传不能超过${sizeLimited}张图片`)
      } else {
        this.open()
      }
    } else {
      this.open()
    }
  }

  private onChange = async (e: Event) => {
    const { upload, onChange, sizeLimited, value } = this.props
    const $input = e.target as HTMLInputElement

    const files = ($input.files && $input.files) || null
    if (!files) return
    if (sizeLimited || sizeLimited === 0) {
      let valueLength = value && value.length || 0
      if (files.length + valueLength > sizeLimited) {
        message.error(`上传不能超过${sizeLimited}张图片`)
        return
      }
    }

    const src = []

    for (let i = 0; i < files.length; i++) {
      src.push((await this.getBase64(files[i])) || '')
    }

    // $input.value = ''
    if (upload) {
      this.setState({ src: [...this.state.src, ...src], loading: true })
      const value = await upload(files)
      this.setState({ loading: false })
      let ids = value.map((item: any) => item.data.id)
      let defaultValue = value.map((item: any) => item.data.path)

      value && onChange(
        [...(this.props.value || []), ...value],
        [...(this.props.ids || []), ...ids],
        [...(this.props.value || []), ...defaultValue]
      )
    } else {
      this.setState({ src: [...this.state.src, ...src], loading: true })
      try {
        const promiseList = []
        for (let i = 0; i < files.length; i++) {
          /** 图片压缩 */
          let img = await tinyPic(files[i])
          var fileObj = new File([img.img], files[i].name, { type: files[i].type, lastModified: Date.now() })
          promiseList.push(
            service.commonApiService.uploadFile({
              ...(this.props.uploadOption || {}),
              file: fileObj
            })
          )
          // promiseList.push(service.commonApiService.uploadFile({ ...(this.props.uploadOption || {}), file: files[i] }))
        }
        let res = await Promise.all(promiseList)
        let value = res.map((item: any) => item.data.path)
        let ids = res.map((item: any) => item.data.id)
        this.setState({ loading: false })
        value && onChange(
          [...(this.props.value || []), ...value],
          [...(this.props.ids || []), ...ids]
        )
      } catch (error) {
        console.log(error, 'errorerror')
      }
    }
  }

  public deletetImg = (index: number) => {
    this.props.value && this.props.value.splice(index, 1)
    this.props.ids && this.props.ids.splice(index, 1)
    this.props.value && this.props.onChange && this.props.onChange(
      [...this.props.value],
      this.props.ids && [...this.props.ids]
    )
  }
  public render() {
    const { tip, accept, text, preview } = this.props
    const { loading, src, iptVisible, iptId } = this.state
    return (
      <Wrapper>
        {/* {JSON.stringify(src)} */}
        {!preview && src &&
          src.map((item: string, index: number) => (
            <Inner key={index} className="inner">
              <Icon type='close' title='删除图片' onClick={() => this.deletetImg(index)} />
              <Image src={item} />
            </Inner>
          ))}
        {preview && src && src.map((item: string, index: number) => (
          <Zimage
            key={index}
            text={
              <Inner className="inner">
                <Icon type='close' title='删除图片' onClick={(e) => {
                  e.stopPropagation()
                  this.deletetImg(index)
                }} />
                <Image src={item} />
              </Inner>
            }
            list={[item]}
          />
        ))}
        <Inner onClick={() => this.onOpen()} className="inner">
          <React.Fragment>
            <StyledIcon type={loading ? 'loading' : 'plus'} />
            <Text>{text}</Text>
          </React.Fragment>
        </Inner>
        {iptVisible && <OriginalInput onChange={(e: any) => this.onChange(e)} id={iptId} type='file' accept={accept} multiple={true} />}
        <div style={{ clear: 'both' }} />
        {tip && <Tip className="tip">{tip}</Tip>}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  float: left;
  margin: 5px;
  position: relative;
  &:hover {
    border-color: ${(p) => p.theme.$mtc};
  }
  .anticon-close {
    position: absolute;
    right: 4px;
    top: 2px;
    height: 10px;
    width: 10px;
    color: #666;
  }
`

const OriginalInput = styled.input`
  display: none !important;
`

const Image = styled.img`
  width: 100%!important;
  height: auto!important;
`

const StyledIcon = styled(Icon)`
  margin-top: 6px;
  font-size: 2.3em;
  color: rgba(0, 0, 0, 0.65);
`

const Text = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
`

const Tip = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  width: auto;
  clear: both;
`
