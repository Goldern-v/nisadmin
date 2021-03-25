import * as React from 'react'
import styled from 'styled-components'
import { Icon, message } from 'antd'

export interface Props {
  tip: string
  accept: string
  value?: string
  text?: string,
  maxSize?: number, // 文件最大限制,单位:byte
  minSize?: number, // 文件最小限制,单位:byte
  upload?: (file: File) => Promise<string | undefined>
  onChange: (value: string) => void
}

export interface State {
  loading: boolean
  src: string
}

export default class ImageUploader extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    accept: 'image/jpg, image/jpeg, image/png, image/bmp',
    tip: '支持jpg、jpeg、png、bmp格式的图片',
    text: '上传图片',
    onChange: () => { }
  }

  public static getDerivedStateFromProps(nextProps: Props) {
    return { src: nextProps.value }
  }

  public state: State = {
    loading: false,
    src: ''
  }

  private refInput = React.createRef<HTMLInputElement>()

  public componentDidMount() {
    const $input = this.refInput.current
    if ($input) $input.addEventListener('change', this.onChange)
  }

  public componentWillUnmount() {
    const $input = this.refInput.current
    if ($input) $input.removeEventListener('change', this.onChange)
  }

  private open = () => {
    const $input = this.refInput.current
    if ($input) $input.click()
  }

  private getBase64 = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }

  private onOpen = () => {
    this.open()
  }

  private onChange = async (e: Event) => {
    const { upload, onChange } = this.props
    const $input = e.target as HTMLInputElement

    const file = ($input.files && $input.files[0]) || null

    if (!file) return

    let minSize = Number(this.props.minSize)
    let maxSize = Number(this.props.maxSize)

    console.log(file.size, minSize, maxSize)
    if (!isNaN(minSize)) {
      if (file.size < minSize) {
        message.error('提交失败，文件大小小于最低限制')
        return
      }
    }
    if (!isNaN(maxSize)) {
      if (file.size > maxSize) {
        message.error('提交失败，文件大小大于最高限制')
        return
      }
    }

    // const src = file ? await this.getBase64(file) : ''

    // $input.value = ''

    // if (upload) {
    //   this.setState({ src, loading: true })
    //   const value = await upload(file)
    //   this.setState({ loading: false })
    //   value && onChange(value)
    // }
  }

  public render() {
    const { tip, accept, text } = this.props
    const { loading, src } = this.state

    return (
      <Wrapper onClick={this.onOpen}>
        <Inner>
          <OriginalInput ref={this.refInput} type='file' accept={accept} />
          {src ? (
            <Image src={src} />
          ) : (
            <React.Fragment>
              <StyledIcon type={loading ? 'loading' : 'plus'} />
              <Text>{text}</Text>
            </React.Fragment>
          )}
        </Inner>
        {tip && <Tip>{tip}</Tip>}
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

  &:hover {
    border-color: ${(p) => p.theme.$mtc};
  }
`

const OriginalInput = styled.input`
  display: none !important;
`

const Image = styled.img`
  width: 100%;
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
`
